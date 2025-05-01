import express from "express";
import { distributeDailyRewards } from "../cronJobs/distributeDailyRewards.js"; // adjust the path
import User from '../models/User.js';
import OperationSettings from '../models/OperationSettings.js'; // Assuming you have a model for settings

const router = express.Router();

// in your Express router
router.get("/run-daily-rewards", async (req, res) => {
    try {
      await distributeDailyRewards();
      res.status(200).send("Daily rewards distributed!");
    } catch (err) {
      res.status(500).send("Failed to distribute rewards.");
    }
  });

// GET /api/admin/stats
router.get('/stats', async (req, res) => {
    const totalUsers = await User.countDocuments();
    const allTransactions = await User.aggregate([
      { $unwind: "$transactions" },
      { $replaceRoot: { newRoot: "$transactions" } },
    ]);
    const successful = allTransactions.filter(t => t.status === "successful").length;
    const pending = allTransactions.filter(t => t.status === "pending").length;
  
    res.json({
      totalUsers,
      successful,
      pending,
      allTransactions: allTransactions.length
    });
  });

// GET /api/admin/users
router.get('/users', async (req, res) => {
    try {
      const users = await User.find({}, 'name email balance earnings'); // limit fields
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch users.' });
    }
  });

// GET /api/admin/users/:id
router.get('/users/:id', async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) return res.status(404).json({ message: 'User not found' });
      res.json(user);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching user' });
    }
  });

// PUT /api/admin/users/:id
router.put('/users/:id', async (req, res) => {
    const { balance, earnings, plans } = req.body;
  
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (!user) return res.status(404).json({ message: 'User not found' });
  
      // Update balances and earnings
      if (balance) user.balance = balance;
      if (earnings) user.earnings = earnings;
  
      // Update rewardPerDay in plans (BTC, ETH, USD)
      if (plans) {
        ['BTC', 'ETH', 'USD'].forEach((coin) => {
          if (plans[coin]) {
            plans[coin].forEach(updatedPlan => {
                console.log('updatedplan:', updatedPlan)
                const plan = user.plans[coin].find(p => p.id === updatedPlan.id);
                if (plan) {
                plan.rewardPerDay = updatedPlan.rewardPerDay;
              }
            });
          }
        });
      }
      
      await user.save();
      res.json({ message: 'User updated successfully' });
    } catch (err) {
      res.status(500).json({ message: 'Error updating user' });
    }
  });

// GET /api/admin/transactions
router.get('/transactions', async (req, res) => {
    try {
      const users = await User.find({});
      const transactions = [];
  
      users.forEach(user => {
        user.transactions.forEach(tx => {
          transactions.push({
            ...tx.toObject(),
            userId: user._id,
            userName: user.name,
            userEmail: user.email,
          });
        });
      });
  
      // Sort newest first
      transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
      res.json(transactions);
    } catch (err) {
      res.status(500).json({ message: 'Error fetching transactions' });
    }
  });


// POST /api/admin/confirm-transaction
// POST /api/admin/confirm-transaction
router.post('/confirm-transaction', async (req, res) => {
  const { userId, txId, status } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });

    const tx = user.transactions.find(t => t._id === txId);
    if (!tx) return res.status(404).json({ message: 'Transaction not found' });

    // Only update balance if confirming as "successful"
    if (status === "successful") {
      const coin = tx.coin.toLowerCase();
      const PurchaseCoin = tx.PurchaseCoin //uppercase for purchasecoin
      const amt = parseFloat(tx.amount);

      switch (tx.type) {
        case "withdrawal":
          if (user.balance[coin] < amt) {
            return res.status(400).json({ message: `Insufficient ${coin} balance to confirm withdrawal.` });
          }
          console.log('userbalance', user.balance[coin])
          console.log('withdraw amount', amt)
          user.balance[coin] -= amt;
          break;

        case "deposit":
          const PurchaseCoinl = tx.PurchaseCoin.toLowerCase() //lower case for balance
          user.balance[PurchaseCoinl] = (user.balance[PurchaseCoinl] || 0) + amt;
          break;

        case "plan-purchase":
          if (user.balance[coin] < amt) {
            return res.status(400).json({ message: `Insufficient ${coin} balance to confirm plan purchase.` });
          }
          user.balance[coin] -= amt;

          // Add plan to user's list of active plans (assuming a `plans` field)
          if (tx.planData) {
            user.plans = user.plans || [];
            user.plans.push({
              ...tx.planData,
              purchaseDate: new Date(),
              remainingDays: tx.planData.totalDays,
            });
          }
          break;

        default:
          return res.status(400).json({ message: "Invalid transaction type." });
      }
    }

    tx.status = status;
    await user.save();
    res.json({ message: 'Transaction updated successfully.' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update transaction.' });
  }
});

  

// GET /api/admin/users/:id/transactions
router.get('/users/:id/transactions', async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json(user.transactions);
});

// PUT /api/admin/transactions/:id/confirm
router.put('/transactions/:id/confirm', async (req, res) => {
  try {
    const txId = req.params.id;

    // Find the user who has this transaction
    const user = await User.findOne({ 'transactions._id': txId });
    if (!user) return res.status(404).json({ message: 'Transaction not found' });

    // Use Mongoose subdocument methods:
    const tx = user.transactions.id(txId);
    tx.status = 'successful';  // or req.body.status if you want dynamic

    await user.save();
    res.json({ message: 'Transaction confirmed', transaction: tx });
  } catch (err) {
    console.error('Error confirming transaction:', err);
    res.status(500).json({ message: 'Error confirming transaction' });
  }
});

// PUT /api/admin/transactions/:id/reject
router.put('/transactions/:id/reject', async (req, res) => {
  try {
    const txId = req.params.id;

    // Find the user who has this transaction
    const user = await User.findOne({ 'transactions._id': txId });
    if (!user) return res.status(404).json({ message: 'Transaction not found' });

    // Use Mongoose subdocument methods:
    const tx = user.transactions.id(txId);
    tx.status = 'unsuccessful';  // Set the status to 'unsuccessful'

    await user.save();
    res.json({ message: 'Transaction rejected', transaction: tx });
  } catch (err) {
    console.error('Error rejecting transaction:', err);
    res.status(500).json({ message: 'Error rejecting transaction' });
  }
});







// backend/routes/adminRoutes.js
// Fetch operation settings
router.get('/operation-settings', async (req, res) => {
  try {
    const settings = await OperationSettings.findOne();
    res.json(settings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching settings' });
  }
});

// Update operation settings
router.put('/operation-settings', async (req, res) => {
  const { exchangeRates, walletAddresses, transactionCharge, phone } = req.body;
  
  try {
    let settings = await OperationSettings.findOne();
    if (!settings) {
      settings = new OperationSettings();
    }
    settings.exchangeRates = exchangeRates;
    settings.walletAddresses = walletAddresses;
    settings.transactionCharge = transactionCharge;
    settings.phone = phone
    
    await settings.save();
    res.json({ message: 'Settings updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error updating settings' });
  }
});






  
  
  

export default router;