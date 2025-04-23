import { Box, SimpleGrid, Text, Button, VStack, HStack, Select, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import { FaBitcoin, FaEthereum, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const plans = {
    BTC: [
      { id: "btc1", label: "12-Month Plan", price: 35.2, rate: "1 TH/s", reward: 22.39 },
      { id: "btc2", label: "6-Month Plan", price: 18.0, rate: "0.5 TH/s", reward: 10.25 },
      { id: "btc3", label: "3-Month Plan", price: 9.5, rate: "0.25 TH/s", reward: 5.12 },
    ],
    ETH: [
      { id: "eth1", label: "12-Month Plan", price: 25.5, rate: "2 MH/s", reward: 15.3 },
      { id: "eth2", label: "6-Month Plan", price: 13.2, rate: "1 MH/s", reward: 7.85 },
      { id: "eth3", label: "3-Month Plan", price: 6.8, rate: "0.5 MH/s", reward: 3.9 },
    ],
    USD: [
      { id: "usd1", label: "12-Month Plan", price: 30.0, rate: "$10/day", reward: 18.0 },
      { id: "usd2", label: "6-Month Plan", price: 15.5, rate: "$5/day", reward: 9.2 },
      { id: "usd3", label: "3-Month Plan", price: 7.5, rate: "$2.5/day", reward: 4.6 },
    ],
  };

  const icons = {
    BTC: FaBitcoin,
    ETH: FaEthereum,
    USD: FaDollarSign,
  };

const PlanCard = ({  plan, selected, icon }) => {
  const navigate = useNavigate();
  const symbol = selected === "USD" ? "$" : selected === "BTC" ? "₿" : "ETH";
  return (
    <Box bg="#2C3E50" color="white" w={'full'} p={5} borderRadius="lg" boxShadow="lg">
      <Text fontWeight="bold" mb={1}>{plan.duration} 🔥</Text>
      <Text fontSize="xs" bg="orange.400" w="fit-content" px={2} py={0.5} borderRadius="full">Best Value</Text>
      <Text fontSize="4xl" fontWeight="bold" mt={2}>{symbol}{plan.price}</Text>
      <Text fontSize="md">{plan.rate}</Text>     
      <Text mt={2} fontSize="sm">Estimated mining result: {plan.reward} {symbol}</Text>
      <Button
        mt={4}
        bg="green.400"
        color="white"
        _hover={{ bg: "green.500" }}
        onClick={() => navigate(`/payment/${plan.id}`)}
        w="full"
      >
        Invest Now
      </Button>
    </Box>
  );
};

export default function PricingPage() {
  const [selected, setSelected] = useState("BTC");
  const icon = icons[selected];
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Box p={5} bg="#1A202C" minH="100vh">
      <Text fontSize="2xl" fontWeight="bold" color="white" mb={5}>Choose Your Mining Plan</Text>

      <HStack mb={5} spacing={4} justifyContent={{ base: "center", md: "flex-start" }}>
        <Button
          leftIcon={<FaBitcoin />} onClick={() => setSelected("BTC")}
          bg={selected === "BTC" ? "orange.400" : "gray.700"} color="white"
        >BTC</Button>
        <Button
          leftIcon={<FaEthereum />} onClick={() => setSelected("ETH")}
          bg={selected === "ETH" ? "blue.400" : "gray.700"} color="white"
        >ETH</Button>
        <Button
          leftIcon={<FaDollarSign />} onClick={() => setSelected("USD")}
          bg={selected === "USD" ? "green.400" : "gray.700"} color="white"
        >USD</Button>
      </HStack>

      {isMobile ? (
        <VStack spacing={5}>
          {plans[selected].map((plan) => <PlanCard key={plan.id} plan={plan} selected={selected} icon={icon}/>)}
        </VStack>
      ) : (
        <SimpleGrid columns={[1, null, 3]} spacing={5}>
          {plans[selected].map((plan) => <PlanCard key={plan.id} plan={plan} selected={selected} icon={icon}/>)}
        </SimpleGrid>
      )}
    </Box>
  );
}
