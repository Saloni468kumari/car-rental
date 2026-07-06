import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Car from "../models/Car.js";
import { OAuth2Client } from "google-auth-library";

// Helper function to generate JWT token
const generateToken = (userId, role) => {
  return jwt.sign({ id: userId, role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// ------------------------
// REGISTER USER
// ------------------------
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password || password.length < 8) {
      return res.status(400).json({
        success: false,
        message: "Fill out all fields (password must be at least 8 characters)",
      });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      provider: "local",
    });

    const token = generateToken(user._id.toString(), user.role);

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ------------------------
// LOGIN USER
// ------------------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Prevent password login for Google users
    if (user.provider === "google") {
      return res.status(400).json({
        success: false,
        message: "Please login with Google",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(user._id.toString(), user.role);

    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ------------------------
// GOOGLE LOGIN
// ------------------------
export const googleLogin = async (req, res) => {
  console.log("Google Login API Hit");
  console.log(req.body);
  try {
    const { credential } = req.body;

    if (!credential) {
      return res.status(400).json({
        success: false,
        message: "Google credential is required",
      });
    }

    console.log("Google Login API Hit");
    console.log("Request Body:", req.body);

    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    console.log("Token Verified Successfully");

    const payload = ticket.getPayload();
    console.log("Payload:", payload);

    const email = payload.email;
    const name = payload.name;
    const picture = payload.picture;
    const googleId = payload.sub;

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        name,
        email,
        image: picture,
        googleId,
        provider: "google",
      });
    } else if (!user.googleId) {
      // Link existing account
      user.googleId = googleId;
      user.provider = "google";

      if (!user.image) {
        user.image = picture;
      }

      await user.save();
    }

    const token = generateToken(user._id.toString(), user.role);

    res.json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    console.error("Google Login Error:", error);

    res.status(500).json({
      success: false,
      message: "Google login failed",
    });
  }
};

// ------------------------
// GET USER DATA
// ------------------------
export const getUserData = async (req, res) => {
  try {
    const { user } = req;

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

// ------------------------
// GET ALL AVAILABLE CARS
// ------------------------
export const getCars = async (req, res) => {
  try {
    const cars = await Car.find({
      isAvailable: true,
    });

    res.json({
      success: true,
      cars,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
