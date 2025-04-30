import {
    Box, Heading, Text, Select, Button, Image, useDisclosure,
    Modal, ModalOverlay, ModalContent, ModalBody, Stack, Flex, useBreakpointValue
  } from '@chakra-ui/react';
  import axios from 'axios';
  import { useEffect, useState } from 'react';
  
  export default function AllTransactions() {
    const [transactions, setTransactions] = useState([]);
    const [filter, setFilter] = useState('all');
    const [selectedImage, setSelectedImage] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const isMobile = useBreakpointValue({ base: true, md: false });
  
    useEffect(() => {
      axios.get('/api/admin/transactions')
        .then(res => setTransactions(res.data))
        .catch(() => alert('Failed to load transactions'));
    }, []);
  
    const filtered = filter === 'all'
      ? transactions
      : transactions.filter(tx => tx.status === filter);
  
    const confirmTransaction = (userId, txId, status) => {
      axios.post(`/api/admin/confirm-transaction`, { userId, txId, status })
        .then(() => {
          setTransactions(prev =>
            prev.map(tx => tx._id === txId ? { ...tx, status } : tx)
          );
          alert(`Marked as ${status}`);
        })
        .catch(() => alert('Failed to update transaction'));
    };
  
    return (
      <Box p={[3, 5]}>
        <Heading size="md" mb={4}>All Transactions</Heading>
  
        <Select w="200px" mb={4} value={filter} onChange={e => setFilter(e.target.value)}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="successful">Successful</option>
          <option value="unsuccessful">Unsuccessful</option>
        </Select>
  
        <Stack spacing={4}>
          {filtered.map(tx => (
            <Box
              key={tx._id}
              borderWidth="1px"
              borderRadius="md"
              p={4}
              shadow="sm"
              bg="white"
              _hover={{ shadow: 'md' }}
              overflowX="auto"
            >
              <Flex direction={['column', 'row']} justify="space-between" wrap="wrap">
                <Box flex="1" minW="200px" mb={[2, 0]}>
                  <Text fontWeight="bold">ID:</Text>
                  <Text>{tx._id.slice(0, 8)}...</Text>
                </Box>
                <Box flex="1" minW="200px" mb={[2, 0]}>
                  <Text fontWeight="bold">User:</Text>
                  <Text>{tx.userName} ({tx.userEmail})</Text>
                </Box>
                <Box flex="1" minW="100px" mb={[2, 0]}>
                  <Text fontWeight="bold">Coin:</Text>
                  <Text>{tx.coin.toUpperCase()}</Text>
                </Box>
                <Box flex="1" minW="100px" mb={[2, 0]}>
                  <Text fontWeight="bold">Amount:</Text>
                  <Text>${tx.amount}</Text>
                </Box>
                <Box flex="1" minW="150px" mb={[2, 0]}>
                  <Text fontWeight="bold">Type:</Text>
                  <Text>{tx.type}</Text>
                </Box>
                <Box flex="1" minW="150px" mb={[2, 0]}>
                  <Text fontWeight="bold">Date:</Text>
                  <Text>{new Date(tx.date).toLocaleDateString()}</Text>
                </Box>
                <Box flex="1" minW="120px" mb={[2, 0]}>
                  <Text fontWeight="bold">Status:</Text>
                  <Text color={
                    tx.status === 'pending' ? 'orange.400' :
                      tx.status === 'successful' ? 'green.500' : 'red.400'
                  }>
                    {tx.status}
                  </Text>
                </Box>
  
                <Box flex="1" minW="100px">
                  {tx.proofImage &&
                    <Button size="xs" onClick={() => {
                      setSelectedImage(tx.proofImage);
                      onOpen();
                    }}>
                      View Proof
                    </Button>}
                </Box>
  
                {tx.status === 'pending' && (
                  <Flex gap={2} mt={[3, 0]} flexWrap="wrap">
                    <Button
                      size="xs" colorScheme="green"
                      onClick={() => confirmTransaction(tx.userId, tx._id, 'successful')}>
                      Confirm
                    </Button>
                    <Button
                      size="xs" colorScheme="red"
                      onClick={() => confirmTransaction(tx.userId, tx._id, 'unsuccessful')}>
                      Reject
                    </Button>
                  </Flex>
                )}
              </Flex>
            </Box>
          ))}
        </Stack>
  
        {/* Modal to view image */}
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
  