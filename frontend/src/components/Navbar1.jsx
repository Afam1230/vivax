import React from "react";
import { Box, Flex, Heading, HStack, Button, IconButton, Drawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, useDisclosure, Image } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Importing React Icons
import icon1 from "../assets/icon1.png"
const Navbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Box bg="white" boxShadow="md" px={5} py={3} bgGradient="to-r" gradientFrom="red.200" gradientTo="blue.200" >
            <Flex justifyContent="space-between" alignItems="center">
                <HStack spacing={2}>
                    <Image src={icon1} alt="Logo" h="100px" />
                    <Heading size="lg" color="blue.600">Shipgenie</Heading>
                </HStack>
                
                {/* Desktop Navigation */}
                <HStack spacing={5} display={{ base: "none", md: "flex" }}>
                <Button variant="ghost"><Link to="/">Home</Link></Button>
                <Button variant="ghost"><Link to="/pricing">Pricing</Link></Button>
                    <Button variant="ghost"><Link to="/services">Services</Link></Button>
                    <Button variant="ghost"><Link to="/track">Track Package</Link></Button>
                    <Button colorScheme="blue"><Link to="/create">Get Started</Link></Button>
                </HStack>

                {/* Mobile Menu Button */}
                <IconButton 
                    icon={isOpen ? <FiX size={24} /> : <FiMenu size={24} />} 
                    display={{ base: "flex", md: "none" }} 
                    onClick={isOpen ? onClose : onOpen}
                    aria-label="Open Menu"
                    bg="transparent"
                    _hover={{ bg: "gray.100" }}
                />
            </Flex>

            {/* Mobile Drawer Navigation */}
            <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
                    <DrawerBody>
                        <Button variant="ghost" w="100%" mb={3}><Link to="/">Home</Link></Button>
                        <Button variant="ghost" w="100%" mb={3}><Link to="/pricing">Pricing</Link></Button>
                        {/* <Button variant="ghost" w="100%" mb={3}><Link to="/">Home</Link></Button>
                        <Button variant="ghost" w="100%" mb={3}><Link to="/services">Services</Link></Button> */}
                        <Button variant="ghost" w="100%" mb={3}><Link to="/track">Track Package</Link></Button>
                        <Button colorScheme="blue" w="100%"><Link to="/create">Book</Link></Button>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
};

export default Navbar;
