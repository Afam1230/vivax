import React, { useState } from "react";
import { ChakraProvider, Box, Button, Input, FormControl, FormLabel, VStack, Text, Image, useToast, Heading, Container, Spinner } from "@chakra-ui/react";
import axios from "axios";
import { Link } from "react-router-dom";

const LogisticsApp = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        description: "",
        pickupLocation: "",
        destination: "",
        packageImages: null,
    });
    const [trackingCode, setTrackingCode] = useState(null);
    const [loading, setLoading] = useState(false);
    const toast = useToast();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, packageImages: e.target.files });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all fields are filled
        if (Object.values(formData).some(value => value === "" || value === null)) {
            toast({ title: "Error", description: "All fields are required.", status: "error", duration: 5000, isClosable: true });
            return;
        }

        setLoading(true);
        const formDataToSend = new FormData();
        Object.keys(formData).forEach((key) => {
            if (key === "packageImages" && formData.packageImages) {
                Array.from(formData.packageImages).forEach(file => {
                    formDataToSend.append("packageImages", file);
                });
            } else {
                formDataToSend.append(key, formData[key]);
            }
        });

        try {
            const response = await axios.post("http://localhost:5000/submit-package", formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            setTrackingCode(response.data.trackingCode);
            toast({ title: "Package Submitted", description: "Check your email for confirmation", status: "success", duration: 5000, isClosable: true });
        } catch (error) {
            toast({ title: "Error", description: "Failed to submit package", status: "error", duration: 5000, isClosable: true });
            console.error(error)
        } finally {
            setLoading(false);
        }
    };

    return (
        <ChakraProvider>
            <Container maxW={{ base: "90%", md: "75%", lg: "50%" }} py={10}>
                <Box p={8} boxShadow="xl" borderRadius="lg" bg="white">
                    <VStack spacing={6} align="stretch">
                        <Heading size="xl" textAlign="center" color="blue.600">Book a Quote</Heading>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <Input name="name" onChange={handleChange} placeholder="Enter your full name" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Email</FormLabel>
                            <Input type="email" name="email" onChange={handleChange} placeholder="Enter your email" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Phone</FormLabel>
                            <Input name="phone" onChange={handleChange} placeholder="Enter your phone number" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Package Description</FormLabel>
                            <Input name="description" onChange={handleChange} placeholder="Enter your package description" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Pickup Location</FormLabel>
                            <Input name="pickupLocation" onChange={handleChange} placeholder="Enter pickup address" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Destination</FormLabel>
                            <Input name="destination" onChange={handleChange} placeholder="Enter delivery address" />
                        </FormControl>
                        <FormControl>
                            <FormLabel>Upload Package Images</FormLabel>
                            <Input type="file" multiple onChange={handleFileChange} />
                        </FormControl>
                        <Link to={'/thank-you'}>
                        <Button colorScheme="blue" width="full" onClick={handleSubmit} isDisabled={loading}>
                            {loading ? <Spinner size="sm" /> : "Submit Package"}
                        </Button>
                        </Link>
                        {trackingCode && (
                            <Text color="green.500" fontWeight="bold" textAlign="center">Tracking Code: {trackingCode}</Text>
                        )}
                    </VStack>
                </Box>
            </Container>
        </ChakraProvider>
    );
};

export default LogisticsApp;
