import User from "../models/User.js";  // Adjust path if necessary
import cloudinary from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";
import mongoose from "mongoose";

// Cloudinary configuration
cloudinary.config({
  cloud_name: "du3mlusia",  // Use your Cloudinary cloud name
  api_key: "535363699268858",  // Your Cloudinary API key
  api_secret: "Jlvk-EcfyczVuAPPpMWRYERS7hQ",  // Your Cloudinary API secret
});

// Cloudinary storage configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    folder: "devaraj",  // Cloudinary folder name
    allowed_formats: ["jpg", "png", "jpeg"],  // Supported formats
  },
});
export const upload = multer({ storage });

// Create Deposit Controller
export const createDeposit = async (req, res) => {
  try {
    const { userId, coin, amount, planTitle, PurchaseCoin, equivalentAmount, price, currency, id, label, rate, reward, rewardPerDay, totalPeriod  } = req.body;
    const proofImage = req.file;

    if (!coin || !amount || !proofImage) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // The file will be automatically uploaded to Cloudinary via multer-storage-cloudinary
    const uploadedProof = proofImage.path;  // Cloudinary URL is available in 'path'

    // Get the user making the deposit (ensure you have user authentication)
      // Assuming you're using JWT auth
    const user = await User.findById(userId);

    // Create the transaction object based on the schema
    const newTransaction = {
      _id: new mongoose.Types.ObjectId(),  // Generate a new UUID or ObjectId for the transaction
      type: "deposit",  // This is a deposit transaction
      coin,
      PurchaseCoin,
      equivalentAmount,
      amount,
      date: new Date(),
      proofImage: uploadedProof,  // Store the URL of the uploaded proof image from Cloudinary
      status: "pending",  // Default status is 'pending'
      details: `Deposit for ${amount} ${coin}`,  // Description of the deposit
      Deposit: true,  // Mark this as a deposit
      planData: planTitle ? {id, label, price, rate, reward, rewardPerDay, totalPeriod, date: new Date(), purchaseDate: new Date()} : null,  // Include plan data if the deposit is for a plan
    };

    // Save the transaction under the user's transactions array
    user.transactions.push(newTransaction);
    await user.save();

    res.status(201).json({ message: "Deposit request submitted successfully." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};
