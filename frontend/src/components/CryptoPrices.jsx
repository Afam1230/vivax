// components/CryptoPrices.jsx
import {
    Box,
    Text,
    VStack,
    HStack,
    Icon,
    Divider,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { FaBitcoin, FaEthereum } from "react-icons/fa";
  import { SiSolana } from "react-icons/si";
  
  const prices = [
    {
      name: "Bitcoin",
      symbol: "BTC",
      icon: FaBitcoin,
      price: "$65,448.52",
      change: "+2.69%",
      color: "green.300",
    },
    {
      name: "Ethereum",
      symbol: "ETH",
      icon: FaEthereum,
      price: "$3,239.80",
      change: "-1.39%",
      color: "red.400",
    },
    {
      name: "Solana",
      symbol: "SOL",
      icon: SiSolana,
      price: "$142.92",
      change: "+5.66%",
      color: "green.300",
    },
  ];
  
  const CryptoPrices = () => {
    return (
      <Box
        bg="rgba(255, 255, 255, 0.05)"
        backdropFilter="blur(20px)"
        borderRadius="xl"
        p={6}
        boxShadow="lg"
        maxW="sm"
        w="full"
        color="white"
      >
        <Text fontWeight="bold" fontSize="lg" mb={4}>
          Live Crypto Prices
        </Text>
        <VStack spacing={4} align="stretch">
          {prices.map((coin, idx) => (
            <Box key={idx}>
              <HStack justify="space-between">
                <HStack>
                  <Icon as={coin.icon} boxSize={5} />
                  <Box>
                    <Text fontWeight="bold">{coin.name}</Text>
                    <Text fontSize="sm" color="gray.300">
                      {coin.symbol}
                    </Text>
                  </Box>
                </HStack>
                <Box textAlign="right">
                  <Text fontWeight="bold">{coin.price}</Text>
                  <Text fontSize="sm" color={coin.color}>
                    {coin.change}
                  </Text>
                </Box>
              </HStack>
              {idx !== prices.length - 1 && <Divider borderColor="whiteAlpha.300" mt={3} />}
            </Box>
          ))}
        </VStack>
      </Box>
    );
  };
  
  export default CryptoPrices;
  