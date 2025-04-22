// components/Navbar.jsx
import {
    Box,
    Flex,
    IconButton,
    Button,
    useDisclosure,
    Stack,
    HStack,
    VStack,
    Drawer,
    DrawerBody,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useAuthStore } from "../store/useAuthStore";


export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const Links = ["Link1", "Link2", "Link3", "Link4"];
    const { isAuthenticated, logout } = useAuthStore();
    const NavLinks = ({ vertical = false }) => (
        <Stack
            direction={vertical ? "column" : "row"}
            spacing={vertical ? 4 : 6}
            align={vertical ? "start" : "center"}
        >
            {Links.map((link, i) => (
                <Button key={i} variant="ghost" colorScheme="whiteAlpha">
                    {link}
                </Button>
            ))}
            {isAuthenticated ? (
                <Button colorScheme="red" variant="outline"     
                onClick={() => {
                    logout();            // 🔥 This clears token and auth state
                    navigate("/login");  // Optional: redirect to login page
                  }}>
                    Logout
                </Button>
            ) : (
                <Button colorScheme="green" variant="outline" onClick={() => navigate("/login")}>
                    Login
                </Button>
            )}


        </Stack>
    );

    return (
        <Box bg="#1B263B" px={4} py={2} color="white" boxShadow="md">
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <Text fontWeight="bold" fontSize="xl">MyDashboard</Text>
                <HStack spacing={8} alignItems="center" display={{ base: "none", md: "flex" }}>
                    <NavLinks />
                </HStack>
                <IconButton
                    size="md"
                    icon={<HamburgerIcon />}
                    aria-label="Open Menu"
                    display={{ base: "flex", md: "none" }}
                    onClick={onOpen}
                />
            </Flex>

            {/* Mobile Drawer */}
            <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent bg="#1B263B" color="white">
                    <DrawerCloseButton />
                    <DrawerBody>
                        <VStack align="start" spacing={6} mt={10}>
                            <NavLinks vertical />
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    );
}
