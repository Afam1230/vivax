import { useEffect, useState } from "react";
import {
  Box, Heading, Text, VStack, Spinner, Badge, Icon, SimpleGrid, useToast, Accordion, AccordionItem,
  AccordionButton, AccordionPanel, AccordionIcon, Select, HStack
} from "@chakra-ui/react";
import { FaBitcoin, FaEthereum, FaDollarSign, FaArrowDown, FaArrowUp } from "react-icons/fa";
import axios from "axios";

const iconMap = {
  BTC: FaBitcoin,
  ETH: FaEthereum,
  USD: FaDollarSign,
};

const statusColor = {
  pending: "orange",
  successful: "green",
  unsuccessful: "red",
};

const TransactionHistoryPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const toast = useToast();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await axios.get(`/api/user/transactions/${userId}`);
        setTransactions(res.data.reverse());
      } catch (err) {
        toast({
          title: "Error fetching transactions",
          description: "Try again later.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, []);

  const filteredTransactions = transactions.filter(tx => {
    const matchType = typeFilter === "all" || tx.type === typeFilter;
    const matchStatus = statusFilter === "all" || tx.status === statusFilter;
    return matchType && matchStatus;
  });

  if (loading) {
    return (
      <Box textAlign="center" mt={10}>
        <Spinner size="lg" />
        <Text mt={4}>Loading transaction history...</Text>
      </Box>
    );
  }

  return (
    <Box maxW="4xl" mx="auto" py={10} px={4}>
      <Heading mb={6} fontSize="2xl" textAlign="center">Transaction History</Heading>

      {/* Filters */}
      <HStack spacing={4} mb={6} justify="center">
        <Select
          placeholder="Filter by Type"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          width="200px"
        >
          <option value="deposit">Deposit</option>
          <option value="withdrawal">Withdrawal</option>
          <option value="plan-purchase">Plan Purchase</option>
          <option value="daily-return">Daily Return</option>
        </Select>

        <Select
          placeholder="Filter by Status"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          width="200px"
        >
          <option value="pending">Pending</option>
          <option value="successful">Successful</option>
          <option value="unsuccessful">Unsuccessful</option>
        </Select>
      </HStack>

      {filteredTransactions.length === 0 ? (
        <Text textAlign="center">No transactions match the selected filters.</Text>
      ) : (
        <Accordion allowMultiple>
          {filteredTransactions.map((tx, index) => (
            <AccordionItem key={tx._id || index} border="1px solid #eee" rounded="md" mb={4}>
              <AccordionButton _expanded={{ bg: "gray.100" }}>
                <Box flex="1" textAlign="left">
                  <SimpleGrid columns={[1, 2, 3]} spacing={2}>
                    <Text>
                      <Icon as={iconMap[tx.PurchaseCoin]} mr={2} />
                      {tx.type === "withdrawal" ? (
                        <FaArrowUp style={{ display: "inline", marginRight: "6px", color: "red" }} />
                      ) : (
                        <FaArrowDown style={{ display: "inline", marginRight: "6px", color: "green" }} />
                      )}
                      {tx.type.toUpperCase()}
                    </Text>
                    <Text fontWeight="bold">{tx.amount} {tx.PurchaseCoin}</Text>
                    <Badge colorScheme={statusColor[tx.status]}>{tx.status}</Badge>
                  </SimpleGrid>
                </Box>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel pb={4}>
                <VStack align="start" spacing={1}>
                  <Text><strong>Transaction ID:</strong> {tx._id}</Text>
                  <Text><strong>Coin Sent:</strong> {tx.coin}</Text>
                  <Text><strong>Coin Bought:</strong> {tx.PurchaseCoin}</Text>
                  <Text><strong>Amount:</strong> {tx.amount}</Text>
                  <Text><strong>Status:</strong> {tx.status}</Text>
                  <Text><strong>Date:</strong> {new Date(tx.date).toLocaleString()}</Text>
                  {tx.details && <Text><strong>Details:</strong> {tx.details}</Text>}
                  {tx.proofImage && (
                    <Box>
                      <strong>Proof:</strong><br />
                      <img src={tx.proofImage} alt="Proof" style={{ maxWidth: "100%", marginTop: "5px" }} />
                    </Box>
                  )}
                </VStack>
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </Box>
  );
};

export default TransactionHistoryPage;
