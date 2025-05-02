
import { Box, Container, Heading, Text, SimpleGrid, Table, Thead, Tbody, Tr, Th, Td, TableContainer, HStack } from "@chakra-ui/react";

const TransactionTable = ({ title, transactions, showAmount = true }) => {
  return (
    <Box 
      bg="rgba(30, 30, 60, 0.5)" 
      borderRadius="lg" 
      overflow="hidden"
      border="1px solid"
      borderColor="gray.700"
    >
      <Box p={4} borderBottom="1px solid" borderColor="gray.700">
        <Heading as="h3" size="md" color="white">{title}</Heading>
      </Box>
      <TableContainer>
        <Table variant="simple" size="sm">
          <Thead bg="gray.800">
            <Tr>
              <Th color="gray.400">User</Th>
              <Th color="gray.400">Time</Th>
              {showAmount && <Th color="gray.400" isNumeric>Amount</Th>}
            </Tr>
          </Thead>
          <Tbody>
            {transactions.map((tx, index) => (
              <Tr key={index} _hover={{ bg: "rgba(139, 92, 246, 0.1)" }}>
                <Td color="gray.300">{tx.user}</Td>
                <Td color="gray.400">{tx.time}</Td>
                {showAmount && <Td color={tx.amount.includes('+') ? "green.300" : "white"} isNumeric>{tx.amount}</Td>}
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

const Transactions = () => {
  const deposits = [
    { user: "0x7Fc4...b28E", time: "2 mins ago", amount: "+0.58 ETH" },
    { user: "0x3Ae9...92fA", time: "5 mins ago", amount: "+1.23 BTC" },
    { user: "0x9B2c...45dF", time: "12 mins ago", amount: "+2450 USDT" },
    { user: "0x5D1e...f37B", time: "18 mins ago", amount: "+0.87 ETH" },
    { user: "0x2C8a...11cD", time: "25 mins ago", amount: "+0.45 BTC" },
  ];
  
  const withdrawals = [
    { user: "0x4B5c...a19D", time: "3 mins ago", amount: "0.76 ETH" },
    { user: "0x8F3d...e56C", time: "8 mins ago", amount: "0.92 BTC" },
    { user: "0x1A7b...49eE", time: "15 mins ago", amount: "3200 USDT" },
    { user: "0x6E4f...c28D", time: "22 mins ago", amount: "1.34 ETH" },
    { user: "0xD23a...78bF", time: "30 mins ago", amount: "0.51 BTC" },
  ];
  
  return (
    <Box bg="gray.900" py={16}>
      <Container maxW="container.xl">
        <Box textAlign="center" mb={12}>
          <Text color="purple.400" fontWeight="bold" mb={3}>TRANSACTION LOG</Text>
          <Heading as="h2" size="xl" color="white" mb={5}>
            Live Platform Activity
          </Heading>
        </Box>
        
        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
          <TransactionTable title="Latest Deposits" transactions={deposits} />
          <TransactionTable title="Latest Withdrawals" transactions={withdrawals} />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Transactions;