// components/MarketOpportunities.jsx
import {
    Box,
    Text,
    SimpleGrid,
    VStack,
    Icon,
    Button,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { FaBitcoin, FaEthereum } from "react-icons/fa";
  import { SiTether } from "react-icons/si";
  
  const coins = [
    {
      name: "Bitcoin",
      icon: FaBitcoin,
      trend: "+2.34%",
      color: "green.300",
    },
    {
      name: "Ethereum",
      icon: FaEthereum,
      trend: "-1.45%",
      color: "red.400",
    },
    {
      name: "Tether (USDT)",
      icon: SiTether,
      trend: "+0.01%",
      color: "green.300",
    },
  ];
  
  const MarketOpportunities = () => {
    return (
      <Box py={20} px={{ base: 6, md: 16 }} textAlign="center">
        <Text fontSize="3xl" fontWeight="bold" mb={3} color="purple.400">
          Market Opportunities
        </Text>
        <Text fontSize="md" color="gray.300" mb={10}>
          Discover high-potential investment opportunities and stay ahead of market trends.
        </Text>
  
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {coins.map((coin, idx) => (
            <Box
              key={idx}
              p={6}
              bg="rgba(255, 255, 255, 0.05)"
              borderRadius="2xl"
              backdropFilter="blur(15px)"
              border="1px solid"
              borderColor="whiteAlpha.100"
              boxShadow="lg"
              _hover={{
                transform: "scale(1.03)",
                transition: "all 0.3s ease-in-out",
                boxShadow: "0 0 30px rgba(128, 90, 213, 0.4)",
              }}
            >
              <VStack spacing={4}>
                <Icon as={coin.icon} boxSize={10} color="purple.400" />
                <Text fontWeight="bold" fontSize="lg">
                  {coin.name}
                </Text>
                <Text fontSize="sm" color={coin.color}>
                  {coin.trend}
                </Text>
                <Button colorScheme="purple" size="sm" variant="ghost">
                  Invest Now →
                </Button>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>
      </Box>
    );
  };
  
  export default MarketOpportunities;
  