import Sales from "../models/sales.models.js";
import generateGroqResponse from "../config/groqConfig.js";

// 🔹 AI Sales Insights Controller
export const getSalesAIInsights = async (req, res) => {
    try {
        const userId = req.user._id;
        const salesData = await Sales.find({ userId })
            .populate("productId", "name") // Fetch product name instead of ID
            .lean(); // Convert Mongoose objects to plain JS objects

        if (!salesData || salesData.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No sales data available for AI analysis",
            });
        }

        // 🔹 Filter out null product references to avoid errors
        const filteredSalesData = salesData.filter(sale => sale.productId && sale.productId.name);

        if (filteredSalesData.length === 0) {
            return res.status(400).json({
                success: false,
                message: "All sales records have missing product references.",
            });
        }

        // 🔹 AI Prompt for Sales Insights
        const prompt = `
        You are an advanced AI sales analyst for a retailer. Your task is to analyze their **sales data** and provide **insightful, actionable, and accurate** recommendations.

        ### 📊 Sales Data (Last 30 Days)
        Here is the retailer's complete sales history:
        ${JSON.stringify(
            filteredSalesData.map((sale) => ({
                date: sale.date,
                productName: sale.productId.name, // Safe access due to filtering
                quantitySold: sale.quantitySold,
                revenue: sale.revenue,
                salesChannel: sale.salesChannel,
            })),
            null,
            2
        )}

        ### 🎯 AI Analysis Goals
        Analyze the given sales data and return insights **ONLY** in **valid JSON format** with this structure:

        \`\`\`json
        {
            "trends": "Key sales trends (e.g., best-selling products, seasonal spikes, declining sales, etc.)",
            "predictions": "Forecast sales for next month based on historical data",
            "recommendations": "Strategic suggestions to increase sales and optimize inventory"
        }
        \`\`\`

        ### 🛑 STRICT RULES:
        1️⃣ **DO NOT** include any text outside of the JSON format.  
        2️⃣ **DO NOT** return explanations, disclaimers, or additional context.  
        3️⃣ **DO NOT** use \`productId\`—always use the **actual product names**.  
        4️⃣ **DO NOT** generate random data—**use only the provided sales records**.  

        ⚠️ **Failure to follow these rules will result in incorrect analysis.**  
        🔥 **Generate the most insightful and strategic analysis possible!**
        `;

        const aiOutput = await generateGroqResponse(prompt);

        let structuredOutput;
        try {
            structuredOutput = JSON.parse(aiOutput.trim());
        } catch (error) {
            console.error("❌ AI Response Parsing Error:", aiOutput);
            return res.status(500).json({
                success: false,
                message: "Invalid AI response format",
                rawResponse: aiOutput,
            });
        }

        res.status(200).json({ success: true, response: structuredOutput });
    } catch (error) {
        console.error("❌ AI Sales Insights Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
