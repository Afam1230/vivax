import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useCartStore } from "../store/cart";
import { useNavigate, Link } from "react-router-dom";
import {
    Box, Button, FormControl, FormLabel, Input, VStack, Heading, Text,
    useToast, Card, CardBody
} from "@chakra-ui/react";

const Login = () => {
    const { login } = useAuthStore();
    const { setCart } = useCartStore();
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const toast = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Mock API request
            const token = "mock_jwt_token";
            localStorage.setItem("token", token);

            // Restore cart after login
            const savedCart = JSON.parse(localStorage.getItem("checkout_cart"));
            if (savedCart) {
                setCart(savedCart);
                localStorage.removeItem("checkout_cart");
            }

            await login(email, password);
            toast({
                title: "Login successful!",
                status: "success",
                duration: 2000,
                isClosable: true,
            });

            navigate("/checkout");
        } catch (error) {
            toast({
                title: "Login failed.",
                description: "Invalid email or password.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            console.log(error)
        }
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
            <Card w={{ base: "90%", md: "400px" }} p={6} shadow="lg">
                <CardBody>
                    <Heading size="lg" textAlign="center" mb={4}>Login</Heading>
                    <form onSubmit={handleSubmit}>
                        <VStack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                />
                            </FormControl>

                            <Button type="submit" colorScheme="blue" w="full">Login</Button>

                            <Text fontSize="sm">
                                Don't have an account? <Link to="/register" style={{ color: "blue" }}>Sign Up</Link>
                            </Text>

                            <Text fontSize="sm">
                                <Link to="/forgot-password" style={{ color: "blue" }}>Forgot Password?</Link>
                            </Text>
                        </VStack>
                    </form>
                </CardBody>
            </Card>
        </Box>
    );
};

export default Login;
