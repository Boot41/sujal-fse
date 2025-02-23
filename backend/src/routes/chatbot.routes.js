import express from "express";
import { chatbotQuery } from "../controllers/chatbot.controller.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

// AI Chatbot Query Route
router.post("/", authMiddleware, chatbotQuery);

export default router;