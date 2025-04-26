// src/pages/AdminPlansPage.jsx
import React, { useState } from 'react';
import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { FaBitcoin, FaEthereum, FaDollarSign } from 'react-icons/fa';
import PlanList from '../components/PlanList';
import { useNavigate } from 'react-router-dom';

export default function AdminPlansPage() {
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const navigate = useNavigate();

  const handleMine = (planId) => {
    // For admin, maybe view details; here just navigate
    navigate(`/payment/${planId}`);
  };

  return (
    <Box p={[4, 6, 8]} bg="#0D1B2A" minH="100vh">
      <Text fontSize="2xl" fontWeight="bold" color="white" mb={6}>
        Admin: Manage Mining Plans
      </Text>

      {/* Coin Selector */}
      <HStack spacing={4} mb={6} justifyContent={{ base: 'center', md: 'flex-start' }}>
        <Button
          leftIcon={<FaBitcoin />}
          colorScheme={selectedCoin === 'BTC' ? 'orange' : 'gray'}
          onClick={() => setSelectedCoin('BTC')}
        >
          BTC Plans
        </Button>
        <Button
          leftIcon={<FaEthereum />}
          colorScheme={selectedCoin === 'ETH' ? 'blue' : 'gray'}
          onClick={() => setSelectedCoin('ETH')}
        >
          ETH Plans
        </Button>
        <Button
          leftIcon={<FaDollarSign />}
          colorScheme={selectedCoin === 'USD' ? 'green' : 'gray'}
          onClick={() => setSelectedCoin('USD')}
        >
          USD Plans
        </Button>
      </HStack>

      {/* Plan List with admin controls */}
      <PlanList
        coin={selectedCoin}
        onMine={handleMine}
        isAdmin={true}
      />
    </Box>
  );
}
