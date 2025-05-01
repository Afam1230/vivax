import { getTodaysEarnings, getUserStats } from '../controllers/userController.js';
import express from "express";
import User from "../models/User.js"; // adjust path if needed

const router = express.Router();
router.get('/earnings/today/:userId', getTodaysEarnings);
router.get("/stats/:userId", getUserStats);

// routes/t
router.get("/transactions/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user.transactions);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
