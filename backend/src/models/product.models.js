import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: { type: String, required: true },
    sku: { type: String, unique: true, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
}, { timestamps: true });

// method to check for low stock
productSchema.methods.isLowStock = function() {
    return this.quantity < 5; // Low stock threshold is 5
};

const Product = mongoose.model("Product", productSchema);
export default Product;
