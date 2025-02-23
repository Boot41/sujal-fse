import express from "express";
import { generateForecast } from "../controllers/aidemandforecasting.controller.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

// AI Forecasting Route
router.get("/forecast", authMiddleware, generateForecast);

export default router;