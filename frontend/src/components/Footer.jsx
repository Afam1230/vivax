import React from "react";
import { Box, Container, HStack, VStack, Text, Divider, Flex, Center } from "@chakra-ui/react";
import { Link, Links } from 'react-router-dom';

const Footer = () => {
    return (
        <Box bg="blue.800" color="white" py={8} mt={100}  >
            <Container maxW="container.xl">
                <VStack spacing={3} textAlign="center">
                    <HStack spacing={8} wrap="wrap" justifyContent="center">
                        <Link to={'/'}>Home</Link>
                        <Link to={'/services'}>Services</Link>
                        <Link to={'/contact'}>Contact</Link>
                        <Link to={'/support'}>Support</Link>
                    </HStack>
                    <Divider borderColor="gray.500" />
                    <Text fontSize={{ base: "sm", md: "md" }}>© {new Date().getFullYear()} Shipgenie. All rights reserved.</Text>
                </VStack>
            </Container>
        </Box>
    );
};

export default Footer;
