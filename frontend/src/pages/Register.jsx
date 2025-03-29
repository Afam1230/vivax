import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, Link } from "react-router-dom";
import {
    Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text,
    useToast, Card, CardBody
} from "@chakra-ui/react";

const Register = () => {
    const { register } = useAuthStore();
    const navigate = useNavigate();
    const toast = useToast();

    const [form, setForm] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            toast({
                title: "Passwords do not match.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        try {
            await register(form.fullName, form.email, form.password);
            toast({
                title: "Registration successful!",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
            navigate("/login");
        } catch (error) {
            toast({
                title: "Registration failed.",
                description: "Please check your details and try again.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
            <Card w={{ base: "90%", md: "400px" }} p={6} shadow="lg">
                <CardBody>
                    <Heading size="lg" textAlign="center" mb={4}>Create an Account</Heading>
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Full Name</FormLabel>
                                <Input
                                    type="text"
                                    name="fullName"
                                    value={form.fullName}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="Enter a password"
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Confirm Password</FormLabel>
                                <Input
                                    type="password"
                                    name="confirmPassword"
                                    value={form.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Confirm your password"
                                />
                            </FormControl>

                            <Button type="submit" colorScheme="blue" w="full">Register</Button>

                            <Text fontSize="sm">
                                Already have an account? <Link to="/login" style={{ color: "blue" }}>Login</Link>
                            </Text>
                        </VStack>
                    </form>
                </CardBody>
            </Card>
        </Box>
    );
};

export default Register;
