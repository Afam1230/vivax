import {
    Box, Button, FormControl, FormLabel, Heading, Input, Select,
    Text, VStack, useToast, InputGroup, InputLeftElement, Spinner
  } from "@chakra-ui/react";
  import { FaBitcoin, FaEthereum, FaDollarSign, FaWallet } from "react-icons/fa";
  import { useEffect, useState } from "react";
  import axios from "axios";
  import { v4 as uuidv4 } from "uuid";
  import { useAuthStore } from "../store/useAuthStore"; // ✅ updated here
  import useOperationSettingsStore from "../store/useOperationSettingsStore"; // exchange rates
  
  const MIN_WITHDRAW_USD = 100;
  const WITHDRAW_FEE_PERCENT = 10;
  
  const WithdrawPage = () => {
    const { user } = useAuthStore();
    const { settings, fetchSettings } = useOperationSettingsStore();
    const toast = useToast();
  
    const [coin, setCoin] = useState("USD");
    const [amount, setAmount] = useState("");
    const [walletAddress, setWalletAddress] = useState("");
    const [fee, setFee] = useState(0);
    const [payable, setPayable] = useState(0);
    const [loading, setLoading] = useState(false);
  
    const BTC_RATE = settings.exchangeRates?.BTC || 50000;
    const ETH_RATE = settings.exchangeRates?.ETH || 2500;
  
    useEffect(() => {
      fetchSettings();
    }, []);
  
    useEffect(() => {
      const amt = parseFloat(amount) || 0;
      const feeValue = amt * WITHDRAW_FEE_PERCENT / 100;
      setFee(feeValue.toFixed(8));
      setPayable((amt - feeValue).toFixed(8));
    }, [amount]);
  
    const getUsdEquivalent = (coin, amt) => {
      if (coin === "BTC") return amt * BTC_RATE;
      if (coin === "ETH") return amt * ETH_RATE;
      return amt;
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const amt = parseFloat(amount);
  
      if (!coin || !amt || !walletAddress) {
        return toast({ title: "All fields required", status: "error", duration: 3000 });
      }
  
      if (getUsdEquivalent(coin, amt) < MIN_WITHDRAW_USD) {
        return toast({
          title: "Minimum withdrawal not met",
          description: `Minimum is $${MIN_WITHDRAW_USD} or crypto equivalent.`,
          status: "warning",
          duration: 4000
        });
      }
  
      if (user?.balance?.[coin.toLowerCase()] < amt) {
        return toast({
          title: "Insufficient Balance",
          description: `Your ${coin} balance is too low.`,
          status: "error",
          duration: 4000
        });
      }
  
      try {
        setLoading(true);
        const tx = {
          _id: uuidv4(),
          type: "withdrawal",
          coin: coin.toLowerCase(),
          amount: amt,
          details: walletAddress,
          status: "pending",
          Deposit: false,
          proofImage: null,
          planData: null,
        };
  
        await axios.post("/api/transactions/withdraw", { userId: user._id, transaction: tx });
  
        toast({
          title: "Withdrawal Request Sent",
          description: "Your request is pending admin approval.",
          status: "success",
          duration: 4000
        });
  
        setAmount("");
        setWalletAddress("");
      } catch (error) {
        toast({ title: "Error", description: "Failed to process request.", status: "error" });
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <Box maxW="lg" mx="auto" py={10} px={6} bg="white" shadow="md" rounded="md">
        <Heading fontSize="2xl" mb={6} textAlign="center" color="primary.500">
          Withdraw Funds
        </Heading>
        <VStack spacing={5} as="form" onSubmit={handleSubmit}>
          <FormControl isRequired>
            <FormLabel>Select Wallet</FormLabel>
            <Select
              icon={<FaWallet />}
              value={coin}
              onChange={(e) => setCoin(e.target.value)}
            >
              <option value="BTC">BTC</option>
              <option value="ETH">ETH</option>
              <option value="USD">USD</option>
            </Select>
          </FormControl>
  
          <FormControl isRequired>
            <FormLabel>Amount to Withdraw</FormLabel>
            <InputGroup>
              <InputLeftElement>
                {coin === "BTC" ? <FaBitcoin /> : coin === "ETH" ? <FaEthereum /> : <FaDollarSign />}
              </InputLeftElement>
              <Input
                type="number"
                placeholder={`Enter amount in ${coin}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </InputGroup>
          </FormControl>
  
          <FormControl isRequired>
            <FormLabel>Withdrawal Wallet Address</FormLabel>
            <Input
              placeholder={`Enter your ${coin} address`}
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </FormControl>
  
          {amount && (
            <Box bg="gray.50" p={4} borderRadius="md" w="full">
              <Text><strong>Fee:</strong> {fee} {coin}</Text>
              <Text><strong>You’ll Receive:</strong> {payable} {coin}</Text>
            </Box>
          )}
  
          <Button
            type="submit"
            colorScheme="green"
            w="full"
            fontWeight="bold"
            size="lg"
            _hover={{ bg: "green.600" }}
            isDisabled={loading}
          >
            {loading ? <Spinner size="sm" /> : "Submit Withdrawal"}
          </Button>
        </VStack>
      </Box>
    );
  };
  
  export default WithdrawPage;
  