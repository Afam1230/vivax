import React, { useEffect, useState } from "react";
import { Box, Heading, Text, VStack, Spinner, SimpleGrid, Card, CardBody, Image, Badge } from "@chakra-ui/react";
import axios from "axios";

const MarketTrendsWidget = () => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const cacheKey = "marketTrends";
  const cacheExpirationTime = 3600000; // 1 hour in milliseconds

  // Get cached data if available and valid
  const getCachedData = () => {
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      const currentTime = new Date().getTime();
      if (currentTime - parsedData.timestamp < cacheExpirationTime) {
        return parsedData.data;
      } else {
        // Remove expired data
        localStorage.removeItem(cacheKey);
      }
    }
    return null;
  };

  // Set data to cache
  const setCacheData = (data) => {
    const cacheData = {
      data,
      timestamp: new Date().getTime(),
    };
    localStorage.setItem(cacheKey, JSON.stringify(cacheData));
  };

  // Fetch market trends from the API
  useEffect(() => {
    const fetchMarketTrends = async () => {
      setLoading(true);
      const cachedData = getCachedData();

      if (cachedData) {
        setTrends(cachedData);
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("https://api.coingecko.com/api/v3/search/trending");
        setTrends(res.data.coins);
        setCacheData(res.data.coins); // Cache the data
      } catch (error) {
        console.error("Error fetching market trends:", error);
      }
      setLoading(false);
    };

    fetchMarketTrends();
  }, []);

  return (
    <Box bg="#1B263B" p={6} borderRadius="2xl" boxShadow="md" w="full" height={["auto"]}>
      <Heading size={["lg", "xl"]} color="white" mb={4}>
        🌐 Market Trends
      </Heading>

      {loading ? (
        <Spinner color="white" />
      ) : (
        <VStack spacing={4} align="stretch">
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {trends.slice(0, 5).map((trend, index) => (
              <Card key={index} bg="#1A2238" borderRadius="xl" boxShadow="lg" p={4}>
                <CardBody>
                  <VStack spacing={3} align="center" textAlign="center">
                    <Image
                      boxSize="50px"
                      objectFit="cover"
                      src={trend.item.thumb}
                      alt={trend.item.name}
                      borderRadius="full"
                    />
                    <Heading size="md" color="white">
                      {trend.item.name}
                    </Heading>
                    <Text color="gray.400">{trend.item.symbol.toUpperCase()}</Text>
                    <Badge colorScheme="teal">Trending #{index + 1}</Badge>
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>
        </VStack>
      )}
    </Box>
  );
};

export default MarketTrendsWidget;
