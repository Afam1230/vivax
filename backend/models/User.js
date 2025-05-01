import mongoose from 'mongoose';
import { UPlanSchema } from './MiningPlan.js'; // ⬅️ import it!
const transactionSchema = new mongoose.Schema({
  _id: String, // UUID for transaction ID
  type: String, // "deposit", "withdrawal", "plan-purchase", "daily-return"
  coin: String, // "btc", "eth", "usdt"
  PurchaseCoin: String, // "btc", "eth", "usdt"
  equivalentAmount: String, // "btc", "eth", "usdt"
  amount: Number,
  date: { type: Date, default: Date.now },
  details: String,
  proofImage: { type: String, default: null }, // URL for proof of transfer
  status: { type: String, enum: ["pending", "successful", "unsuccessful"], default: "pending" },
  Deposit: { type: Boolean, default: true },
  planData: { type: Object },
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
  transactions: { type: [transactionSchema], default: [] },
  plans: {
    BTC: { type: [UPlanSchema], default: [] },
    ETH: { type: [UPlanSchema], default: [] },
    USD: { type: [UPlanSchema], default: [] }
  },
  earnings: {
    BTC: { type: Number, default: 0 },
    ETH: { type: Number, default: 0 },
    USD: { type: Number, default: 0 },
  },
  lastRewardDate: { type: Date, default: null }
});

export default mongoose.model('User', userSchema);
