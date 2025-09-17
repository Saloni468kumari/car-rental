import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

// Booking schema to store car bookings
const bookingSchema = new mongoose.Schema({
    car: { type: ObjectId, ref: "Car", required: true },
    user: { type: ObjectId, ref: "User", required: true },    // User who booked
    owner: { type: ObjectId, ref: "User", required: true },   // Car owner
    pickupDate: { type: Date, required: true },
    returnDate: { type: Date, required: true },
    status: { type: String, enum: ["pending", "confirmed", "cancelled"], default: "pending" },
    price: { type: Number, required: true }
}, { timestamps: true });

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;

