import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  SimpleGrid,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaBitcoin, FaEthereum, FaRegChartBar, FaRocket } from "react-icons/fa";
import { motion } from "framer-motion";
import CallToAction from "../components/CallToAction";
import heroc from "./heroc.png"
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";


const features = [
  {
    icon: FaRocket,
    title: "Fast & Secure",
    description: "We ensure lightning-fast and ultra-secure crypto transactions.",
  },
  {
    icon: FaRegChartBar,
    title: "Daily Earnings",
    description: "Earn daily returns on your crypto investments with our mining plans.",
  },
  {
    icon: FaBitcoin,
    title: "Multiple Assets",
    description: "Invest in BTC, ETH, or stablecoins – all in one platform.",
  },
  {
    icon: FaEthereum,
    title: "Smart Contracts",
    description: "Your transactions run on audited, transparent smart contracts.",
  },
];

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <Box bg="#0D1B2A" color="white" minH="100vh">
      {/* Hero Section */}
      <Box
        bgGradient="linear(to-br, #0D1B2A, purple.900)"
        py={{ base: 20, md: 32 }}
        px={6}
        position="relative"
        overflow="hidden"
      >
        
        <motion.div
          animate={{ scale: [5, 5.05, 5] }}
          transition={{ repeat: Infinity, duration: 1 }}
          style={{
            position: "absolute",
            top: "-100px",
            left: "-100px",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle at center, #7f5af0 0%, transparent 70%)",
            zIndex: 0,
            opacity: 0.2,
            borderRadius: "50%",
          }}
        />
        <Container maxW="container.xl" position="relative" zIndex={1}>
          <Stack direction={{ base: "column", md: "row" }} spacing={10} align="center">
            <VStack align="start" dir maxW="lg">
              <Heading  as="h1" bgGradient="linear(to-r, blue.500, green.400)" bgClip={'text'} color="linear(to-r, blue.500, green.400)" size="2xl">
                Welcome to Jayx
              </Heading>
              <Text fontSize="lg" color="gray.300">
                The modern crypto investment platform. Secure your digital assets and earn passive income daily.
              </Text>
              <Button colorScheme="purple" size="lg" mt={4} onClick={() => navigate("/dashboard")}>
  Get Started
</Button>

            </VStack>
            <Image
              src= {heroc}
              alt="Crypto illustration"
              boxSize={{ base: "500px", md: "400px" }}
              objectFit="cover"
              minW={'50vh'}
              borderRadius="md"
            />
          </Stack>
        </Container>
      </Box>

      <CallToAction/>
      

      {/* Features Section */}
      <Box py={20} px={6} >
        <Container maxW="container.xl">
          <Heading textAlign="center" mb={12} color="purple.400">
            Why Choose Jayx?
          </Heading>
          <SimpleGrid columns={[1, 2, 2, 4]}  spacing={10}>
            {features.map((feature, i) => (
              <VStack
                key={i}
                bg="#1B263B"
                p={6}
                borderRadius="md"
                shadow="md"
                _hover={{ bg: "purple.700" }}
                transition="all 0.3s"
              >
                <Icon as={feature.icon} boxSize={10} color="purple.400" />
                <Heading size="md">{feature.title}</Heading>
                <Text textAlign="center" color="gray.300">
                  {feature.description}
                </Text>
              </VStack>
            ))}
          </SimpleGrid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Box py={20} px={6} bgGradient="linear(to-r, #0D1B2A, purple.800)">
        <Container maxW="container.lg" textAlign="center">
          <Heading size="xl" mb={4}>
            Start investing today
          </Heading>
          <Text fontSize="lg" color="gray.300" mb={6}>
            Sign up now and start earning daily returns with your favorite cryptocurrencies.
          </Text>
          <Button size="lg" colorScheme="purple">
            Join Jayx
          </Button>
        </Container>
      </Box>
      <Footer/>
    </Box>

  );
};

export default HomePage;
