// components/HeroSection.jsx
import {
    Box,
    Button,
    Flex,
    Heading,
    Stack,
    Text,
    VStack,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { motion } from "framer-motion";
  
  const MotionBox = motion(Box);
  
  const HeroSection = () => {
    return (
      <Box
        as="section"
        minH="90vh"
        bgGradient="linear(to-b, #0D1B2A, #1B263B)"
        color="white"
        position="relative"
        overflow="hidden"
        px={8}
        pt={24}
      >
        {/* Glowing Background Animation */}
        <MotionBox
          position="absolute"
          top="10%"
          left="50%"
          transform="translateX(-50%)"
          w="500px"
          h="500px"
          bg="purple.500"
          opacity={0.2}
          filter="blur(150px)"
          borderRadius="full"
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
  
        <Flex direction="column" align="center" textAlign="center" zIndex="1" position="relative">
          <Heading fontSize={{ base: "3xl", md: "5xl" }}>
            <Text as="span" color="purple.500">
              Invest
            </Text>{" "}
            in the Future of Finance
          </Heading>
          <Text fontSize="lg" mt={4} maxW="600px">
            Join thousands of investors leveraging cryptocurrency to build wealth and secure their financial future.
          </Text>
          <Stack direction={{ base: "column", sm: "row" }} mt={8} spacing={4}>
            <Button colorScheme="purple" size="lg">
              Start Investing
            </Button>
            <Button colorScheme="whiteAlpha" variant="outline" size="lg">
              View Markets
            </Button>
          </Stack>
          <Flex mt={12} gap={12}>
            <Box>
              <Text fontSize="2xl" fontWeight="bold">50K+</Text>
              <Text>Investors</Text>
            </Box>
            <Box>
              <Text fontSize="2xl" fontWeight="bold">$2.5B+</Text>
              <Text>Transactions</Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
    );
  };
  
  export default HeroSection;
  