import { useEffect, useState } from "react";
import {
    Box,
    Button,
    Container,
    Heading,
    Image,
    SimpleGrid,
    Text,
    VStack,
    HStack,
    IconButton,
    Badge,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    DrawerFooter,
} from "@chakra-ui/react";
import { AddIcon, MinusIcon, CloseIcon } from "@chakra-ui/icons";
import { FaShoppingCart } from "react-icons/fa";

import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import { useCartStore } from "../store/cart"; // Assume you have a Zustand store for cart management
import { useNavigate } from "react-router-dom";
import Cart from "./Cart";

const ShopPage = () => {
    const { products, fetchProducts } = useProductStore();
    const { cart, addToCart, addFromCart, removeFromCart, updateQuantity, totalPrice } = useCartStore();
    const [isCartOpen, setCartOpen] = useState(false);
    const navigate = useNavigate();
    const isAuthenticated = localStorage.getItem("token"); // Check if user is logged in


    const handleCheckout = () => {
        if (!isAuthenticated) {
            localStorage.setItem("checkout_cart", JSON.stringify(cart)); // Save cart before login
            navigate("/login");  // Redirect to login
        } else {
            navigate("/checkout");  // Proceed to checkout
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Container maxW="100%" py={8} mt={{lg:200, base:100}}>
            <Heading size={{md:"xl", base:"lg"}}  textAlign="center" mb={6}>
                Shop Our Collection
            </Heading>

            {/* Product Grid */}
            <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={2}>
                {Array.isArray(products) ? (
                    products.map((product) => (
                        <Box key={product._id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                            <Link to={`/product/${product._id}`}>
                                <Image src={product.image} alt={product.name} h="200px" w="full" objectFit="cover" />
                                <VStack align="start" spacing={2} mt={3}>
                                    <Heading size="md">{product.name}</Heading>
                                    <Text fontSize="sm">{product.description}...</Text>
                                    <Text align={'center'} fontWeight="bold">${product.price}</Text>
                                </VStack>
                            </Link>

                            <Box mt={4} textAlign="center">
                                {/* If product is NOT in cart, show "Add to Cart" button */}
                                {!cart[product._id] || cart[product._id]?.quantity === 0 ? (
                                    <Button
                                        colorScheme="orange"
                                        size="sm"
                                        onClick={() => addToCart(product)}
                                    >
                                        Add to Cart
                                    </Button>
                                ) : (
                                    /* If product is in cart, show quantity controls */
                                    <HStack justify="center">
                                        <IconButton
                                            icon={<MinusIcon />}
                                            aria-label="Remove from Cart"
                                            size="sm"
                                            onClick={() => removeFromCart(product._id)}
                                        />
                                        <Text>{cart[product._id]?.quantity}</Text>
                                        <IconButton
                                            icon={<AddIcon />}
                                            aria-label="Add to Cart"
                                            size="sm"
                                            onClick={() => addToCart(product)}
                                        />
                                    </HStack>
                                )}
                            </Box>
                        </Box>

                    ))
                ) : (
                    <Text>Loading products...</Text>
                )}
            </SimpleGrid>
            <Cart/>
        </Container>
    );
};

export default ShopPage;
