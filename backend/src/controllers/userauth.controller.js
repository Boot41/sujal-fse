import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Function to generate JWT token
const generateToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.SECRET_KEY, { expiresIn: "30d" });
};

// Regex to check for a valid email format
const properEmailFormatCheckerRegex = /\S+@\S+\.\S+/;

// Minimum password length requirement
const minimumPasswordSize = 8;

// 🔹 Register User
export const registerUser = async (req, res) => {
    try {
        const { name, email, password, businessType } = req.body;

        // Check if all fields are provided
        if (!name || !email || !password || !businessType) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Validate email format
        if (!properEmailFormatCheckerRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address"
            });
        }

        // Validate password length
        if (password.length < minimumPasswordSize) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 8 characters long"
            });
        }

        // Check if the email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists with this email"
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            businessType
        });

        // Generate JWT token
        const token = generateToken(newUser);

        // Respond with success
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// 🔹 Login User
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if both fields are provided
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Validate email format
        if (!properEmailFormatCheckerRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Please provide a valid email address"
            });
        }

        // Check if user exists
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist with this email"
            });
        }

        // Compare passwords
        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        // Generate JWT token
        const token = generateToken(user);

        res.status(200).json({
            success: true,
            message: "User logged in successfully",
            token
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};

// 🔹 Get Logged-in User Details
export const userDetails = async (req, res) => {
    try {
        const user = req.user;
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
};