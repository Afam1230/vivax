import React from "react";
import {
    Box, Flex, Heading, HStack, Button, IconButton, Drawer, DrawerOverlay,
    DrawerContent, DrawerHeader, DrawerBody, useDisclosure, Image, VStack,
    Text
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // React Icons
import { MdAccountCircle } from "react-icons/md";
import logo from "../images/logo.png";
import img8 from "../images/img8.png"
const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box
            bg="white"
            boxShadow="md"
            px={5}
            // bgGradient="linear(to-r, white, blue.200)" // ✅ Fixed Gradient
            position="fixed" // ✅ Make Navbar Stick to the Top
            top="0"
            left="0"
            w="100%"
            zIndex="1000"
        >
            <Flex justifyContent="space-between" alignItems="center">
                {/* Logo and Title */}
                <HStack spacing={5}>
                    <Image src={logo} alt="Logo" h={{ lg: '100px', base: '50px', md: '80px' }} />
                    <Heading fontFamily={"DM Serif Text"} size="lg" color="#2C3E50">Astro Devaraj</Heading>
                </HStack>

                {/* Desktop Navigation */}
                <HStack spacing={5} display={{ base: "none", md: "flex" }} >
                    <Button variant="ghost"><Link to="/"><Text fontFamily={"DM Serif Text"} color={'#2C3E50'} fontSize={25} fontWeight={10}>Home</Text></Link></Button>
                    <Button variant="ghost"><Link to="/blog"><Text fontFamily={"DM Serif Text"} color={'#2C3E50'} fontSize={25} fontWeight={10}>Blog</Text></Link></Button>
                    <Button variant="ghost"><Link to="/services"><Text fontFamily={"DM Serif Text"} color={'#2C3E50'} fontSize={25} fontWeight={10}>Services</Text></Link></Button>
                    <Button variant="ghost"><Link to="/shop"><Text fontFamily={"DM Serif Text"} color={'#2C3E50'} fontSize={25} fontWeight={10}>Shop</Text></Link></Button>
                    <Button variant="ghost"><Link to="/about"><Text fontFamily={"DM Serif Text"} color={'#2C3E50'} fontSize={25} fontWeight={10}>About</Text></Link></Button>
                    <Button colorScheme={'orange'}><Link to="/book"><Text fontFamily={"DM Serif Text"} fontSize={25} fontWeight={10}>Book Now!</Text></Link></Button>
                </HStack>

                {/* Mobile Menu Button */}
                <IconButton
                    icon={isOpen ? <FiX size={24} /> : <FiMenu size={30} />}
                    display={{ base: "flex", md: "none" }}
                    onClick={isOpen ? onClose : onOpen}
                    aria-label="Open Menu"
                    outlineColor={'white'}
                    bg={'orange.700'}
                    _hover={{ bg: "gray.100" }}
                    color={'white'}
                />
            </Flex>

            {/* Mobile Drawer Navigation */}
            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent borderRadius="md">
                    {/* Drawer Header with Close Button */}
                    <DrawerHeader display="flex" alignItems="center" justifyContent="space-between">
                        <VStack align="start" spacing={0}>
                            <HStack>
                                <Image src={img8} alt="image" rounded={'full'} boxSize={'40%'} />
                                <Heading size="md">Devaraj</Heading>
                            </HStack>
                        </VStack>

                        <IconButton
                            icon={<FiX size={24} />}
                            onClick={onClose}
                            aria-label="Close Menu"
                            bg="transparent"
                            _hover={{ bg: "gray.100" }}
                        />
                    </DrawerHeader>

                    <DrawerBody>
                        {/* Promo Section */}
                        <Box bg="#78350F" color="white" p={4} borderRadius="md" textAlign="left">
                            <Heading size="sm" mb={2}>Hello there,</Heading>
                            <Box fontSize="sm" mb={3}>
                                Are you looking for a plan that best suits your E-commerce business? Well, we've got something great for you.
                            </Box>
                            <Button colorScheme="whiteAlpha" variant="outline" w="100%">
                                Go to Store
                            </Button>
                        </Box>

                        {/* Navigation Links */}
                        <VStack spacing={4} mt={4} align="center">
                            <HStack justifyContent="space-between" p={3} borderRadius="md" _hover={{ bg: "gray.100" }}>
                                <HStack>
                                    <Box>Home</Box>
                                </HStack>
                            </HStack>

                            <HStack justifyContent="space-between" p={3} borderRadius="md" _hover={{ bg: "gray.100" }}>
                                <HStack>
                                    <Box>Blog</Box>
                                </HStack>
                            </HStack>

                            <HStack justifyContent="space-between" p={3} borderRadius="md" _hover={{ bg: "gray.100" }}>
                                <HStack>
                                    <Box>Services</Box>
                                </HStack>
                            </HStack>

                            <HStack justifyContent="space-between" p={3} borderRadius="md" _hover={{ bg: "gray.100" }}>
                                <HStack>
                                    <Box>About</Box>
                                </HStack>
                            </HStack>

                            {/* Book Now - Standout Button */}
                            <HStack
                                justifyContent="center"
                                p={3}
                                borderRadius="md"
                                bg="teal"
                                color="white"
                                fontWeight="bold"
                                _hover={{ bg: "blue.600" }}
                            >
                                <HStack>
                                    <Box>Book Now</Box>
                                </HStack>
                            </HStack>
                        </VStack>

                    </DrawerBody>
                </DrawerContent>
            </Drawer>


        </Box>
    );
};

export default Navbar;
