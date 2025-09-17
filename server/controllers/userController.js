import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Car from "../models/Car.js";

// Helper function to generate JWT token
const generateToken = (userId, role) => {
    return jwt.sign(
        { id: userId, role }, 
        process.env.JWT_SECRET, 
        { expiresIn: "7d" } // Token valid for 7 days
    );
};

// ------------------------
// REGISTER USER
// ------------------------
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate inputs
        if (!name || !email || !password || password.length < 8) {
            return res.status(400).json({
                success: false, 
                message: 'Fill out all fields (password must be at least 8 characters)'
            });
        }

        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ success: false, message: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in DB
        const user = await User.create({ name, email, password: hashedPassword });

        // Generate JWT token
        const token = generateToken(user._id.toString(), user.role);

        res.json({ success: true, token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ------------------------
// LOGIN USER
// ------------------------
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Compare password with hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid Credentials" });
        }

        // Generate JWT token
        const token = generateToken(user._id.toString(), user.role);
        res.json({ success: true, token });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ------------------------
// GET USER DATA (FROM JWT TOKEN)
// ------------------------
export const getUserData = async (req, res) => {
    try {
        const { user } = req; // user is attached by auth middleware
        res.json({ success: true, user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

// ------------------------
// GET ALL AVAILABLE CARS
// ------------------------
export const getCars = async (req, res) => {
    try {
        // Fetch only available cars
        const cars = await Car.find({ isAvailable: true });
        res.json({ success: true, cars });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
