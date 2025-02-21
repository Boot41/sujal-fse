import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import connectDB from "./src/config/db.js";
import productRoutes from "./src/routes/product.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/" , (req,res)=>{
    res.json({message : "🚀 Server is running perfectly am good with it."})
})

app.use("/api/products", productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
