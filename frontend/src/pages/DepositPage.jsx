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
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const userId = localStorage.getItem("userId"); // Assuming you stored it during login


const walletAddresses = {
    BTC: "bc1qexamplebtcaddress",
    ETH: "0xexampleethaddress",
    USD: "usd-wallet-placeholder",
};

const DepositPage = () => {
    const location = useLocation();
    const {  planTitle, price, currency, id, label, rate, reward, rewardPerDay, totalPeriod } = location.state || {}; //this is the updated one. i want to send these data to the backend

    const [selectedCoin, setSelectedCoin] = useState(currency || "");
    const [amount, setAmount] = useState(price || "");
    const [proofImage, setProofImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    

    const toast = useToast();

    const isPlanPayment = !!planTitle; // true if user was buying a plan

    const handleFileChange = (e) => {
        setProofImage(e.target.files[0]);
    };

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
            formData.append("coin", selectedCoin)
            formData.append("amount", amount)
            formData.append("proofImage", proofImage)
            formData.append("userId", userId);


            if (isPlanPayment) {
                formData.append("planTitle", planTitle)
                formData.append("currency", currency)
                formData.append("id", id)
                formData.append("label",label)
                formData.append("rate",rate)
                formData.append("reward",reward)
                formData.append("rewardPerDay",rewardPerDay)
                formData.append("totalPeriod",totalPeriod)
                // formData.append("",)
            }

            // Send to your backend
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

            // Reset form if it's a normal deposit
            if (!isPlanPayment) {
                setSelectedCoin("");
                setAmount("");
                setProofImage(null);
            }
            navigate("/dashboard")

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
                {/* Coin Selector or Coin Display */}
                <FormControl isRequired>
                    <FormLabel>Coin</FormLabel>
                    {isPlanPayment ? (
                        <Input value={selectedCoin} isDisabled />
                    ) : (
                        <Select
                            placeholder="Select coin"
                            value={selectedCoin}
                            onChange={(e) => setSelectedCoin(e.target.value)}
                        >
                            <option value="BTC">Bitcoin (BTC)</option>
                            <option value="ETH">Ethereum (ETH)</option>
                            <option value="USD">USD (Stablecoin)</option>
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
