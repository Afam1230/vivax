// src/components/PricingPage.js
import React from 'react';
import { ChakraProvider, Box, Flex, Heading, Text, Button, VStack, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const PricingPage = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  const pricingTiers = [
    {
      title: 'Basic',
      price: '$29',
      features: ['Up to 10 shipments/month', 'Real-time tracking', 'Email support'],
      buttonText: 'Get Started',
      buttonVariant: 'outline',
      btnlink:'/request-account'
    },
    {
      title: 'Pro',
      price: '$99',
      features: ['Up to 50 shipments/month', 'Real-time tracking', 'Priority email support', 'API access'],
      buttonText: 'Get Started',
      buttonVariant: 'solid',
      btnlink:'/request-account'
    },
    {
      title: 'Enterprise',
      price: 'Custom',
      features: ['Unlimited shipments', 'Real-time tracking', '24/7 support', 'API access', 'Dedicated account manager'],
      buttonText: 'Contact Us',
      buttonVariant: 'outline',
      btnlink:'/support'
    },
  ];

  return (
    <ChakraProvider>
      <Box py={10} px={5} bg="gray.50">
        <VStack spacing={8} textAlign="center">
          <Heading as="h1" size="2xl" fontWeight="extrabold">
            Pricing Plans
          </Heading>
          <Text fontSize="xl" color="gray.600">
            Choose the plan that fits your logistics needs
          </Text>
        </VStack>

        <Flex
          direction={isMobile ? 'column' : 'row'}
          justify="center"
          align="center"
          mt={10}
          spacing={isMobile ? 6 : 0}
        >
          {pricingTiers.map((tier, index) => (
            <Box
              key={index}
              bg="white"
              p={8}
              borderRadius="lg"
              boxShadow="lg"
              textAlign="center"
              width={isMobile ? '100%' : '300px'}
              mx={isMobile ? 0 : 4}
              my={isMobile ? 4 : 0}
            >
              <Heading as="h2" size="lg" mb={4}>
                {tier.title}
              </Heading>
              <Text fontSize="3xl" fontWeight="bold" mb={4}>
                {tier.price}
              </Text>
              <VStack spacing={4} mb={6}>
                {tier.features.map((feature, idx) => (
                  <Text key={idx} fontSize="md" color="gray.600">
                    {feature}
                  </Text>
                ))}
              </VStack>
              <Link to={tier.btnlink} >
              <Button colorScheme="blue" variant={tier.buttonVariant} size="lg" width="100%">
                {tier.buttonText}
              </Button>
              </Link>

            </Box>
          ))}
        </Flex>
      </Box>
    </ChakraProvider>
  );
};

export default PricingPage;