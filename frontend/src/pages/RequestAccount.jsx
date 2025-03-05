import React, { useState } from 'react';
import { 
  Box, Input, FormLabel, Button, VStack, Heading, useToast, 
  Container, FormControl, Select 
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const RequestAccount = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', 
    company: '', city: '', country: '', password: ''
  });

  const navigate = useNavigate();
  const toast = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if any field is empty
    if (Object.values(formData).some((value) => !value.trim())) {
      toast({
        title: 'Error',
        description: 'All fields are required.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    // Redirect to Thank You page
    navigate('/thank-you');
  };

  return (
    <Container 
      maxW="container.md" 
      py={10} 
      borderWidth="1px" 
      borderRadius="lg" 
      boxShadow="xl"
      bg="white"
      px={{ base: 6, md: 12 }} // Adjust padding for different screens
    >
      <Heading as="h2" textAlign="center" mb={6} fontSize={{ base: '2xl', md: '4xl' }}>
        Request an Account
      </Heading>

      <form onSubmit={handleSubmit}>
        <VStack spacing={6}>
          <FormControl>
            <FormLabel fontSize={{ base: 'lg', md: 'xl' }}>Full Name</FormLabel>
            <Input 
              type="text" name="name" value={formData.name} 
              onChange={handleChange} size="lg"
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize={{ base: 'lg', md: 'xl' }}>Email</FormLabel>
            <Input 
              type="email" name="email" value={formData.email} 
              onChange={handleChange} size="lg"
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize={{ base: 'lg', md: 'xl' }}>Phone</FormLabel>
            <Input 
              type="tel" name="phone" value={formData.phone} 
              onChange={handleChange} size="lg"
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize={{ base: 'lg', md: 'xl' }}>Address</FormLabel>
            <Input 
              type="text" name="address" value={formData.address} 
              onChange={handleChange} size="lg"
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize={{ base: 'lg', md: 'xl' }}>Company Name</FormLabel>
            <Input 
              type="text" name="company" value={formData.company} 
              onChange={handleChange} size="lg"
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize={{ base: 'lg', md: 'xl' }}>City</FormLabel>
            <Input 
              type="text" name="city" value={formData.city} 
              onChange={handleChange} size="lg"
            />
          </FormControl>

          <FormControl>
            <FormLabel fontSize={{ base: 'lg', md: 'xl' }}>Country</FormLabel>
            <Select 
              name="country" value={formData.country} 
              onChange={handleChange} size="lg"
            >
              <option value="">Select Country</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
              <option value="Kenya">Kenya</option>
              <option value="United States">United States</option>
              <option value="United Kingdom">United Kingdom</option>
            </Select>
          </FormControl>

          <FormControl>
            <FormLabel fontSize={{ base: 'lg', md: 'xl' }}>Password</FormLabel>
            <Input 
              type="password" name="password" value={formData.password} 
              onChange={handleChange} size="lg"
            />
          </FormControl>

          <Button 
            type="submit" 
            colorScheme="teal" 
            size="lg" 
            width="full" 
            fontSize={{ base: 'lg', md: 'xl' }}
          >
            Submit
          </Button>
        </VStack>
      </form>
    </Container>
  );
};

export default RequestAccount;
