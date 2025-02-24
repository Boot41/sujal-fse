import fs from "fs"
import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";
import generateGroqResponse from "../config/groqConfig.js";
import Sales from "../models/sales.models.js";
import Inventory from "../models/inventory.models.js";
import User from "../models/user.models.js";
import { io } from "../../server.js"; // WebSocket for real-time updates

// Ensure 'reports/' directory exists
const reportsDir = "reports";
if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
}

export const generatePdfReport = async (req, res) => {
    try {
        const userId = req.user._id;
        const retailer = await User.findById(userId);

        const salesData = await Sales.find({ userId }).select("productId quantitySold date revenue");
        const inventoryData = await Inventory.find({ userId }).select("name stock category price threshold");

        // 🔹 AI Prompt for Business Insights
        const prompt = `
You are an advanced AI analyst generating a **professional business report** for the retailer **"${retailer.name}"** based on **inventory, sales data, and market trends**.

### 📌 **Report Goals**
This report should provide:
1️⃣ **Business Summary** – A brief overview of the retailer's inventory and sales performance.  
2️⃣ **AI-Based Predictions** – Sales forecast for the next 30 days.  
3️⃣ **AI Recommendations** – Actionable insights to improve inventory management and maximize profits.  
4️⃣ **Inventory Overview** – List of all products, stock levels, and key observations.  
5️⃣ **Sales Data** – Product-wise sales performance, revenue trends, and potential optimizations.  

---

### 🏪 **Retailer Information**
- **Retailer Name:** ${retailer.name}
- **Business Category:** ${retailer.category || "General"}  
- **Location:** ${retailer.location || "Not Provided"}  
- **Total Products Managed:** ${inventoryData.length}  
- **Total Sales Transactions:** ${salesData.length}  

---

### 📊 **Business Summary**
Provide a concise yet insightful **overview of the business performance**, including:
- Overall inventory health (low stock, overstocked products, fast-moving items).
- Sales performance highlights (top-selling products, underperforming products).
- Profitability insights (high-margin vs. low-margin products).
- Key trends and anomalies detected in the business.  

---

### 🔮 **AI-Based Sales Forecast**
Predict sales trends for the next **30 days**, including:
- **Expected demand** for different products.
- **Peak sales periods** based on historical trends.
- **High-risk inventory** (products that may cause stockouts or overstock issues).
- **AI-driven demand optimization strategies**.  

---

### 🚀 **AI Recommendations for Business Growth**
Provide **smart, data-driven** suggestions to improve business operations, including:
- **Stock Replenishment Plan** – When and how much to restock.
- **Pricing Adjustments** – AI-based recommendations to maximize profit margins.
- **Product Promotions** – Identify products that should be promoted for better sales.
- **Inventory Optimization** – Prevent overstocking and stock shortages.
- **Fraud & Anomaly Detection** – Identify unusual sales patterns.  

---

### 🛒 **Inventory Overview**
Provide a **detailed breakdown** of the retailer’s inventory, including:
\`\`\`json
${JSON.stringify(inventoryData, null, 2)}
\`\`\`
Highlight:
- Products running **low on stock**.
- Overstocked products that need urgent sales strategies.
- Inventory trends over the past months.  

---

### 📈 **Sales Data & Performance Analysis**
Provide a **detailed sales breakdown**, including:
\`\`\`json
${JSON.stringify(salesData, null, 2)}
\`\`\`
Include:
- **Top-selling products** in the last 30 days.
- **Products with declining sales**.
- **Overall revenue trends**.
- **Customer buying behavior insights**.  

---

### **📄 Expected AI Response Format (JSON)**
\`\`\`json
{
  "business_summary": "AI-generated overview of sales and inventory trends.",
  "sales_forecast": { "product_id": "predicted_sales_count" },
  "ai_recommendations": "Optimized strategies for better inventory and sales.",
  "inventory_overview": [
    { "product_name": "Product A", "stock": 50, "status": "Low Stock" },
    { "product_name": "Product B", "stock": 200, "status": "Overstocked" }
  ],
  "sales_performance": [
    { "product_name": "Product X", "sales": 500, "revenue": 10000 },
    { "product_name": "Product Y", "sales": 120, "revenue": 2400 }
  ]
}
\`\`\`

---

### 🚀 **Final Instructions**
- **Only respond with the structured JSON output**.
- Ensure **insights are data-driven, actionable, and easy to understand**.
- Keep responses **concise yet comprehensive**.

The goal is to provide **retailers with a clear understanding of their business, predictive insights, and AI-driven strategies for better decision-making**.
`;


        // 🔥 AI Response Handling
        let aiInsights = {
            ai_summary: "AI analysis unavailable.",
            sales_forecast: {},
            restocking_suggestions: { low_stock_products: [], recommended_orders: {} },
            anomalies_detected: [],
            profitability_analysis: { high_margin_products: [], low_margin_products: [] },
            ai_recommendations: "No AI insights available."
        };

        try {
            const aiResponse = await generateGroqResponse(prompt);
            
            if (!aiResponse || !aiResponse.choices || !aiResponse.choices[0] || !aiResponse.choices[0].message) {
                throw new Error("AI response is missing or invalid");
            }

            const aiContent = aiResponse.choices[0].message.content.trim();
            
            if (!aiContent) {
                throw new Error("AI response content is empty");
            }

            // 🔥 Fix Incomplete JSON
            const fixedContent = aiContent.endsWith("}") ? aiContent : aiContent + "}";
            aiInsights = JSON.parse(fixedContent);

        } catch (error) {
            console.error("🔴 AI Response Error:", error.message);
        }

        // 🔥 Generate PDF
        const doc = new PDFDocument();
        const filePath = `reports/${retailer.name}-business-report.pdf`;
        
        if (!fs.existsSync("reports")) {
            fs.mkdirSync("reports"); // Ensure the reports folder exists
        }
        
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        doc.fontSize(18).text(`Business Report - ${retailer.name}`, { align: "center" });
        doc.moveDown();
        doc.fontSize(14).text(`AI Summary: ${aiInsights.ai_summary}`);
        doc.moveDown();
        doc.text(`Predicted Sales: ${JSON.stringify(aiInsights.sales_forecast, null, 2)}`);
        doc.moveDown();
        doc.text(`Restocking Suggestions: ${JSON.stringify(aiInsights.restocking_suggestions, null, 2)}`);
        doc.moveDown();
        doc.text(`Anomalies Detected: ${JSON.stringify(aiInsights.anomalies_detected, null, 2)}`);
        doc.moveDown();
        doc.text(`Profitability Analysis: ${JSON.stringify(aiInsights.profitability_analysis, null, 2)}`);
        doc.moveDown();
        doc.text(`AI Recommendations: ${aiInsights.ai_recommendations}`);
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
        console.error("🔴 Error generating PDF report:", error);
        res.status(500).json({ success: false, message: "Error generating PDF report" });
    }
};


