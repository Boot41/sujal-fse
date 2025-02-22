import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import connectDB from "./src/config/db.js";

// routes import
import userRoutes from "./src/routes/user.routes.js";
import inventoryRoutes from "./src/routes/inventory.routes.js";
import salesRoutes from "./src/routes/sales.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.get("/" , (req,res)=>{
    res.json({message : "🚀 Server is running perfectly am good with it."})
})

// 🔹 WebSocket for real-time Excel updates
io.on("connection", (socket) => {
    console.log("📡 Client connected for live Excel updates");

    socket.on("update_inventory", (userId) => {
        console.log(`🔄 Updating Excel report for user ${userId}`);
        socket.emit("report_updated", { message: "📊 Excel report updated!", userId });
    });

    socket.on("disconnect", () => {
        console.log("❌ Client disconnected");
    });
});

// routes
app.use("/api/v1/auth" , userRoutes);
app.use("/api/v1/inventory" , inventoryRoutes);
app.use("/api/v1/sales" , salesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export {io};