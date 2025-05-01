import React, { useEffect } from "react";
import { Box, IconButton } from "@chakra-ui/react";
import { FaWhatsapp } from "react-icons/fa";
import ManageOperations from "../pages/ManageOperations";
import useOperationSettingsStore from "../store/useOperationSettingsStore";



const WhatsAppButton = () => {
  const { settings, fetchSettings } = useOperationSettingsStore();

  useEffect(() => {
    fetchSettings(); // or skip if already called elsewhere
  }, []);
  return (
    <Box
      position="fixed"
      bottom="20px"
      right="20px"
      zIndex="1000"
    >
      <IconButton
        as="a"
        href={settings.phone} // Replace with your WhatsApp number
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
