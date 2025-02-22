import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./src/config/db.js";

// routes import
import userRoutes from "./src/routes/user.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/" , (req,res)=>{
    res.json({message : "🚀 Server is running perfectly am good with it."})
})

// routes
app.use("/api/v1/auth" , userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
