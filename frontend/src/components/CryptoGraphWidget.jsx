import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Select,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

const CryptoGraphWidget = () => {
  const [selectedCoin, setSelectedCoin] = useState("bitcoin");
  const [days, setDays] = useState("7");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const coins = [
    "bitcoin",
    "ethereum",
    "solana",
    "ripple",
    "cardano",
    "dogecoin",
    "litecoin",
  ];

  // Check for cached data
  const getCachedData = (coin, days) => {
    const cacheKey = `${coin}-${days}`;
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      return JSON.parse(cachedData);
    }
    return null;
  };

  // Save data to cache
  const setCacheData = (coin, days, data) => {
    const cacheKey = `${coin}-${days}`;
    localStorage.setItem(cacheKey, JSON.stringify(data));
  };

  const fetchData = async () => {
    setLoading(true);
    const cachedData = getCachedData(selectedCoin, days);
    
    if (cachedData) {
      setData(cachedData);
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart`,
        {
          params: {
            vs_currency: "usd",
            days,
          },
        }
      );

      const formattedData = res.data.prices.map(([timestamp, price]) => ({
        time: new Date(timestamp).toLocaleDateString(),
        price: Number(price.toFixed(2)),
      }));

      setData(formattedData);
      setCacheData(selectedCoin, days, formattedData); // Cache the data
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [selectedCoin, days]);

  return (
    <Box bg="#1B263B" p={6} borderRadius="2xl" boxShadow="md" w="full">
      <Heading size="md" color="white" mb={4}>
        📈 {selectedCoin.charAt(0).toUpperCase() + selectedCoin.slice(1)} Price Chart
      </Heading>
      <VStack spacing={4} align="stretch" mb={4}>
        <Select value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)} bg="white" color={'black'}>
          {coins.map((coin) => (
            <option key={coin} value={coin}>
              {coin.toUpperCase()}
            </option>
          ))}
        </Select>
        <Select value={days} onChange={(e) => setDays(e.target.value)} bg="white" color={'black'}>
          <option value="1">24 Hours</option>
          <option value="7">7 Days</option>
          <option value="30">30 Days</option>
          <option value="90">90 Days</option>
        </Select>
      </VStack>

      {loading ? (
        <Spinner color="white" />
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis domain={['auto', 'auto']} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#38BDF8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Box>
  );
};

export default CryptoGraphWidget;
