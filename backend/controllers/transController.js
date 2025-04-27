import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';


export const createTransaction = async (req, res) => {
    const { userId, type, coin, amount, details, proofImage, Deposit = true, planData  } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const transaction = {
            _id: uuidv4(),
            type,
            coin,
            amount,
            date: new Date(),
            details,
            proofImage: proofImage || null,
            status: "pending",
            Deposit,
            planData, // store full planData temporarily here if needed
        };

        user.transactions.push(transaction);
        await user.save();

        res.status(200).json({ message: "Transaction recorded", transaction });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error creating transaction" });
    }
};

export const confirmTransaction = async (req, res) => {
    const { userId, transactionId, status } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        const transaction = user.transactions.find(txn => txn._id === transactionId);
        if (!transaction) return res.status(404).json({ message: "Transaction not found" });

        transaction.status = status;

        // If successful and type is "plan-purchase"
        if (status === "successful" && transaction.type === "plan-purchase") {

            // Deduct balance if user paid by deposit
            if (transaction.Deposit) {
                user.balance[transaction.coin.toLowerCase()] -= transaction.amount;
            }

            // Push the plan into user's plans if planData exists
            if (transaction.planData) {
                const planToAdd = {
                    id: transaction.planData.id || uuidv4(), // generate if not present
                    label: transaction.planData.label || "Purchased Plan",
                    price: transaction.planData.price,
                    rate: transaction.planData.rate || "",
                    reward: transaction.planData.reward || 0,
                    rewardPerDay: transaction.planData.rewardPerDay || 0,
                    totalPeriod: transaction.planData.totalPeriod || 0
                };


                // Before pushing the plan after transaction success
                    user.plans = {
                        BTC: [],
                        ETH: [],
                        USD: [],
                    };
                

                const coinKey = transaction.coin.toUpperCase(); // "BTC", "ETH", "USD"
                if (user.plans[coinKey]) {
                    user.plans[coinKey].push(planToAdd);
                } else {
                    return res.status(400).json({ message: "Invalid coin type specified for plan" });
                }

            }
        }

        await user.save();
        res.status(200).json({ message: "Transaction updated successfully", transaction });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating transaction" });
    }
};



export const confirmPurchase = async (req, res) => {
  const { userId, coin, amount, details, Deposit = false, planData } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const coinKey = coin?.toUpperCase();
    const validCoins = ["BTC", "ETH", "USD"];

    // Validate coin type
    if (!coinKey || !validCoins.includes(coinKey)) {
      return res.status(400).json({ message: "Invalid coin type" });
    }

    const coinBalance = user.balance[coinKey.toLowerCase()] || 0;

    // Check user balance
    if (coinBalance < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    // Deduct balance
    user.balance[coinKey.toLowerCase()] = coinBalance - amount;

    // Ensure transactions array exists
    if (!Array.isArray(user.transactions)) {
      user.transactions = [];
    }

    // Create new transaction
    const transaction = {
      _id: uuidv4(),
      type: "plan-purchase",
      coin: coinKey.toLowerCase(),
      amount,
      date: new Date(),
      details,
      proofImage: null,
      status: "successful",
      Deposit,
      planData,
    };

    user.transactions.push(transaction);

    // Ensure plans structure exists properly
    if (typeof user.plans !== 'object' || Array.isArray(user.plans)) {
      user.plans = { BTC: [], ETH: [], USD: [] };
    }
    if (!Array.isArray(user.plans[coinKey])) {
      user.plans[coinKey] = [];
    }

    // Prepare purchased plan data
    const purchasedPlan = {
      id: planData?.id || uuidv4(),
      label: planData?.label || "Purchased Plan",
      price: planData?.price || 0,
      rate: planData?.rate || "",
      reward: planData?.reward || 0,
      rewardPerDay: planData?.rewardPerDay || 0,
      totalPeriod: planData?.totalPeriod || 0,
      date: new Date(),
    };
    
    user.plans[coinKey] ??= []; // ensure it’s an array
    user.plans[coinKey].push(purchasedPlan);
    console.log(user.plans)
    // Save updated user
    await user.save();

    return res.status(200).json({ message: "Transaction recorded", transaction });

  } catch (error) {
    console.error('Error confirming purchase:', error);
    return res.status(500).json({ message: "Error creating transaction" });
  }
};

