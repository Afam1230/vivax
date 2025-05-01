import React, { useEffect } from "react";
import { Box, useBreakpointValue, Grid, Heading, Text, VStack, SimpleGrid, Flex, Stack, Button } from "@chakra-ui/react";
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from "../store/useAuthStore";
import CryptoPricesWidget from "../components/CryptoPricesWidget";
import CryptoConverterWidget from "../components/CryptoConverterWidget";
import CryptoGraphWidget from "../components/CryptoGraphWidget";
import MarketTrendsWidget from "../components/MarketTrendsWidget";
import CryptoRSSWidget from "../components/CryptoRssWidget";
import CryptoInfoWidget from '../components/CryptoInfoWidget';
import CryptoNewsFeed from "../components/CryptoNewsFeed";
import TopLosers from "../components/TopLosers";
import {
  BalanceCard,
  DailyProfitCard,
  ActivePlansCard,
  TotalReturnsCard,
  PortfolioPerformance,
  ActiveInvestments,
  WalletBalanceCard
} from "../components/DashboardComponents";
import { getCryptoRates } from "../utils/getCryptoRates";
import {useDashboardStore}  from "../store/useDashboardStore";
import useOperationSettingsStore from "../store/useOperationSettingsStore";

const Dashboard = () => {
  const { user, fetchUser } = useAuthStore();
  const { settings, fetchSettings } = useOperationSettingsStore();
  const rates = getCryptoRates();
  const navigate = useNavigate();
  const {
    error,
    dailyProfit,
    activePlansCount,
    totalReturns,
    activeInvestments,
    fetchDashboard,
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  
      useEffect(() => {
          fetchSettings(); // or skip if already called elsewhere
      }, []);


  useEffect(() => {
    fetchUser(); // fetch fresh user data when dashboard loads
  }, [fetchUser]);



  const layout = useBreakpointValue({ base: "column", md: "row" });
  const coins = ['bitcoin', 'ethereum', 'dogecoin', 'litecoin'];
  const balance = user?.balance
  const totalUSD =
    balance.btc * settings.exchangeRates.BTC +
    balance.eth * settings.exchangeRates.ETH +
    balance.usd * 1;

  return (
    <Box p={{ base: 4, md: 10 }} position={'relative'} overflow="hidden" bg="#0D1B2A" minH="100vh" color="white">
      <Box
        position="absolute"
        inset={0}
        bg="transparent"
        zIndex={0}
        _before={{
          content: `""`,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '300%',
          height: '300%',
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.4) 1px, transparent 0.5px)',
          backgroundSize: '40px 40px',
          animation: 'moveBackground 60s linear infinite',
        }}
      />
      <Box zIndex={1}>
        <Box>
          <Stack>
            <Heading size="xl">Welcome back{user?.name ? `, ${user.name}` : ""} 👋</Heading>
            <Text mt={2} fontSize="lg" color="gray.300">
              Here’s your crypto portfolio overview
            </Text>
            <Box>
              <Button onClick={() => navigate('/pricing')} bg="purple.500" color="white" _hover={{ bg: "purple.600" }}>
                + New Investment
              </Button>            </Box>
          </Stack>

        </Box>
        <Box p={[4, 6, 8]} bg="#0D1B2A" h={'auto'} w={'auto'}>
          {/* Top Cards */}
          <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={6} mb={8}>
            <BalanceCard balance={totalUSD} />
            <WalletBalanceCard balance={user?.balance} />
            <DailyProfitCard profit={dailyProfit} />
            <ActivePlansCard count={activePlansCount} />
            <TotalReturnsCard returns={totalReturns} />
          </SimpleGrid>

          {/* Active Investments */}
          <ActiveInvestments data={activeInvestments} />
        </Box>
        <VStack align="center" spacing={6}>
          {/* Widgets Section */}
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} w="100%">
            <CryptoPricesWidget />

            <CryptoGraphWidget />

            <CryptoConverterWidget />
          </SimpleGrid>

          {/* Market Trends */}
          <Box w="100%" mt={10}>
            <Heading size="lg" mb={4}>📊 Market Trends</Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <Box bg="#1B263B" p={4} borderRadius="xl" justifyContent={'center'}>
                <MarketTrendsWidget />
              </Box>

              <Box bg="#1B263B" p={4} borderRadius="xl" >
                <TopLosers />
              </Box>
            </SimpleGrid>
          </Box>

          <Box p={6} bg="gray.700" minH="100vh" width={'full'} rounded={30}>
            <Heading color="teal.300" mb={6}>
              Your Crypto Overview
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {coins.map((coin) => (
                <CryptoInfoWidget key={coin} coin={coin} currency="usd" />
              ))}
            </SimpleGrid>
          </Box>

          <Box p={6} w={'full'} h={'auto'}>
            <Heading as="h1" mb={6} color="teal.500">
              Crypto Dashboard
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              <CryptoRSSWidget coin="bitcoin" currency="usd" />
              <CryptoRSSWidget coin="ethereum" currency="usd" />
              <CryptoRSSWidget coin="dogecoin" currency="usd" />
            </SimpleGrid>
          </Box>
        </VStack>
      </Box>
    </Box>
  );
};

export default Dashboard;
