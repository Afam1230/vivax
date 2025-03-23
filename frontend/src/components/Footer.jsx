import React from "react";
import { Box, Container, HStack, VStack, Text, Divider, Flex, Center, Stack, Heading, Button } from "@chakra-ui/react";
import { Link, Links } from 'react-router-dom';

const Footer = () => {
    return (
        <Box bg="orange.700" color="white" py={8} mt={100}  >
            <Stack direction={{ base: 'column', md: 'row' }} justifyContent={'space-between'} paddingX={5} textAlign={'center'} spacing={{base:10, md:0, lg:0}} >
                <VStack>
                    <Heading as={"h3"}>ASTRO GUIDE</Heading>
                    <Text>GUIDING SOULS THROUGH</Text>
                    <Text> ACIENT WISDOM AND MODERN</Text>
                    <Text>UNDERSTANDING</Text>
                </VStack>

                <VStack>
                    <Heading as={"h3"}>QUICK LINKS</Heading>
                    <Link to={''}> Services </Link>
                    <Link to={''}> About </Link>
                    <Link to={''}> Blog </Link>
                    <Link to={''}> Contact </Link>
                </VStack>

                <VStack>
                    <Heading>Contact</Heading>
                    <HStack>
                        {/* CONTACT ICON */}
                        <Text>CONTACT@ASTROGUIDE.COM</Text>
                    </HStack>
                    <HStack>
                        {/* PHONE ICON */}
                        <Text>+ (155) 123-4567</Text>
                    </HStack>
                    <HStack>
                        {/* LOCATION ICON */}
                        <Text>LOS ANGELES, CA</Text>
                    </HStack>
                </VStack>
                
                <VStack>
                    <Heading>NEWSLETTER</Heading>
                    <Text>SUBSCRIBE FOR SPIRITUAL</Text>
                    <Text>INSIGHTS AND UPDATES</Text>
                    <input placeholder="Your Email" name="email" />
                    <Button>submit</Button>
                </VStack>
            </Stack>
            <Divider paddingY={4}/>
            <Text p={6} textAlign={'center'} fontSize={{ base: "sm", md: "md" }}>© {new Date().getFullYear()} ASTRO GUIDE. All rights reserved.</Text>
        </Box>
    );
};

export default Footer;
