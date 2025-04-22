import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Box,
  Text,
  Flex,
  Image,
  Spinner,
  Heading,
  Button,
  Badge,
  VStack,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react';

const CryptoInfoWidget = ({ coin = 'bitcoin', currency = 'usd' }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const cacheKey = `${coin}-${currency}`;
  const cacheExpirationTime = 3600000; // 1 hour in milliseconds

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

  // Fetch coin data
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
        const res = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${coin}`,
          {
            params: {
              localization: 'false',
              tickers: 'false',
              community_data: 'false',
              developer_data: 'false',
              sparkline: false,
            },
          }
        );
        setData(res.data);
        setCacheData(res.data); // Cache the data
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    fetchCryptoData();
  }, [coin, currency]);

  const bg = useColorModeValue('gray.100', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  if (loading)
    return (
      <Box bg={bg} p={4} borderRadius="xl" boxShadow="lg" textAlign="center">
        <Spinner size="lg" color="teal.300" />
        <Text mt={2}>Loading {coin} data…</Text>
      </Box>
    );

  if (error)
    return (
      <Box bg={bg} p={4} borderRadius="xl" boxShadow="lg" textAlign="center">
        <Text color="red.400">{error}</Text>
      </Box>
    );

  const {
    image,
    name,
    symbol,
    market_data: {
      current_price,
      price_change_percentage_24h,
      market_cap,
      total_volume,
    },
  } = data;

  const changeColor = price_change_percentage_24h >= 0 ? 'green.400' : 'red.400';

  return (
    <Box
      bg={bg}
      p={6}
      borderRadius="2xl"
      boxShadow="lg"
      textAlign="center"
      color={textColor}
      maxWidth={'100vh'}
    >
      <Flex justify="center" mb={4} width={'full'}>
        <Image
          boxSize="50px"
          src={image.small}
          alt={name}
          borderRadius="full"
        />
      </Flex>

      <Heading as="h3" size="lg" mb={2}>
        {name} ({symbol.toUpperCase()})
      </Heading>

      <Text fontSize="2xl" fontWeight="bold">
        {currency.toUpperCase()} {current_price[currency].toLocaleString()}
      </Text>

      <HStack justify="center" spacing={2} mt={2} mb={4}>
        <Badge colorScheme={price_change_percentage_24h >= 0 ? 'green' : 'red'}>
          {price_change_percentage_24h.toFixed(2)}%
        </Badge>
        <Text fontSize="sm">24h</Text>
      </HStack>

      <VStack spacing={1} mb={4} fontSize="sm">
        <HStack justify="space-between" w="full">
          <Text>Market Cap:</Text>
          <Text>
            {currency.toUpperCase()} {market_cap[currency].toLocaleString()}
          </Text>
        </HStack>
        <HStack justify="space-between" w="full">
          <Text>24h Volume:</Text>
          <Text>
            {currency.toUpperCase()} {total_volume[currency].toLocaleString()}
          </Text>
        </HStack>
      </VStack>

      <Button
        as="a"
        href={`https://www.coingecko.com/en/coins/${coin}`}
        target="_blank"
        colorScheme="teal"
        size="sm"
        width="full"
      >
        View on CoinGecko
      </Button>
    </Box>
  );
};

export default CryptoInfoWidget;
