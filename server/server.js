// Ensure your package.json has "type": "module"
import express from "express";
import "dotenv/config"; 
import cors from "cors";
import connectDB from "./configs/db.js"; 
import userRouter from "./routes/userRoutes.js";
import ownerRouter from "./routes/ownerRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";

const app = express(); 

// Connect to Database
connectDB(); 

// --- MIDDLEWARE ---
app.use(express.json()); 

// Updated CORS
app.use(cors({
    origin: "https://car-rental-client-one.vercel.app",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

// --- ROUTES ---

// Root Route (Vercel Health Check)
app.get('/', (req, res) => {
    res.status(200).json({ message: "Car Rental Server is Live and Running!" });
});

// API Routes
app.use('/api/user', userRouter);
app.use('/api/owner', ownerRouter);
app.use('/api/bookings', bookingRouter);

// --- ERROR HANDLING MIDDLEWARE ---
// Agar koi route nahi milta (404)
app.use((req, res, next) => {
    res.status(404).json({ message: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: "Internal Server Error", error: err.message });
});

// Start Server
const PORT = process.env.PORT || 5000; // 5000 standard hai for MERN
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Vercel export
export default app;