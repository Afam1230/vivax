import { useState } from "react";
import React from "react"
import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack, SimpleGrid,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Progress,
  useToast,
  Divider
} from "@chakra-ui/react";
import { FaTruck, FaWarehouse, FaDigitalTachograph, FaMapMarkerAlt, FaUsers, FaHandshake, FaShippingFast, FaClipboardList } from "react-icons/fa";
import hero from '../assets/banner.jpg';
import { Link } from "react-router-dom";
import shipping from '../assets/shipping.png'
import tracking from '../assets/tracking.png'
import teamwork from '../assets/teamwork.jpeg'
import warehousing from '../assets/warehousing.jpg'
import ContactUsCard from "../components/ContactUsCard";



  const cards = [
    {
      image: teamwork, 
      title: "Our Dedicated Logistics Team",
      description: "Meet our highly skilled and dedicated logistics team, working tirelessly to ensure seamless supply chain operations.",
    },
    {
      image: shipping,
      title: "Global Shipping in Action",
      description: "Our fleet moves goods across the world with efficiency and precision keeping your goods safe.",
    },
    {
      image: warehousing, 
      title: "Advanced Warehousing",
      description: "State-of-the-art storage facilities designed for safety and accessibility.",
    },
    {
      image: tracking, 
      title: "Real-Time Shipment Tracking",
      description: "Stay updated on your shipment's location with our advanced tracking system.",
    },
  ];


