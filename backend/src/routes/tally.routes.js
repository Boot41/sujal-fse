import express from "express";
import { generateFinancialTallyFile } from "../controllers/tally.controller.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

// Fetch Financial Data from Tally & Apply AI
router.get("/generate-financial-tally", authMiddleware, generateFinancialTallyFile);

export default router;