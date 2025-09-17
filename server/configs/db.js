import mongoose from "mongoose";

// Function to connect to MongoDB
const connectDB = async () => {
    try {
        // Event listener: fires when Mongoose successfully connects
        mongoose.connection.on('connected', () => console.log("Database Connected"));

        // Connect to MongoDB using URI from environment variables
        // The database used is "car-rental"
        await mongoose.connect(`${process.env.MONGODB_URI}/car-rental`);
    } 
    catch (error) {
        // Log any connection error
        console.log(error.message);
    }
}

// Export the connection function to be used in server.js or index.js
export default connectDB;
