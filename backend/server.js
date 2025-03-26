import express from "express";
import dotenv from "dotenv";
import path from "path";
import cors from 'cors'
import nodemailer from "nodemailer"
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/product.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();
app.use(express.json()); // allows us to accept JSON data in the req.body
app.use(express.static(__dirname))
app.use(cors())
app.use("/api/products", productRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

app.post("/api/book", async (req, res) => {
	const { name, email, phone, message } = req.body;
  
	// Email Format
	const mailOptions = {
	  from: process.env.EMAIL|| "afamabuo@gmail.com",
	  to: process.env.RECIPIENT_EMAIL || "afamjamb@gmail.com",
	  subject: "🔥 New Booking Request | Devarishi Das Asamoah 🔥",
	  text: `Hello Devarishi,  
  
  You have a new booking request!  
  
  👤 Name: ${name}  
  📧 Email: ${email}  
  📞 Phone: ${phone}  
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
		  pass: process.env.EMAIL_PASSWORD || "dris wgng afcv hrmg"
		},
	  });
  
	  await transporter.sendMail(mailOptions);
	  res.status(200).json({ message: "Booking request sent!" });
	} catch (error) {
	  res.status(500).json({ message: "Failed to send email", error });
	}
  });
  

app.listen(PORT, () => {
	connectDB();
	console.log("Server started at http://localhost:" + PORT);
});
