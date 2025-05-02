import React, { useState } from "react";
import {
  Box,
  Heading,
  Text,
  Input,
  Textarea,
  Button,
  VStack,
  FormControl,
  FormLabel,
  FormErrorMessage,
  useToast,
  Container,
  HStack,
  IconButton
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import AnimatedBackground from "../components/AnimatedBackground";
import {
  FaWhatsapp,
  FaEnvelope,
  FaTelegramPlane,
  FaFacebook,
} from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const MotionBox = motion(Box);

const Contact = () => {
  const toast = useToast();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email address";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    toast({
      title: "Message Sent!",
      description: "We’ll get back to you shortly.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });

    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <Box position="relative" minH="100vh" bg="purple.900" color="white" overflow="hidden">
      <AnimatedBackground />

      <Container maxW="3xl" py={20} position="relative" zIndex={1}>
        <MotionBox
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Heading fontSize={{ base: "3xl", md: "5xl" }} textAlign="center" mb={6}>
            Get In <Text as="span" color="purple.300">Touch</Text>
          </Heading>
          <Text fontSize="lg" textAlign="center" mb={10} color="gray.300">
            Have a question or suggestion? We'd love to hear from you.
          </Text>

          <form onSubmit={handleSubmit}>
            <VStack spacing={5}>
              <FormControl isInvalid={errors.name}>
                <FormLabel>Name</FormLabel>
                <Input
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  bg="whiteAlpha.100"
                  _focus={{ bg: "whiteAlpha.200", borderColor: "purple.400" }}
                />
                <FormErrorMessage>{errors.name}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.email}>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder="you@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  bg="whiteAlpha.100"
                  _focus={{ bg: "whiteAlpha.200", borderColor: "purple.400" }}
                />
                <FormErrorMessage>{errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.message}>
                <FormLabel>Message</FormLabel>
                <Textarea
                  placeholder="Type your message..."
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  bg="whiteAlpha.100"
                  _focus={{ bg: "whiteAlpha.200", borderColor: "purple.400" }}
                />
                <FormErrorMessage>{errors.message}</FormErrorMessage>
              </FormControl>

              <Button
                type="submit"
                colorScheme="purple"
                size="lg"
                px={10}
                mt={4}
                bg="purple.500"
                _hover={{ bg: "purple.400", transform: "scale(1.02)" }}
              >
                Send Message
              </Button>
              <Box pt={10}>
                <Text textAlign="center" fontWeight="bold" mb={4} fontSize="lg" color="gray.200">
                  Or reach out directly:
                </Text>

                <HStack justify="center" spacing={3}>
                  <Button
                    as="a"
                    href="mailto:contact@cryptolab.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    colorScheme="purple"
                    variant="ghost"
                    leftIcon={<FaEnvelope size={30} />}
                    _hover={{ bg: "whiteAlpha.100" }}
                  >
                  </Button>
                  <Button
                    as="a"
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    colorScheme="purple"
                    variant="ghost"
                    leftIcon={<FaWhatsapp size={30} />}
                  >
                  </Button>
                  <IconButton
                    as="a"
                    href="https://t.me/cryptolabchannel"
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={<FaTelegramPlane size={30} />}
                    aria-label="Telegram"
                    colorScheme="purple"
                    variant="ghost"
                  />
                  <IconButton
                    as="a"
                    href="https://x.com/cryptolab"
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={<FaSquareXTwitter size={30} />}
                    aria-label="X"
                    colorScheme="purple"
                    variant="ghost"
                  />
                  <IconButton
                    as="a"
                    href="https://facebook.com/cryptolab"
                    target="_blank"
                    rel="noopener noreferrer"
                    icon={<FaFacebook size={30} />}
                    aria-label="Facebook"
                    colorScheme="purple"
                    variant="ghost"
                  />
                </HStack>
              </Box>
            </VStack>
          </form>
        </MotionBox>
      </Container>
    </Box>
  );
};

export default Contact;
