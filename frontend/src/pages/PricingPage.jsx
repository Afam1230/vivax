import { Box, SimpleGrid, Text, Button, VStack, HStack, Select, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import { FaBitcoin, FaEthereum, FaDollarSign } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { usePlanStore } from "../store/usePlanStore";
import { BsCurrencyBitcoin } from "react-icons/bs";
import { BiDollar } from "react-icons/bi";
import FuturisticBackground from "../components/FuturisticBackground";
import Background from "../components/Background";


const icons = {
  BTC: FaBitcoin,
  ETH: FaEthereum,
  USD: FaDollarSign,
};
const currencyIcons = {
  BTC: <BiDollar size={25} />,
  ETH: <BiDollar size={25} />,
  USD: <BiDollar size={25} />,
};


const PlanCard = ({ plan, selected, icon }) => {

  const navigate = useNavigate();
  const symbol = selected === "USD" ? "USD" : selected === "BTC" ? "BTC" : "ETH";
  return (
    <Box bg="#2C3E50" color="white" w={'full'} minW={{ md: '300px', base: '0px' }} p={5} borderRadius="lg" boxShadow="lg">
      <Text fontWeight="bold" mb={1} fontSize={30}>🔥{plan.label} </Text>
      <Text fontSize="xs" bg="orange.400" w="fit-content" px={2} py={0.5} borderRadius="full">Best Value</Text>
      <HStack spacing={1}>
        <Text fontSize="2xl" fontWeight="bold">
          {symbol === "USD" ? "" : ""}
          {plan.price}
          {symbol === "BTC" && " "}
          {symbol === "ETH" && " "}
        </Text>
        {currencyIcons[symbol]}
      </HStack>      <Text fontSize="md" fontWeight={'semibold'}>{plan.rate}</Text>
      <HStack>
        <Text mt={2} fontSize="sm">Estimated  mining reward:</Text>
        <Text fontWeight={"bold"} mt={2} color={'white'}> {plan.reward} {symbol}</Text>
      </HStack>
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
  const { plans, fetchPlans, loading } = usePlanStore();
  useEffect(() => {
    fetchPlans(); // Fetch from backend when page loads
  }, [fetchPlans]);

  const [selected, setSelected] = useState("BTC");
  const icon = icons[selected];
  const isMobile = useBreakpointValue({ base: true, md: false });

  if (loading) return <p style={{ color: "white" }}>Loading plans...</p>;
  if (!plans[selected]) return <p style={{ color: "white" }}>No plans available for {selected}</p>;


  return (
    <Box minH="100vh" position={'relative'}>
      <Background/>
      <Box p={5} bg="rgba(14, 32, 111, 0.5)" minH="100vh" position={'relative'}>
        <Text fontSize="2xl" fontWeight="bold" color="white" mb={5}>Choose Your Mining Plan</Text>
        <FuturisticBackground />
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
            {plans[selected].map((plan) => <PlanCard key={plan.id} plan={plan} selected={selected} icon={icon} />)}
          </VStack>
        ) : (
          <SimpleGrid columns={[1, null, 3]} spacing={5}>
            {plans[selected].map((plan) => <PlanCard key={plan.id} plan={plan} selected={selected} icon={icon} />)}
          </SimpleGrid>
        )}
      </Box>
    </Box>
  );
}
