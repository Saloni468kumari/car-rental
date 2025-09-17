import mongoose from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

// Car schema for rental cars
const carSchema = new mongoose.Schema({
    owner: { type: ObjectId, ref: 'User' },          // Owner of the car
    brand: { type: String, required: true },        // Car brand
    model: { type: String, required: true },        // Car model
    image: { type: String, required: true },        // Car image URL
    year: { type: Number, required: true },         // Car manufacturing year
    category: { type: String, required: true },     // Sedan, SUV, etc.
    seating_capacity: { type: Number, required: true },
    fuel_type: { type: String, required: true },    // Petrol, Diesel
    transmission: { type: String, required: true }, // Manual, Automatic
    pricePerDay: { type: Number, required: true },
    location: { type: String, required: true },     // City/location
    description: { type: String, required: true },
    isAvailable: { type: Boolean, default: true }   // Availability for booking
}, { timestamps: true });

const Car = mongoose.model('Car', carSchema);
export default Car;

