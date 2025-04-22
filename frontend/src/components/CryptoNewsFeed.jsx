// src/components/CryptoNewsFeed.js
import { useEffect } from 'react';
import { Box, Heading, Text, Image, HStack, VStack, useBreakpointValue } from '@chakra-ui/react';
import { useNewsStore } from '../store/useNewsStore';

const CryptoNewsFeed = () => {
  const { news, fetchNews } = useNewsStore();

  useEffect(() => {
    fetchNews();
  }, []);

  const cardWidth = useBreakpointValue({ base: '100%', md: '33%' });

  return (
    <Box mt={10}>
      <Heading mb={4} size="lg">📰 Latest Crypto News</Heading>
      <HStack
        overflowX="auto"
        spacing={4}
        pb={4}
        sx={{ '&::-webkit-scrollbar': { display: 'none' } }}
      >
        {news.map((item) => (
          <Box
            key={item.id}
            bg="#1B263B"
            borderRadius="xl"
            w={cardWidth}
            minW={cardWidth}
            p={4}
            flexShrink={0}
          >
            <Image src={item.imgURL} alt={item.title} borderRadius="md" mb={3} />
            <VStack align="start" spacing={2}>
              <Text fontWeight="bold">{item.title}</Text>
              <Text fontSize="sm" noOfLines={3} color="gray.400">
                {item.description}
              </Text>
              <Text as="a" href={item.link} target="_blank" fontSize="sm" color="cyan.400">
                Read more →
              </Text>
            </VStack>
          </Box>
        ))}
      </HStack>
    </Box>
  );
};

export default CryptoNewsFeed;
