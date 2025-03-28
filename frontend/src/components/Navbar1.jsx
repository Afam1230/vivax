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
import { FaYoutube, FaTelegramPlane, FaFacebook, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import Cart from "../pages/Cart";
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
                <HStack spacing={{ lg: 5, md: 1 }} display={{ base: "none", md: "flex" }} >
                    <Button variant="ghost"><Link to="/"><Text fontFamily={"DM Serif Text"} color={'#2C3E50'} fontSize={20} fontWeight={10}>Home</Text></Link></Button>
                    <Button variant="ghost"><Link to="/blog"><Text fontFamily={"DM Serif Text"} color={'#2C3E50'} fontSize={20} fontWeight={10}>Blog</Text></Link></Button>
                    <Button variant="ghost"><Link to="/services"><Text fontFamily={"DM Serif Text"} color={'#2C3E50'} fontSize={20} fontWeight={10}>Services</Text></Link></Button>
                    <Button variant="ghost"><Link to="/shop"><Text fontFamily={"DM Serif Text"} color={'#2C3E50'} fontSize={20} fontWeight={10}>Shop</Text></Link></Button>
                    <Button variant="ghost"><Link to="/about"><Text fontFamily={"DM Serif Text"} color={'#2C3E50'} fontSize={20} fontWeight={10}>About</Text></Link></Button>
                    <Button colorScheme={'orange'}><Link to="/book"><Text fontFamily={"DM Serif Text"} fontSize={20} fontWeight={10}>Book Now!</Text></Link></Button>
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
            <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent bgGradient={"linear(to-tr, orange.100, white)"} borderRadius="md" w={'full'} >
                    {/* Drawer Header with Close Button */}
                    <DrawerHeader display="flex" alignItems="center" justifyContent="space-between">
                        <VStack align="start" spacing={0} w={'full'}>
                            <HStack>
                                <Image src={img8} alt="image" rounded={'full'} boxSize={'40%'} />
                                <Heading size="md" fontFamily={'"DM Serif Text"'}>Devarishi Das Asamoah</Heading>
                            </HStack>
                            <HStack spacing={4} mt={3} display={'flex'}>
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
                                Seeking guidance in life, love, or career? Discover the perfect astrology plan tailored just for you! Unlock cosmic insights today.                            </Box>
                            <Link to={'/contact'} onClick={onClose}>
                                <Button colorScheme="whiteAlpha" variant="outline" w="100%">
                                    Contact Us
                                </Button>
                            </Link>

                        </Box>

                        {/* Navigation Links */}
                        <VStack spacing={0} mt={4} fontSize={20} color={'orange.900'} fontWeight={'bold'} align="center">
                            <Link to={'/'} onClick={onClose}>
                                <HStack>
                                    <Box>Home</Box>
                                </HStack>
                            </Link>


                            <Link to={'/shop'} onClick={onClose}>                            <HStack justifyContent="space-between" p={3} borderRadius="md" _hover={{ bg: "gray.100" }}>
                                <HStack>
                                    <Box>Shop</Box>
                                </HStack>
                            </HStack>
                            </Link>


                            <Link to={'/blog'} onClick={onClose}>                            <HStack justifyContent="space-between" p={3} borderRadius="md" _hover={{ bg: "gray.100" }}>
                                <HStack>
                                    <Box>Blog</Box>
                                </HStack>
                            </HStack>
                            </Link>

                            <Link to={'services'} onClick={onClose}>                            <HStack justifyContent="space-between" p={3} borderRadius="md" _hover={{ bg: "gray.100" }}>
                                <HStack>
                                    <Box>Services</Box>
                                </HStack>
                            </HStack></Link>


                            <Link to={'/about'} onClick={onClose}>                            <HStack justifyContent="space-between" p={3} borderRadius="md" _hover={{ bg: "gray.100" }}>
                                <HStack>
                                    <Box>About</Box>
                                </HStack>
                            </HStack></Link>
                            {/* Book Now - Standout Button */}

                        </VStack>

                    </DrawerBody>
                </DrawerContent>
            </Drawer>


        </Box>
    );
};

export default Navbar;
