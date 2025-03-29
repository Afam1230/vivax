import React from "react";
import { useCartStore } from "../store/cart";
import { Box, Button, Text, VStack, HStack, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const { cart, totalPrice } = useCartStore();
    const navigate = useNavigate();

    const handlePayment = () => {
        console.log(cart)
        navigate("/payment"); // Navigate to payment page
    };

    return (
        <Box p={5} mt={{base:20, md:40}}>
            <Text fontSize="2xl" fontWeight="bold" p={10}>Checkout</Text>
            {Object.keys(cart).length === 0 ? (
                <Text>Your cart is empty.</Text>
            ) : (
                <VStack spacing={4} align="start">
                    {Object.values(cart).map((item) => (
                        <HStack key={item._id} justify="space-between" w="full">
                            <Image src={item.image} alt={item.name} boxSize={{base:"70px", md:"200px"}} />
                            <Text fontSize={{base:"xl", md:"xx-large"}}>QTY <b>{item.quantity}</b></Text>
                            <Text fontSize={{base:"xl", md:"xx-large"}} >{item.name} - <b>${item.price}</b></Text>
                        </HStack>
                    ))}
                    <Text fontWeight="bold" fontSize={{base:"xl", md:"xx-large"}} py={{base:10, md:20}}>Total: ${totalPrice}</Text>
                    <Button colorScheme="green" size={'lg'} onClick={handlePayment}>Proceed to Payment - ${totalPrice}</Button>
                </VStack>
            )}
        </Box>
    );
};

export default Checkout;
