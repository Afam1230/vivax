import { unlink } from "fs";
import mongoose from "mongoose";
const uri = "mongodb+srv://jagannathonwuegbuzie:BUBBLECARSPSC2105517@cluster0.zp0yb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

export const connectDB = async () => {
	try {
		const conn = await mongoose.connect(uri);
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(`Error: ${error.message}`);
		process.exit(1); // process code 1 code means exit with failure, 0 means success
	}
};
