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

const ShopPage = () => {
    const { products, fetchProducts } = useProductStore();
    const { cart, addToCart, addFromCart, removeFromCart, updateQuantity, totalPrice } = useCartStore();
    const [isCartOpen, setCartOpen] = useState(false);

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <Container maxW="90%" py={8} mt={200}>
            <Heading size="xl" textAlign="center" mb={6}>
                Shop Our Collection
            </Heading>

            {/* Product Grid */}
            <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={6}>
                {Array.isArray(products) ? (
                    products.map((product) => (
                        <Box key={product._id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                            <Link to={`/product/${product._id}`}>
                                <Image src={product.image} alt={product.name} h="200px" w="full" objectFit="cover" />
                                <VStack align="start" spacing={2} mt={3}>
                                    <Heading size="md">{product.name}</Heading>
                                    <Text fontSize="sm">{product.description.substring(0, 50)}...</Text>
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
        </Container>
    );
};

export default ShopPage;
