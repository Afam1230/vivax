import React from 'react'
import { Box, Button, Flex, Heading, Text, Image, Link, Stack } from "@chakra-ui/react";
import hero from "../images/hero.jpg"

const AboutPage = () => {
  return (
    <Box bg="#FDCB58" minH="100vh" display="flex" alignItems="center" justifyContent="center">
    <Box 
      w="80%" 
      bg="white" 
      borderRadius="lg" 
      boxShadow="lg"
      p={10} 
      display="flex" 
      alignItems="center" 
      justifyContent={{base:'normal', lg:'space-between'}}
      position="relative"
    >
      <Stack direction={{base:'column-reverse', lg:'row'}} display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
      {/* Left Section - Text Content */}
      <Box maxW={{lg:"50%", base:'100vh'}}>
        <Text fontSize="sm" fontWeight="bold" color="goldenrod">
          UI/UX DESIGNER
        </Text>
        <Heading fontSize="4xl" mt={2}>
          Hello, my name is <br /> Madelyn Torff
        </Heading>
        <Text mt={4} color="gray.600">
          Short text with details about you, what you do, or your professional career. You can add more information on the about page.
        </Text>
        <Flex mt={6}>
          <Button bg="goldenrod" color="white" mr={3} _hover={{ bg: "yellow.600" }}>
            Shop
          </Button>
          <Button variant="outline" borderColor="black">
            Book Now!!
          </Button>
        </Flex>
      </Box>

      {/* Right Section - Image */}
      <Box position="relative">
        <Image 
          src={hero} // Replace with your actual image path
          alt="Profile"
          objectPosition={{lg:'100% 20%', base:'100% 20%', md:'100% 60%'}}
          borderRadius="full"
          boxSize={{base:'300px',lg:'600px'}}
          objectFit="cover"
        />
      </Box>
      </Stack>
    </Box>
  </Box>
  )
}

export default AboutPage