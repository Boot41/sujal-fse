import dotenv from "dotenv";
dotenv.config(); // Load .env FIRST!

import express from "express";
import cors from "cors";
import connectDB from "./src/config/db.js";
import productRoutes from "./src/routes/product.routes.js";

connectDB(); // Now it can access process.env.MONGO_URI

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.json({ message: "🚀 Server is running perfectly" });
});

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
