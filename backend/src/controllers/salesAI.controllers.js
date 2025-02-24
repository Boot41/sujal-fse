import Sales from "../models/sales.models.js";
import generateGroqResponse from "../config/groqConfig.js";

// 🔹 AI Sales Insights Controller
export const getSalesAIInsights = async (req, res) => {
    try {
        const userId = req.user._id;
        const salesData = await Sales.find({ userId });

        if (salesData.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No sales data available for AI analysis"
            });
        }

        // 🔹 AI Prompt for Sales Insights
// 🔹 AI Prompt for Sales Insights
// 🔹 AI Prompt for Sales Insights
const prompt = `
You are an advanced AI sales analyst for a retailer. Your task is to analyze their **sales data** and provide **insightful, actionable, and accurate** recommendations.

### 📊 Sales Data (Last 30 Days)
- Here is the retailer's complete sales history:
${JSON.stringify(salesData.map(sale => ({ 
    ...sale, 
    productId: sale.productId.name 
})), null, 2)}

### 🎯 AI Analysis Goals
You must **strictly** analyze the given sales data and return insights **ONLY** in **valid JSON format** with the following structure:

\`\`\`
{
  "trends": "Explain key sales trends (e.g., most sold product, seasonal spikes, decreasing sales, etc.)",
  "predictions": "Forecast sales for the next month based on historical trends",
  "recommendations": "Provide strategic suggestions to increase sales and optimize inventory"
}
\`\`\`

### 🛑 STRICT RULES:
1️⃣ **DO NOT** include any text outside of the JSON format.  
2️⃣ **DO NOT** return explanations, disclaimers, or extra words.  
3️⃣ **DO NOT** use \`productId\`—always use the **actual product names** instead.  
4️⃣ **DO NOT** generate random data—**use only the provided sales records.**  

### 💡 Expected Insights Example
\`\`\`
{
  "trends": "Product A and Product B have the highest sales. Sales peaked during the last week. Offline sales have increased, while online sales declined by 10%.",
  "predictions": "Product A sales may increase by 15% next month due to a consistent upward trend. Product C might experience a decline.",
  "recommendations": "Increase stock for Product A as demand is growing. Offer discounts on Product C to boost sales. Consider running an online promotion."
}
\`\`\`

⚠️ **Failure to follow these rules will result in incorrect analysis.**  
🔥 **Generate the most insightful and strategic analysis possible!**
`;




        const aiOutput = await generateGroqResponse(prompt);

        let structuredOutput;
        try {
            structuredOutput = JSON.parse(aiOutput.trim());
        } catch (error) {
            console.error("AI Response Parsing Error:", aiOutput);
            return res.status(500).json({
                success: false,
                message: "Invalid AI response format",
                rawResponse: aiOutput
            });
        }

        res.status(200).json({ success: true, response: structuredOutput });

    } catch (error) {
        console.error("AI Sales Insights Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
