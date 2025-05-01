import React from "react";
import { Box, Container, HStack, VStack, Text, Divider, Flex, Center, Stack, Heading, Button, IconButton, useToast } from "@chakra-ui/react";
import { Link, Links } from 'react-router-dom';
import { FaYoutube, FaTelegramPlane, FaFacebook, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { useState } from "react";
import { Input } from "@chakra-ui/react";

const Footer = () => {
    const toast = useToast();
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent page reload

        if (!email.trim()) {
            setError("Email is required.");
            return;
        }

        // ✅ Add email validation if needed
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        setError(""); // Clear any previous errors
        console.log("Form Submitted:", { email });
        toast({ title: "email submitted successfully!. We would keep you in touch with all latest crypto updates", status: "success", duration: 3000, isClosable: true });

        // 📨 Proceed with form submission logic (EmailJS, API, etc.)
    };





    return (
        <Box py={8} mt={100}   >
            <Stack direction={{ base: 'column', md: 'row' }} justifyContent={'space-between'} paddingX={5} textAlign={'center'} spacing={{ base: 10, md: 0, lg: 0 }} >
                <VStack color="white">
                    <Heading as={"h3"} fontFamily="DM Serif Text">CryptoVest</Heading>
                    <Text>The Smart Way to Crypto Investing</Text>
                    <Text> Where crypto dreams become reality</Text>
                </VStack>

                {/* <VStack color="white">
                    <Heading as={"h3"} fontFamily="DM Serif Text">QUICK LINKS</Heading>
                    <Link to={'/about'}> About </Link>
                    <Link to={'/contact'}> Contact </Link>
                </VStack> */}

                <VStack color="white" spacing={4}>
                    <Heading fontFamily="DM Serif Text">Contact</Heading>

                    <HStack>
                        <FaEnvelope />
                        <Text>cryptovest@gmail.COM</Text>
                    </HStack>

                    <HStack>
                        <FaPhone />
                        <Text>+(xxx) xx xxx-xxxx</Text>
                    </HStack>

                    <HStack>
                        <FaMapMarkerAlt />
                        <Text>ACCRA, GHANA</Text>
                    </HStack>

                    {/* Social Links */}
                    {/* <HStack spacing={4} mt={3}>
                        <a href="https://youtube.com/@astrodevaraj108?si=kyY-4IE-RvHo9uDi" target="_blank" rel="noopener noreferrer">
                            <IconButton icon={<FaYoutube />} aria-label="YouTube" colorScheme="red" />
                        </a>

                        <a href="https://x.com/AsamoahDas108" target="_blank" rel="noopener noreferrer">
                            <IconButton icon={<FaSquareXTwitter />} aria-label="X (Twitter)" colorScheme="gray" />
                        </a>

                        <a href="https://web.facebook.com/DevaRishiDasAsamoah/?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer">
                            <IconButton icon={<FaFacebook />} aria-label="Facebook" colorScheme="blue" />
                        </a>

                        <a href="https://wa.me/2348175725656" target="_blank" rel="noopener noreferrer">
                            <IconButton icon={<FaWhatsapp />} aria-label="WhatsApp" colorScheme="green" />
                        </a>
                    </HStack> */}
                </VStack>

                <VStack>
                    <Heading fontFamily="DM Serif Text" color="white">NEWSLETTER</Heading>
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
                        <Text py={1}></Text>
                        <Button colorScheme="green" type="submit">subscribe</Button>
                    </form>
                </VStack>
            </Stack>
            <Divider paddingY={4} />
            <Text color={'white'} p={6} textAlign={'center'} fontSize={{ base: "sm", md: "md" }}>© {new Date().getFullYear()} CryptoVest. All rights reserved.</Text>
        </Box>
    );
};

export default Footer;
