import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import {Link} from 'react-router-dom'

const SupportForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    country: "",
    city: "",
    address: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <Container maxW={{ base: "container.sm", md: "container.xl", lg: "100vw" }}>
      <Box p={8} shadow="lg" borderWidth={1} borderRadius="md" w={{ base: "100%", md: "80%", lg: "80%" }} mx="auto">
        <Heading textAlign="center" mb={6} fontSize={{ base: "xl", md: "2xl", lg: "3xl" }}>Customer Support</Heading>
        <form onSubmit={handleSubmit}>
          <VStack spacing={4} w="full">
            <HStack w="full" spacing={4} flexWrap={{ base: "wrap", md: "nowrap" }}>
              <Input placeholder="Your Name" name="name" value={formData.name} onChange={handleChange} />
              <Input placeholder="Your Email" name="email" value={formData.email} onChange={handleChange} />
            </HStack>
            
            <HStack w="full" spacing={4} flexWrap={{ base: "wrap", md: "nowrap" }}>
              <Select placeholder="Country" name="country" value={formData.country} onChange={handleChange}>
                <option value="USA">United States</option>
                <option value="UK">United Kingdom</option>
                <option value="Nigeria">Nigeria</option>
              </Select>
              <Input placeholder="City" name="city" value={formData.city} onChange={handleChange} />
            </HStack>
            
            <Input placeholder="Street Address" name="address" value={formData.address} onChange={handleChange} />
            <Input placeholder="Subject" name="subject" value={formData.subject} onChange={handleChange} />
            <Textarea placeholder="Message" name="message" value={formData.message} onChange={handleChange} height={"150px"} />
            <Link to = {'/thank-you'}>
            <Button colorScheme="blue" size="lg" w={{ base: "full", md: "100%", lg: "100%" }}>Send Message</Button>    
            </Link>
          </VStack>
        </form>
      </Box>
    </Container>
  );
};

const SupportPage = () => {
  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center">
      <SupportForm />
    </Box>
  );
};

export default SupportPage;
