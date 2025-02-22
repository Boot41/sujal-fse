import jwt from "jsonwebtoken";
import User from "../models/user.models.js";

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token, authorization denied"
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = await User.findById(decoded._id).select("-password");

        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

export default authMiddleware;