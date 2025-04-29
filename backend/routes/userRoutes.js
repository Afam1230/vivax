import { getTodaysEarnings, getUserStats } from '../controllers/userController.js';
import express from "express";
import { distributeDailyRewards } from "../cronJobs/distributeDailyRewards.js"; // adjust the path

import MiningPlan from "../models/MiningPlan.js";

const router = express.Router();
router.get('/earnings/today/:userId', getTodaysEarnings);
router.get("/stats/:userId", getUserStats);
// in your Express router
router.get("/run-daily-rewards", async (req, res) => {
    try {
      await distributeDailyRewards();
      res.status(200).send("Daily rewards distributed!");
    } catch (err) {
      res.status(500).send("Failed to distribute rewards.");
    }
  });
  

export default router;