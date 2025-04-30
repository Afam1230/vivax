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


export const getUserStats = async (req, res) => {
  try {
    const {userId} = req.params; // assuming you're using auth middleware (JWT)
    console.log('userid', userId)
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.json({
      balance: user.balance,
      earnings: user.earnings,
      plans: user.plans,
    });
  } catch (error) {
    console.error("❌ Error fetching user stats:", error);
    return res.status(500).json({ message: "Server error." });
  }
};

export const getUsers = async (req, res) => {
	try {
		const users = await User.find({});
		res.status(200).json({ success: true, data: users });
	} catch (error) {
		console.log("error in fetching users:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
