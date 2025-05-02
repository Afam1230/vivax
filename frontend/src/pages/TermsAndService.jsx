import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Container,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import AnimatedBackground from "../components/AnimatedBackground";

const MotionBox = motion(Box);

const TermsAndService = () => {
  return (
    <Box position="relative" bg="purple.900" color="white" minH="100vh" overflow="hidden">
      <AnimatedBackground />

      <Container maxW="4xl" py={20} position="relative" zIndex={1}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading fontSize="4xl" mb={6} textAlign="center" color="purple.300">
            Terms & Services
          </Heading>

          <VStack align="start" spacing={6}>
            <Box>
              <Heading size="md" mb={2}>1. Introduction</Heading>
              <Text color="gray.300">
                Welcome to CryptoLab. By accessing or using our platform, you agree to be bound by these terms and conditions. Please read them carefully.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={2}>2. Eligibility</Heading>
              <Text color="gray.300">
                You must be at least 18 years old to use CryptoLab’s services. By using our platform, you confirm that you meet this requirement.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={2}>3. Investment Risks</Heading>
              <Text color="gray.300">
                Investing in cryptocurrencies involves risk. CryptoLab does not guarantee returns. Users are solely responsible for their investment decisions.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={2}>4. User Responsibilities</Heading>
              <Text color="gray.300">
                You agree to use our services legally and responsibly. You must not misuse the platform for fraudulent or malicious activities.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={2}>5. Account Security</Heading>
              <Text color="gray.300">
                You are responsible for maintaining the confidentiality of your account information and for all activities under your account.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={2}>6. Intellectual Property</Heading>
              <Text color="gray.300">
                All content on CryptoLab, including logos, designs, and texts, are owned by CryptoLab and may not be reused without permission.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={2}>7. Changes to Terms</Heading>
              <Text color="gray.300">
                We reserve the right to update these Terms at any time. Users will be notified of any significant changes through the platform.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={2}>8. Contact Information</Heading>
              <Text color="gray.300">
                If you have any questions about these Terms, please contact us at <Text as="span" color="purple.200">support@cryptolab.com</Text>.
              </Text>
            </Box>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default TermsAndService;
