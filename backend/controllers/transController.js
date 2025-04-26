import User from '../models/User.js';
import { v4 as uuidv4 } from 'uuid';


export const createTransaction = async (req, res) => {
    const { userId, type, coin, amount, details, proofImage, Deposit = true, planData = null } = req.body;

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
                };


                // Before pushing the plan after transaction success
                if (!user.plans) {
                    user.plans = {
                        BTC: [],
                        ETH: [],
                        USD: [],
                    };
                }

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
  const { userId, coin, amount, details, Deposit = false, planData = null } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const transaction = {
      _id: uuidv4(),
      type: "plan-purchase",
      coin,
      amount,
      date: new Date(),
      details,
      proofImage: null,
      status: "successful", // Corrected spelling (was "successfull")
      Deposit,
      planData,
    };

    // Validate coin
    const coinKey = coin.toUpperCase();
    const validCoins = ["BTC", "ETH", "USD"];
    if (!validCoins.includes(coinKey)) {
      return res.status(400).json({ message: "Invalid coin type" });
    }
    console.log('amount', amount)
    console.log('userbalance', user.balance[coinKey.toLowerCase()] )
    console.log('user dollar balance:', user.balance["usd"])
    console.log('payload', req.body);
    console.log('user', user);
    console.log('transaction', user.transactions);




    // Deduct user balance
    if (!user.balance[coinKey.toLowerCase()] || user.balance[coinKey.toLowerCase()] < amount) {
      return res.status(400).json({ message: "Insufficient balance" });
    }
    user.balance[coinKey.toLowerCase()] -= amount;

    // Push transaction
    if (!user.transactions) {
      user.transactions = []; // initialize if undefined
    }
    user.transactions.push(transaction);

    // Prepare plan object
    const planToAdd = {
      id: planData?.id || uuidv4(),
      label: planData?.label || "Purchased Plan",
      price: planData?.price || 0,
      rate: planData?.rate || "",
      reward: planData?.reward || 0,
      rewardPerDay: planData?.rewardPerDay || 0,
      totalPeriod: planData?.totalPeriod || 0,
      purchaseDate: new Date(), // 📌 Add purchaseDate here
    };

    // Initialize plans structure if not exist
    if (!user.plans) {
      user.plans = { BTC: [], ETH: [], USD: [] };
    }

    user.plans[coinKey].push(planToAdd);

    // Save everything at once
    await user.save();

    // Respond after successful save
    res.status(200).json({ message: "Transaction recorded", transaction });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating transaction" });
  }
};
