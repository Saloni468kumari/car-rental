import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },

    email: { type: String, required: true, unique: true },

    password: {
      type: String,
      required: function () {
        return this.provider === "local";
      },
    },

    // Google user ki unique ID
    googleId: {
      type: String,
      default: null,
    },

    // Kis provider se login hua
    provider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },

    role: {
      type: String,
      enum: ["owner", "user"],
      default: "user",
    },

    image: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;