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

export const miningPlansSchema = new mongoose.Schema({
  BTC: [planSchema],
  ETH: [planSchema],
  USD: [planSchema],
}, { timestamps: true });

export default mongoose.model('MiningPlan', miningPlansSchema);
