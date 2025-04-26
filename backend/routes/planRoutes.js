// routes/miningPlanRoutes.js
import express from "express";
import MiningPlan from "../models/MiningPlan.js";
import { v4 as uuidv4 } from "uuid";
import { confirmPurchase } from "../controllers/transController.js"; // adjust path if needed

const router = express.Router();


// POST /api/transactions/confirm-purchase
router.post("/confirm-purchase", confirmPurchase);

// Ensure there is at least one mining plan document in the DB
const getOrCreateMiningPlans = async () => {
  let plans = await MiningPlan.findOne();
  if (!plans) {
    plans = await MiningPlan.create({ BTC: [], ETH: [], USD: [] });
  }
  return plans;
};

// Create a new plan for a coin type (BTC, ETH, USD)
router.post("/:type", async (req, res) => {
  const { type } = req.params;
  const newPlan = req.body;

  if (!["BTC", "ETH", "USD"].includes(type)) {
    return res.status(400).json({ message: "Invalid coin type" });
  }

  try {
    const existing = await MiningPlan.findOne();

    const planWithId = { ...newPlan, id: uuidv4() };

    if (existing) {
      existing[type].push(planWithId);
      await existing.save();
      return res.status(201).json(planWithId);
    } else {
      // First time creating plans document
      const newDoc = new MiningPlan({
        BTC: type === "BTC" ? [planWithId] : [],
        ETH: type === "ETH" ? [planWithId] : [],
        USD: type === "USD" ? [planWithId] : [],
      });
      await newDoc.save();
      return res.status(201).json(planWithId);
    }
  } catch (err) {
    res.status(500).json({ message: "Error creating plan", error: err.message });
  }
});


// GET all plans
router.get("/", async (req, res) => {
  try {
    const plans = await getOrCreateMiningPlans();
    res.json(plans);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const miningPlans = await MiningPlan.findOne(); // Assuming only one MiningPlan document exists

    if (!miningPlans) {
      return res.status(404).json({ message: "No mining plans found" });
    }

    // Search in BTC, ETH, USD
    const allPlans = [
      ...miningPlans.BTC,
      ...miningPlans.ETH,
      ...miningPlans.USD,
    ];

    const plan = allPlans.find((p) => p.id === id);

    if (!plan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.json(plan);

  } catch (error) {
    console.error("Error fetching plan:", error);
    res.status(500).json({ message: "Server Error" });
  }
});


// POST new plan to a specific coin
router.post("/:type", async (req, res) => {
  try {
    const { type } = req.params;
    const newPlan = { id: uuidv4(), ...req.body };

    const plans = await getOrCreateMiningPlans();
    plans[type].push(newPlan);
    await plans.save();

    res.status(201).json(newPlan);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// PUT update a plan in a specific coin
router.put("/:type/:id", async (req, res) => {
  try {
    const { type, id } = req.params;
    const plans = await getOrCreateMiningPlans();

    const index = plans[type].findIndex((plan) => plan.id === id);
    if (index === -1) {
      return res.status(404).json({ error: "Plan not found" });
    }

    plans[type][index] = { ...plans[type][index], ...req.body };
    await plans.save();

    res.json(plans[type][index]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// DELETE a plan in a specific coin
router.delete("/:type/:id", async (req, res) => {
  try {
    const { type, id } = req.params;
    const plans = await getOrCreateMiningPlans();

    plans[type] = plans[type].filter((plan) => plan.id !== id);
    await plans.save();

    res.json({ message: "Plan deleted" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router;
