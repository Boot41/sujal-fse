import express from "express";
import { addProduct, getProducts, updateProduct, deleteProduct } from "../controllers/inventroy.controller.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

// CRUD Routes for Inventory
router.post("/addproduct", authMiddleware, addProduct);
router.get("/", authMiddleware, getProducts);
router.put("/:productId", authMiddleware, updateProduct);
router.delete("/:productId", authMiddleware, deleteProduct);

export default router;