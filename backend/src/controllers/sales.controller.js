import Sales from "../models/sales.models.js";
import Inventory from "../models/inventory.models.js";
import User from "../models/user.models.js";
import { sendStockAlert } from "../config/emailConfig.js";
import generateGroqResponse from "../config/groqConfig.js";

// 🔹 Log a sale (Record sales transaction)
export const logSale = async (req, res) => {
    try {
        const { productId, quantitySold, salesChannel } = req.body;
        const userId = req.user._id;

        // Validate input
        if (!productId || !quantitySold) {
            return res.status(400).json({
                success: false,
                message: "Product ID and quantity sold are required"
            });
        }

        // Find the product in inventory
        const product = await Inventory.findOne({ _id: productId, userId });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // 🔹 Check Stock Levels After Sale
        if (product.stock < product.threshold) {
            const retailer = await User.findById(userId);

            // 🔹 AI-Generated Stockout Alert
            const prompt = `
                Alert: Stockout Issue Detected  

                    Retailer: "${retailer.name}"  
                    Product: "${product.name}"  

                    Current Stock: ${product.stock}  
                    Threshold Level: ${product.threshold}  

Generate a **professional and concise email** alerting the retailer about this issue. The email should be clear, actionable, and urgent. End with **"Best regards, Think41 Inventory Management."**
`;

            const aiAlertMessage = await generateGroqResponse(prompt);

            // Send email notification
            await sendStockAlert(retailer.email, `Stock Alert: ${product.name}`, aiAlertMessage);

            return res.status(400).json({
                success: false,
                message: "Not enough stock available, Check your email for details"
            });
        }

        // Deduct the sold quantity from inventory
        product.stock -= quantitySold;
        await product.save();

        // Create a sales record
        const sale = await Sales.create({
            userId,
            productId,
            quantitySold,
            salesChannel
        });



        res.status(201).json({
            success: true,
            message: "Sale logged successfully",
            sale
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// 🔹 Fetch all sales for a retailer
export const getSales = async (req, res) => {
    try {
        const userId = req.user._id;
        const sales = await Sales.find({ userId }).populate("productId", "name price category");

        res.status(200).json({
            success: true,
            sales
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};