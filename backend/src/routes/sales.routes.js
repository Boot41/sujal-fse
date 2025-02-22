import express from "express";
import { logSale, getSales } from "../controllers/sales.controller.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

// Sales Routes
router.post("/", authMiddleware, logSale);
router.get("/", authMiddleware, getSales);

export default router;