// controllers/userController.js
import User from '../models/User.js';

export const getTodaysEarnings = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today

    let totalEarningsToday = 0;

    user.transactions.forEach(txn => {
      const txnDate = new Date(txn.date);
      if (
        txn.type === "daily-return" &&
        txnDate >= today
      ) {
        totalEarningsToday += txn.amount;
      }
    });

    res.status(200).json({ earningsToday: totalEarningsToday });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching today's earnings" });
  }
};
