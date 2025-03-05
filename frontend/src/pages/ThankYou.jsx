import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <Box textAlign="center" mt={10} p={6}>
      <Heading as="h1" size="2xl" color="teal.500" mb={4}>
        Thank You!
      </Heading>
      <Text fontSize="lg" mb={6}>
        Your request has been submitted. We will contact you soon.
      </Text>
      <Link to="/">
        <Button colorScheme="teal" size="lg">
          Back to Home
        </Button>
      </Link>
    </Box>
  );
};

export default ThankYou;
