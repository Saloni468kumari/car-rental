import express from "express";
import { 
    changeBookingStatus, 
    checkAvailabilityOfCar,
    createBooking, 
    getOwnerBookings, 
    getUserBookings 
} from "../controllers/bookingController.js";
import { protect } from "../middleware/auth.js";

const bookingRouter = express.Router();

/**
 * @route   POST /api/bookings/check-availability
 * @desc    Check if a car is available for the given pickup and return dates
 * @access  Public (no login required)
 */
bookingRouter.post('/check-availability', checkAvailabilityOfCar);

/**
 * @route   POST /api/bookings/create
 * @desc    Create a new booking for a car
 * @access  Private (user must be logged in)
 */
bookingRouter.post('/create', protect, createBooking);

/**
 * @route   GET /api/bookings/user
 * @desc    Get all bookings made by the currently logged-in user
 * @access  Private (user must be logged in)
 */
bookingRouter.get('/user', protect, getUserBookings);

/**
 * @route   GET /api/bookings/owner
 * @desc    Get all bookings for cars owned by the logged-in owner
 * @access  Private (only owners can see this)
 */
bookingRouter.get('/owner', protect, getOwnerBookings);

/**
 * @route   POST /api/bookings/change-status
 * @desc    Change the status of a booking (pending → confirmed/cancelled)
 * @access  Private (only owner can update booking status)
 */
bookingRouter.post('/change-status', protect, changeBookingStatus);

export default bookingRouter;
