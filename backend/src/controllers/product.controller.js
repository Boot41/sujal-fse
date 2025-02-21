import Product from "../models/product.models.js";
import { sendLowStockAlert } from "../services/email.service.js";

// Get all products
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add product
export const addProduct = async (req, res) => {
  try {
      const { name, sku, quantity, price } = req.body;

      // Check if SKU already exists
      const existingProduct = await Product.findOne({ sku });
      if (existingProduct) {
          return res.status(400).json({ message: "SKU already exists" });
      }

      // check for low stock alert 
      if(product.isLowStock()){
        await sendLowStockAlert(product.name , product.quantity)
      }

      const product = new Product({ name, sku, quantity, price });
      await product.save();

      // Emit real-time stock update
       // if (req.io) {
          // req.io.emit("stockUpdated", product);
      // }

      res.status(201).json(product);
  } catch (error) {
      res.status(400).json({ message: error.message });
  }
};

// Add multiple products at once
export const addMultipleProducts = async (req, res) => {
  try {
      const products = req.body; // Expecting an array of products

      if (!Array.isArray(products) || products.length === 0) {
          return res.status(400).json({ message: "Invalid request, provide an array of products" });
      }

      // Ensure unique SKUs
      const existingSKUs = await Product.find({ sku: { $in: products.map(p => p.sku) } });
      if (existingSKUs.length > 0) {
          return res.status(400).json({ message: "Some SKUs already exist", existingSKUs });
      }

      const insertedProducts = await Product.insertMany(products);

      // Emit real-time stock updates (optional)
      //if (req.io) {
        //  req.io.emit("bulkStockAdded", insertedProducts);
      //}

      res.status(201).json({ message: "Products added successfully", data: insertedProducts });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
};


// Update product stock
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        Object.assign(product, req.body);
        await product.save();

        // check for the low stock alert
        if(product.isLowStock()){
          await sendLowStockAlert(product.name, product.quantity);
        }

      // emit the real time update
      // req.io.emit("stockUpdated" , product);

        res.json(product);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete product
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ message: "Product not found" });

        // emit the real time delete update
        // req.io.emit("stockDeleted" , product._id);

        res.json({ message: "Product removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
