import React from "react";
import { Box, Container, HStack, VStack, Text, Divider, Flex, Center, Stack, Heading, Button, IconButton, useToast } from "@chakra-ui/react";
import { Link, Links } from 'react-router-dom';
import { FaYoutube, FaTelegramPlane, FaFacebook, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useState } from "react";
import { Input } from "@chakra-ui/react";
import FuturisticBackground from "./FuturisticBackground";
const Footer = () => {
    const toast = useToast();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email.trim()) {
            setError("Email is required.");
            return;
        }
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setError("");
        console.log("Form Submitted:", { email });
        toast({
            title: "Email submitted successfully! We'll keep you updated on the latest crypto news.",
            status: "success",
            duration: 3000,
            isClosable: true,
        });
    };

    return (
        <Box position="relative" overflow="hidden">
            {/* Background animation layer */}
            <FuturisticBackground />
            <Box py={8} mt={100} position="relative" zIndex={1}>
                <Stack
                    direction={{ base: 'column', md: 'row' }}
                    justifyContent="space-between"
                    paddingX={5}
                    textAlign="center"
                    spacing={{ base: 10, md: 0 }}
                >
                    <VStack color="white">
                        <Heading as="h3">EONCOIN</Heading>
                        <Text>The Smart Way to Crypto Investing</Text>
                        <Text>Where crypto dreams become reality</Text>
                    </VStack>

                    <VStack color="white" spacing={4}>
                        <Heading>Contact</Heading>
                        <HStack><FaEnvelope /><Text>EONCOIN@gmail.COM</Text></HStack>
                        <HStack><FaPhone /><Text>+(xxx) xx xxx-xxxx</Text></HStack>
                    </VStack>

                    <VStack>
                        <Heading color="white">NEWSLETTER</Heading>
                        <Text color="white">SUBSCRIBE FOR CRYPTO</Text>
                        <Text color="white">INSIGHTS AND UPDATES</Text>
                        <form onSubmit={handleSubmit}>
                            <Input
                                placeholder="Your Email"
                                name="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                bg="white"
                                color="black"
                            />
                            <Text py={1} color="red.300">{error}</Text>
                            <Button colorScheme="green" type="submit">Subscribe</Button>
                        </form>
                    </VStack>
                </Stack>
                <Divider py={4} />
                <Text color="white" p={6} textAlign="center" fontSize={{ base: "sm", md: "md" }}>
                    © {new Date().getFullYear()} EONCOIN. All rights reserved.
                </Text>
            </Box>
        </Box>
    );
};

export default Footer;
