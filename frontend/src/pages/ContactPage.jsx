import React from "react";
import { Box, Heading, Text, VStack, Icon, Flex } from "@chakra-ui/react";
import { FaEnvelope, FaPhone, FaFax } from "react-icons/fa";

const ContactPage = () => {
  return (
    <Flex minH={'20vh'}>
    <Box 
      maxW="400px" 
      mx="auto" 
      p={10} 
      borderRadius="lg" 
      boxShadow="xl" 
      bg="gray.100"
      textAlign="center"
    >
      <Heading size="lg" mb={4} color="teal.600">Contact Us</Heading>
      
      <VStack spacing={4}>
        <Box display="flex" alignItems="center" gap={3}>
          <Icon as={FaEnvelope} color="teal.500" boxSize={5} />
          <Text fontSize="lg" fontWeight="bold">cargomaster.shipping@gmail.com</Text>
        </Box>

        <Box display="flex" alignItems="center" gap={3}>
          <Icon as={FaPhone} color="teal.500" boxSize={5} />
          <Text fontSize="lg" fontWeight="bold">+1 (213) 396-8669</Text>
        </Box>

        <Box display="flex" alignItems="center" gap={3}>
          <Icon as={FaFax} color="teal.500" boxSize={5} />
          <Text fontSize="lg" fontWeight="bold">+1 (213) 396-8669</Text>
        </Box>
      </VStack>
    </Box>
    </Flex>

  );
};

export default ContactPage;
