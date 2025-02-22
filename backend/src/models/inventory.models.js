import mongoose from "mongoose";

// Inventory Schema (Products)
const InventorySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true, default: 0 },
    price: { type: Number, required: true },
    supplier: { type: String }, // Optional supplier name
    lastRestocked: { type: Date, default: Date.now },
    threshold: { type: Number, required: true }, // Stockout warning level
    overstockLimit: { type: Number, required: true } // Overstock warning level
});

const Inventory = mongoose.model("Inventory", InventorySchema);

export default Inventory;