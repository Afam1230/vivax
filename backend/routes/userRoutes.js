import { getTodaysEarnings, getUserStats } from '../controllers/userController.js';
import express from "express";
const router = express.Router();
router.get('/earnings/today/:userId', getTodaysEarnings);
router.get("/stats/:userId", getUserStats);




  

export default router;