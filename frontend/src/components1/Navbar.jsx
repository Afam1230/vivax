
import { 
    Box, 
    Flex, 
    Spacer, 
    Button, 
    Image, 
    HStack, 
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    IconButton,
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    VStack
  } from "@chakra-ui/react";
  import { HamburgerIcon } from "@chakra-ui/icons";
  import { useIsMobile } from "../hooks/use-mobile";
import { useNavigate } from "react-router-dom";
  
  const Navbar = () => {
    const navigate = useNavigate()
    const isMobile = useIsMobile();
    const { isOpen, onOpen, onClose } = useDisclosure();
  
    return (
      <Box py={4} px={{ base: 4, md: 10 }} position="sticky" top={0} zIndex={100} bg="rgba(13, 16, 45, 0.9)" backdropFilter="blur(10px)">
        <Flex align="center">
          <Box>
            <Flex align="center">
              <Box boxSize={8} bg="purple.500" borderRadius="full" mr={2}></Box>
              <Box fontWeight="bold" fontSize="xl" color="white">CryptoLab</Box>
            </Flex>
          </Box>
          
          <Spacer />
          
          {!isMobile ? (
            <>   
              <HStack spacing={4}>
                <Button variant="outline" colorScheme="purple" onClick={()=>navigate("/login")}>Log In</Button>
                <Button colorScheme="purple" onClick={()=>navigate("/register")} >Sign Up</Button>
              </HStack>
            </>
          ) : (
            <IconButton
              aria-label="Open menu"
              icon={<HamburgerIcon />}
              variant="outline"
              colorScheme="purple"
              onClick={onOpen}
            />
          )}
        </Flex>
        
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="gray.900">
            <DrawerCloseButton color="white" />
            <DrawerHeader color="white">Menu</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4} align="stretch" color="white">
                <Button onClick={()=>navigate("/login")} my={2} colorScheme="purple">Log In</Button>
                <Button onClick={()=>navigate("/register")} colorScheme="purple" variant="solid">Sign Up</Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Box>
    );
  }; 
  
  export default Navbar;