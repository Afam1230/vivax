
import { Box, Container, SimpleGrid, Stat, StatLabel, StatNumber, Flex, Icon, Text } from "@chakra-ui/react";
import { TrendingUpIcon, DollarSignIcon, BitcoinIcon, ChartLineIcon } from "../components1/Icons";

const StatCard = ({ icon, label, value, unit }) => {
  return (
    <Box 
      bg="rgba(30, 30, 60, 0.7)" 
      backdropFilter="blur(5px)" 
      p={6}
      borderRadius="lg"
      boxShadow="lg"
      border="1px solid"
      borderColor="purple.800"
    >
      <Flex align="center" mb={3}>
        <Icon as={icon} w={6} h={6} color="purple.400" mr={2} />
        <Text fontWeight="medium" color="gray.300">{label}</Text>
      </Flex>
      <Stat>
        <StatNumber fontSize="2xl" fontWeight="bold" color="white">{value}</StatNumber>
        <StatLabel fontSize="sm" color="gray.400">{unit}</StatLabel>
      </Stat>
    </Box>
  );
};

const Stats = () => {
  return (
    <Box bg="gray.900" py={12}>
      <Container maxW="container.xl">
        <Box textAlign="center" mb={10}>
          <Text fontSize="xl" fontWeight="medium" color="purple.400">How Much You'll Earn?</Text>
        </Box>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
          <StatCard 
            icon={BitcoinIcon}
            label="Daily Earnings" 
            value="0.0085" 
            unit="BTC (~$418 USD)"
          />
          <StatCard 
            icon={TrendingUpIcon}
            label="Monthly ROI" 
            value="31.5%" 
            unit="Average Return Rate"
          />
          <StatCard 
            icon={ChartLineIcon}
            label="Hashrate" 
            value="215" 
            unit="TH/s"
          />
          <StatCard 
            icon={DollarSignIcon}
            label="Total Withdrawn" 
            value="$2,583,464" 
            unit="Last 30 Days"
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Stats;