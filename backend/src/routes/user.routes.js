import express from "express";
import { registerUser, loginUser, userDetails } from "../controllers/userauth.controller.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/userinfo", authMiddleware, userDetails);

export default router;