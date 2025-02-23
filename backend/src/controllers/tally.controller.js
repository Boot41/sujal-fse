import fs from "fs-extra";
import { create } from "xmlbuilder2";
import generateGroqResponse from "../config/groqConfig.js";
import Sales from "../models/sales.models.js";
import User from "../models/user.models.js";
import { sendEmailTally } from "../config/emailConfig.js";

// 🔹 Generate AI-Enhanced Tally File for Financial Purpose Only
export const generateFinancialTallyFile = async (req, res) => {
    try {
        const userId = req.user._id;
        const retailer = await User.findById(userId);
        const salesData = await Sales.find({ userId });

        if (salesData.length === 0) {
            return res.status(400).json({
                success: false,
                message: "No sales data available for financial analysis"
            });
        }

        // 🔹 AI Prompt for Financial Analysis
        const prompt = `
        You are an AI financial analyst. Analyze the sales data for retailer "${retailer.name}" and provide structured financial insights.

        Sales Data:
        ${JSON.stringify(salesData)}

        Return JSON only in this exact format:
        {
          "profit_forecast": "Projected profit for next quarter",
          "revenue": "Total revenue generated",
          "expenses": "Expected operational costs",
          "cash_flow": "Predicted cash flow trends",
          "tax_suggestions": "Potential tax savings"
        }

        Strictly return only JSON without explanations or assumptions.
        `;

        const aiResponse = await generateGroqResponse(prompt);
        console.log("🔹 Raw AI Response:", aiResponse); // Debugging

        // Validate response format
        if (!aiResponse.trim().startsWith("{")) {
            throw new Error("AI response is not in JSON format.");
        }

        const aiInsights = JSON.parse(aiResponse.trim());

        // 🔥 Create Tally XML File
        const root = create({ version: "1.0" })
            .ele("ENVELOPE")
            .ele("HEADER")
            .ele("TALLYREQUEST").txt("Import Data").up()
            .up()
            .ele("BODY")
            .ele("IMPORTDATA")
            .ele("REQUESTDESC")
            .ele("REPORTNAME").txt("Financial Report").up()
            .up()
            .ele("REQUESTDATA");

        // Add AI Financial Insights
        root
            .ele("FINANCIAL_ANALYSIS")
            .ele("PROFIT_FORECAST").txt(aiInsights.profit_forecast).up()
            .ele("REVENUE").txt(aiInsights.revenue).up()
            .ele("EXPENSES").txt(aiInsights.expenses).up()
            .ele("CASH_FLOW").txt(aiInsights.cash_flow).up()
            .ele("TAX_SUGGESTIONS").txt(aiInsights.tax_suggestions).up()
            .up();

        const xmlString = root.end({ prettyPrint: true });

        // Save file
        const filePath = `reports/${retailer.name}-financial-report.xml`;
        await fs.writeFile(filePath, xmlString);

        // Send File via Email
        await sendEmailTally(
            retailer.email,
            "Your Weekly Financial Tally Report",
            "Attached is your AI-generated financial report for Tally.",
            filePath
        );

        res.status(200).json({ success: true, message: "Financial Tally file generated & emailed!" });

    } catch (error) {
        console.error("❌ Error generating financial Tally file:", error.message);
        res.status(500).json({ success: false, message: "Error generating financial Tally file" });
    }
};