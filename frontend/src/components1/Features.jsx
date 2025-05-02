
import { Box, Container, Heading, Text, SimpleGrid, Flex, Icon } from "@chakra-ui/react";
import { ShieldIcon, WalletIcon, LockIcon } from "./Icons";

const FeatureCard = ({ icon, title, description }) => {
  return (
    <Box 
      bg="rgba(30, 30, 60, 0.5)" 
      p={6} 
      borderRadius="lg" 
      boxShadow="md"
      border="1px solid"
      borderColor="purple.800"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", borderColor: "purple.500" }}
    >
      <Flex direction="column" align="center" textAlign="center">
        <Box 
          bg="purple.900" 
          p={3} 
          borderRadius="full" 
          mb={4}
          boxShadow="0 0 15px rgba(149, 76, 233, 0.5)"
        >
          <Icon as={icon} w={8} h={8} color="purple.400" />
        </Box>
        <Heading as="h3" size="md" mb={3} color="white">{title}</Heading>
        <Text color="gray.300">{description}</Text>
      </Flex>
    </Box>
  );
};

const Features = () => {
  return (
    <Box bg="gray.900" py={16}>
      <Container maxW="container.xl">
        <Box textAlign="center" mb={12}>
          <Text color="purple.400" fontWeight="bold" mb={3}>ABOUT CRYPTOLAB</Text>
          <Heading as="h2" size="xl" color="white" mb={5}>
            Advanced Features
          </Heading>
          <Text color="gray.300" maxW="800px" mx="auto">
            Our platform combines cutting-edge technology with user-friendly design to bring you the most profitable and secure mining experience available on the market today.
          </Text>
        </Box>
        
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          <FeatureCard 
            icon={ShieldIcon}
            title="Bulletproof Security"
            description="Advanced encryption and multi-factor authentication keep your assets safe. Our system is regularly audited by top security firms."
          />
          <FeatureCard 
            icon={WalletIcon}
            title="Instant Withdrawals"
            description="Access your earnings whenever you want with our instant withdrawal system. No minimum thresholds, no waiting periods."
          />
          <FeatureCard 
            icon={LockIcon}
            title="Smart Contracts"
            description="Our blockchain-based smart contracts ensure transparent operations and automatic execution of all platform functions."
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Features;
