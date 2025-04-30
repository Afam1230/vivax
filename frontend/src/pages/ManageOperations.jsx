import { Box, Heading, Input, Button, VStack, HStack, Text, Spinner } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function ManageOperations() {
  const [exchangeRates, setExchangeRates] = useState({ BTC: 0, ETH: 0, USD: 0 });
  const [walletAddresses, setWalletAddresses] = useState({ BTC: '', ETH: '', USD: '' });
  const [transactionCharge, setTransactionCharge] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('/api/admin/operation-settings')
      .then(res => {
        setExchangeRates(res.data.exchangeRates);
        setWalletAddresses(res.data.walletAddresses);
        setTransactionCharge(res.data.transactionCharge);
      })
      .catch(() => alert('Error loading settings'));
  }, []);

  const handleSave = () => {
    setLoading(true);
    axios.put('/api/admin/operation-settings', {
      exchangeRates,
      walletAddresses,
      transactionCharge,
    })
    .then(() => alert('Settings updated successfully'))
    .catch(() => alert('Error updating settings'))
    .finally(() => setLoading(false));
  };

  return (
    <Box p={5}>
      <Heading mb={6}>Manage Operations</Heading>

      <VStack spacing={6} align="start">
        <Text fontWeight="bold">Exchange Rates (USD to Crypto):</Text>
        <HStack>
          <Text>BTC:</Text>
          <Input
            value={exchangeRates.BTC}
            type="number"
            onChange={(e) => setExchangeRates(prev => ({ ...prev, BTC: e.target.value }))}
            width="200px"
          />
        </HStack>
        <HStack>
          <Text>ETH:</Text>
          <Input
            value={exchangeRates.ETH}
            type="number"
            onChange={(e) => setExchangeRates(prev => ({ ...prev, ETH: e.target.value }))}
            width="200px"
          />
        </HStack>
        <HStack>
          <Text>USD:</Text>
          <Input
            value={exchangeRates.USD}
            type="number"
            onChange={(e) => setExchangeRates(prev => ({ ...prev, USD: e.target.value }))}
            width="200px"
          />
        </HStack>

        <Text fontWeight="bold">Deposit Wallet Addresses:</Text>
        <HStack>
          <Text>BTC:</Text>
          <Input
            value={walletAddresses.BTC}
            onChange={(e) => setWalletAddresses(prev => ({ ...prev, BTC: e.target.value }))}
            width="200px"
          />
        </HStack>
        <HStack>
          <Text>ETH:</Text>
          <Input
            value={walletAddresses.ETH}
            onChange={(e) => setWalletAddresses(prev => ({ ...prev, ETH: e.target.value }))}
            width="200px"
          />
        </HStack>
        <HStack>
          <Text>USD:</Text>
          <Input
            value={walletAddresses.USD}
            onChange={(e) => setWalletAddresses(prev => ({ ...prev, USD: e.target.value }))}
            width="200px"
          />
        </HStack>

        <Text fontWeight="bold">Transaction Charge (%):</Text>
        <Input
          value={transactionCharge}
          type="number"
          onChange={(e) => setTransactionCharge(e.target.value)}
          width="200px"
        />

        <Button
          mt={6}
          colorScheme="blue"
          onClick={handleSave}
          isLoading={loading}
        >
          Save Changes
        </Button>
      </VStack>
    </Box>
  );
}
