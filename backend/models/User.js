import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  type: String, // "deposit", "withdrawal", "plan-purchase", "daily-return"
  coin: String,
  amount: Number,
  date: { type: Date, default: Date.now },
  details: String,
});

const planSchema = new mongoose.Schema({
  title: String,
  coin: String,
  price: Number,
  returnPerDay: Number,
  totalDays: Number,
  startDate: { type: Date, default: Date.now },
  endDate: Date,
});

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  balance: {
    usdt: { type: Number, default: 0 },
    btc: { type: Number, default: 0 },
    eth: { type: Number, default: 0 },
    // add more as needed
  },
  transactions: [transactionSchema],
  plans: [planSchema],
});

export default mongoose.model('User', userSchema);
