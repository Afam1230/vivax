import { Box, Container, SimpleGrid, Text, VStack, Heading, Button, Image, Flex, Select, Grid, GridItem, HStack } from "@chakra-ui/react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/AdminProductCard";

const ShopPage = () => {
    const { fetchProducts, products } = useProductStore();
    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return (
        <Container maxW="100vw" p={0}>
            {/* Hero Section */}
            <Box
				bgColor={"rgba(0,0,0,0.5)"}
                bgImage="url('photo1.jpg')"
                bgSize="cover"
                bgPosition="center"
                h="50vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
                textAlign="center"
                position="relative"
            >
				<Box position="absolute" top={0} left={0} w="full" h="full" bg="rgba(0,0,0,0.5)" />
                <VStack spacing={4} p={6} borderRadius="lg" position="relative" zIndex={1}>
                    <Heading color="white" fontSize="5xl" fontWeight="bold">Shop</Heading>
                    <Text color="white" fontSize="lg"><Link to="/">Home</Link> » Shop</Text>
                </VStack>
            </Box>

            {/* Sorting and Product Count */}
            <Flex justify="space-between" align="center" p={6}>
                <Text fontSize="lg" color="gray.600">Showing all {products.length} results</Text>
                <Select w="200px" placeholder="Default sorting">
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="newest">Newest Arrivals</option>
                </Select>
            </Flex>

            {/* Product Grid */}
            <SimpleGrid columns={{ base: 2, md: 3, lg: 3 }} spacing={8} px={6}>
                {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                ))}
            </SimpleGrid>

            <Container p={5}>

            </Container>
        </Container>
    );
};

export default ShopPage;