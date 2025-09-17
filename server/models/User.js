import mongoose from "mongoose";

// Define the User schema
const userSchema = new mongoose.Schema({
    // User's full name
    name: { type: String, required: true },

    // Email must be unique
    email: { type: String, required: true, unique: true },

    // Hashed password
    password: { type: String, required: true },

    // Role can be either "user" or "owner", default is "user"
    role: { type: String, enum: ["owner", "user"], default: 'user' },

    // Profile image URL
    image: { type: String, default: '' },
}, 
{
    timestamps: true  // Automatically adds createdAt and updatedAt
});

// Create the User model
const User = mongoose.model('User', userSchema);

export default User;
