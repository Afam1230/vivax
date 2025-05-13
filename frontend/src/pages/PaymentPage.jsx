import { Box, Button, Input, Select, Text, Flex, IconButton, useToast, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Spinner } from "@chakra-ui/react";
import { FaDollarSign, FaBitcoin, FaEthereum } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import {useAuthStore} from "../store/useAuthStore"; // update this path correctly



const PaymentPage = () => {
  const { planId } = useParams(); // get planId from URL
  const [plan, setPlan] = useState(null);
  const [currency, setCurrency] = useState("USD");
  const [paymentSystem, setPaymentSystem] = useState("balance");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const { user } = useAuthStore();


  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await axios.get(`/api/plans/${planId}`); // Adjust backend route if needed
        setPlan(res.data);
      } catch (error) {
        console.error("Error fetching plan", error);
        toast({
          title: "Error",
          description: "Failed to fetch plan.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchPlan();
  }, [planId, toast]);

  if (!plan) {
    return (
      <Box textAlign="center" mt="20">
        <Spinner size="xl" color="yellow.400" />
      </Box>
    );
  }

  const symbol = currency === "USD" ? "$" : currency === "BTC" ? "₿" : "Ξ";

  const convertedPrice = () => {
    if (currency === "USD") return plan.price;
    if (currency === "BTC") return (plan.price / 60000).toFixed(6);
    if (currency === "ETH") return (plan.price / 3000).toFixed(5);
  };

  const handleBuyNow = () => {
    if (paymentSystem === "deposit") {
      navigate("/deposit", { state: { 
        planTitle: plan.label, price: convertedPrice(), currency,
        id: plan.id || uuidv4(),
        label: plan.label,
        rate: plan.rate,
        reward: plan.reward,
        rewardPerDay: plan.rewardPerDay,
        totalPeriod: plan.totalPeriod,
        cryptoType:plan.cryptoType
       } });
    } else {
      onOpen();
    }
  };

  const confirmPurchase = async () => {
    try {
      const userId = user?._id;
      //const userId = localStorage.getItem("userId"); // Assuming you stored it during login
      if (!userId) {
        toast({
          title: "Error",
          description: "User not logged in.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        return;
      }

      const payload = {
        userId,
        coin: currency,
        amount: parseFloat(convertedPrice()), // ensure it's a number
        details: `Purchase of ${plan.label} plan`,
        Deposit: false, // because this is from balance
        planData: {
          id: plan.id || uuidv4(),
          label: plan.label,
          price: plan.price,
          rate: plan.rate,
          reward: plan.reward,
          rewardPerDay: plan.rewardPerDay,
          totalPeriod: plan.totalPeriod,
          cryptoType:plan.cryptoType
          // you can add more fields if needed
        },
      };

      await axios.post("/api/transactions/confirm-purchase", payload);

      toast({
        title: "Plan purchased!",
        description: "Transaction successful.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      onClose();
      navigate("/dashboard");
    } catch (error) {
      console.error("Error confirming purchase", error);
      toast({
        title: "Error",
        description: error.response?.data?.message || "Purchase failed.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box bg="white.900" p={6} color={'black'} rounded="md" width="auto" mx="auto" mt="10">
      <Text fontSize="xl" fontWeight="bold" mb={4}>Buy Plan</Text>

      <Text mb={1}>Plan Title</Text>
      <Input value={plan.label} isReadOnly mb={4} />

      <Text mb={1}>Plan Price</Text>
      <Flex align="center" mb={4}>
        <Input value={`${symbol}${convertedPrice()}`} isReadOnly mr={2} />
        <Flex>
          <IconButton icon={<FaDollarSign />} onClick={() => setCurrency("USD")} variant={currency === "USD" ? "solid" : "ghost"} />
          <IconButton icon={<FaBitcoin />} onClick={() => setCurrency("BTC")} variant={currency === "BTC" ? "solid" : "ghost"} />
          <IconButton icon={<FaEthereum />} onClick={() => setCurrency("ETH")} variant={currency === "ETH" ? "solid" : "ghost"} />
        </Flex>
      </Flex>

      <Text mb={1}>Payment System</Text>
      <Select color="black" mb={4} value={paymentSystem} onChange={(e) => setPaymentSystem(e.target.value)}>
        <option value="balance">From Balance</option>
        <option value="deposit">Deposit</option>
      </Select>

      <Button colorScheme="blue" w="full" onClick={handleBuyNow}>Buy Now</Button>

      {/* Confirmation Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Purchase</ModalHeader>
          <ModalBody>Are you sure you want to buy the {plan.title} for {symbol}{convertedPrice()}?</ModalBody>
          <ModalFooter>
            <Button mr={3} onClick={onClose}>Cancel</Button>
            <Button colorScheme="green" onClick={confirmPurchase}>Yes, Confirm</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default PaymentPage;
