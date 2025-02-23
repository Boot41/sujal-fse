import express from "express";
import { generatePdfReport, generateExcelReport } from "../controllers/report.controller.js"
import authMiddleware from "../middleware/authmiddleware.js"

const router = express.Router();

router.get("/pdf", authMiddleware, generatePdfReport);
router.get("/excel", authMiddleware, generateExcelReport);

export default router;