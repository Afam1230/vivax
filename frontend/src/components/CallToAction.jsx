// components/CallToAction.jsx
import {
    Box,
    Button,
    Container,
    Heading,
    Text,
    VStack,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { motion } from "framer-motion";
  
  const MotionButton = motion(Button);
  
  const CallToAction = () => {
    const bgOverlay = useColorModeValue("rgba(255,255,255,0.06)", "rgba(0,0,0,0.4)");
  
    return (
      <Box
        as="section"
        py={[16, 24]}
        bgGradient="linear(to-r, #1B263B, #0D1B2A)"
      >
        <Container maxW="container.md" textAlign="center">
          <VStack spacing={6}>
            <Heading size="xl" color="purple.400">
              Ready to Elevate Your Crypto Portfolio?
            </Heading>
            <Text fontSize="lg" color="gray.300" maxW="lg">
              Join Jayx today and start earning daily returns on your cryptocurrency investments.
            </Text>
            <MotionButton
              size="lg"
              px={12}
              colorScheme="purple"
              bg={bgOverlay}
              backdropFilter="blur(12px)"
              border="1px solid rgba(255,255,255,0.2)"
              whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(127,90,240,0.6)" }}
              whileTap={{ scale: 0.95 }}
            >
              Create Free Account
            </MotionButton>
          </VStack>
        </Container>
      </Box>
    );
  };
  
  export default CallToAction;
  