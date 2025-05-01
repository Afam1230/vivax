// components/WhyChooseJayx.jsx
import {
    Box,
    Text,
    SimpleGrid,
    VStack,
    Icon,
  } from "@chakra-ui/react";
  import { FaChartLine, FaLock, FaTools, FaUsers } from "react-icons/fa";
  
  const features = [
    {
      title: "Advanced Tools",
      description: "Utilize smart investment tools built for every level of investor.",
      icon: FaTools,
    },
    {
      title: "Secure & Trusted",
      description: "Bank-grade security and compliance to keep your investments safe.",
      icon: FaLock,
    },
    {
      title: "Real-Time Analytics",
      description: "Track crypto performance live with detailed stats and trends.",
      icon: FaChartLine,
    },
    {
      title: "Community Driven",
      description: "Built for investors, backed by a global crypto community.",
      icon: FaUsers,
    },
  ];
  
  const WhyChooseJayx = () => {
    return (
      <Box py={24} px={{ base: 6, md: 16 }} textAlign="center">
        <Text fontSize="3xl" fontWeight="bold" mb={3} color="purple.400">
          Why Choose Jayx
        </Text>
        <Text fontSize="md" color="gray.300" mb={10}>
          Experience the future of crypto investing with powerful features for beginners and pros alike.
        </Text>
  
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8}>
          {features.map((feature, idx) => (
            <Box
              key={idx}
              p={6}
              borderRadius="2xl"
              bg="rgba(255, 255, 255, 0.04)"
              border="1px solid"
              borderColor="whiteAlpha.100"
              boxShadow="lg"
              backdropFilter="blur(15px)"
              transition="all 0.3s ease-in-out"
              _hover={{
                transform: "translateY(-5px)",
                boxShadow: "0 0 25px rgba(128, 90, 213, 0.35)",
              }}
            >
              <VStack spacing={4}>
                <Icon as={feature.icon} boxSize={8} color="purple.400" />
                <Text fontWeight="bold" fontSize="lg">
                  {feature.title}
                </Text>
                <Text fontSize="sm" color="gray.400">
                  {feature.description}
                </Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    );
  };
  
  export default WhyChooseJayx;
  