import express from "express";
import User from "../models/user.models.js";
import { registerUser, loginUser, userDetails } from "../controllers/userauth.controller.js";
import authMiddleware from "../middleware/authmiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get(`/:${User._id}`, authMiddleware, userDetails);

export default router;