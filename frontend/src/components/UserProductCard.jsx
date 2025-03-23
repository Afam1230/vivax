
import {
    Box,
    Heading,
    HStack,
    Image,
    Text,
} from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";


const ProductCard = ({ product, index }) => {
    return (
        <Box
            shadow="md"
            //rounded="lg" //add curved edges
            overflow="hidden"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-3px)", shadow: "lg" }}
        >
            <Image
                src={product.image}
                alt={product.name}
                h={["20vh", "40vh",]} // Mobile: 200px, Desktop: 400px
                w="full"
                objectFit="cover"
            />
            <Box p={4}>
                <Heading size="sm" textAlign={'center'} >
                    {product.name}
                </Heading>
                <Text fontWeight="bold" fontSize="md" color="gray.600" textAlign={'center'}>
                    ${product.price}
                </Text>
                <HStack spacing={1}>
                </HStack>
            </Box>
        </Box>
    );
};
export default ProductCard;
