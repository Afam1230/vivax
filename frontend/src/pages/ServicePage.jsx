import { Box, Grid, Heading, Text, VStack, Button,  HStack, Image  } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { HeartHandshake, Calendar, History, Globe, Clock, Flame, Briefcase, Activity, Lightbulb } from "lucide-react";
import { Link } from "react-router-dom";

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
    <Box w="full" h={{ base: "auto", md: "100vh" }} bg="white" color="black">
    <HStack
      maxW="1200px"
      mx="auto"
      px={6}
      py={{ base: 10, md: 20 }}
      spacing={10}
      align="center"
      justify="space-between"
      flexDirection={{ base: "column-reverse", md: "row" }}
    >
      {/* Text Content */}
      <VStack align="start" spacing={6} flex="1">
        <Heading fontSize={{ base: "2xl", md: "4xl" }} color="orange.700">
          Unlock Your Cosmic Destiny
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} color="gray.300" maxW="500px">
          Experience deep insights into your future, relationships, and spiritual growth through expert astrology services.
        </Text>
        <Button
          bg="orange.200"
          color="black"
          size="lg"
          _hover={{ bg: "yellow.400" }}
        >
          Get Your Reading
        </Button>
      </VStack>

      {/* Hero Image */}
      <Box flex="1">
        <Image
          src="https://scontent.flos1-3.fna.fbcdn.net/v/t39.30808-6/481899812_1036814558466142_93037116377118753_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=XyOKx9xd7AEQ7kNvgGYaDs2&_nc_oc=AdlmrcGJsq0wQMpzscpACcwHkknbf-2csJU6yGbcZOJMBoMb0IugUCNc52bgvc6qqBw&_nc_zt=23&_nc_ht=scontent.flos1-3.fna&_nc_gid=AghnqFX4mvmqiWh2Z94W8A&oh=00_AYE6cg2x4hLK765XI8pF7PBcvGXtLQA2d8vHNuIATVn9dg&oe=67E9320A"
          alt="Astrology Hero"
          rounded={'full'}
          w="full"
          h={{ base: "300px", md: "full" }}
          objectFit="cover"
        />
      </Box>
    </HStack>

    <VStack spacing={10} p={10} textAlign="center">
      {/* Header */}
      <Heading fontSize="3xl">Our Services</Heading>
      <Text color="gray.600" maxW="600px">
        Consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.
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
            <service.icon size={50} color="gold" />
            <Text fontWeight="bold" mt={3}>{service.title}</Text>
            <Text fontSize="sm" color="gray.500">{service.description}</Text>
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
