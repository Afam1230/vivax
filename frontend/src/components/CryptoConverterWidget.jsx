import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Heading,
  VStack,
  Input,
  Select,
  Text,
  HStack,
  Spinner,
} from "@chakra-ui/react";

const CryptoConverterWidget = () => {
  const [coins, setCoins] = useState([]);
  const [from, setFrom] = useState("bitcoin");
  const [to, setTo] = useState("usd");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch available coins (top 50)
  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const res = await axios.get("https://api.coingecko.com/api/v3/coins/markets", {
          params: {
            vs_currency: "usd",
            order: "market_cap_desc",
            per_page: 50,
            page: 1,
          },
        });
        setCoins(res.data.map((coin) => ({ id: coin.id, name: coin.name, symbol: coin.symbol })));
      } catch (error) {
        console.error("Failed to fetch coins:", error);
      }
    };

    fetchCoins();
  }, []);

  // Check if a cached result exists and use it
  const getCachedResult = (from, to, amount) => {
    const cacheKey = `${from}-${to}-${amount}`;
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    return null;
  };

  // Save the result to cache
  const setCacheResult = (from, to, amount, result) => {
    const cacheKey = `${from}-${to}-${amount}`;
    localStorage.setItem(cacheKey, JSON.stringify(result));
  };

  const convert = async () => {
    setLoading(true);
    const cachedResult = getCachedResult(from, to, amount);
    
    if (cachedResult) {
      setResult(cachedResult);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price`,
        {
          params: {
            ids: from,
            vs_currencies: to,
          },
        }
      );
      const price = res.data[from][to];
      const conversionResult = (amount * price).toFixed(6);
      setResult(conversionResult);
      setCacheResult(from, to, amount, conversionResult); // Cache the result
    } catch (err) {
      console.error("Conversion failed:", err);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (from && to && amount) {
      convert();
    }
  }, [from, to, amount]);

  return (
    <Box bg="#1B263B" p={6} borderRadius="2xl" color={'black'} boxShadow="md" w="full">
      <Heading size="md" mb={4}>🔄 Crypto Converter</Heading>
      <VStack spacing={4} align="stretch">
        <HStack>
          <Input
            placeholder="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            bg="white"
          />
          <Select value={from} onChange={(e) => setFrom(e.target.value)} bg="white">
            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol.toUpperCase()})
              </option>
            ))}
          </Select>
          <Select value={to} onChange={(e) => setTo(e.target.value)} bg="white">
            <option value="usd">USD</option>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol.toUpperCase()})
              </option>
            ))}
          </Select>
        </HStack>
        <Box mt={2}>
          {loading ? (
            <Spinner />
          ) : (
            result && (
              <Text color="white" fontWeight="bold" fontSize="lg">
                {amount} {from.toUpperCase()} = {result} {to.toUpperCase()}
              </Text>
            )
          )}
        </Box>
      </VStack>
    </Box>
  );
};

export default CryptoConverterWidget;
