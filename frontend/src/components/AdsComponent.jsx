import { useState, useEffect } from "react";
import { Box, Heading, Image, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useProductStore } from "../store/product"; // Ensure correct import

const MotionBox = motion(Box);
const MotionImage = motion(Image);

const AdsComponent = () => {
  const navigate = useNavigate();
  const { products, fetchProducts } = useProductStore();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  // Ensure we have products before proceeding
  const validProducts = products.filter((p) => p.image);
  const productCount = validProducts.length;

  // Cycle through products every 4 seconds
  useEffect(() => {
    if (productCount === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % productCount);
    }, 4000);
    return () => clearInterval(interval);
  }, [productCount]);

  const currentProduct = validProducts[currentIndex];

  return (
    <Box display="flex" flexDirection="column-reverse" alignItems="center" gap={8} mt={10} width="100%">
      {/* Blog Ad */}
      <MotionBox
        width="100%"
        bg="white"
        color="#78350F"
        p={0}
        borderRadius="lg"
        boxShadow="2xl"
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
        whileTap={{ scale: 0.98 }}
        cursor="pointer"
        onClick={() => navigate("/blog")}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <MotionImage
          key={currentIndex}
          src={currentProduct?.image || "/fallback-blog.jpg"}
          alt="Blog Ad"
          borderRadius="md"
          mb={4}
          width="100%"
          height={{ base: "200px", md: "600px" }}
          objectFit="cover"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1 }}
        />
        <Heading fontSize="2xl" mb={2} textAlign="center">Explore Our Blog</Heading>
        <Text fontSize="lg" textAlign="center">Discover insightful articles on astrology and life guidance.</Text>
      </MotionBox>

      {/* Store Ad - Product Card */}
      {currentProduct && (
        <MotionBox
          width={{base:"100%", lg:'60%'}}
          bg="white"
          color="black"
          p={{base:6, md:10, lg:10, xl:12}}
          rounded={'full'}
          boxShadow="2xl"
          whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
          whileTap={{ scale: 0.98 }}
          cursor="pointer"
          onClick={() => navigate("/shop")}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Product Image */}
          <MotionImage
            key={currentIndex}
            src={currentProduct.image}
            alt={currentProduct.name}
            rounded={'full'}
            mb={4}
            width="100%"
            height={{ base: "250px", md: "350px" }}
            objectFit="cover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
          />

          {/* Product Details */}
          <VStack align="center" spacing={2}>
            <Heading fontSize="2xl" textAlign="center">{currentProduct.name}</Heading>
            <Text fontSize={30} fontWeight="bold"  color="green.600">${currentProduct.price}</Text>
            <Text fontSize={'xl'} textAlign="center" fontWeight={'bold'} textColor={'gray.700'} px={{lg:20, base:10}}>{currentProduct.description}</Text>
          </VStack>
        </MotionBox>
      )}
    </Box>
  );
};

export default AdsComponent;
