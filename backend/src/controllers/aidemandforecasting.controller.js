import generateGroqResponse from "../config/groqConfig.js";
import Sales from "../models/sales.models.js";
import Inventory from "../models/inventory.models.js";

// 🔹 Generate AI-powered demand forecasting using structured prompts
export const generateForecast = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.query;

        // Fetch sales history for the product
        const salesData = await Sales.find({ userId, productId }).sort({ date: -1 });

        if (salesData.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No sales data available for this product"
            });
        }

        // Format sales data into structured JSON for AI processing
        const formattedSales = salesData.map(sale => ({
            date: sale.date.toISOString().split("T")[0], // YYYY-MM-DD format
            quantitySold: sale.quantitySold
        }));

        // Fetch product details
        const product = await Inventory.findById(productId);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        // 🔹 Optimized AI Prompt (Strict JSON Output)
        const prompt = `
        You are an AI-powered demand forecasting system. Analyze the following product sales data and generate predictions.
        
        Product Name: "${product.name}"
        Sales Data (Last 30 Days): ${JSON.stringify(formattedSales)}
        Current Stock Level: ${product.stock}
        Stock Threshold: ${product.threshold}
        Category: ${product.category}

        Return only a **valid JSON object** with this format:
        \`\`\`json
        {
          "forecast": [list of predicted daily sales for next 7 days],
          "recommended_reorder": X (number of units recommended for restocking),
          "risk_level": "Low/Medium/High"
        }
        \`\`\`
        DO NOT add explanations or any extra text. Only return the JSON object.
        `;

        // Call Groq AI API
        const aiOutput = await generateGroqResponse(prompt);

        // 🔹 Log Raw AI Output for Debugging
        console.log("Raw AI Output:", aiOutput);

        // 🔹 Ensure Response is Parsed as JSON
        let structuredOutput;
        try {
            structuredOutput = JSON.parse(aiOutput.trim());
        } catch (error) {
            console.error("AI Response Parsing Error:", aiOutput);
            return res.status(500).json({
                success: false,
                message: "AI returned an invalid response format",
                rawResponse: aiOutput
            });
        }

        res.status(200).json({
            success: true,
            product: product.name,
            forecast: structuredOutput
        });

    } catch (error) {
        console.error("Error in Forecasting:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};