import { Box, Text, Button, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { CheckCircleIcon } from "@chakra-ui/icons";

const MotionBox = motion(Box);

const ThankYouPage = () => {
  const navigate = useNavigate();

  return (
    <MotionBox
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      textAlign="center"
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient="linear(to-r, orange.100, yellow.50)"
      p={5}
    >
      <VStack spacing={6} p={10} bg="white" boxShadow="2xl" borderRadius="lg">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        >
          <CheckCircleIcon boxSize={16} color="green.400" />
        </motion.div>
        <Text fontSize="2xl" fontWeight="bold" color="orange.700">
          Thank You for Your Booking!
        </Text>
        <Text fontSize="md" color="gray.600">
          Your request has been sent successfully. I will get back to you as soon as possible!
        </Text>
        <Button colorScheme="orange" onClick={() => navigate("/")}>
          Go Back Home
        </Button>
      </VStack>
    </MotionBox>
  );
};

export default ThankYouPage;
