import { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text, Flex, Image, Spinner, Heading, Button, useBreakpointValue } from '@chakra-ui/react';

const CryptoRSSWidget = ({ coin = 'bitcoin', currency = 'usd' }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cacheKey = `${coin}-${currency}`;
  const cacheExpirationTime = 18000000; // 1 hour in milliseconds

  // Fetch data from cache if available and not expired
  const getCachedData = () => {
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      const currentTime = new Date().getTime();
      if (currentTime - parsedData.timestamp < cacheExpirationTime) {
        return parsedData.data;
      } else {
        // If cached data is expired, remove it
        localStorage.removeItem(cacheKey);
      }
    }
    return null;
  };

  // Store data in cache
  const setCacheData = (data) => {
    const cacheData = {
      data,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  };

  // API call to fetch crypto data
  useEffect(() => {
    const fetchCryptoData = async () => {
      setLoading(true);
      const cachedData = getCachedData();

      if (cachedData) {
        setData(cachedData);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin}`, {
          params: { localization: 'false', tickers: 'false', market_data: 'true', community_data: 'false', developer_data: 'false' },
        });
        setData(res.data);
        setCacheData(res.data); // Cache the data
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
  }, [coin, currency]);

  // Conditional rendering for different states
  if (loading) {
    return (
      <Box bg="gray.800" p={4} borderRadius="xl" boxShadow="lg" textAlign="center">
        <Spinner size="xl" color="teal.300" />
        <Text color="white">Loading...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box bg="gray.800" p={4} borderRadius="xl" boxShadow="lg" textAlign="center">
        <Text color="red.400">loading....</Text>
      </Box>
    );
  }

  return (
    <Box
      bg="gray.800"
      p={4}
      borderRadius="xl"
      boxShadow="lg"
      maxW="auto"
      h={'auto'}
      textAlign="center"
      color="white"
      overflow="hidden"
    >
      <Flex justify="center" mb={4}>
        <Image
          boxSize="50px"
          objectFit="cover"
          src={data.image.small}
          alt={data.name}
          borderRadius="full"
        />
      </Flex>
      <Heading as="h3" size="lg" mb={2}>
        {data.name} ({data.symbol.toUpperCase()})
      </Heading>
      <Text fontSize="xl" mb={2}>
        Current Price: {currency.toUpperCase()} {data.market_data.current_price[currency]}
      </Text>
      <Text mb={4}>
        Market Cap: {currency.toUpperCase()} {data.market_data.market_cap[currency].toLocaleString()}
      </Text>
      <Button
        as="a"
        href={`https://www.coingecko.com/en/coins/${coin}`}
        target="_blank"
        bg="teal.500"
        color="white"
        _hover={{ bg: 'teal.400' }}
        size="lg"
        width="100%"
      >
        View on CoinGecko
      </Button>
    </Box>
  );
};

export default CryptoRSSWidget;
