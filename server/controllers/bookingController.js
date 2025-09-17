import Booking from "../models/Booking.js";
import Car from "../models/Car.js";

// Function to Check Availability of Car for a given Date
const checkAvailability = async (car, pickupDate, returnDate) => {
    // Convert pickupDate and returnDate from string to Date objects
    const pickup = new Date(pickupDate);
    const returnD = new Date(returnDate);

    // Find bookings that overlap with the given date range
    const bookings = await Booking.find({
        car,
        pickupDate: { $lte: returnD },
        returnDate: { $gte: pickup },
    });

    // Return true if no overlapping bookings exist
    return bookings.length === 0;
};

// API to Check Availability of Cars for the given Date and Location
export const checkAvailabilityOfCar = async (req, res) => {
    try {
        const { location, pickupDate, returnDate } = req.body;

        // Fetch all available cars for the given location
        const cars = await Car.find({ location, isAvailable: true });

        // Check availability of each car asynchronously
        const availableCarsPromises = cars.map(async (car) => {
            const isAvailable = await checkAvailability(car._id, pickupDate, returnDate);
            return { ...car._doc, isAvailable };
        });

        let availableCars = await Promise.all(availableCarsPromises);

        // Filter only truly available cars
        availableCars = availableCars.filter((car) => car.isAvailable === true);

        res.json({ success: true, availableCars });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// API to Create Booking
export const createBooking = async (req, res) => {
    try {
        const { _id } = req.user; // Current logged-in user
        const { car, pickupDate, returnDate } = req.body;

        // Check if the car is available for the selected dates
        const isAvailable = await checkAvailability(car, pickupDate, returnDate);
        if (!isAvailable) {
            return res.json({ success: false, message: "Car is not available" });
        }

        const carData = await Car.findById(car);

        // Calculate total price based on number of days
        const picked = new Date(pickupDate);
        const returned = new Date(returnDate);
        const noOfDays = Math.ceil((returned - picked) / (1000 * 60 * 60 * 24));
        const price = carData.pricePerDay * noOfDays;

        // Create the booking
        await Booking.create({
            car,
            owner: carData.owner,
            user: _id,
            pickupDate,
            returnDate,
            price,
        });

        res.json({ success: true, message: "Booking Created" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// API to List User Bookings
export const getUserBookings = async (req, res) => {
    try {
        const { _id } = req.user;
        // Populate car details for user bookings
        const bookings = await Booking.find({ user: _id })
            .populate("car")
            .sort({ createdAt: -1 });

        res.json({ success: true, bookings });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// API to List Owner Bookings
export const getOwnerBookings = async (req, res) => {
    try {
        if (req.user.role !== "owner") {
            return res.json({ success: false, message: "Unauthorized" });
        }

        const bookings = await Booking.find({ owner: req.user._id })
            .populate("car user", "-password") // Include car & user info, hide password
            .sort({ createdAt: -1 });

        console.log("API Owner ID:", req.user._id, "Role:", req.user.role);

        res.json({ success: true, bookings });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};

// API to Change Booking Status (Owner Only)
export const changeBookingStatus = async (req, res) => {
    try {
        const { _id } = req.user;
        const { bookingId, status } = req.body;

        const booking = await Booking.findById(bookingId);

        // Ensure only the owner of the car can change status
        if (booking.owner.toString() !== _id.toString()) {
            return res.json({ success: false, message: "Unauthorized" });
        }

        booking.status = status;
        await booking.save();

        res.json({ success: true, message: "Status Updated" });
    } catch (error) {
        console.log(error.message);
        res.json({ success: false, message: error.message });
    }
};
