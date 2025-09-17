// Using ES Modules. Ensure your package.json has "type": "module"
// {
//   "type": "module"
// }

import express from "express";
import "dotenv/config"; // Loads environment variables from .env
import cors from "cors";
import connectDB from "./configs/db.js"; // Database connection
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

// Initialize Express App
const app = express(); 

// Connect to MongoDB
await connectDB(); // Make sure MONGODB_URI is correct in your .env

// Middleware
app.use(cors());        // Enable cross-origin requests
app.use(express.json()); // Parse JSON request bodies

// Root Route
app.get('/', (req, res) => res.send("Server is running"));

// API Routes
app.use('/api/user', userRouter);       // User related routes
app.use('/api/owner', ownerRouter);     // Owner related routes
app.use('/api/bookings', bookingRouter); // Booking related routes

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
