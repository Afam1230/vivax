import React from "react";
import { Box, Heading, Text, VStack, Icon } from "@chakra-ui/react";
import { FaEnvelope, FaPhone, FaFax } from "react-icons/fa";

const ContactUsCard = () => {
  return (
    <Box 
      maxW="400px" 
      mx="auto" 
      p={6} 
      borderRadius="lg" 
      boxShadow="xl" 
      bg="gray.100"
      textAlign="center"
    >
      <Heading size="lg" mb={4} color="teal.600">Contact Us</Heading>
      
      <VStack spacing={4}>
        <Box display="flex" alignItems="center" gap={3}>
          <Icon as={FaEnvelope} color="teal.500" boxSize={5} />
          <Text fontSize="lg" fontWeight="bold">shipgenie@gmail.com</Text>
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
  );
};

// import React from "react";
// import { Box, Container, HStack, VStack, Text, Divider, Flex, Center } from "@chakra-ui/react";
// import { Link, Links } from 'react-router-dom';

// const Footer = () => {
//     return (
//         <Box bg="yellow.700" color="white" py={8} mt={100}  >
//             <Container maxW="container.xl">
//                 <VStack spacing={3} textAlign="center">
//                     <HStack spacing={8} wrap="wrap" justifyContent="center">
//                         <Link to={'/'}>Home</Link>
//                         <Link to={'/services'}>Services</Link>
//                         <Link to={'/contact'}>Contact</Link>
//                         <Link to={'/support'}>Support</Link>
//                     </HStack>
//                     <Divider borderColor="gray.500" />
//                     <Text fontSize={{ base: "sm", md: "md" }}>© {new Date().getFullYear()} Shipgenie. All rights reserved.</Text>
//                 </VStack>
//             </Container>
//         </Box>
//     );
// };

// export default Footer;


export default ContactUsCard;
