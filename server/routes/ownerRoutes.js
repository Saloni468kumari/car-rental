import express from "express";
import { protect } from "../middleware/auth.js";
import { 
    addCar, 
    changeRoleToOwner, 
    getDashboardData, 
    getOwnerCars, 
    toggleCarAvailability, 
    updateUserImage, 
    deleteCar 
} from "../controllers/ownerController.js";
import upload from "../middleware/multer.js";

const ownerRouter = express.Router();

/**
 * @route   POST /api/owner/change-role
 * @desc    Change a regular user to an owner
 * @access  Private (user must be logged in)
 */
ownerRouter.post("/change-role", protect, changeRoleToOwner);

/**
 * @route   POST /api/owner/add-car
 * @desc    Add a new car listing
 * @access  Private (owner only)
 * @middleware upload.single("image") - handles image upload
 */
ownerRouter.post("/add-car", upload.single("image"), protect, addCar);

/**
 * @route   GET /api/owner/cars
 * @desc    Get all cars listed by the logged-in owner
 * @access  Private (owner only)
 */
ownerRouter.get("/cars", protect, getOwnerCars);

/**
 * @route   POST /api/owner/toggle-car
 * @desc    Toggle car availability (available/unavailable)
 * @access  Private (owner only)
 */
ownerRouter.post("/toggle-car", protect, toggleCarAvailability);

/**
 * @route   POST /api/owner/delete-car
 * @desc    Delete a car listing
 * @access  Private (owner only)
 */
ownerRouter.post("/delete-car", protect, deleteCar);

/**
 * @route   GET /api/owner/dashboard
 * @desc    Get dashboard data: total cars, bookings, revenue
 * @access  Private (owner only)
 */
ownerRouter.get('/dashboard', protect, getDashboardData);

/**
 * @route   POST /api/owner/update-image
 * @desc    Update owner profile image
 * @access  Private (owner only)
 * @middleware upload.single("image") - handles image upload
 */
ownerRouter.post('/update-image', upload.single("image"), protect, updateUserImage);

export default ownerRouter;
