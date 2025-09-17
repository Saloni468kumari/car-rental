import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to protect routes and authorize users using JWT
export const protect = async (req, res, next) => {
    // Extract token from Authorization header
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: "Not authorized - no token provided" 
        });
    }

    try {
        // Remove "Bearer " prefix if present
        const actualToken = token.startsWith("Bearer ") ? token.split(" ")[1] : token;

        // Verify JWT token
        const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);

        // Fetch the user from DB and exclude the password
        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: "Not authorized - user not found" 
            });
        }

        // Attach user to request object for further use in controllers
        req.user = user;

        // Pass control to the next middleware/controller
        next();
    } catch (error) {
        console.error(error.message);
        return res.status(401).json({ 
            success: false, 
            message: "Not authorized - token invalid" 
        });
    }
};
