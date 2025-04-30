// routes/miningPlanRoutes.js
import express from "express";
// POST /api/withdraw
import User from '../models/User.js';
import { confirmPurchase } from "../controllers/transController.js"; // adjust path if needed

const router = express.Router();


// POST /api/transactions/confirm-purchase
router.post("/confirm-purchase", confirmPurchase);

router.post("/withdraw", async (req, res) => {
  const { userId, transaction } = req.body;
  console.log('userid', userId)
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const coin = transaction.coin.toLowerCase();
    if (user.balance[coin] < transaction.amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Deduct immediately
    //user.balance[coin] -= transaction.amount;
    user.transactions.push(transaction);
    await user.save();

    res.status(200).json({ message: "Withdrawal request created" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});



export default router;
