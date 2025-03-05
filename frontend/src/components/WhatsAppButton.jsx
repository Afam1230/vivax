import React from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";





const WhatsAppButton = () => {
  return (
    <Box 
      position="fixed" 
      bottom="20px" 
      right="20px" 
      zIndex="1000"
    >
      <IconButton
        as="a"
        href = 'https://wa.me/12133968669' // Replace with your WhatsApp number
        target="_blank"
        aria-label="WhatsApp"
        icon={<FaWhatsapp size="30px" />}
        colorScheme="green"
        size="lg"
        borderRadius="full"
        boxShadow="lg"
        _hover={{ transform: "scale(1.5)" }}
      />
    </Box>
  );
};

export default WhatsAppButton;
