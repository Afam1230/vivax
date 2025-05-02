
import { Box, Container, Heading, Text, SimpleGrid, VStack, HStack, Button, Icon, Flex } from "@chakra-ui/react";
import { CheckIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const PriceCard = ({ name, price, features, popular }) => {
  const navigate = useNavigate()
  return (
    <Box 
      bg={popular ? "purple.900" : "rgba(30, 30, 60, 0.5)"}
      borderRadius="lg"
      overflow="hidden"
      boxShadow={popular ? "0 0 20px rgba(139, 92, 246, 0.3)" : "md"}
      border="1px solid"
      borderColor={popular ? "purple.500" : "gray.700"}
      transform={popular ? "scale(1.05)" : "scale(1)"}
      transition="all 0.3s ease"
      position="relative"
    >
      {popular && (
        <Box 
          position="absolute" 
          top="0" 
          right="20px" 
          transform="translateY(-50%)"
          bg="purple.500"
          px={3}
          py={1}
          borderRadius="md"
          fontWeight="bold"
          fontSize="sm"
          color="white"
        >
          MOST POPULAR
        </Box>
      )}
      
      <Box p={6} textAlign="center" borderBottom="1px solid" borderColor={popular ? "purple.700" : "gray.700"}>
        <Text color={popular ? "purple.300" : "purple.400"} fontWeight="bold" mb={2}>{name}</Text>
        <Heading as="h2" size="2xl" color="white" mb={2}>
          ${price}
        </Heading>
        <Text color="gray.400">per month</Text>
      </Box>
      
      <VStack spacing={4} p={6} align="stretch">
        {features.map((feature, index) => (
          <HStack key={index} spacing={3}>
            <Icon as={CheckIcon} color="purple.400" />
            <Text color="gray.300">{feature}</Text>
          </HStack>
        ))}
        
        <Button 
          colorScheme={popular ? "purple" : "gray"} 
          variant={popular ? "solid" : "outline"}
          size="lg"
          mt={4}
          onClick={()=>navigate('/login')}
        >
          Choose Plan
        </Button>
      </VStack>
    </Box>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "STARTER",
      price: "149",
      popular: false,
      features: [
        "5 TH/s Mining Power",
        "1-Year Contract",
        "Daily Payouts",
        "24/7 Basic Support",
        "Standard Mining Pool"
      ]
    },
    {
      name: "PROFESSIONAL",
      price: "349",
      popular: true,
      features: [
        "15 TH/s Mining Power",
        "2-Year Contract",
        "Daily Payouts",
        "24/7 Priority Support",
        "Premium Mining Pool",
        "Hardware Upgrades"
      ]
    },
    {
      name: "ENTERPRISE",
      price: "699",
      popular: false,
      features: [
        "35 TH/s Mining Power",
        "3-Year Contract",
        "Hourly Payouts",
        "24/7 VIP Support",
        "Elite Mining Pool",
        "Hardware Upgrades",
        "Custom Mining Setup"
      ]
    },
    {
      name: "ULTIMATE",
      price: "1,299",
      popular: false,
      features: [
        "75 TH/s Mining Power",
        "5-Year Contract",
        "Instant Payouts",
        "24/7 Dedicated Manager",
        "Private Mining Pool",
        "Priority Hardware Upgrades",
        "Custom Mining Setup",
        "Revenue Optimization"
      ]
    }
  ];
  
  return (
    <Box bg="gray.900" py={16}>
      <Container maxW="container.xl">
        <Box textAlign="center" mb={16}>
          <Text color="purple.400" fontWeight="bold" mb={3}>CHOOSE YOUR PLAN</Text>
          <Heading as="h2" size="xl" color="white" mb={5}>
            Mining Packages
          </Heading>
          <Text color="gray.300" maxW="600px" mx="auto">
            Select the mining package that suits your investment goals. All plans include maintenance and electricity costs with no hidden fees.
          </Text>
        </Box>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 8, lg: 4 }} maxW="container.xl" mx="auto">
          {plans.map((plan, index) => (
            <PriceCard
              key={index}
              name={plan.name}
              price={plan.price}
              features={plan.features}
              popular={plan.popular}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Pricing;