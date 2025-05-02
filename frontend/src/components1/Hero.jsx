
import { Box, Container, Heading, Text, Button, Flex, Image, Stack } from "@chakra-ui/react";
import ParticleBg from "./ParticleBg";
import FuturisticBackground from "../components/FuturisticBackground";
import heroc from "../pages/heroc.png"
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate()
  return (
    <Box position="relative" bg="gray.900" overflow="hidden" py={20}>
      <ParticleBg />
      <FuturisticBackground/>
      <Container maxW="container.xl" position="relative" zIndex={1}>
        <Flex direction={{ base: "column", md: "row" }} align="center">
          <Box flex={1} color="white" pr={{ md: 10 }} mb={{ base: 10, md: 0 }}>
            <Heading as="h1" size="2xl" fontWeight="bold" mb={6}>
              ACHIEVE THE BEST HASHRATE
            </Heading>
            <Text fontSize="lg" color="gray.300" mb={8}>
              Experience the most advanced cryptocurrency mining platform. Our optimized system ensures maximum returns through efficient operations and state-of-the-art hardware.
            </Text>
            <Button onClick={()=>navigate('/login')} size="lg" colorScheme="purple" px={8}>
              Get Started
            </Button>
          </Box>
          
          <Box flex={1} position="relative">
            <Box
              position="absolute"
              width="300px"
              height="300px"
              borderRadius="full"
              bg="purple.500"
              filter="blur(80px)"
              opacity={0.3}
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
            />
            <Image 
              src={heroc}
              alt="Crypto Bull"
              maxW="100%"
              height="auto"
              fallback={
                <Box textAlign="center">
                  <Box 
                    position="relative" 
                    width="300px" 
                    height="300px" 
                    margin="0 auto"
                    borderRadius="full"
                    bg="purple.700"
                  >
                    <Box position="absolute" top="40%" left="50%" transform="translate(-50%, -50%)">
                      <Text color="white" fontSize="6xl">₿</Text>
                    </Box>
                  </Box>
                </Box>
              }
            />
          </Box>
        </Flex>
      </Container>
    </Box>
  );
};

export default Hero;