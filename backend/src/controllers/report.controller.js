import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";
import fs from "fs";
import generateGroqResponse from "../config/groqConfig.js";
import Sales from "../models/sales.models.js";
import Inventory from "../models/inventory.models.js";
import User from "../models/user.models.js";
import { io } from "../../server.js"; // WebSocket for real-time updates

// 🔹 Generate AI-Powered PDF Report
export const generatePdfReport = async (req, res) => {
    try {
        const userId = req.user._id;
        const retailer = await User.findById(userId);

        // Fetch sales and inventory data
        const salesData = await Sales.find({ userId }).select("productId quantitySold date revenue");
        const inventoryData = await Inventory.find({ userId }).select("name stock category price threshold");

        // 🔹 AI Prompt for Summary
        const prompt = `
        Generate a structured AI summary of the retailer "${retailer.name}" business report.

        - Inventory Details: ${JSON.stringify(inventoryData)}
        - Sales Performance: ${JSON.stringify(salesData)}
        - AI-based Sales Forecast: Predict the sales for the next month based on trends.
        - AI Recommendations: Provide suggestions to improve stock management and profits.

        Format response in JSON:
        {
          "ai_summary": "AI-generated business overview",
          "sales_forecast": "Predicted sales data",
          "recommendations": "AI suggestions"
        }
        `;

        const aiResponse = await generateGroqResponse(prompt);
        const aiInsights = JSON.parse(aiResponse.trim());

        // Generate PDF
        const doc = new PDFDocument();
        const filePath = `reports/${retailer.name}-business-report.pdf`;
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        doc.fontSize(18).text(`Business Report - ${retailer.name}`, { align: "center" });
        doc.moveDown();
        doc.fontSize(14).text(`AI Summary: ${aiInsights.ai_summary}`);
        doc.moveDown();
        doc.text(`Predicted Sales: ${aiInsights.sales_forecast}`);
        doc.moveDown();
        doc.text(`AI Recommendations: ${aiInsights.recommendations}`);
        doc.moveDown();

        // Add Inventory and Sales Data
        doc.fontSize(12).text("Inventory Overview:");
        inventoryData.forEach(item => {
            doc.text(`- ${item.name}: ${item.stock} in stock`);
        });

        doc.moveDown();
        doc.text("Sales Data:");
        salesData.forEach(sale => {
            doc.text(`- Product ID ${sale.productId}: ${sale.quantitySold} sold`);
        });

        doc.end();

        stream.on("finish", () => {
            res.download(filePath, `${retailer.name}-business-report.pdf`);
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error generating PDF report" });
    }
};


// 🔹 Generate AI-Powered Excel Report with Live Updates
export const generateExcelReport = async (req, res) => {
    try {
        const userId = req.user._id;
        const retailer = await User.findById(userId);

        // Fetch all inventory data
        const inventoryData = await Inventory.find({ userId });
        const salesData = await Sales.find({ userId });

        // 🔹 AI Analysis Prompt
        const prompt = `
        Analyze the retailer "${retailer.name}" business data and generate structured insights.

        - Highlight best-selling & slowest-moving products.
        - Detect anomalies (sudden sales drops or spikes).
        - Generate AI-based restocking recommendations.
        - Provide insights on upcoming seasonal demand.

        Format response in JSON:
        {
          "best_sellers": ["Product A", "Product B"],
          "slow_movers": ["Product C"],
          "restocking_suggestions": "AI-driven reorder advice",
          "anomalies": ["Product X had an unexpected drop"],
          "sales_trends": "AI trend analysis"
        }
        `;

        let aiInsights;
        try {
            const aiResponse = await generateGroqResponse(prompt);
            aiInsights = JSON.parse(aiResponse.trim());
        } catch (error) {
            console.error("🔴 AI Response Parsing Error:", error);
            aiInsights = {
                best_sellers: ["Data Unavailable"],
                slow_movers: ["Data Unavailable"],
                restocking_suggestions: "AI analysis failed",
                anomalies: ["None detected"],
                sales_trends: "Data Unavailable"
            };
        }

        // 🔥 Create Excel File
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Business Report");

        // Define Columns
        worksheet.columns = [
            { header: "Product Name", key: "name", width: 20 },
            { header: "Stock", key: "stock", width: 10 },
            { header: "Category", key: "category", width: 15 },
            { header: "Price", key: "price", width: 10 },
            { header: "Threshold", key: "threshold", width: 10 }
        ];

        // Add Product Data (With Color Coding)
        inventoryData.forEach((product) => {
            const row = worksheet.addRow(product);

            // 🔹 Color Code: Low Stock = Red, High Demand = Green
            if (product.stock < product.threshold) {
                row.getCell("stock").fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFF0000" } // Red
                };
            }
        });

        // Add AI Insights
        const summarySheet = workbook.addWorksheet("AI Summary");
        summarySheet.addRow(["Best-Sellers:", aiInsights.best_sellers.join(", ")]);
        summarySheet.addRow(["Slow-Movers:", aiInsights.slow_movers.join(", ")]);
        summarySheet.addRow(["Restocking Advice:", aiInsights.restocking_suggestions]);
        summarySheet.addRow(["Anomalies Detected:", aiInsights.anomalies.join(", ")]);
        summarySheet.addRow(["Sales Trends:", aiInsights.sales_trends]);

        // Save & Send File
        const filePath = `reports/${retailer.name}-business-report.xlsx`;
        await workbook.xlsx.writeFile(filePath);

        // 🔹 Notify Frontend of Excel Update
        io.emit("update_inventory", userId);

        // 🔹 Set Headers to Return Only the Excel File
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", `attachment; filename="${retailer.name}-business-report.xlsx"`);
        res.download(filePath);

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error generating Excel report" });
    }
};