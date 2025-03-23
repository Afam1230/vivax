import { Box, Heading, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);

const AdsComponent = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={8} mt={10} width="100%">
      <MotionBox
        width={{ base: "100%", md: "100%", lg: "100%" }}
        bg="white"
        color="#78350F"
        p={8}
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
        <Image src="/blog-ad.jpg" alt="Blog Ad" borderRadius="md" mb={4} width="100%" height={{ base: "200px", md: "300px" }} objectFit="cover" />
        <Heading fontSize="2xl" mb={2} textAlign="center">Explore Our Blog</Heading>
        <Text fontSize="lg" textAlign="center">Discover insightful articles on astrology and life guidance.</Text>
      </MotionBox>

      <MotionBox
        width={{ base: "100%", md: "100%", lg: "100%" }}
        bg="white"
        color="#78350F"
        p={8}
        borderRadius="lg"
        boxShadow="2xl"
        whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.2)" }}
        whileTap={{ scale: 0.98 }}
        cursor="pointer"
        onClick={() => navigate("/store")}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Image src="/store-ad.jpg" alt="Store Ad" borderRadius="md" mb={4} width="100%" height={{ base: "200px", md: "300px" }} objectFit="cover" />
        <Heading fontSize="2xl" mb={2} textAlign="center">Visit Our Store</Heading>
        <Text fontSize="lg" textAlign="center">Find spiritual products to enhance your journey.</Text>
      </MotionBox>
    </Box>
  );
};

export default AdsComponent;