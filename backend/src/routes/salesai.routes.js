import express from "express";
import { getSalesAIInsights } from "../controllers/salesAI.controllers.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/ai-insights", authMiddleware, getSalesAIInsights);

export default router;
