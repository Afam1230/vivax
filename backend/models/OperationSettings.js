// backend/models/OperationSettings.js
import mongoose from "mongoose";

const operationSettingsSchema = new mongoose.Schema({
  exchangeRates: {
    BTC: { type: Number, required: true },
    ETH: { type: Number, required: true },
    USD: { type: Number, required: true },
  },
  walletAddresses: {
    BTC: { type: String, required: true },
    ETH: { type: String, required: true },
    USD: { type: String, required: true },
  },
  transactionCharge: { type: Number, required: true },
  phone: {type: String, required: true},
});

export default mongoose.model('OperationSettings', operationSettingsSchema);
