
import React from 'react'
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

const Cart = () => {
    const { products, fetchProducts } = useProductStore();
    const { cart, addToCart, addFromCart, removeFromCart, updateQuantity, totalPrice } = useCartStore();
    const [isCartOpen, setCartOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <Box>
            {/* Floating Cart Icon */}
            <IconButton
                icon={<FaShoppingCart size={30} />}
                aria-label="Open Cart"
                position="fixed"
                bottom={{ md: "1500px", base: '85vh' }}
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
                <DrawerContent>
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
                    <DrawerBody>
                        {Object.keys(cart).length === 0 ? (
                            <Text>Your cart is empty.</Text>
                        ) : (
                            Object.values(cart).map((item) => (
                                <HStack key={item._id} justify="space-between" my={2}>
                                    <Image src={item.image} alt={item.name} boxSize="50px" />
                                    <VStack align="start">
                                        <Text fontSize="sm">{item.name}</Text>
                                        <Text fontSize="sm">${item.price} x {item.quantity}</Text>
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
                        <Button colorScheme="green" ml={4}>
                            Checkout
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>

        </Box>
    )
}

export default Cart