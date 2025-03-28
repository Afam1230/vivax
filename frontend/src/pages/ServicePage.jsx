import { Box, Grid, Heading, Text, VStack, Button,  HStack, Image  } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { HeartHandshake, Calendar, History, Globe, Clock, Flame, Briefcase, Activity, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";
import servic from "../images/servic.png"

const MotionBox = motion(Box);

// Service Data with Icons
const services = [
  {
    title: "Personal Compatibility Reading",
    description: "Gain insights into your relationships and understand your cosmic connections.",
    icon: HeartHandshake,
  },
  {
    title: "2025 Personal Forecast",
    description: "Discover what the stars have in store for you in the upcoming year.",
    icon: Calendar,
  },
  {
    title: "Past Life Reading",
    description: "Explore your past lives and their influence on your current journey.",
    icon: History,
  },
  {
    title: "Chinese Astrology Reading",
    description: "Unlock the wisdom of Chinese astrology and understand your destiny.",
    icon: Globe,
  },
  {
    title: "3-Month Forecast",
    description: "Get a detailed three-month astrological prediction tailored to you.",
    icon: Clock,
  },
  {
    title: "Puja and Homa",
    description: "Experience divine blessings through sacred rituals and ceremonies.",
    icon: Flame,
  },
  {
    title: "Career & Business Reading",
    description: "Get insights into your professional life and financial opportunities.",
    icon: Briefcase,
  },
  {
    title: "Health & Wellness Astrology",
    description: "Understand your physical and mental well-being through astrology.",
    icon: Activity,
  },
  {
    title: "Spiritual Guidance Session",
    description: "Receive personalized spiritual insights and life coaching.",
    icon: Lightbulb,
  }
];

const ServicePage = () => {
  return (
      <Box w="full" h={{ base: "auto", md: "auto" }} mt={{md:20, base:4}}  color="black">
    <HStack
      maxW="1200px"
      mx="auto"
      py={{ base: 10, md: 20 }}
      spacing={10}
      align="center"
      justify="space-between"
      flexDirection={{ base: "column-reverse", md: "row" }}
      
    >
      {/* Text Content */}
      <VStack align="start"       px={6} spacing={6} flex="1">
        <Heading fontFamily={"DM Serif Text"} fontSize={{ base: "2xl", md: "4xl" }} color="orange.700">
          Unlock Your Cosmic Destiny
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.800" maxW="500px">
          Experience deep insights into your future, relationships, and spiritual growth through expert astrology services.
        </Text>
        <Link to={'/book'}>
        <Button
          bg="orange.200"
          color="black"
          size="lg"
          _hover={{ bg: "yellow.400" }}
          fontFamily={"DM Serif Text"}
        >
          Get Your Reading
        </Button>
        </Link>
      </VStack>

      {/* Hero Image */}
      <Box flex="1" maxW={'100vh'}  >
        <Image
          src={servic}
          alt="Astrology Hero"
          rounded={{md:'full'}}
          w="full"
          h={{ base: "full", md: "full" }}
          objectFit="cover"
          
        />
      </Box>
    </HStack>

    <VStack spacing={10} p={10} bgGradient={'linear(to-r, white, orange.200)'} rounded={'30'} textAlign="center">
      {/* Header */}
      <Heading fontSize="3xl" fontFamily={"DM Serif Text"} bgGradient={'linear(to-b, white, orange.200)'} rounded={'full'} w={'30vh'}>Our Services</Heading>
      <Text color="gray.600" maxW="600px">
      </Text>

      {/* Services Grid */}
      <Grid
        templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)" }}
        gap={10}
        w="full"
        justifyContent="center"
      >
        {services.map((service, index) => (
          <MotionBox
            key={index}
            bg="white"
            p={5}
            borderRadius="xl"
            textAlign="center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            boxShadow="md"
          >
            <service.icon size={50} color="orange" />
            <Text fontWeight="bold" mt={3} fontFamily={"DM Serif Text"}>{service.title}</Text>
            <Text fontSize="sm" color="gray.800">{service.description}</Text>
          </MotionBox>
        ))}
      </Grid>

      {/* Learn More Button */}
      <Link to={'/book'}>
      <Button
        mt={5}
        bg="orange.200"
        color="black"
        border="2px solid teal.400"
        borderRadius="md"
        _hover={{ bg: "teal.200" }}
        px={10}
        py={6}
        fontSize="lg"
      >
        Learn More
      </Button>
      </Link>
    </VStack>
  </Box>
    
  );
};

export default ServicePage;
