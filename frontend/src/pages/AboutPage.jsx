import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Stack,
  Container,
  Image,
} from "@chakra-ui/react";
import { FaChartLine, FaUsers, FaLock, FaRocket } from "react-icons/fa";
import AnimatedBackground from "../components/AnimatedBackground"; // create this background component
import heroc from "./heroc.png"

const AboutPage = () => {
  return (
    <Box position="relative" overflow="hidden" bg="purple.900" color="white" minH="100vh">
      <AnimatedBackground />

      <Container maxW="7xl" position="relative" zIndex="1" py={20}>
        {/* Hero Section */}
        <VStack spacing={6} textAlign="center" mb={16}>
          <Heading fontSize={{ base: "3xl", md: "5xl" }} fontWeight="extrabold">
            Welcome to <Text as="span" color="purple.300">CryptoLab</Text>
          </Heading>
          <Text fontSize="xl" maxW="3xl">
            Where bold ideas meet blockchain innovation. We empower investors with cutting-edge tools, secure strategies, and unmatched crypto insights.
          </Text>
        </VStack>

        {/* About Content */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12}>
          <VStack align="start" spacing={5}>
            <Heading size="lg">Who We Are</Heading>
            <Text fontSize="md">
              CryptoLab is a next-gen investment hub crafted for the modern crypto investor.
              Our mission is to simplify, secure, and supercharge your crypto journey with
              powerful analytics, expert insights, and intuitive tools — all built with precision
              and elegance.
            </Text>
            <Text fontSize="md">
              Whether you're a first-time buyer or a seasoned trader, CryptoLab is your trusted
              partner in navigating the decentralized economy.
            </Text>
          </VStack>

          {/* Placeholder image */}
          <Box>
            <Image
              src={heroc}
              alt="CryptoLab illustration"
              borderRadius="xl"
              boxShadow="xl"
            />
          </Box>
        </SimpleGrid>

        {/* Features Section */}
        <Stack mt={20} spacing={12}>
          <Heading textAlign="center">Why Choose Us?</Heading>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            <Feature icon={<FaChartLine />} title="Real-Time Analytics" text="Stay ahead with lightning-fast data and predictive insights." />
            <Feature icon={<FaUsers />} title="Expert Community" text="Join a vibrant network of analysts, mentors, and crypto enthusiasts." />
            <Feature icon={<FaLock />} title="Secure & Transparent" text="Built on trust. Powered by blockchain. Protected with encryption." />
            <Feature icon={<FaRocket />} title="Built for Growth" text="Maximize your potential with tools designed to scale your portfolio." />
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
};

const Feature = ({ icon, title, text }) => (
  <VStack spacing={3} textAlign="center">
    <Box fontSize="4xl" color="purple.300">{icon}</Box>
    <Heading size="md">{title}</Heading>
    <Text fontSize="sm">{text}</Text>
  </VStack>
);

export default AboutPage;
