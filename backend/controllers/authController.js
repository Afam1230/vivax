import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
import path from "path"
const __dirname = path.resolve();
dotenv.config(__dirname)
dotenv.config({path: '../.env'})

console.log("JWT_SECRT is:", process.env.JWT_SECRET ? "✔️ loaded" : "❌ missing in authController");


export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    // Include the full user object except password
    const userToSend = await User.findById(newUser._id).select("-password");


    return res.status(201).json({
      message: "User registered successfully!",
      user: userToSend,
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed!" });
  }
};




export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set in your environment");
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    // ✅ Fetch full user info (excluding password)
    const fullUser = await User.findById(user._id).select("-password");

    res.json({
      message: "Login successful!",
      token, // include token in response
      user: fullUser, // send complete user data
    });
  } catch (error) {
    console.error("🔥 Login error:", error);
    return res.status(500).json({ error: error.message });
  }
};


export const logout = (req, res) => {
  res.clearCookie("token");
  res.json({ message: "Logged out successfully!" });
};

export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};
