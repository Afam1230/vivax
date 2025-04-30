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
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [txLoading, setTxLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();


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
      setSelectedUser(userId);
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

  // Function to confirm a pending transaction
  const confirmTransaction = async (txId, status) => {
    try {
      await axios.post('/api/admin/confirm-transaction', {
        userId: selectedUser,
        txId,
        status,
      });

      // Update transaction status in UI
      setTransactions(prev =>
        prev.map(tx =>
          tx._id === txId ? { ...tx, status } : tx
        )
      );

      alert(`Transaction marked as ${status}`);
    } catch (err) {
      console.error(err);
      alert('Failed to update transaction');
    }
  };


  return (
    <Box p={5}>
      <Text fontSize="2xl" mb={4} fontWeight="bold">
        All Users
      </Text>

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
                  <Td>
                    ${user.balance.usd} / {user.balance.btc} BTC /{' '}
                    {user.balance.eth} ETH
                  </Td>
                  <Td>
                    ${user.earnings.USD} / {user.earnings.BTC} BTC /{' '}
                    {user.earnings.ETH} ETH
                  </Td>
                  <Td>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      mr={2}
                      onClick={() => navigate(`/admin/manage-users/${user._id}`)}
                    >
                      View / Edit
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="teal"
                      onClick={() => openTransactionModal(user._id)}
                    >
                      View Transactions
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}

      {/* Transactions Modal */}
      <Modal isOpen={isModalOpen} onClose={closeModal} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            Transactions for{' '}
            {users.find(u => u._id === selectedUser)?.name || 'User'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {txLoading ? (
              <Spinner />
            ) : transactions.length ? (
              <VStack spacing={4} align="stretch">
                {transactions.map(tx => (
                  <Box
                    key={tx._id}
                    p={3}
                    borderWidth="1px"
                    borderRadius="md"
                  >
                    <Text>
                      <strong>ID:</strong> {tx._id}
                    </Text>
                    <Text>
                      <strong>Type:</strong> {tx.type}
                    </Text>
                    <Text>
                    {tx.PurchaseCoin? (<strong>Payment-Coin:</strong>) : <strong>Deposit-Coin:</strong> } {tx.coin.toUpperCase()}
                    </Text>
                    <Text>
                      <strong>Amount:</strong> {tx.amount}
                    </Text>
                    <Text>
                      <strong>Status:</strong> {tx.status}
                    </Text>
                    <Text>
                      <strong>Date:</strong>{' '}
                      {new Date(tx.date).toLocaleString()}
                    </Text>
                    {tx.PurchaseCoin && (
                      <Text>
                        <strong>Purchased coin:</strong> {tx.PurchaseCoin}
                      </Text>
                    )}
                    {tx.proofImage && (
                      <Button
                        size="sm"
                        mt={2}
                        onClick={() => {
                          setSelectedImage(tx.proofImage);
                          onOpen();
                        }}
                      >
                        View Proof
                      </Button>
                    )}


                    {/* Confirm Button for Pending Transactions */}
                    {tx.status === 'pending' && (
                      <Flex mt={3} gap={2} flexWrap="wrap">
                        <Button
                          size="sm"
                          colorScheme="green"
                          onClick={() => confirmTransaction(tx._id, 'successful')}
                        >
                          Confirm
                        </Button>
                        <Button
                          size="sm"
                          colorScheme="red"
                          onClick={() => confirmTransaction(tx._id, 'unsuccessful')}
                        >
                          Reject
                        </Button>
                      </Flex>
                    )}

                  </Box>
                ))}
              </VStack>
            ) : (
              <Text>No transactions found.</Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
