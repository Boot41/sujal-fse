import express from "express";
import { getProducts,addProduct } from "../controllers/productController.js";

const router = express.Router();

// products route
router.get("/get-all-products", getProducts);
router.post("/add-products", addProduct);

export default router;
