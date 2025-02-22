import Inventory from "../models/inventory.models.js";
import { sendStockAlert } from "../config/emailConfig.js";
import User from "../models/user.models.js";
import generateGroqResponse from "../config/groqConfig.js";
import { io } from "../../server.js"; // Import WebSocket instance


// 🔹 Add a new product to the retailer's inventory
export const addProduct = async (req, res) => {
    try {
        const { name, category, stock, price, supplier, threshold, overstockLimit } = req.body;
        const userId = req.user._id; // Extract retailer ID from the authenticated user

        // Validate input
        if (!name || !category || !stock || !price || !threshold || !overstockLimit) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Create new product
        const newProduct = await Inventory.create({
            userId,
            name,
            category,
            stock,
            price,
            supplier,
            threshold,
            overstockLimit
        });

        // 🔥 Emit event to update Excel in real-time
        io.emit("update_inventory", userId);

        res.status(201).json({
            success: true,
            message: "Product added successfully",
            product: newProduct
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// 🔹 Fetch all products for a retailer
export const getProducts = async (req, res) => {
    try {
        const userId = req.user._id; // Get retailer ID from token
        const products = await Inventory.find({ userId });

        res.status(200).json({
            success: true,
            products
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// 🔹 Update Product & Trigger Stock Alerts
export const updateProduct = async (req, res) => {
    try {
        const { name, category, stock, price, supplier, threshold, overstockLimit } = req.body;
        const { productId } = req.params;
        const userId = req.user._id;

        // Find product
        const product = await Inventory.findOne({ _id: productId, userId });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        // Update product details
        product.name = name || product.name;
        product.category = category || product.category;
        product.stock = stock || product.stock;
        product.price = price || product.price;
        product.supplier = supplier || product.supplier;
        product.threshold = threshold || product.threshold;
        product.overstockLimit = overstockLimit || product.overstockLimit;

        await product.save();

        // 🔥 Emit event to update Excel in real-time
        io.emit("update_inventory", userId);

        // 🔹 Check Stock Levels & Trigger AI Alert
        let alertType = "";
        if (product.stock < product.threshold) {
            alertType = "Stockout";
        } else if (product.stock > product.overstockLimit) {
            alertType = "Overstock";
        }

        if (alertType) {
            const retailer = await User.findById(userId);

            // 🔹 AI-Generated Alert Message
            const prompt = `
            You are an AI assistant for inventory management. The retailer "${retailer.name}" has a stock alert for product "${product.name}".

            Current Stock: ${product.stock}
            Stock Threshold: ${product.threshold}
            Overstock Limit: ${product.overstockLimit}

            Generate a professional email alert about this stock issue. The email should be **short, clear, and actionable**.
            `;

            const aiAlertMessage = await generateGroqResponse(prompt);

            // Send email notification
            await sendStockAlert(retailer.email, `Stock Alert: ${product.name}`, aiAlertMessage);
        }

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            product
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};


// 🔹 Delete a product from inventory
export const deleteProduct = async (req, res) => {
    try {
        const { productId } = req.params;
        const userId = req.user._id;

        const product = await Inventory.findOne({ _id: productId, userId });

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }

        await product.deleteOne();

        // 🔥 Emit event to update Excel in real-time
        io.emit("update_inventory", userId);

        res.status(200).json({
            success: true,
            message: "Product deleted successfully"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

