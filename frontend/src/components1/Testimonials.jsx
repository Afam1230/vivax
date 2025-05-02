
import { Box, Container, Heading, Text, SimpleGrid, Flex, Avatar, Icon } from "@chakra-ui/react";

const TestimonialCard = ({ content, author, position, avatar }) => {
  return (
    <Box 
      bg="rgba(30, 30, 60, 0.5)" 
      p={6}
      borderRadius="lg"
      borderWidth="1px"
      borderColor="gray.700"
      position="relative"
    >
      <Box 
        position="absolute" 
        top={4} 
        left={4} 
        fontSize="4xl" 
        color="purple.500" 
        opacity={0.4}
        fontFamily="Georgia, serif"
      >
        "
      </Box>
      <Box pt={6}>
        <Text color="gray.300" fontSize="md" mb={4}>
          {content}
        </Text>
        <Flex align="center">
          <Avatar size="md" name={author} src={avatar} mr={3} />
          <Box>
            <Text color="white" fontWeight="bold">{author}</Text>
            <Text color="gray.400" fontSize="sm">{position}</Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

const Testimonials = () => {
  const testimonials = [
    {
      content: "Since joining CryptoLab, my mining returns have increased by 32%. The platform is incredibly user-friendly and their support team is always responsive.",
      author: "Alex Morgan",
      position: "Crypto Investor",
      avatar: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?fit=crop&w=100&h=100"
    },
    {
      content: "I've tried several mining services, but none compare to the efficiency and transparency of CryptoLab. Daily payouts arrive without fail.",
      author: "Sarah Chen",
      position: "Tech Entrepreneur",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=crop&w=100&h=100"
    },
    {
      content: "The return on investment has been exceptional. Their professional package has consistently outperformed my expectations for over a year now.",
      author: "Michael Rodriguez",
      position: "Financial Analyst",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=crop&w=100&h=100"
    }
  ];
  
  return (
    <Box bg="gray.900" py={16}>
      <Container maxW="container.xl">
        <Box textAlign="center" mb={12}>
          <Text color="purple.400" fontWeight="bold" mb={3}>WHAT PEOPLE SAY ABOUT US</Text>
          <Heading as="h2" size="xl" color="white" mb={5}>
            Client Testimonials
          </Heading>
        </Box>
        
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={index}
              content={testimonial.content}
              author={testimonial.author}
              position={testimonial.position}
              avatar={testimonial.avatar}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Testimonials;