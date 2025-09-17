import express from "express";
import { getCars, getUserData, loginUser, registerUser } from "../controllers/userController.js";
import { protect } from "../middleware/auth.js";

const userRouter = express.Router();

/**
 * @route   POST /api/user/register
 * @desc    Register a new user
 * @access  Public
 * @body    { name, email, password }
 */
userRouter.post('/register', registerUser);

/**
 * @route   POST /api/user/login
 * @desc    Login existing user
 * @access  Public
 * @body    { email, password }
 */
userRouter.post('/login', loginUser);

/**
 * @route   GET /api/user/data
 * @desc    Get user data from JWT token
 * @access  Private (user must be logged in)
 */
userRouter.get('/data', protect, getUserData);

/**
 * @route   GET /api/user/cars
 * @desc    Get all available cars for the frontend
 * @access  Public
 */
userRouter.get('/cars', getCars);

export default userRouter;
