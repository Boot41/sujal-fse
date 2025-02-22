import generateGroqResponse from "../config/groqConfig.js";
import Inventory from "../models/inventory.models.js";
import Sales from "../models/sales.models.js";
import User from "../models/user.models.js";

// 🔹 AI Chatbot Controller for Comprehensive Dashboard Insights
export const chatbotQuery = async (req, res) => {
    try {
        const userId = req.user._id;
        const retailer = await User.findById(userId);
        const { query } = req.body;

        if (!query) {
            return res.status(400).json({
                success: false,
                message: "Query is required"
            });
        }

        // Fetch retailer's inventory data
        const inventory = await Inventory.find({ userId }).select("name stock category threshold price");
        const salesData = await Sales.find({ userId }).select("productId quantitySold date revenue");

        // 🔹 Generate Analytics
        let bestSellingProducts = [];
        let slowMovingProducts = [];
        let stockTrends = [];
        let totalRevenue = 0;

        const productSales = {};
        const productRevenue = {};

        salesData.forEach((sale) => {
            productSales[sale.productId] = (productSales[sale.productId] || 0) + sale.quantitySold;
            productRevenue[sale.productId] = (productRevenue[sale.productId] || 0) + sale.revenue;
            totalRevenue += sale.revenue;
        });

        inventory.forEach((product) => {
            const salesCount = productSales[product._id] || 0;
            if (salesCount > 50) bestSellingProducts.push(product.name);
            if (salesCount < 10) slowMovingProducts.push(product.name);
            stockTrends.push({ name: product.name, stock: product.stock });
        });

        // 🔹 AI Prompt for Smart Dashboard Insights
        const prompt = `
        You are an AI assistant for a retailer. The retailer "${retailer.name}" has asked:
        "${query}"

        Their current inventory:
        ${JSON.stringify(inventory)}

        Their recent sales data:
        ${JSON.stringify(salesData)}

        Additional insights:
        - Best-selling products: ${JSON.stringify(bestSellingProducts)}
        - Slow-moving products: ${JSON.stringify(slowMovingProducts)}
        - Stock trends: ${JSON.stringify(stockTrends)}
        - Total revenue generated: ${totalRevenue}

        Provide a JSON response in this format:
        {
          "answer": "Your response to the query",
          "recommendation": "AI-driven business suggestion",
          "additional_info": "Any extra insights if necessary"
        }
        Do not include explanations or extra text.
        `;

        // Call Groq AI API
        const aiOutput = await generateGroqResponse(prompt);

        // 🔹 Parse AI Response to JSON
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
            response: structuredOutput
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
};