import { 
  Button, Container, Flex, HStack, Text, useBreakpointValue, Box, Image 
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';
import { CgAdd } from 'react-icons/cg';
import { CiMenuBurger } from 'react-icons/ci';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from '@chakra-ui/react';

const Navbar = () => {
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <Container maxW={'full'} px={4} shadow={'lg'}>
      <Flex h={20} alignItems={'center'} justifyContent={'space-between'}>
        
        {/* Logo - Left on Desktop, Center on Mobile */}
        <Box display="flex" alignItems="center">
          <Image 
            src="/logo.png" 
            alt="Logo" 
            boxSize="40px" 
            objectFit="contain"
          />
          {isMobile && (
            <Text ml={2} fontSize={'24px'} fontWeight={'bold'} fontFamily={'Cormorant Garamond'}>
              ...Logistics
            </Text>
          )}
        </Box>

        {/* Title (Only on Desktop) */}
        {!isMobile && (
          <Box flex={1} textAlign={'center'}>
            <Text fontSize={'30px'} fontWeight={'bold'} fontFamily={'Cormorant Garamond'}>
              .....Logistics
            </Text>
          </Box>
        )}

        {/* Desktop Navigation */}
        {!isMobile && (
          <HStack spacing={6}>
            <Link to={'/'}>Home</Link>
            <Link to={'/about'}>About us</Link>
            <Link to={'/contact'}>Contact us</Link>
            <Link to={'/create'}>
              <Button>
                <CgAdd fontSize={20} />
              </Button>
            </Link>
          </HStack>
        )}

        {/* Mobile Navigation (Burger Menu) */}
        {isMobile && (
          <Menu>
            <MenuButton as={Button} colorScheme="blue">
              <CiMenuBurger />
            </MenuButton>
            <MenuList>
              <MenuGroup title="Profile">
                <MenuItem><Link to={'/'}>Home</Link></MenuItem>
                <MenuItem><Link to={'/create'}>Add package</Link></MenuItem>
              </MenuGroup>
              <MenuDivider />
              <MenuGroup title="Help">
                <MenuItem><Link to={'/about'}>About us</Link></MenuItem>
                <MenuItem><Link to={'/contact'}>Contact us</Link></MenuItem>
              </MenuGroup>
            </MenuList>
          </Menu>
        )}
      </Flex>
    </Container>
  );
};

export default Navbar;
