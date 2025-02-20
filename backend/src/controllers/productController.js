import Product from "../models/productModels.js";
import pool from "../config/database.js";

// getting all the products
const getProducts = async (_, res) => {
    try {
        const products = await Product.getAll();
        res.status(200).json(products);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching products" });
    }
};

// adding a new product
const addProduct = async (req, res) => {
    try {
        const { name, sku, price, stock_quantity } = req.body;
    
        if (!name || !sku || !price || stock_quantity === undefined) {
          return res.status(400).json({ error: "All fields are required" });
        }
    
        const newProduct = await pool.query(
          "INSERT INTO products (name, sku, price, stock_quantity) VALUES ($1, $2, $3, $4) RETURNING *",
          [name, sku, price, stock_quantity]
        );
    
        res.status(201).json({
          message: "✅ Product added successfully",
          product: newProduct.rows[0],
        });
      } catch (err) {
        console.error(err.message);
    
        if (err.code === "23505") {
          // Handle unique constraint violation for SKU
          return res.status(400).json({ error: "SKU must be unique" });
        }
    
        res.status(500).json({ error: "Internal Server Error" });
      }
}

export { getProducts , addProduct };