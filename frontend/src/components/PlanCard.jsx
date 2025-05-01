// src/components/PlanCard.jsx
import {
    Box,
    Text,
    VStack,
    Button,
    HStack,
    IconButton,
    useColorModeValue,
  } from "@chakra-ui/react";
  import { FaDollarSign, FaBitcoin, FaEthereum } from "react-icons/fa";
  import { MdDelete, MdEdit } from "react-icons/md";
  
  const currencyIcons = {
    BTC: <FaBitcoin />,
    ETH: <FaEthereum />,
    USD: <FaDollarSign />,
  };
  
  const PlanCard = ({ plan, coin, onMine, onEdit, onDelete, isAdmin = false }) => {
    const bg = useColorModeValue("#1B263B", "#1B263B");
  
    return (
      <Box p={5} borderRadius="xl" bg={bg} color="white" boxShadow="lg">
        <VStack align="start" spacing={3}>
          <Text fontSize="lg" fontWeight="bold">{plan.label}</Text>
  
          <HStack spacing={1}>
            <Text fontSize="2xl" fontWeight="bold">
              {coin === "USD" ? "$" : ""}
              {plan.price}
              {coin === "BTC" && " ₿"}
              {coin === "ETH" && " "}
            </Text>
            {currencyIcons[coin]}
          </HStack>
  
          <Text color="gray.400">Mining Rate: {plan.rate}</Text>
          <Text color="green.300">Est. Reward: {plan.reward}</Text>
  
          <HStack justify="space-between" w="full" mt={2}>
            {isAdmin && (
              <HStack>
                <IconButton
                  icon={<MdEdit />}
                  size="sm"
                  onClick={() => onEdit(plan)}
                  aria-label="Edit"
                />
                <IconButton
                  icon={<MdDelete />}
                  size="sm"
                  colorScheme="red"
                  onClick={() => onDelete(plan._id)}
                  aria-label="Delete"
                />
              </HStack>
            )}
          </HStack>
        </VStack>
      </Box>
    );
  };
  
  export default PlanCard;
  