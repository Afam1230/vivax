import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Input,
  Button,
  VStack,
  Heading,
  Text,
  Progress,
  useToast,
  Flex,
  Image
} from "@chakra-ui/react";
import home from '../assets/tracking.png'

const TrackingPage = () => {
  const [trackingCode, setTrackingCode] = useState("");
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const fetchTrackingInfo = async () => {
    if (!trackingCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a tracking code.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/track/${trackingCode}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to track package.");
      }

      setPackageData(data);
    } catch (error) {
      toast({
        title: "Tracking Error",
        description: error.message,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      setPackageData(null);
    } finally {
      setLoading(false);
    }
  };

  // Mapping status to progress percentage
  const statusProgress = {
    "Order Placed": 10,
    "Package in transit to sorting hub":30,
    "Package in sorting hub":30,
    "Processing": 30,
    "Shipped": 50,
    "Out for Delivery": 80,
    "Delivered": 100,
  };

  return (
    <ChakraProvider>
        <Flex direction="column" minH="70vh">
            <Box minH={'10vh'}>
                <Image src={home} alt="Logo" h={{base:"120px", md:"170px", lg:"200px" }} />
            </Box>
        <Box minH="50vh" bg="gray.100" p={10} display="flex" alignItems="center" justifyContent="center" >
        <VStack spacing={6} w="full" maxW="md" p={6} bg="white" boxShadow="lg" borderRadius="lg">
          <Heading size="lg" color="blue.600">Track Your Package</Heading>
          <Input
            placeholder="Enter Tracking Code"
            value={trackingCode}
            onChange={(e) => setTrackingCode(e.target.value)}
            borderColor="blue.400"
          />
          <Button colorScheme="blue" onClick={fetchTrackingInfo} isLoading={loading}>Track Package</Button>

          {packageData && (
            <Box w="full" textAlign="center">
              <Text fontSize="lg" fontWeight="bold">Status: {packageData.status}</Text>
              <Progress value={statusProgress[packageData.status] || 0} size="lg" colorScheme="blue" borderRadius="lg" />
            </Box>
          )}
        </VStack>
      </Box>
      </Flex>
    </ChakraProvider>
  );
};

export default TrackingPage;
