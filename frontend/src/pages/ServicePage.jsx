import React from 'react';
import { Box, Flex, Grid, Heading, Text, Image, Icon, Button, VStack, } from '@chakra-ui/react';
import { FaTruck, FaWarehouse, FaShippingFast, FaBoxOpen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import hero from '../assets/banner.jpg'

const ServicePage = () => {
  
  return (
    <Box p={8}>
      <Heading as="h1" size="2xl" textAlign="center" mb={10} color={'teal'}>
        Our Logistics Services
      </Heading>
            <Box position="relative" h={{ base: "40vh", md: "70vh" }} bg="black">
              <Image src={hero} alt="Hero Background" objectFit="cover" w="full" h="full" opacity={0.7} />
              <VStack position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" spacing={4} color="white">
                <Heading textAlign="center" fontSize={{ base: "2xl", md: "4xl" }}>
                  See how truly integrated logistics delivers
                </Heading>
                <Text textAlign="center" maxW="lg">
                  With truly integrated logistics, there’s always a new way to keep your goods moving and your business growing.
                </Text>
                <Button colorScheme="blue">Get started</Button>
              </VStack>
            </Box>

      <Grid templateColumns={{ base: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }} gap={8}>
        <ServiceCard
          icon={FaTruck}
          title="Transportation"
          description="Efficient and reliable transportation services tailored to your needs."
        />
        <ServiceCard
          icon={FaWarehouse}
          title="Warehousing"
          description="Secure and spacious warehousing solutions for all types of goods."
        />
        <ServiceCard
          icon={FaShippingFast}
          title="Fast Delivery"
          description="Quick and timely delivery services to keep your business moving."
        />
        <ServiceCard
          icon={FaBoxOpen}
          title="Packaging"
          description="Professional packaging services to ensure the safety of your goods."
        />
      </Grid>

      {/* Request an Account Button */}
      <Flex justify="center" mt={10}>
        <Link to="/request-account">
          <Button colorScheme="teal" size="lg">
            Request an Account
          </Button>
        </Link>
      </Flex>
    </Box>
  );
};

const ServiceCard = ({ icon, title, description, imageUrl }) => {
  return (
    <Box
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      boxShadow="lg"
      textAlign="center"
      p={6}
      transition="all 0.3s"
      _hover={{ transform: 'scale(1.05)', boxShadow: 'xl' }}
    >
      <Icon as={icon} w={12} h={12} color="teal.500" mb={4} />
      <Heading as="h2" size="lg" mb={4}>
        {title}
      </Heading>
      <Text mb={4}>{description}</Text>
    </Box>
  );
};

export default ServicePage;
