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

  console.log('userid', userId);
  
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const coin = transaction.coin.toLowerCase();
    const amount = transaction.amount;

    // Check if user has sufficient balance for the requested withdrawal
    if (coin === "usd" && user.balance[coin] < amount) {
      return res.status(400).json({ message: "Insufficient USD balance" });
    } else if (coin !== "usd" && user.balance[coin] < amount) {
      return res.status(400).json({ message: `Insufficient ${coin.toUpperCase()} balance` });
    }

    // Different handling for crypto vs. bank wire withdrawals
    if (transaction.details.accountNumber) {
      // Bank Wire Withdrawal
      console.log('Processing bank wire withdrawal');

      // Example: Deduct fee for bank wire transactions (you can adjust the fee calculation)
      const fee = amount * 0.05;  // Example 5% fee
      const netAmount = amount - fee;

      // Add the transaction for the bank wire
      const bankTransaction = {
        ...transaction,
         amount: netAmount,
         fee,
         status: "pending",  // Mark as pending until admin approval
      };

      // Push bank transaction to user's transaction history
      user.transactions.push(transaction);
      console.log('banking succesful')
    } else {
      // Crypto Withdrawal
      console.log('Processing crypto withdrawal');

      // No fee for crypto withdrawals (can be added if needed)
      const fee = 0;
      const netAmount = amount - fee;

      // Add the transaction for the crypto withdrawal
      const cryptoTransaction = {
        ...transaction,
         amount: netAmount,
        fee,
         status: "pending",  // Mark as pending until admin approval
      };

      // Push crypto transaction to user's transaction history
      user.transactions.push(transaction);
    }
    // Save the user with the updated balance and transaction history
    await user.save();

    // Return a success response
    res.status(200).json({ message: "Withdrawal request created" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err });
  }
});




export default router;