const HomePage = () => {
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
      const response = await fetch(`https://jagannath-logistics.onrender.com/track/${trackingCode}`);
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
    "Package in transit to sorting hub": 30,
    "Package in sorting hub": 30,
    "Processing": 30,
    "Shipped": 50,
    "Out for Delivery": 80,
    "Delivered": 100,
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box position="relative" h={{ base: "55vh", md: "70vh" }} bg="black">
        <Image src={hero} alt="Hero Background" objectFit="cover" w="full" h="full" opacity={0.7} />
        <VStack position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" spacing={4} color="white">
          <Heading textAlign="center" fontSize={{ base: "2xl", md: "xxx-large" }}>
            See how truly integrated logistics delivers
          </Heading>
          <Text textAlign="center" maxW="lg" minW={'300px'} fontSize={{base:'base', lg:'xx-large', md:'xx-large'}} fontStyle={'bold'}>
          We are a dedicated logistics provider committed to delivering exceptional shipping and warehousing solutions, ensuring your goods reach their destination safely and efficiently.</Text>
          <Link to={'/create'}>
          <Button colorScheme="blue">Book Now!!</Button>
          </Link>
        </VStack>
      </Box>

      {/* Tracking Section */}
      <Container maxW="container.lg" py={8}>
        <Tabs variant="soft-rounded" size={'lg'} colorScheme="blue">
          <TabList>
            <Tab>Tracking</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <HStack spacing={4} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
                <FaMapMarkerAlt />
                <Input
                  placeholder="B/L, container number or parcel"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  borderColor="blue.400"
                />
                <Button colorScheme="blue" onClick={fetchTrackingInfo} isLoading={loading}>
                  Track
                </Button>
              </HStack>

              {packageData && (
                <Box mt={5} textAlign="center" p={4} borderWidth={1} borderRadius="md" boxShadow="md">
                  <Text fontSize="lg" fontWeight="bold">Status: {packageData.status}</Text>
                  <Progress value={statusProgress[packageData.status] || 0} size="lg" colorScheme="blue" borderRadius="lg" />
                </Box>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>

      {/* Network of the Future */}
      <Container maxW={{base:"container.lg", lg:"2040px"}} py={{ base: 8, md: 12, lg: 16 }} shadow={'lg'} borderWidth={'10px'}>
        <Heading fontSize={{ base: "2xl", md: "3xl", lg: "8xl" }} paddingBottom={{base:'10px', md:'15px', lg:'30px'}}>
          The Network of the Future
        </Heading>
        <Text fontSize={{ base: "md", md: "lg", lg: "3xl" }} py={4}>
        Learn more about the Network of the Future—an innovative, next-generation logistics network designed for efficiency, speed, and sustainability. Powered by leaner loops with fewer port calls per service, it optimizes shipping routes to reduce transit times and operational costs. Our extensive shuttle network ensures seamless connectivity between key logistics hubs, while industry-leading smart hubs leverage AI and automation to streamline cargo handling, minimize delays, and enhance tracking accuracy. With real-time visibility, predictive analytics, and a commitment to eco-friendly operations, we are redefining global logistics for the modern era.
        </Text>
        <Link to={'/request-account'}>
        <Button colorScheme="blue" size={{ base: "md", md: "lg", lg: "lg" }}>Request Account</Button>
        </Link>
      </Container>

      {/* Logistics Solutions */}
      <Container 
      maxW={{ base: "container.lg", lg: "100%" }} 
      py={{ base: 8, md: 12, lg: 16 }} 
      textAlign="center"
    >
      <Heading fontSize={{ base: "3xl", md: "3xl", lg: "4xl" }} pb={{ base: "10px", md: "20px" }}>
        Logistics Solutions
      </Heading>

      <Stack 
        direction={{ base: "column", md: "row" }} 
        spacing={{ base: 10, md: 16, lg: 14 }} 
        py={4} 
        justify="center"
        align="center"
        flexWrap="wrap"
      >
        {/* Transportation Services */}
        <VStack 
          p={{ base: 6, md: 8, lg: 16 }} 
          borderWidth={2} 
          borderRadius="lg" 
          w={{ base: "80%", md: "45%", lg: "30%" }}
        >
          <FaTruck size={100} />
          <Heading fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>Transportation Services</Heading>
          <Text textAlign="center" fontSize={{ base: "md", md: "lg", lg: "xl" }}>
            Efficient, reliable, and secure transportation for businesses of all sizes. Get your packages delivered on time.
          </Text>
        </VStack>

        {/* Supply Chain and Logistics */}
        <VStack 
          p={{ base: 6, md: 8, lg: 16 }} 
          borderWidth={2} 
          borderRadius="lg" 
          w={{ base: "80%", md: "45%", lg: "30%" }}
        >
          <FaWarehouse size={100} />
          <Heading fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>Supply Chain & Logistics</Heading>
          <Text textAlign="center" fontSize={{ base: "md", md: "lg", lg: "xl" }}>
            We optimize and manage your supply chain, ensuring seamless movement of goods from start to finish.
          </Text>
        </VStack>

        {/* Digital Solutions */}
        <VStack 
          p={{ base: 6, md: 8, lg: 16 }} 
          borderWidth={2} 
          borderRadius="lg" 
          w={{ base: "80%", md: "45%", lg: "30%" }}
        >
          <FaDigitalTachograph size={100} />
          <Heading fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>Digital Solutions</Heading>
          <Text textAlign="center" fontSize={{ base: "md", md: "lg", lg: "xl" }}>
            Our advanced online platform simplifies logistics, giving you full visibility and control over your shipments.
          </Text>
        </VStack>

        {/* Express Shipping */}
        <VStack 
          p={{ base: 6, md: 8, lg: 16 }} 
          borderWidth={2} 
          borderRadius="lg" 
          w={{ base: "80%", md: "45%", lg: "30%" }}
        >
          <FaShippingFast size={100} />
          <Heading fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>Express Shipping</Heading>
          <Text textAlign="center" fontSize={{ base: "md", md: "lg", lg: "xl" }}>
            Need it fast? Our express delivery service guarantees rapid and secure delivery for urgent shipments.
          </Text>
        </VStack>

        {/* Order & Inventory Management */}
        <VStack 
          p={{ base: 6, md: 8, lg: 16 }} 
          borderWidth={2} 
          borderRadius="lg" 
          w={{ base: "80%", md: "45%", lg: "30%" }}
        >
          <FaClipboardList size={100} />
          <Heading fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>Order & Inventory</Heading>
          <Text textAlign="center" fontSize={{ base: "md", md: "lg", lg: "xl" }}>
            Track, manage, and organize your inventory with our state-of-the-art logistics and tracking system.
          </Text>
        </VStack>
      </Stack>
    </Container>    


    <Container maxW="100%" py={12} bg="gray.50">
      <Heading size="xl" textAlign="center" mb={6} color="blue.600">
        Our Logistics in Action
      </Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} px={6}>
        {cards.map((card, index) => (
          <Box
            key={index}
            bg="white"
            boxShadow="xl"
            borderRadius="lg"
            overflow="hidden"
            _hover={{ transform: "scale(1.05)", transition: "0.3s ease-in-out" }}
          >
            <Image src={card.image} alt={card.title} objectFit="cover" h="250px" w="100%" />
            <VStack p={6} spacing={4} align="center">
              <Heading size="md">{card.title}</Heading>
              <Text textAlign="center" fontSize="lg" color="gray.600">{card.description}</Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Container> 


    <Container maxW="container.lg" py={8} borderWidth={'5px'} borderRadius={'lg'} paddingTop={20}>
        <Heading fontSize="3xl" textAlign="center">Why Choose Us?</Heading>
        <Stack direction={{ base: "column", md: "row" }} spacing={8} mt={6} justify="center">
          <VStack>
            <FaUsers size={50} />
            <Text fontSize="xl">Customer-Centric Approach</Text>
          </VStack>
          <VStack>
            <FaHandshake size={50} />
            <Text fontSize="xl">Reliable & Trusted Service</Text>
          </VStack>
          <VStack>
            <FaTruck size={50} />
            <Text fontSize="xl">Fast & Secure Delivery</Text>
          </VStack>
        </Stack>
      </Container>


      
      <Divider my={8} />
      <ContactUsCard />
    </Box>
  );
};

export default HomePage;
