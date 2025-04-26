import mongoose from 'mongoose';
import { miningPlansSchema } from './MiningPlan.js'; // ⬅️ import it!
const transactionSchema = new mongoose.Schema({
  _id: String, // UUID for transaction ID
  type: String, // "deposit", "withdrawal", "plan-purchase", "daily-return"
  coin: String, // "btc", "eth", "usdt"
  amount: Number,
  date: { type: Date, default: Date.now },
  details: String,
  proofImage: { type: String, default: null }, // URL for proof of transfer
  status: { type: String, enum: ["pending", "successful", "unsuccessful"], default: "pending" },
  fromDeposit: { type: Boolean, default: false }, // important for your deposit logic
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  balance: {
    usd: { type: Number, default: 0 },
    btc: { type: Number, default: 0 },
    eth: { type: Number, default: 0 },
    // add more as needed
  },
  transactions: [transactionSchema],
  plans: [miningPlansSchema],
  earnings: []
});

export default mongoose.model('User', userSchema);
