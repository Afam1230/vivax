// models/MiningPlan.js
import mongoose from 'mongoose';

export const planSchema = new mongoose.Schema({
  id: { type: String, required: true},
  label: String,
  price: Number,
  rate: String,
  reward: Number,
  rewardPerDay: Number,
  totalPeriod:Number
});

export const UPlanSchema = new mongoose.Schema({
  id: { type: String, required: true },
  label: { type: String, required: true },
  price: { type: Number, default: 0 },
  rate: { type: String, default: "" },
  reward: { type: Number, default: 0 },
  rewardPerDay: { type: Number, default: 0 },
  totalPeriod: { type: Number, default: 0 },
  purchaseDate: { type: Date, default: Date.now }
}, { _id: false });

export const miningPlansSchema = new mongoose.Schema({
  BTC: [planSchema],
  ETH: [planSchema],
  USD: [planSchema],
}, { timestamps: true });

export default mongoose.model('MiningPlan', miningPlansSchema);
