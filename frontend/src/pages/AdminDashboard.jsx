import { Box, Grid, Text, Flex, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaUsers, FaCheckCircle, FaClock, FaClipboardList, FaEdit, FaCubes,FaScrewdriver } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const cardData = [
  {
    title: "Total Users",
    count: 0, // You'll fetch this from the backend
    icon: FaUsers,
    color: "blue.500",
    route: "/admin/users"
  },
  {
    title: "Manage Plans",
    icon: FaCubes,
    color: "orange.400",
    route: "/admin/plans"
  },
  // {
  //   title: "Successful Transactions",
  //   icon: FaCheckCircle,
  //   color: "green.400",
  //   route: "/admin/transactions/successful"
  // },
  // {
  //   title: "Pending Transactions",
  //   icon: FaClock,
  //   color: "red.400",
  //   route: "/admin/transactions/pending"
  // },
  {
    title: "All Transactions",
    icon: FaClipboardList,
    color: "teal.500",
    route: "/admin/transactions"
  },
  // {
  //   title: "Manage Users",
  //   icon: FaEdit,
  //   color: "pink.400",
  //   route: "/admin/manage-users"
  // },
  {
    title: "Manage operation",
    icon: FaScrewdriver,
    color: "red.400",
    route: "/admin/manage-operations"
  },
];

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <Box p={5}>
      <Grid templateColumns="repeat(auto-fill, minmax(230px, 1fr))" gap={6}>
        {cardData.map((card, idx) => (
          <Box
            key={idx}
            bg={useColorModeValue('white', 'gray.800')}
            shadow="md"
            rounded="md"
            p={5}
            cursor="pointer"
            onClick={() => navigate(card.route)}
            _hover={{ transform: "scale(1.05)", transition: "all 0.2s" }}
          >
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontSize="xl" fontWeight="bold">{card.title}</Text>
                {card.count !== undefined && <Text fontSize="2xl">{card.count}</Text>}
              </Box>
              <Icon as={card.icon} boxSize={10} color={card.color} />
            </Flex>
            <Text mt={3} color="gray.500">More info →</Text>
          </Box>
        ))}
      </Grid>
    </Box>
  );
}
