import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Text,
  useDisclosure,
  Image,
  Button,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Icon,
  Badge,
  SimpleGrid,
  HStack,
  Select,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaBitcoin, FaEthereum, FaDollarSign, FaArrowUp, FaArrowDown } from "react-icons/fa";

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

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [txLoading, setTxLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [filteredTxs, setFilteredTxs] = useState([]);
  const [filters, setFilters] = useState({ type: '', status: '', coin: '' });
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const {
    isOpen: isProofOpen,
    onOpen: openProof,
    onClose: closeProof,
  } = useDisclosure();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('/api/admin/users')
      .then(res => setUsers(res.data))
      .catch(() => alert('Error fetching users'))
      .finally(() => setLoading(false));
  }, []);

  const openTransactionModal = async (userId) => {
    setTxLoading(true);
    try {
      const res = await axios.get(`/api/admin/users/${userId}/transactions`);
      setTransactions(res.data);
      setFilteredTxs(res.data);
      setSelectedUser(userId);
      setFilters({ type: '', status: '', coin: '' });
      setModalOpen(true);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch transactions');
    } finally {
      setTxLoading(false);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setTransactions([]);
    setSelectedUser(null);
  };

  const confirmTransaction = async (txId, status) => {
    try {
      await axios.post('/api/admin/confirm-transaction', {
        userId: selectedUser,
        txId,
        status,
      });

      setTransactions(prev =>
        prev.map(tx => (tx._id === txId ? { ...tx, status } : tx))
      );
      setFilteredTxs(prev =>
        prev.map(tx => (tx._id === txId ? { ...tx, status } : tx))
      );

      alert(`Transaction marked as ${status}`);
    } catch (err) {
      console.error(err);
      alert('Failed to update transaction');
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    const updatedFilters = { ...filters, [name]: value };
    setFilters(updatedFilters);

    const filtered = transactions.filter(tx =>
      (!updatedFilters.type || tx.type === updatedFilters.type) &&
      (!updatedFilters.status || tx.status === updatedFilters.status) &&
      (!updatedFilters.coin || tx.coin?.toLowerCase() === updatedFilters.coin.toLowerCase())
    );
    setFilteredTxs(filtered);
  };

  return (
    <Box p={5}>
      <Text fontSize="2xl" mb={4} fontWeight="bold">All Users</Text>

      {loading ? (
        <Spinner size="xl" />
      ) : (
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Balance (USD / BTC / ETH)</Th>
                <Th>Earnings (USD / BTC / ETH)</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map(user => (
                <Tr key={user._id}>
                  <Td>{user.name}</Td>
                  <Td>{user.email}</Td>
                  <Td>${user.balance.usd} / {user.balance.btc} BTC / {user.balance.eth} ETH</Td>
                  <Td>${user.earnings.USD} / {user.earnings.BTC} BTC / {user.earnings.ETH} ETH</Td>
                  <Td>
                    <Button size="sm" colorScheme="blue" mr={2} onClick={() => navigate(`/admin/manage-users/${user._id}`)}>View / Edit</Button>
                    <Button size="sm" colorScheme="teal" onClick={() => openTransactionModal(user._id)}>View Transactions</Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      {/* Transactions Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Transactions for {users.find(u => u._id === selectedUser)?.name || 'User'}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {txLoading ? (
              <Spinner />
            ) : (
              <>
                <HStack spacing={4} mb={4}>
                  <Select placeholder="Filter by Type" name="type" value={filters.type} onChange={handleFilterChange}>
                    <option value="deposit">Deposit</option>
                    <option value="withdrawal">Withdrawal</option>
                  </Select>
                  <Select placeholder="Filter by Status" name="status" value={filters.status} onChange={handleFilterChange}>
                    <option value="pending">Pending</option>
                    <option value="successful">Successful</option>
                    <option value="unsuccessful">Unsuccessful</option>
                  </Select>
                  <Select placeholder="Filter by Coin" name="coin" value={filters.coin} onChange={handleFilterChange}>
                    <option value="btc">BTC</option>
                    <option value="eth">ETH</option>
                    <option value="usd">USD</option>
                  </Select>
                </HStack>

                {filteredTxs.length ? (
                  <Accordion allowMultiple>
                    {filteredTxs.map(tx => {
                      const CoinIcon = iconMap[tx.coin?.toLowerCase()] || FaDollarSign;
                      return (
                        <AccordionItem key={tx._id}>
                          <AccordionButton>
                            <Box flex="1" textAlign="left">
                              <SimpleGrid columns={[1, 2, 3]} spacing={2}>
                                <HStack>
                                  <Icon as={CoinIcon} />
                                  <Text>
                                    {tx.type === "withdrawal" ? <FaArrowUp color="red" /> : <FaArrowDown color="green" />}
                                    {tx.type.toUpperCase()}
                                  </Text>
                                </HStack>
                                <Text fontWeight="bold">{tx.amount} {tx.coin?.toUpperCase()}</Text>
                                <Badge colorScheme={statusColor[tx.status]}>{tx.status}</Badge>
                              </SimpleGrid>
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                          <AccordionPanel pb={4}>
                            <VStack align="start" spacing={1} fontSize="sm">
                              <Text><strong>Transaction ID:</strong> {tx._id}</Text>
                              <Text><strong>Amount:</strong> {tx.amount}</Text>
                              <Text><strong>Date:</strong> {new Date(tx.date).toLocaleString()}</Text>
                              {tx.details && (
                                <>
                                  {tx.details.walletAddress ? (
                                    <Text><strong>Wallet:</strong> {tx.details.walletAddress}</Text>
                                  ) : tx.details.accountNumber && (
                                    <>
                                      <Text><strong>Bank:</strong> {tx.details.bankName}</Text>
                                      <Text><strong>Account:</strong> {tx.details.accountNumber}</Text>
                                    </>
                                  )}
                                  <Text><strong>Wire Amount:</strong> {tx.details.wireAmount}</Text>
                                </>
                              )}
                              {tx.proofImage && (
                                <Button size="sm" colorScheme="purple" onClick={() => { setSelectedImage(tx.proofImage); openProof(); }}>
                                  View Proof
                                </Button>
                              )}
                              {tx.status === 'pending' && (
                                <Flex mt={3} gap={2} flexWrap="wrap">
                                  <Button size="sm" colorScheme="green" onClick={() => confirmTransaction(tx._id, 'successful')}>Confirm</Button>
                                  <Button size="sm" colorScheme="red" onClick={() => confirmTransaction(tx._id, 'unsuccessful')}>Reject</Button>
                                </Flex>
                              )}
                            </VStack>
                          </AccordionPanel>
                        </AccordionItem>
                      );
                    })}
                  </Accordion>
                ) : (
                  <Text>No transactions match the selected filters.</Text>
                )}
              </>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Proof Image Modal */}
      <Modal isOpen={isProofOpen} onClose={closeProof} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalBody p={4}>
            <Image src={selectedImage} maxH="80vh" mx="auto" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}
