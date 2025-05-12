import { useEffect, useState } from "react";
import {
  Box, Heading, Text, VStack, Spinner, Badge, Icon, SimpleGrid, useToast, Accordion, AccordionItem,
  AccordionButton, AccordionPanel, AccordionIcon, Select, HStack
} from "@chakra-ui/react";
import { FaBitcoin, FaEthereum, FaDollarSign, FaArrowDown, FaArrowUp } from "react-icons/fa";
import axios from "axios";

const iconMap = {
  btc: FaBitcoin,
  eth: FaEthereum,
  usd: FaDollarSign,
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
  }, [userId, toast]);

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
          {filteredTransactions.map((tx, index) => {
            const CoinIcon = iconMap[tx.coin.toLowerCase()] || FaDollarSign;
            return (
              <AccordionItem key={tx._id || index} border="1px solid #eee" rounded="md" mb={4}>
                <AccordionButton _expanded={{ bg: "gray.100" }}>
                  <Box flex="1" textAlign="left">
                    <SimpleGrid columns={[1, 2, 3]} spacing={2}>
                      <HStack>
                      <Text>
                        <Icon as={CoinIcon} mr={2} />
                        {tx.type === "withdrawal" ? (
                          <FaArrowUp style={{ display: "inline", marginRight: "6px", color: "red" }} />
                        ) : (
                          <FaArrowDown style={{ display: "inline", marginRight: "6px", color: "green" }} />
                        )}
                        {tx.type.toUpperCase()}
                      </Text>
                      {tx.planData && (<Text fontSize={13} color={"blue"}>(Plan purchase)</Text>)}
                      </HStack>
                      <Text fontWeight="bold">{tx.amount} {tx.type === "deposit" ? (tx.details.coinPurchased) : (tx.coin.toUpperCase())}</Text>
                      <Badge colorScheme={statusColor[tx.status]}>{tx.status}</Badge>
                    </SimpleGrid>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack align="start" spacing={1} fontSize="sm">
                    <Text><strong>Transaction ID:</strong> {tx._id}</Text>
                    {tx.type === "deposit" ? (
                      <Box>
                        <Text><strong>Deposited coin:</strong> {tx.details.coinPurchased.toUpperCase()}</Text>
                        <Text><strong>Deposit Amount:</strong> {tx.amount}</Text>
                        <Text><strong>Payment Gateway:</strong> {tx.details.paymentGateway.toUpperCase()}</Text>
                        <Text><strong>Payment Amount:</strong> {tx.details.AmountPaid}</Text>
                        <Text><strong>Statement:</strong> {tx.details.statement}</Text>
                      </Box>
                    ) : (
                      <Box>
                        <Text><strong>Coin:</strong> {tx.coin.toUpperCase()}</Text>
                        <Text><strong>Amount:</strong> {tx.amount}</Text>
                      </Box>
                    )}
                    <Text><strong>Status:</strong> {tx.status.toUpperCase()}</Text>
                    {/* details section */}
                    {tx.type === "deposit" ? (
                      <Box>
                        {/* if deposit, no details is displayed */}
                      </Box>
                    ) : (
                      <Box>
                        {!tx.details.walletAddress ? (
                          <Box>
                            {/* user withdrew to bank */}
                            <Text><strong>Bank Account Number:</strong> {tx.details.accountNumber}</Text>
                            <Text><strong>Account Holder Name:</strong> {tx.details.accountHolder.toUpperCase()}</Text>
                            <Text><strong>Bank Name:</strong> {tx.details.bankName.toUpperCase()}</Text>
                            <Text><strong>Routing number:</strong> {tx.details.routingNumber}</Text>
                            <Text><strong>Wire Fee:</strong> {tx.details.wireFee}</Text>
                            <Text><strong>Wire Amount:</strong> {tx.details.wireAmount}</Text>

                          </Box>
                        ) : (
                          <Box>
                            {/* user withdrew to crypto wallet */}
                            <Text><strong>Wallet Address:</strong> {tx.details.walletAddress.toUpperCase()}</Text>
                            <Text><strong>Wire Fee:</strong> {tx.details.wireFee}</Text>
                            <Text><strong>Wire Amount:</strong> {tx.details.wireAmount}</Text>

                          </Box>
                        )}
                      </Box>
                    )}
                    <Text><strong>Date:</strong> {new Date(tx.date).toLocaleString()}</Text>
                    {tx.proofImage && (
                      <Box>
                        <strong>Proof:</strong><br />
                        <img src={tx.proofImage} alt="Proof" style={{ maxWidth: "100%", marginTop: "5px" }} />
                      </Box>
                    )}
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </Box>
  );
};

export default TransactionHistoryPage;
//add diaplay for plan purchase (tx.planData)
