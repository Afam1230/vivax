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

const PrivacyPolicy = () => {
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
            Privacy Policy
          </Heading>

          <VStack align="start" spacing={6}>
            <Box>
              <Heading size="md" mb={2}>1. Introduction</Heading>
              <Text color="gray.300">
                At CryptoLab, your privacy is our priority. This policy outlines how we collect, use, and protect your personal data when using our platform.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={2}>2. Data Collection</Heading>
              <Text color="gray.300">
                We collect personal information such as your name, email address, and usage behavior to provide better services and ensure platform security.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={2}>3. Use of Information</Heading>
              <Text color="gray.300">
                Your information is used to personalize your experience, improve our services, and send you updates related to your investments and our offerings.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={2}>4. Data Protection</Heading>
              <Text color="gray.300">
                We implement security measures to protect your information. However, no online transmission is 100% secure, and we advise caution.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={2}>5. Third-Party Access</Heading>
              <Text color="gray.300">
                We do not sell or trade your data. Third-party access is limited to essential services (e.g., payment processing) with strict privacy agreements.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={2}>6. Cookies</Heading>
              <Text color="gray.300">
                CryptoLab uses cookies to enhance user experience and collect analytics data. You can manage your cookie preferences in your browser settings.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={2}>7. User Rights</Heading>
              <Text color="gray.300">
                You have the right to access, correct, or delete your personal data. To make a request, contact us via the details below.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={2}>8. Updates to Policy</Heading>
              <Text color="gray.300">
                This policy may be updated from time to time. Changes will be reflected on this page with the updated date.
              </Text>
            </Box>

            <Box>
              <Heading size="md" mb={2}>9. Contact Us</Heading>
              <Text color="gray.300">
                If you have questions or concerns, contact us at <Text as="span" color="purple.200">privacy@cryptolab.com</Text>.
              </Text>
            </Box>
          </VStack>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default PrivacyPolicy;
