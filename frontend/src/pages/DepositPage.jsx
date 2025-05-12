import { useState, useEffect } from "react";
import useOperationSettingsStore from '../store/useOperationSettingsStore';
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
    Icon,
    SimpleGrid,
    Flex,
    Divider,
    InputGroup,
    InputLeftElement,
    IconButton,
} from "@chakra-ui/react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FaBitcoin, FaEthereum, FaDollarSign, FaUpload, FaWallet } from "react-icons/fa";
import { CopyIcon } from "@chakra-ui/icons";



import axios from "axios";

const userId = localStorage.getItem("userId");





const DepositPage = () => {
    const location = useLocation();
    const { settings, fetchSettings } = useOperationSettingsStore();

    const walletAddresses = {
        BTC: settings.walletAddresses.BTC,
        ETH: settings.walletAddresses.ETH,
        USD: settings.walletAddresses.USD,
    };
    const DEPOSIT_CHARGE = settings.transactionCharge || 10;
    const BTC_RATE = settings.exchangeRates.BTC
    const ETH_RATE = settings.exchangeRates.ETH

    const {
        planTitle, price, currency, id, label, rate, reward, rewardPerDay, totalPeriod, cryptoType
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
        const chargeRate = DEPOSIT_CHARGE / 100;

        if (!amt || amt <= 0) {
            setCharge(0);
            setPayable(0);
            setBtcEquivalent(0);
            setEthEquivalent(0);
            return;
        }

        let chargeAmount = amt * chargeRate;
        let total = amt + chargeAmount;
        let usd = 0;

        if (PurchaseCoin === "BTC") {
            setCharge(chargeAmount.toFixed(6));
            setPayable(total.toFixed(6));
            setBtcEquivalent(total.toFixed(6));
            setEthEquivalent((total * BTC_RATE / ETH_RATE).toFixed(6));
            usd = total * BTC_RATE;
        } else if (PurchaseCoin === "ETH") {
            setCharge(chargeAmount.toFixed(6));
            setPayable(total.toFixed(6));
            setEthEquivalent(total.toFixed(6));
            setBtcEquivalent((total * ETH_RATE / BTC_RATE).toFixed(6));
            usd = total * ETH_RATE;
        } else {
            setCharge(chargeAmount.toFixed(2));
            setPayable(total.toFixed(2));
            setBtcEquivalent((total / BTC_RATE).toFixed(6));
            setEthEquivalent((total / ETH_RATE).toFixed(6));
            usd = total;
        }

        setUsdEquivalent(usd.toFixed(2));
    }, [amount, selectedCoin, PurchaseCoin, settings.transactionCharge]);


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
            formData.append("PurchaseCoin", PurchaseCoin);
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
                formData.append("cryptoType", cryptoType);
                
            }

            let equivalentAmount = 0;
            if (selectedCoin === "BTC") {
                equivalentAmount = btcEquivalent;
            } else if (selectedCoin === "ETH") {
                equivalentAmount = ethEquivalent;
            } else {
                equivalentAmount = usdEquivalent;
            }

            formData.append("equivalentAmount", equivalentAmount);

            await axios.post("/api/deposit", formData, {
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

    useEffect(() => {
        fetchSettings(); // or skip if already called elsewhere
    }, []);

    return (
        <Box maxW="lg" mx="auto" py={10} px={6} bg="white" shadow="lg" rounded="lg">
            <Heading mb={6} textAlign="center" fontSize="2xl" color="primary.500">
                {isPlanPayment ? "Complete Your Purchase" : "Make a Deposit"}
            </Heading>

            <VStack as="form" spacing={5} onSubmit={handleSubmit}>
                {/* Payment Gateway */}
                <FormControl isRequired>
                    <FormLabel>Payment Gateway</FormLabel>
                    {isPlanPayment ? (
                        <Input value={selectedCoin} isDisabled />
                    ) : (
                        <Select
                            icon={<FaWallet />}
                            value={selectedCoin}
                            onChange={(e) => setSelectedCoin(e.target.value)}
                            placeholder="Select payment method"
                        >
                            <option value="BTC">Bitcoin (BTC)</option>
                            <option value="ETH">Ethereum (ETH)</option>
                            <option value="USD">USD (Stablecoin)</option>
                        </Select>
                    )}
                </FormControl>

                {selectedCoin && (
                    <Box p={3} bg="gray.100" rounded="md" w="full">
                        <Text fontWeight="bold" mb={1}>
                            Send to this {selectedCoin} Address:
                        </Text>
                        <Box display="flex" alignItems="center" gap={2}>
                            <Text wordBreak="break-all" color="primary.600" flex="1">
                                {walletAddresses[selectedCoin]}
                            </Text>
                            <IconButton
                                aria-label="Copy Address"
                                icon={<CopyIcon />}
                                size="sm"
                                onClick={() => {
                                    navigator.clipboard.writeText(walletAddresses[selectedCoin]);
                                    toast({
                                        title: "Copied!",
                                        description: `${selectedCoin} address copied to clipboard.`,
                                        status: "success",
                                        duration: 2000,
                                        isClosable: true,
                                    });
                                }}
                            />
                        </Box>
                    </Box>
                )}


                {/* Purchase Coin */}
                <FormControl isRequired>
                    <FormLabel>Coin to Purchase</FormLabel>
                    {isPlanPayment ? (
                        <Input value={selectedCoin} isDisabled />
                    ) : (
                        <Select
                            icon={<FaWallet />}
                            value={PurchaseCoin}
                            onChange={(e) => setPurchaseCoin(e.target.value)}
                            placeholder="Select Currency"
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
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            {PurchaseCoin === "BTC" ? <FaBitcoin /> : PurchaseCoin === "ETH" ? <FaEthereum /> : <FaDollarSign />}
                        </InputLeftElement>
                        <Input
                            type="number"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            isDisabled={isPlanPayment}
                        />
                    </InputGroup>
                </FormControl>

                {/* Summary */}
                {!isPlanPayment && amount && selectedCoin && (
                    <Box p={4} w="full" bg="gray.50" border="1px solid #ccc" rounded="md">
                        <SimpleGrid columns={2} spacing={3}>
                            <Text><strong>Charge:</strong> ${charge}</Text>
                            <Text><strong>Payable:</strong> ${payable}</Text>
                            {selectedCoin === "BTC" && <Text><strong>In BTC:</strong> {btcEquivalent}</Text>}
                            {selectedCoin === "ETH" && <Text><strong>In ETH:</strong> {ethEquivalent}</Text>}
                            {selectedCoin === "USD" && <Text><strong>USD Equivalent:</strong> ${usdEquivalent}</Text>}
                        </SimpleGrid>
                    </Box>
                )}

                {/* Upload Proof */}
                <FormControl isRequired>
                    <FormLabel>Upload Proof of Payment</FormLabel>
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        icon={<FaUpload />}
                    />
                </FormControl>

                {/* Submit */}
                <Button
                    colorScheme="green"
                    w="full"
                    type="submit"
                    isDisabled={loading}
                    size="lg"
                    fontWeight="bold"
                    _hover={{ bg: "green.600" }}
                >
                    {loading ? <Spinner size="sm" /> : isPlanPayment ? "Complete Purchase" : "Submit Deposit"}
                </Button>
            </VStack>
        </Box>
    );
};

export default DepositPage;
