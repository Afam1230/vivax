import { useState, useEffect } from "react";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Text,
    VStack,
    useToast,
    Spinner,
} from "@chakra-ui/react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const userId = localStorage.getItem("userId");

const walletAddresses = {
    BTC: "BTC wallet ADDRESS",
    ETH: "ETH wallet ADDRESS",
    USD: "USD wallet ADDRESS",
};

// ✅ Constants
const DEPOSIT_CHARGE = 10; // Change this to update charge
const BTC_RATE = 60000;    // 1 BTC = $60,000
const ETH_RATE = 3000;     // 1 ETH = $3,000

const DepositPage = () => {
    const location = useLocation();
    const {
        planTitle, price, currency, id, label, rate, reward, rewardPerDay, totalPeriod
    } = location.state || {};

    const [selectedCoin, setSelectedCoin] = useState(currency || "");
    const [PurchaseCoin, setPurchaseCoin] = useState(currency || "");
    const [amount, setAmount] = useState(price || "");
    const [proofImage, setProofImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [charge, setCharge] = useState(0);
    const [payable, setPayable] = useState(0);
    const [btcEquivalent, setBtcEquivalent] = useState(0);
    const [ethEquivalent, setEthEquivalent] = useState(0);
    const [usdEquivalent, setUsdEquivalent] = useState(0);


    const navigate = useNavigate();
    const toast = useToast();

    const isPlanPayment = !!planTitle;

    const handleFileChange = (e) => {
        setProofImage(e.target.files[0]);
    };

    useEffect(() => {
        const amt = parseFloat(amount);
        if (!amt || amt <= 0) {
            setCharge(0);
            setPayable(0);
            setBtcEquivalent(0);
            setEthEquivalent(0);
            return;
        }

        let total = amt;
        let charge = DEPOSIT_CHARGE;
        let usd = 0;

        if (PurchaseCoin === "BTC") {
            const chargeInBTC = (DEPOSIT_CHARGE / BTC_RATE);
            total = amt + chargeInBTC;
            setCharge(chargeInBTC.toFixed(6));
            setPayable(total.toFixed(6));
            setBtcEquivalent(total.toFixed(6));
            setEthEquivalent((total * BTC_RATE / ETH_RATE).toFixed(6));
            usd = total * BTC_RATE;
        } else if (PurchaseCoin === "ETH") {
            const chargeInETH = (DEPOSIT_CHARGE / ETH_RATE);
            total = amt + chargeInETH;
            setCharge(chargeInETH.toFixed(6));
            setPayable(total.toFixed(6));
            setEthEquivalent(total.toFixed(6));
            setBtcEquivalent((total * ETH_RATE / BTC_RATE).toFixed(6));
            usd = total * ETH_RATE;
        } else {
            total = amt + DEPOSIT_CHARGE;
            setCharge(DEPOSIT_CHARGE);
            setPayable(total);
            setBtcEquivalent((total / BTC_RATE).toFixed(6));
            setEthEquivalent((total / ETH_RATE).toFixed(6));
            usd = total;
        }

        setUsdEquivalent(usd.toFixed(2));
    }, [amount, selectedCoin, PurchaseCoin]);



    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCoin || !amount || !proofImage) {
            toast({
                title: "Incomplete Fields",
                description: "Please fill all fields and upload your proof of payment.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
            return;
        }

        try {
            setLoading(true);

            const formData = new FormData();
            formData.append("coin", selectedCoin);
            formData.append("PurcaseCoin", PurchaseCoin);

            formData.append("amount", amount);
            formData.append("proofImage", proofImage);
            formData.append("userId", userId);

            if (isPlanPayment) {
                formData.append("planTitle", planTitle);
                formData.append("currency", currency);
                formData.append("id", id);
                formData.append("label", label);
                formData.append("rate", rate);
                formData.append("reward", reward);
                formData.append("rewardPerDay", rewardPerDay);
                formData.append("totalPeriod", totalPeriod);
            }

            const res = await axios.post("/api/deposit", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });

            toast({
                title: "Deposit Request Sent!",
                description: "Your deposit is pending review.",
                status: "success",
                duration: 4000,
                isClosable: true,
            });

            if (!isPlanPayment) {
                setSelectedCoin("");
                setAmount("");
                setProofImage(null);
            }

            navigate("/dashboard");
        } catch (error) {
            console.error(error);
            toast({
                title: "Error",
                description: "Something went wrong. Try again.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box maxW="500px" mx="auto" py={10}>
            <Heading mb={6} textAlign="center" fontSize="2xl" color="primary.500">
                {isPlanPayment ? "Complete Your Purchase" : "Make a Deposit"}
            </Heading>

            <VStack as="form" spacing={5} onSubmit={handleSubmit}>
                {/* Payment gateway selector */}
                <FormControl isRequired>
                    <FormLabel>Payment Gateway</FormLabel>
                    {isPlanPayment ? (
                        <Input value={selectedCoin} isDisabled />
                    ) : (
                        <Select
                            placeholder="Select coin"
                            value={selectedCoin}
                            onChange={(e) => setSelectedCoin(e.target.value)}
                        >
                            <option value="BTC">Pay With Bitcoin (BTC)</option>
                            <option value="ETH">Pay With Ethereum (ETH)</option>
                            <option value="USD">Pay With USD (Stablecoin)</option>
                        </Select>
                    )}
                </FormControl>

                {/* Wallet Address */}
                {selectedCoin && (
                    <Box p={3} bg="gray.100" rounded="md" w="full">
                        <Text fontWeight="bold">Send to this {selectedCoin} Address:</Text>
                        <Text wordBreak="break-all" color="primary.600">
                            {walletAddresses[selectedCoin]}
                        </Text>
                    </Box>
                )}

                {/* Coin Selector or Coin Display */}
                <FormControl isRequired>
                    <FormLabel>Coin</FormLabel>
                    {isPlanPayment ? (
                        <Input value={selectedCoin} isDisabled />
                    ) : (
                        <Select
                            value={PurchaseCoin}
                            onChange={(e) => setPurchaseCoin(e.target.value)}
                            placeholder="Select Currency to Purchase"
                        >
                            <option value="BTC">Bitcoin (BTC)</option>
                            <option value="ETH">Ethereum (ETH)</option>
                            <option value="USD">USD (Stablecoin)</option>
                        </Select>
                    )}
                </FormControl>


                {/* Amount */}
                <FormControl isRequired>
                    <FormLabel>Amount</FormLabel>
                    {isPlanPayment ? (
                        <Input value={amount} isDisabled />
                    ) : (
                        <Input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                        />
                    )}
                </FormControl>

                {/* Calculations (only for non-plan deposits) */}
                {!isPlanPayment && amount && selectedCoin && (
                    <Box p={4} w="full" bg="gray.50" border="1px solid #ccc" rounded="md">
                        <Text><strong>Charge:</strong> ${charge}</Text>
                        <Text><strong>Payable:</strong> ${payable}</Text>

                        {selectedCoin === "BTC" && (
                            <Text><strong>In BTC:</strong> {btcEquivalent}</Text>
                        )}

                        {selectedCoin === "ETH" && (
                            <Text><strong>In ETH:</strong> {ethEquivalent}</Text>
                        )}

                        {selectedCoin === "USD" && (
                            <Text><strong>USD Equivalent:</strong> ${usdEquivalent}</Text>
                        )}
                    </Box>
                )}

                {/* Proof Upload */}
                <FormControl isRequired>
                    <FormLabel>Upload Proof of Payment</FormLabel>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                    />
                </FormControl>

                <Button
                    color="black"
                    colorScheme="green"
                    w="50%"
                    type="submit"
                    isDisabled={loading}
                    display="flex"
                    alignItems="center"
                >
                    {loading ? (
                        <Spinner size="sm" mr={2} />
                    ) : (
                        isPlanPayment ? "Complete Purchase" : "Submit Deposit"
                    )}
                </Button>
            </VStack>
        </Box>
    );
};

export default DepositPage;
