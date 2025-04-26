// backend/controllers/planController.js
import Plan from "../models/Plan.js";

export const getAllPlans = async (req, res) => {
  try {
    const plans = await Plan.find();
    const grouped = plans.reduce((acc, plan) => {
      acc[plan.type] = acc[plan.type] || [];
      acc[plan.type].push(plan);
      return acc;
    }, {});
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch plans" });
  }
};

export const updatePlanById = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Plan.findByIdAndUpdate(id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update plan" });
  }
};

export const createInitialPlans = async (req, res) => {
  const defaultPlans = {
    BTC: [
      { id: "btc1", label: "12-Month Plan", price: 35.2, rate: "1 TH/s", reward: 22.39 },
      { id: "btc2", label: "6-Month Plan", price: 18.0, rate: "0.5 TH/s", reward: 10.25 },
      { id: "btc3", label: "3-Month Plan", price: 9.5, rate: "0.25 TH/s", reward: 5.12 },
    ],
    ETH: [
      { id: "eth1", label: "12-Month Plan", price: 25.5, rate: "2 MH/s", reward: 15.3 },
      { id: "eth2", label: "6-Month Plan", price: 13.2, rate: "1 MH/s", reward: 7.85 },
      { id: "eth3", label: "3-Month Plan", price: 6.8, rate: "0.5 MH/s", reward: 3.9 },
    ],
    USD: [
      { id: "usd1", label: "12-Month Plan", price: 30.0, rate: "$10/day", reward: 18.0 },
      { id: "usd2", label: "6-Month Plan", price: 15.5, rate: "$5/day", reward: 9.2 },
      { id: "usd3", label: "3-Month Plan", price: 7.5, rate: "$2.5/day", reward: 4.6 },
    ],
  };

  try {
    const allPlans = [];
    Object.keys(defaultPlans).forEach((type) => {
      defaultPlans[type].forEach((plan) => {
        allPlans.push({ ...plan, type });
      });
    });

    await Plan.insertMany(allPlans);
    res.json({ message: "Plans seeded successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to seed plans" });
  }
};