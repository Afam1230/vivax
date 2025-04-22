import React, { useState, useEffect } from 'react';
import { Box, Text, Image } from '@chakra-ui/react';

const TopLosers = () => {
  const [topLosers, setTopLosers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cachedData = localStorage.getItem('topLosers');
    const cachedTime = localStorage.getItem('topLosersTime');
    const now = Date.now();

    // Check if cache is available and not too old (e.g., 5 minutes)
    if (cachedData && cachedTime && now - cachedTime < 5 * 60 * 1000) {
      setTopLosers(JSON.parse(cachedData));
      setIsLoading(false);
    } else {
      fetchTopLosers();
    }
  }, []);

  const fetchTopLosers = async () => {
    try {
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1'
      );
      const data = await response.json();

      const losers = data
        .filter(coin => coin.price_change_percentage_24h < 0) // Filter out coins with positive change
        .sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h) // Sort by biggest loss
        .slice(0, 5); // Top 5 losers

      // Cache the data for 5 minutes
      localStorage.setItem('topLosers', JSON.stringify(losers));
      localStorage.setItem('topLosersTime', Date.now());

      setTopLosers(losers);
      setIsLoading(false);
    } catch (error) {
      setError('Failed to fetch top losers');
      setIsLoading(false);
    }
  };

  return (
    <Box bg="#1B263B" justifyContent={'center'} p={4} borderRadius="xl">
      <Text fontWeight="bold" mb={2}>❄️ Top Losers</Text>
      {isLoading ? (
        <Text fontSize="lg" color="gray.400">Loading...</Text>
      ) : error ? (
        <Text fontSize="lg" color="red.400">{error}</Text>
      ) : (
        <Box>
          {topLosers.map((coin) => (
            <Box key={coin.id} display="flex" alignItems="center" mb={4}>
              <Image
                src={coin.image}
                alt={coin.name}
                boxSize="40px"
                borderRadius="full"
                mr={3}
              />
              <Box>
                <Text fontWeight="bold" fontSize={'xl'}  color="white">{coin.name}</Text>
                <Text fontSize="lg" color="gray.400">${coin.current_price.toFixed(2)}</Text>
                <Text fontSize="lg" color="red.400">
                  {coin.price_change_percentage_24h.toFixed(2)}% 🔻
                </Text>
              </Box>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TopLosers;
