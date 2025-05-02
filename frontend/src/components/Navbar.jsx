import {
  Box, Flex, IconButton, Button, useDisclosure, Stack, HStack,
  VStack, Drawer, DrawerBody, DrawerOverlay, DrawerContent,
  DrawerCloseButton, Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoHomeFill } from "react-icons/go";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate, useLocation } from "react-router-dom";
import { MdDashboard } from "react-icons/md";

export default function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const activePath = location.pathname;

  const Links = ["/", "/dashboard", "/pricing", "/deposit", "/withdraw", "/transactions"];
  const pathToTitleMap = {
    "/": <GoHomeFill size={30} />,
    "/dashboard": "Dashboard",
    "/pricing": "Pricing",
    "/deposit": "Deposit",
    "/withdraw": "Withdraw",
    "/transactions": "Transactions",
    "/login": "Login",
    "/register": "Register",
  };

  // Define routes where nav links should be hidden
  const hideNavLinksOn = ["/", "/login", "/register"];
  const shouldHideLinks = hideNavLinksOn.includes(activePath);

  const NavLinks = ({ vertical = false }) => (
    <Stack
      direction={vertical ? "column" : "row"}
      spacing={vertical ? 3 : 2}
      align={vertical ? "center" : "center"}
    >
      {!shouldHideLinks && Links.map((link, i) => (
        <Button
          key={i}
          variant={link === activePath ? "solid" : "ghost"}
          colorScheme={link === activePath ? "blue" : "white"}
          onClick={() => {
            navigate(link);
            onClose(); // Close drawer on mobile
          }}
        >
          {pathToTitleMap[link]}
        </Button>
      ))}

      {!shouldHideLinks && isAuthenticated && (
        <Button colorScheme="red" variant="outline" onClick={() => {
          logout();
          navigate("/login");
          onClose();
        }}>
          Logout
        </Button>
      )}

      {!shouldHideLinks && !isAuthenticated && (
        <Button colorScheme="green" variant="outline" onClick={() => navigate("/login")}>
          Login
        </Button>
      )}
    </Stack>
  );

  return (
    <Box bg="#1B263B" bgGradient={'linear(to-r, #1B263B, purple.500)'} px={1} color="white" boxShadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* 🏷️ Dynamic Title */}
        <Text fontWeight="bold" fontSize="xl">
          {pathToTitleMap[activePath] || <MdDashboard size={30} /> }
        </Text>

        {/* Desktop Nav */}
        {!shouldHideLinks && (
          <HStack spacing={1} alignItems="center" color={'white'} display={{ base: "none", md: "flex" }}>
            <NavLinks />
          </HStack>
        )}

        {/* Mobile Menu Button */}
        {!shouldHideLinks && (
          <IconButton
            size="md"
            icon={<RxHamburgerMenu size={30} />}
            aria-label="Open Menu"
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
            colorScheme="black"
          />
        )}
      </Flex>

      {/* Mobile Drawer */}
      {!shouldHideLinks && (
        <Drawer placement="top" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent
            bg="rgba(27, 38, 59, 0.7)" // your color with opacity
            backdropFilter="blur(20px)"
            color="white"
          >              <DrawerCloseButton />
            <DrawerBody onClick={onClose}>
              <VStack align="center" spacing={6} mt={10}>
                <NavLinks vertical />
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      )}
    </Box>
  );
}
