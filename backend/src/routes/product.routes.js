import express from "express";
import { addProduct, updateProduct, deleteProduct, getProducts,addMultipleProducts } from "../controllers/product.controller.js";

const router = express.Router();

router.get("/", getProducts); // Fetch all products
router.post("/add", addProduct); // Add a new product
router.put("/update/:id", updateProduct); // Update a product
router.delete("/delete/:id", deleteProduct); // Delete a product
router.post("/add-multiple", addMultipleProducts); // Add multiple products at once

export default router;
