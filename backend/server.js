import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from 'cors'
import nodemailer from "nodemailer"
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import miningPlanRoutes from "./routes/planRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import depositRoutes from "./routes/depositRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
// server.js or index.js
import "./cronJobs/rewardCron.js"; 
import { startDailyRewardJob } from "./cronJobs/cronJob.js"; // adjust path






dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(express.json());
app.use(express.static(__dirname))
app.use(
  cors({
    origin: "http://localhost:5173", // frontend URL
    credentials: true,               // allow cookies/headers
  })
);

app.use(cookieParser());
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/plans", miningPlanRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/deposit", depositRoutes)
app.use("/api/user", userRoutes )
app.use("/api/admin",adminRoutes  )

// server.js (Express backend example)
app.get('/api/news', async (req, res) => {
	const response = await fetch('https://api.coinstats.app/public/v1/news?skip=0&limit=12');
	const data = await response.json();
	res.json(data);
  });


  

// if (process.env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "/frontend/dist")));
// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
// 	});
// }



app.post("/api/book", async (req, res) => {
	const { name, email, phone, message, dob, timeOfBirth } = req.body;
  
	// Email Format
	const mailOptions = {
	  from: process.env.EMAIL || "afamabuo@gmail.com",
	  to: process.env.RECIPIENT_EMAIL || "afamjamb@gmail.com",
	  subject: "🔥 New Booking Request | Devarishi Das Asamoah 🔥",
	  text: `Hello Devarishi,  
	
  You have a new booking request!  
	
  👤 Name: ${name}  
  📧 Email: ${email}  
  📞 Phone: ${phone}  
  📅 Date of Birth: ${dob || "Not provided"}  
  ⏰ Time of Birth: ${timeOfBirth || "Not provided"}  
  📝 Message: ${message}  
	
  Please follow up with this client.  
	
  🔮 Regards,  
  Booking System`,
	};
  
	try {
	  const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
		  user: process.env.EMAIL || "afamabuo@gmail.com",
		  pass: process.env.EMAIL_PASSWORD || "dris wgng afcv hrmg", // Use App Password
		},
	  });
  
	  await transporter.sendMail(mailOptions);
	  res.status(200).json({ message: "Booking request sent!" });
	} catch (error) {
	  console.error("Email sending error:", error);
	  res.status(500).json({ message: "Failed to send email", error });
	}
  });
  

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});
