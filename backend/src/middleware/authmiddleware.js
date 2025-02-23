import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "No token, authorization denied"
            });
        }

        // Extract token (remove "Bearer ")
        const token = authHeader.split(" ")[1];

        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded._id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found"
            });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Auth Middleware Error:", error);
        res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

export default authMiddleware;
