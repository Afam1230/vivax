// routes/miningPlanRoutes.js
import express from "express";
import MiningPlan from "../models/MiningPlan.js";
import { v4 as uuidv4 } from "uuid";
import { confirmPurchase } from "../controllers/transController.js"; // adjust path if needed

const router = express.Router();


// POST /api/transactions/confirm-purchase
router.post("/confirm-purchase", confirmPurchase);
export default router;
