const mongoose = require("mongoose");

// Chatbot Queries Schema
const ChatbotSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    query: { type: String, required: true },
    response: { type: String, required: true },
    timestamp: { type: Date, default: Date.now }
});

const Chatbot = mongoose.model("Chatbot", ChatbotSchema);
export default Chatbot;