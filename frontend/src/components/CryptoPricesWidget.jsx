import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  Text,
  VStack,
  HStack,
  Spinner,
  Badge,
} from "@chakra-ui/react";

const CryptoPricesWidget = () => {
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if cached data exists in localStorage
    const cachedPrices = localStorage.getItem("cryptoPrices");
    if (cachedPrices) {
      setPrices(JSON.parse(cachedPrices));
      setLoading(false);
    }

    const fetchPrices = async () => {
      try {
        const res = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: "usd",
              order: "market_cap_desc",
              per_page: 5,
              page: 1,
              sparkline: false,
            },
          }
        );
        setPrices(res.data);
        localStorage.setItem("cryptoPrices", JSON.stringify(res.data)); // Cache the data
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch prices", err);
        setLoading(false);
      }
    };

    if (!cachedPrices) {
      fetchPrices();
    }
  }, []);

  return (
    <Box bg="#1B263B" p={6} borderRadius="2xl" boxShadow="md">
      <Heading size="md" mb={4}>💰 Live Crypto Prices</Heading>
      {loading ? (
        <Spinner size="lg" />
      ) : (
        <VStack spacing={3} align="start">
          {prices.map((coin) => (
            <HStack key={coin.id} justify="space-between" w="100%">
              <HStack>
                <img src={coin.image} alt={coin.name} width="24" />
                <Text>{coin.name} ({coin.symbol.toUpperCase()})</Text>
              </HStack>
              <HStack>
                <Text fontWeight="bold">${coin.current_price.toLocaleString()}</Text>
                <Badge colorScheme={coin.price_change_percentage_24h >= 0 ? "green" : "red"}>
                  {coin.price_change_percentage_24h.toFixed(2)}%
                </Badge>
              </HStack>
            </HStack>
          ))}
        </VStack>
      )}
    </Box>
  );
};

export default CryptoPricesWidget;
