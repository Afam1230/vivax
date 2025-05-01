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
} from "@chakra-ui/react";
import {
  FaBitcoin,
  FaEthereum,
  FaRegChartBar,
  FaRocket,
} from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CallToAction from "../components/CallToAction";
import heroc from "./heroc.png";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import FloatingCryptoAnimations from "../components/FloatingCryptoAnimations";
import FuturisticBackground from "../components/FuturisticBackground";

// Motion components
const MotionBox = motion(Box);

const fadeInUp = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// Framer-motion variants
const fadeInZoom = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

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
  const navigate = useNavigate();

  return (
    <Box bg="#0D1B2A" color="white" minH="100vh">
      {/* Hero Section */}
      <Box
        bgGradient="linear(to-br, #0D1B2A, gray.700)"
        py={{ base: 20, md: 32 }}
        px={6}
        position="relative"
        overflow="hidden"
        boxShadow="0 8px 30px rgba(255, 255, 255, 0.3)"

      >
  {/* Floating animated blobs */}
  <FloatingCryptoAnimations />

        <Container maxW="container.xl" position="relative" zIndex={1} >
          <Stack direction={{ base: "column", md: "row" }} spacing={10} align="center" >
            <VStack align="start" maxW="lg">
              <Heading
                as="h1"
                bgGradient="linear(to-r, blue.500, green.400)"
                bgClip="text"
                size="2xl"
              >
                Welcome to EONCOIN
              </Heading>
              <Text fontSize="lg" color="gray.300">
                The modern crypto investment platform. Secure your digital assets and earn passive income daily.
              </Text>
              <Button
                colorScheme="purple"
                size="lg"
                mt={4}
                onClick={() => navigate("/dashboard")}
              >
                Get Started
              </Button>
            </VStack>
            <Image
              src={heroc}
              alt="Crypto illustration"
              boxSize={{ base: "500px", md: "400px" }}
              objectFit="cover"
              minW="50vh"
              borderRadius="md"
            />
          </Stack>
        </Container>
      </Box>

      {/* Call To Action Section */}
      <CallToAction />

      {/* Features Section */}
      <Box position="relative" py={20} px={6} overflow="hidden">
  <FuturisticBackground />
  <Container maxW="container.xl" position="relative" zIndex={1}>
    <Heading textAlign="center" mb={12} color="purple.400">
      Why Choose EONCOIN?
    </Heading>
    <SimpleGrid columns={[1, 2, 2, 4]} spacing={10}>
      {features.map((feature, i) => {
        const controls = useAnimation();
        const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
        if (inView) controls.start("visible");

        return (
          <motion.div
            key={i}
            ref={ref}
            variants={fadeInUp}
            initial="hidden"
            animate={controls}
          >
            <MotionBox
              p={6}
              borderRadius="xl"
              bg="rgba(255, 255, 255, 0.05)"
              backdropFilter="blur(12px)"
              border="1px solid rgba(255, 255, 255, 0.1)"
              boxShadow="0 8px 30px rgba(0, 0, 0, 0.3)"
              color="white"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 12px 40px rgba(128, 90, 213, 0.4)",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              textAlign="center"
            >
              <Icon as={feature.icon} boxSize={10} color="purple.400" mb={4} />
              <Heading size="md" mb={2}>
                {feature.title}
              </Heading>
              <Text color="gray.300">{feature.description}</Text>
            </MotionBox>
          </motion.div>
        );
      })}
    </SimpleGrid>
  </Container>
</Box>
      {/* Final CTA Section */}
      <MotionBox py={20} px={6} boxShadow="0 8px 30px rgba(255, 255, 255, 0.3)"
        bgGradient="linear(to-r, #0D1B2A, purple.800)" backdropFilter={'blur(500px)'}>
        <Container maxW="container.lg" textAlign="center">
          <Heading size="xl" mb={4}>
            Start investing today
          </Heading>
          <Text fontSize="lg" color="gray.300" mb={6}>
            Sign up now and start earning daily returns with your favorite cryptocurrencies.
          </Text>
          <Button size="lg" colorScheme="purple" onClick={()=>navigate("/register")}>
            Join EONCOIN
          </Button>
        </Container>
      </MotionBox>

      <Footer />
    </Box>
  );
};

export default HomePage;
