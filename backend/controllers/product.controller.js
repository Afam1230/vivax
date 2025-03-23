import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.log("error in fetching products:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createProduct = async (req, res) => {
	try {
		console.log("Received Data:", req.body); // Debugging
		console.log("Uploaded Image:", req.file); // Debugging
		console.log("Uploaded Image Object:", JSON.stringify(req.file, null, 2));

		const imageUrl = req.file.path || req.file.url || req.file.secure_url; // Cloudinary URL

		const newProduct = new Product({
			name: req.body.name,
			price: req.body.price,
			description: req.body.description,
			image: imageUrl, // Ensure it's a string
		  });
		await newProduct.save();

		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.error("Error creating product:", error);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};



export const updateProduct = async (req, res) => {
	const { id } = req.params;

	const product = req.body;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, { new: true });
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(404).json({ success: false, message: "Invalid Product Id" });
	}

	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Product deleted" });
	} catch (error) {
		console.log("error in deleting product:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
