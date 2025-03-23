import { Box, Button, Flex, Heading, Image, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import hero from "../images/hero.jpg"
import AdsComponent from "../components/AdsComponent";

const MotionBox = motion(Box);

const ServicePage = () => {
  return (
    <Box marginTop={70}>
      <Image
        src={hero}
        alt="Astrologer"
        borderRadius="lg"
        mt={{ base: 5, md: 0 }}
        width={"full"}
      />
      <Box position={'relative'} bg="#D97706" color="white" minH="100vh" p={5} marginTop={{ base: '9' }}>
        {/* Hero Section */}
        <Flex direction={{ base: "column", md: "row" }} align="center" justify="space-between" py={10}>
          <VStack align="start" spacing={5} maxW={{ base: "100%", md: "50%" }}>
            <Heading fontSize={{ base: "3xl", md: "7xl" }} fontFamily={'DM Serif Text'}>Experience the Power of Astrology</Heading>
            <Text fontSize={{ base: "md", md: "xx-large" }} fontFamily={'DM Serif Text'} fontWeight={400}>
              Unlock the secrets of your past, present, and future with our expert astrologer. Get detailed insights into your life’s journey.
            </Text>
            <Button bg="#78350F" color="white" size={{base:'lg', md:'lg'}} _hover={{ bg: "#5a230a" }}>Book a Consultation</Button>
          </VStack>
        </Flex>

        {/* Services Section */}
        <Heading textAlign="center" my={10} fontSize={{ base: "2xl", md: "7xl" }} fontFamily={'DM Serif Text'}>Our Services</Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
          {services.map((service, index) => (
            <MotionBox
              key={index}
              bg="white"
              color="#78350F"
              p={5}
              borderRadius="lg"
              boxShadow="lg"
              whileHover={{ scale: 1.05 }}
            >
              <Image src={service.image} alt={service.title} borderRadius="md" mb={4} />
              <Heading fontSize={{base:'md', md:'xx-large',}} mb={2}>{service.title}</Heading>
              <Text fontSize={{base:'md', md:'xx-large',}}>{service.description}</Text>
            </MotionBox>
          ))}
        </SimpleGrid>
      </Box>
      <AdsComponent/>
    </Box>

  );
};

const services = [
  {
    title: "Personal Compatibility Reading",
    description: "Gain insights into your relationships and understand your cosmic connections.",
    image: "/compatibility.jpg",
  },
  {
    title: "2025 Personal Forecast",
    description: "Discover what the stars have in store for you in the upcoming year.",
    image: "/forecast.jpg",
  },
  {
    title: "Past Life Reading",
    description: "Explore your past lives and their influence on your current journey.",
    image: "/pastlife.jpg",
  },
  {
    title: "Chinese Astrology Reading",
    description: "Unlock the wisdom of Chinese astrology and understand your destiny.",
    image: "/chinese.jpg",
  },
  {
    title: "3-Month Forecast",
    description: "Get a detailed three-month astrological prediction tailored to you.",
    image: "/3months.jpg",
  },
  {
    title: "Puja and Homa",
    description: "Experience divine blessings through sacred rituals and ceremonies.",
    image: "/puja.jpg",
  }
];

export default ServicePage;