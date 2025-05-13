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
  const [bankDetails, setBankDetails] = useState({
    accountHolder: "",
    bankName: "",
    accountNumber: "",
    routingNumber: "",
  });
  const [withdrawMethod, setWithdrawMethod] = useState("crypto");
  const [fee, setFee] = useState(0);
  const [payable, setPayable] = useState(0);
  const [loading, setLoading] = useState(false);

  const BTC_RATE = settings.exchangeRates?.BTC || 50000;
  const ETH_RATE = settings.exchangeRates?.ETH || 2500;
  const USD_RATE = 1; // USD to USD is obviously 1:1

  useEffect(() => {
    fetchSettings();
  }, []);

useEffect(() => {
  const amt = parseFloat(amount) || 0;
  let feeValue = amt * WITHDRAW_FEE_PERCENT / 100;

  if (withdrawMethod === "crypto") {
    setFee(feeValue.toFixed(8));
    setPayable((amt - feeValue).toFixed(8));
  } else if (withdrawMethod === "bank") {
    const amtInUSD = getUsdEquivalent(coin, amt);
    feeValue = amtInUSD * WITHDRAW_FEE_PERCENT / 100;
    setFee(feeValue.toFixed(2));
    setPayable((amtInUSD - feeValue).toFixed(2));
  }
}, [amount, withdrawMethod, coin]); // ✅ added `coin` here


  const getUsdEquivalent = (coin, amt) => {
    if (coin === "BTC") return amt * BTC_RATE;
    if (coin === "ETH") return amt * ETH_RATE;
    return amt; // Assume USD if no coin selected
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  const amt = parseFloat(amount);

  // Validation for required fields
  if (!coin || !amt || (withdrawMethod === "crypto" && !walletAddress) || (withdrawMethod === "bank" && !bankDetails.accountNumber)) {
    return toast({ title: "All fields required", status: "error", duration: 3000 });
  }

  // Ensure the withdrawal amount meets the minimum requirement
  if (getUsdEquivalent(coin, amt) < MIN_WITHDRAW_USD) {
    return toast({
      title: "Minimum withdrawal not met",
      description: `Minimum is $${MIN_WITHDRAW_USD} or crypto equivalent.`,
      status: "warning",
      duration: 4000
    });
  }

  // Check if the user has sufficient balance
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
    
    // Transaction object to send
    const tx = {
      _id: uuidv4(),
      type: "withdrawal",
      coin: coin.toLowerCase(),
      amount: amt,
      // Conditional details based on the withdrawal method (crypto or bank)
      details: withdrawMethod === "crypto" ? {walletAddress:walletAddress, wireFee: fee, wireAmount: payable} : {
        accountHolder: bankDetails.accountHolder,
        bankName: bankDetails.bankName,
        accountNumber: bankDetails.accountNumber,
        routingNumber: bankDetails.routingNumber,
        wireFee: fee,
        wireAmount: payable
      },
      status: "pending",  // Pending for admin approval
      Deposit: false,
      proofImage: null,
      planData: null,
    };

    // Send the transaction to the backend
    await axios.post("/api/transactions/withdraw", { userId: user._id, transaction: tx });

    toast({
      title: "Withdrawal Request Sent",
      description: "Your request is pending admin approval.",
      status: "success",
      duration: 4000
    });

    // Reset form after successful submission
    setAmount("");
    setWalletAddress("");
    setBankDetails({
      accountHolder: "",
      bankName: "",
      accountNumber: "",
      routingNumber: "",
    });
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
          <FormLabel>Select Withdrawal Method</FormLabel>
          <Select
            value={withdrawMethod}
            onChange={(e) => setWithdrawMethod(e.target.value)}
          >
            <option value="crypto">Crypto Wallet</option>
            <option value="bank">Bank Wire</option>
          </Select>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Select Wallet </FormLabel>
          {withdrawMethod === "bank" && (<Text color="green">select wallet you wish to withdraw from</Text>)}
          <Select
            icon={<FaWallet />}
            value={coin}
            onChange={(e) => setCoin(e.target.value)}
            // disabled={withdrawMethod === "bank"} // Disable wallet selection when bank option is selected
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

        {withdrawMethod === "crypto" && (
          <FormControl isRequired>
            <FormLabel>Withdrawal Wallet Address</FormLabel>
            <Input
              placeholder={`Enter your ${coin} address`}
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
            />
          </FormControl>
        )}

        {withdrawMethod === "bank" && (
          <>
            <FormControl isRequired>
              <FormLabel>Account Holder Name</FormLabel>
              <Input
                placeholder="Enter account holder name"
                value={bankDetails.accountHolder}
                onChange={(e) => setBankDetails({ ...bankDetails, accountHolder: e.target.value })}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Bank Name</FormLabel>
              <Input
                placeholder="Enter bank name"
                value={bankDetails.bankName}
                onChange={(e) => setBankDetails({ ...bankDetails, bankName: e.target.value })}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Account Number</FormLabel>
              <Input
                placeholder="Enter account number"
                value={bankDetails.accountNumber}
                onChange={(e) => setBankDetails({ ...bankDetails, accountNumber: e.target.value })}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Routing Number</FormLabel>
              <Input
                placeholder="Enter routing number"
                value={bankDetails.routingNumber}
                onChange={(e) => setBankDetails({ ...bankDetails, routingNumber: e.target.value })}
              />
            </FormControl>
          </>
        )}

        {amount && (
          <Box bg="gray.50" p={4} borderRadius="md" w="full">
            <Text><strong>Fee:</strong> ${fee} {withdrawMethod === "bank" ? "USD" : coin}</Text>
            <Text><strong>You’ll Receive:</strong> ${payable} {withdrawMethod === "bank" ? "USD" : coin}</Text>
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
