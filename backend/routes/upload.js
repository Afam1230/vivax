import express from "express";
import upload from "../config/cloud.js"; // Import Multer config

const router = express.Router();

router.post("/", upload.single("image"), async (req, res) => {
	try {
		if (!req.file) {
			return res.status(400).json({ success: false, message: "No file uploaded" });
		}
		
		// Cloudinary URL is stored in req.file.path
		res.status(200).json({ success: true, imageUrl: req.file.path });
	} catch (error) {
		console.error("Image Upload Error:", error.message);
		res.status(500).json({ success: false, message: "Server error" });
	}
});

export default router;
