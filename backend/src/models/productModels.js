import pool from "../config/database.js";

// getting all the product at once
const Product = {
  getAll: async () => {
    const result = await pool.query("SELECT * FROM products");
    return result.rows;
  },
};

export default Product;
