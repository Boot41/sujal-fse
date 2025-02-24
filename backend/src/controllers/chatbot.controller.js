import generateGroqResponse from "../config/groqConfig.js";
import Inventory from "../models/inventory.models.js";
import Sales from "../models/sales.models.js";
import User from "../models/user.models.js";

// 🔹 AI Chatbot Controller for Comprehensive Dashboard Insights
export const chatbotQuery = async (req, res) => {
    try {
        const userId = req.user?._id;
        if (!userId) {
            return res.status(401).json({ success: false, message: "Unauthorized access" });
        }

        const { query } = req.body;
        if (!query) {
            return res.status(400).json({ success: false, message: "Query is required" });
        }

        // Fetch retailer details
        const retailer = await User.findById(userId).select("name");
        if (!retailer) {
            return res.status(404).json({ success: false, message: "Retailer not found" });
        }

        // Fetch inventory and sales data
        const inventory = await Inventory.find({ userId }).select("name stock category threshold price");
        const salesData = await Sales.find({ userId }).select("productId quantitySold date revenue");

        // 🔹 Generate Business Insights
        let bestSellingProducts = [];
        let slowMovingProducts = [];
        let stockTrends = [];
        let totalRevenue = 0;

        const productSales = {};
        const productRevenue = {};

        salesData.forEach(({ productId, quantitySold, revenue }) => {
            productSales[productId] = (productSales[productId] || 0) + quantitySold;
            productRevenue[productId] = (productRevenue[productId] || 0) + revenue;
            totalRevenue += revenue;
        });

        inventory.forEach(({ _id, name, stock }) => {
            const salesCount = productSales[_id] || 0;
            if (salesCount > 50) bestSellingProducts.push(name);
            if (salesCount < 10) slowMovingProducts.push(name);
            stockTrends.push({ name, stock });
        });

        // 🔹 AI Prompt for Smart Insights (Fixed)
        const prompt = `
You are an advanced AI assistant for a retailer named "${retailer.name}". 
Your job is to provide precise and relevant answers to user queries regarding their **dashboard, inventory, sales trends, product performance, future analysis, and business insights**.

### User Query:
"${query}"

### Retailer's Inventory:
${JSON.stringify(inventory)}

### Sales Data:
${JSON.stringify(salesData)}

### Key Insights:
- Best-selling products: ${JSON.stringify(bestSellingProducts)}
- Slow-moving products: ${JSON.stringify(slowMovingProducts)}
- Stock trends: ${JSON.stringify(stockTrends)}
- Total revenue: ${totalRevenue}

### AI Response Guidelines:
1️⃣ **Strictly answer only what the user has asked.**  
2️⃣ **Do not add extra information unless explicitly requested.**  
3️⃣ **Ensure the response is fact-based using the given data.**  
4️⃣ **For future trends, analyze patterns from inventory & sales.**  
5️⃣ **Always return a structured JSON response in this format:**

\`\`\`json
{
  "answer": "Direct and concise response to the user query",
  "recommendation": "AI-driven business suggestion (if applicable)",
  "additional_info": "Relevant insights (only if needed)"
}
\`\`\`

⚠️ **DO NOT include unnecessary explanations, extra details, or disclaimers.**
⚠️ **DO NOT generate responses beyond the provided inventory and sales data.**
⚠️ **DO NOT create hypothetical information—base everything on real data.**

### 🔹 Sample Scenarios:
- If the user asks, "Which product is selling the most?" → Return the best-selling product from sales data.
- If the user asks, "What is the total revenue?" → Provide the calculated total revenue.
- If the user asks, "Which items need restocking?" → Check stock levels and suggest low-stock items.
- If the user asks about "Future Trends," → Analyze past sales & suggest trends.
- If the user asks something **unrelated to inventory/sales**, reply: **"I'm designed to assist with dashboard and business insights only."**

🔥 **Your response must be formatted strictly as JSON and contain only relevant information.**
`;



        // Call AI Model
        const aiOutput = await generateGroqResponse(prompt);

        // 🔹 Debugging: Log AI Response
        console.log("🔹 AI Raw Response:", aiOutput);

        // 🔹 Validate and Parse AI Response
        let structuredOutput;
        try {
            structuredOutput = JSON.parse(aiOutput.trim());
        } catch (error) {
            console.error("❌ AI Response Parsing Error:", aiOutput);

            // ✅ If AI response is invalid, send a fallback response
            return res.status(500).json({
                success: false,
                message: "AI returned an invalid response format",
                rawResponse: aiOutput
            });
        }

        res.status(200).json({ success: true, response: structuredOutput });

    } catch (error) {
        console.error("❌ Chatbot Query Error:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};
