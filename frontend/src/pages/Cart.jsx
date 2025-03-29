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


const Cart = () => {
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
        <Container  maxW="100%" py={8} mt={{lg:200, base:100}}>
            {/* Floating Cart Icon */}
            <IconButton
                icon={<FaShoppingCart size={30} />}
                aria-label="Open Cart"
                position="fixed"
                top={{ md: "150px", base: '100px', xl: '150px' }}
                right="20px"
                size="lg"
                colorScheme="orange"
                onClick={() => setCartOpen(true)}
            >
                {Object.keys(cart).length > 0 && (
                    <Badge colorScheme="blue" position="absolute" >
                        {Object.keys(cart).length}
                    </Badge>
                )}
            </IconButton>

            {/* Cart Drawer */}
            <Drawer isOpen={isCartOpen} placement="top" onClose={() => setCartOpen(false)}>
                <DrawerOverlay />
                <DrawerContent h={'70vh'}>
                    <DrawerHeader>
                        Cart Summary
                        <IconButton
                            icon={<CloseIcon />}
                            aria-label="Close Cart"
                            size="sm"
                            float="right"
                            onClick={() => setCartOpen(false)}
                        />
                    </DrawerHeader>
                    <DrawerBody >
                        {Object.keys(cart).length === 0 ? (
                            <Text>Your cart is empty.</Text>
                        ) : (
                            Object.values(cart).map((item) => (
                                <HStack key={item._id} justify="space-between" my={2}>
                                    <Image src={item.image} alt={item.name} boxSize="50px" />
                                    <VStack align="start">
                                        <Text fontSize="xl" fontWeight={'bold'}>{item.name}</Text>
                                        <Text fontSize="xl">${item.price} x {item.quantity}</Text>
                                    </VStack>
                                    <HStack>
                                        <IconButton
                                            icon={<MinusIcon />}
                                            aria-label="Remove Item"
                                            size="xs"
                                            onClick={() => removeFromCart(item._id)}
                                        />
                                        <IconButton
                                            icon={<AddIcon />}
                                            aria-label="Remove Item"
                                            size="xs"
                                            onClick={() => addFromCart(item._id)}
                                        />
                                    </HStack>
                                </HStack>
                            ))
                        )}
                    </DrawerBody>
                    <DrawerFooter>
                        <Text fontWeight="bold">Total: ${totalPrice}</Text>
                        <Button colorScheme="green" ml={4} onClick={handleCheckout}>
                            Checkout
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Container>

    )
}

export default Cart