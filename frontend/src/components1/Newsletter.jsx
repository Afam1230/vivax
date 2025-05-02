
import { Box, Container, Heading, Text, Input, Button, Flex, FormControl, useToast } from "@chakra-ui/react";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
  
    setIsSubmitting(true);
  
    setTimeout(() => {
      console.log("Subscribed with:", email);
      setEmail("");
      setIsSubmitting(false);
  
      toast({
        title: "Thanks for subscribing!",
        description: "We would be sure to keep you updated with our crypto insights.",
        status: "success",
        duration: 4000,
        isClosable: true,
        position: "top",
      });
    }, 1500);
  };
  
  return (
    <Box bg="gray.900" py={12} borderTop="1px solid" borderColor="gray.800">
      <Container maxW="container.xl">
        <Box textAlign="center" mb={6}>
          <Heading as="h3" size="lg" color="white" mb={3}>
            Subscribe to Our Newsletter
          </Heading>
          <Text color="gray.300" maxW="600px" mx="auto">
            Stay updated with the latest mining trends, market insights, and special offers from our team.
          </Text>
        </Box>
        
        <Flex 
          as="form" 
          onSubmit={handleSubmit}
          maxW="500px" 
          mx="auto"
          direction={{ base: "column", md: "row" }}
          gap={4}
        >
          <FormControl flex="1">
            <Input 
              placeholder="Enter your email address" 
              size="lg"
              bg="gray.800"
              border="1px solid"
              borderColor="gray.700"
              color="white"
              _placeholder={{ color: "gray.400" }}
              _hover={{ borderColor: "purple.500" }}
              _focus={{ borderColor: "purple.500", boxShadow: "0 0 0 1px var(--chakra-colors-purple-500)" }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </FormControl>
          <Button 
            type="submit"
            colorScheme="purple" 
            size="lg"
            isLoading={isSubmitting}
            px={8}
          >
            Subscribe
          </Button>
        </Flex>
      </Container>
    </Box>
  );
};

export default Newsletter;