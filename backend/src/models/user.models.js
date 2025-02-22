import mongoose from "mongoose";

// User Schema (Retailers)
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    businessType: { type: String, required: true }, // Grocery, Electronics, etc.
    createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model("User", UserSchema);
export default User;    