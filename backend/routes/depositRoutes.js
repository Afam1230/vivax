import express from "express";
import { createDeposit, upload } from "../controllers/depositController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", upload.single("proofImage"), createDeposit);

export default router;
