import mongoose from "mongoose";

// Sales Schema
const SalesSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Inventory", required: true },
    quantitySold: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    salesChannel: { type: String, default: "Offline" } // Online, Offline, etc.
});

const Sales = mongoose.model("Sales", SalesSchema);

export default Sales;