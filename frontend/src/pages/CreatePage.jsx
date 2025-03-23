import { useState } from "react";
import { Box, Button, Container, Heading, Input, Textarea, VStack, useToast } from "@chakra-ui/react";
import axios from "axios";

const CreateProduct = () => {
	const [product, setProduct] = useState({ name: "", price: "", description: "", image: null });
	const [uploading, setUploading] = useState(false);
	const toast = useToast();

	const handleChange = (e) => {
		const { name, value, type, files } = e.target;
		if (type === "file") {
			setProduct((prev) => ({ ...prev, image: files[0] }));
		} else {
			setProduct((prev) => ({ ...prev, [name]: value }));
		}
	};

	const handleSubmit = async () => {
		if (!product.name || !product.price || !product.description || !product.image) {
			toast({
				title: "Error",
				description: "All fields are required!",
				status: "error",
				isClosable: true,
			});
			return;
		}

		setUploading(true);
		const formData = new FormData();
		formData.append("name", product.name);
		formData.append("price", product.price);
		formData.append("description", product.description);
		formData.append("image", product.image);

		try {
			const res = await axios.post("http://localhost:5000/api/products", formData, {
				headers: { "Content-Type": "multipart/form-data" },
			});

			toast({
				title: "Success",
				description: "Product created successfully!",
				status: "success",
				isClosable: true,
			});

			setProduct({ name: "", price: "", description: "", image: null });
		} catch (error) {
			toast({
				title: "Error",
				description: "Failed to create product",
				status: "error",
				isClosable: true,
			});
		} finally {
			setUploading(false);
		}
	};

	return (
		<Container maxW="container.sm" mt={10}>
			<VStack spacing={6}>
				<Heading>Create New Product</Heading>
				<Box bg="gray.50" p={6} rounded="lg" shadow="md" w="full">
					<VStack spacing={4}>
						<Input placeholder="Product Name" name="name" value={product.name} onChange={handleChange} />
						<Input placeholder="Price" name="price" type="number" value={product.price} onChange={handleChange} />
						<Textarea placeholder="Description" name="description" value={product.description} onChange={handleChange} />
						<Input type="file" accept="image/*" onChange={handleChange} />

						<Button colorScheme="blue" onClick={handleSubmit} w="full" isLoading={uploading}>
							{uploading ? "Uploading..." : "Add Product"}
						</Button>
					</VStack>
				</Box>
			</VStack>
		</Container>
	);
};

export default CreateProduct;