// 🔹 Generate AI-Powered Excel Report
export const generateExcelReport = async (req, res) => {
    try {
        const userId = req.user._id;
        const retailer = await User.findById(userId);
        if (!retailer) return res.status(404).json({ success: false, message: "Retailer not found" });

        const inventoryData = await Inventory.find({ userId });
        const salesData = await Sales.find({ userId });

        // 🔹 AI Analysis Prompt
        const prompt = `
You are an expert AI analyst generating a **detailed business report** for the retailer **"${retailer.name}"** based on **inventory, sales performance, and demand trends**.

---

### 📌 **Report Goals**
This report should provide:
1️⃣ **Inventory Overview** – A detailed breakdown of stock levels, categories, and pricing.  
2️⃣ **Sales Insights** – Best-selling and slow-moving products with revenue analysis.  
3️⃣ **AI-Based Forecasting** – Predicted demand for the next 30 days.  
4️⃣ **Restocking Recommendations** – Data-driven reorder suggestions.  
5️⃣ **Anomaly Detection** – Identify sales spikes, dips, and fraud risks.  
6️⃣ **AI Strategic Insights** – Recommendations to **optimize inventory, pricing, and sales**.  

---

### 🏪 **Retailer Information**
- **Retailer Name:** ${retailer.name}  
- **Business Category:** ${retailer.category || "General"}  
- **Location:** ${retailer.location || "Not Provided"}  
- **Total Products Managed:** ${inventoryData.length}  
- **Total Sales Transactions:** ${salesData.length}  

---

### 🛒 **Inventory Overview**
Analyze and provide meaningful insights on the retailer’s inventory:  
\`\`\`json
${JSON.stringify(inventoryData, null, 2)}
\`\`\`
Include:
- Products running **low on stock** (urgent restocking required).
- Overstocked products that need **discounting or promotions**.
- Category-wise **inventory distribution trends**.

---

### 📈 **Sales Insights & Performance Analysis**
Provide detailed **sales breakdown**, including:  
\`\`\`json
${JSON.stringify(salesData, null, 2)}
\`\`\`
Analyze:
- **Top-selling products** (past 30 days) and their contribution to revenue.
- **Slow-moving products** (low demand or declining sales).
- **High-margin vs. low-margin products**.
- **Seasonal demand shifts** based on historical data.

---

### 🔮 **AI-Based Sales Forecast (Next 30 Days)**
Predict upcoming sales trends, including:
- Expected **demand for different products**.
- High-risk inventory (potential **stockouts or overstock issues**).
- AI-driven **recommendations to prevent losses**.

---

### 🚀 **Restocking & Inventory Optimization Recommendations**
- **Stock Replenishment Plan** – Ideal restocking levels for **each product**.
- **Discount Strategies** – AI suggestions for overstocked items.
- **Supply Chain Optimization** – Vendor-based reorder recommendations.
- **Shelf Space Optimization** – How to rearrange inventory for **better sales**.

---

### 🚨 **Anomaly Detection & Risk Alerts**
- **Unusual sales spikes or dips** (possible fraud or demand shifts).
- **Products losing traction** (declining customer interest).
- **Customer buying behavior changes**.

---

### **📄 Expected AI Response Format (JSON)**
\`\`\`json
{
  "business_summary": "AI-generated overview of sales and inventory trends.",
  "sales_forecast": { "product_id": "predicted_sales_count" },
  "inventory_overview": [
    { "product_name": "Product A", "stock": 50, "status": "Low Stock" },
    { "product_name": "Product B", "stock": 200, "status": "Overstocked" }
  ],
  "sales_performance": [
    { "product_name": "Product X", "sales": 500, "revenue": 10000 },
    { "product_name": "Product Y", "sales": 120, "revenue": 2400 }
  ],
  "restocking_recommendations": {
    "urgent_restock": ["Product A", "Product C"],
    "suggested_orders": { "Product A": 50, "Product C": 100 }
  },
  "anomalies_detected": ["Product X had an unexpected drop"],
  "ai_recommendations": "Strategies to optimize inventory and maximize sales."
}
\`\`\`

---

### 🚀 **Final Instructions**
- **Ensure that all fields contain legitimate, meaningful data.**  
- Do **NOT** use placeholders like “Not Available” or “Data Unavailable.”  
- Provide **realistic numbers, patterns, and trends** based on historical data.  
- Respond with **ONLY the structured JSON output** for smooth integration.  

**The goal is to provide a highly actionable, data-driven report that helps the retailer make informed business decisions.**
`;


        let aiInsights;
        try {
            const aiResponse = await generateGroqResponse(prompt);
            let aiContent = aiResponse.choices?.[0]?.message?.content?.trim();

            if (!aiContent) throw new Error("AI response content missing");

            // 🔥 Fix Incomplete JSON
            if (!aiContent.endsWith("}")) {
                aiContent += "}";
            }

            aiInsights = JSON.parse(aiContent);
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

        worksheet.columns = [
            { header: "Product Name", key: "name", width: 20 },
            { header: "Stock", key: "stock", width: 10 },
            { header: "Category", key: "category", width: 15 },
            { header: "Price", key: "price", width: 10 },
            { header: "Threshold", key: "threshold", width: 10 }
        ];

        inventoryData.forEach((product) => {
            const row = worksheet.addRow(product);
            if (product.stock < product.threshold) {
                row.getCell("stock").fill = {
                    type: "pattern",
                    pattern: "solid",
                    fgColor: { argb: "FFFF0000" }
                };
            }
        });

        // AI Insights Sheet
        const summarySheet = workbook.addWorksheet("AI Summary");
        summarySheet.addRow(["Best-Sellers:", aiInsights.best_sellers.join(", ")]);
        summarySheet.addRow(["Slow-Movers:", aiInsights.slow_movers.join(", ")]);
        summarySheet.addRow(["Restocking Advice:", aiInsights.restocking_suggestions]);
        summarySheet.addRow(["Anomalies Detected:", aiInsights.anomalies.join(", ")]);
        summarySheet.addRow(["Sales Trends:", aiInsights.sales_trends]);

        // Save & Send File
        const filePath = `${reportsDir}/${retailer.name}-business-report.xlsx`;
        await workbook.xlsx.writeFile(filePath);
        res.download(filePath);

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error generating Excel report" });
    }
};
