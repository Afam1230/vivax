import { useState } from "react";
import { Box, Input, Textarea, Button, FormControl, FormLabel, VStack, Heading, useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BookingPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post("http://localhost:5000/api/book", formData);
      if (response.status === 200) {
        toast({ title: "Booking request sent!", status: "success", duration: 3000, isClosable: true });
        navigate("/thank-you"); // Redirect to Thank-You page
      }
    } catch (error) {
      toast({ title: "Error sending request", status: "error", duration: 3000, isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto"  mt={{base:40,md:40,lg:40,xl:60}}  p={5} boxShadow="lg" borderRadius="lg">
      <Heading textAlign="center" fontSize="2xl" color="orange.700">Book a Consultation</Heading>
      <VStack spacing={4} mt={5} as="form" onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Phone</FormLabel>
          <Input type="text" name="phone" value={formData.phone} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Message</FormLabel>
          <Textarea name="message" value={formData.message} onChange={handleChange} />
        </FormControl>
        <Button type="submit" colorScheme="orange" isLoading={loading}>Submit</Button>
      </VStack>
    </Box>
  );
};

export default BookingPage;
