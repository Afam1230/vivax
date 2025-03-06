import React, { useState, useEffect } from "react";
import { 
    Box, Container, Grid, GridItem, Image, Text, Heading, VStack, Button, Select, Input, 
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, useDisclosure, useToast, Spinner
} from "@chakra-ui/react";
import axios from "axios";

const trackingStatuses = [
    "Order Placed",
    "Package in transit to sorting hub",
    "Package in sorting hub",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
    "Custom Status"
];

const AdminDashboard = () => {
    const [packages, setPackages] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [customStatuses, setCustomStatuses] = useState({});
    const [selectedStatuses, setSelectedStatuses] = useState({});
    const toast = useToast();

    useEffect(() => {
        fetchPackages();
    }, []);

    const [loading, setLoading] = useState(true);

    const fetchPackages = async () => {
        try {
            setLoading(true);
            const response = await axios.get("http://localhost:5000/admin/packages");
            console.log("API Response:", response.data);  // Debugging line
            if (Array.isArray(response.data)) {
                setPackages(response.data);
            } else {
                console.error("Expected an array but got:", response.data);
                setPackages([]); // Prevent crash
            }
        } catch (error) {
            toast({
                title: "Error fetching packages",
                description: "Could not retrieve orders.",
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        } finally{
            setLoading(false);
        }
    };

    const handleAccept = async (trackingCode, event) => {
        event.stopPropagation();
        try {
            await axios.post("http://localhost:5000/admin/accept", { trackingCode });
            toast({ title: "Package Accepted", status: "success", duration: 5000, isClosable: true });
            fetchPackages();
        } catch (error) {
            toast({ title: "Error", status: "error", duration: 5000, isClosable: true });
        }
    };

    const handleReject = async (trackingCode, event) => {
        event.stopPropagation();
        try {
            await axios.post("http://localhost:5000/admin/reject", { trackingCode });
            toast({ title: "Package Rejected", status: "warning", duration: 5000, isClosable: true });
            fetchPackages();
        } catch (error) {
            toast({ title: "Error", status: "error", duration: 5000, isClosable: true });
        }
    };

    const handleStatusChange = async (trackingCode, newStatus, event) => {
        event.stopPropagation();
        setSelectedStatuses(prev => ({ ...prev, [trackingCode]: newStatus }));

        if (newStatus !== "Custom Status") {
            try {
                await axios.post("http://localhost:5000/admin/update-status", { trackingCode, status: newStatus });
                toast({ title: "Status Updated", status: "success", duration: 5000, isClosable: true });
                fetchPackages();
            } catch (error) {
                toast({ title: "Error", status: "error", duration: 5000, isClosable: true });
            }
        }
    };

    const handleCustomStatusSubmit = async (trackingCode, event) => {
        event.stopPropagation();
        const status = customStatuses[trackingCode] || "";
        
        if (!status.trim()) {
            toast({ title: "Custom Status Required", description: "Enter a custom status", status: "warning", duration: 5000, isClosable: true });
            return;
        }

        try {
            await axios.post("http://localhost:5000/admin/update-status", { trackingCode, status });
            toast({ title: "Custom Status Updated", status: "success", duration: 5000, isClosable: true });
            fetchPackages();
        } catch (error) {
            toast({ title: "Error", status: "error", duration: 5000, isClosable: true });
        }
    };

    return (
        <Container maxW="container.xl" py={10}>
            <Heading size="lg" mb={5} textAlign="center">Available Orders</Heading>
             {loading ? (
                 <VStack><Spinner size="xl" /><Text>Loading...</Text></VStack>
            ) : packages.length === 0 ? (
                <Text textAlign="center">No packages available.</Text>
            ) : (

            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
                {packages.map((pkg) => (
                    <GridItem 
                        key={pkg.trackingCode} 
                        p={4} 
                        boxShadow="md" 
                        borderRadius="md" 
                        bg="gray.100" 
                        cursor="pointer" 
                        _hover={{ bg: "gray.200" }} 
                        onClick={() => { setSelectedPackage(pkg); onOpen(); }}
                    >
                        <VStack>
                            <Image src={pkg.packageImages[0]} alt="Package" boxSize="150px" objectFit="cover" borderRadius="md" />
                            <Text fontSize="lg" fontWeight="bold">{pkg.name}</Text>
                            <Text fontSize="sm" color="gray.600">Tracking Code: {pkg.trackingCode}</Text>

                            {pkg.status === "Pending" ? (
                                <>
                                    <Button colorScheme="green" size="sm" onClick={(e) => handleAccept(pkg.trackingCode, e)}>Accept</Button>
                                    <Button colorScheme="red" size="sm" onClick={(e) => handleReject(pkg.trackingCode, e)}>Reject</Button>
                                </>
                            ) : (
                                <VStack>
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <Select 
                                            placeholder={pkg.status} 
                                            value={selectedStatuses[pkg.trackingCode] || pkg.status} 
                                            onChange={(e) => handleStatusChange(pkg.trackingCode, e.target.value, e)}
                                        >
                                            {trackingStatuses.map(status => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </Select>
                                    </div>

                                    {selectedStatuses[pkg.trackingCode] === "Custom Status" && (
                                        <div onClick={(e) => e.stopPropagation()}>
                                            <Input 
                                                placeholder="Enter custom status" 
                                                value={customStatuses[pkg.trackingCode] || ""} 
                                                onChange={(e) => setCustomStatuses(prev => ({ ...prev, [pkg.trackingCode]: e.target.value }))}
                                            />
                                            <Button mt={2} size="sm" colorScheme="blue" onClick={(e) => handleCustomStatusSubmit(pkg.trackingCode, e)}>Submit</Button>
                                        </div>
                                    )}
                                </VStack>
                            )}
                        </VStack>
                    </GridItem>
                ))}
            </Grid>
            )}

            {selectedPackage && (
                <Modal isOpen={isOpen} onClose={onClose}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Package Details</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack spacing={4}>
                                <Image src={selectedPackage.packageImages[0]}  alt="Package" boxSize="200px" objectFit="cover" borderRadius="md" />
                                <Text fontSize="lg" fontWeight="bold">Name: {selectedPackage.name}</Text>
                                <Text>Email: {selectedPackage.email}</Text>
                                <Text>Phone: {selectedPackage.phone}</Text>
                                <Text>Package description: {selectedPackage.description}</Text>
                                <Text>Pickup Location: {selectedPackage.pickupLocation}</Text>
                                <Text>Destination: {selectedPackage.destination}</Text>
                                <Text>Status: {selectedPackage.status}</Text>
                            </VStack>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            )}
        </Container>
    );
};

export default AdminDashboard;
