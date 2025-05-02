
import { Box, Container, Heading, Text, SimpleGrid, Flex, Circle, Icon, VStack } from "@chakra-ui/react";

const StepCard = ({ number, title, description }) => {
  return (
    <Box>
      <Flex direction="column" align={{ base: "center", md: "flex-start" }}>
        <Circle 
          size="60px" 
          bg="purple.600" 
          color="white" 
          fontWeight="bold" 
          fontSize="2xl"
          mb={4}
        >
          {number}
        </Circle>
        <Heading as="h3" size="md" mb={3} color="white" textAlign={{ base: "center", md: "left" }}>
          {title}
        </Heading>
        <Text color="gray.300" textAlign={{ base: "center", md: "left" }}>
          {description}
        </Text>
      </Flex>
    </Box>
  );
};

const HowItWorks = () => {
  return (
    <Box bg="gray.900" py={16}>
      <Container maxW="container.xl">
        <Box textAlign="center" mb={12}>
          <Text color="purple.400" fontWeight="bold" mb={3}>HOW DOES IT WORK?</Text>
          <Heading as="h2" size="xl" color="white" mb={5}>
            Start Mining in 4 Easy Steps
          </Heading>
        </Box>
        
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
          <StepCard 
            number="1"
            title="Create an Account"
            description="Sign up for free and verify your identity to access all platform features and start your mining journey."
          />
          <StepCard 
            number="2"
            title="Purchase Hash Power"
            description="Select from our range of mining packages that suit your investment goals and budget requirements."
          />
          <StepCard 
            number="3"
            title="Start Mining"
            description="Our advanced hardware begins mining immediately after your purchase, with no setup or maintenance required."
          />
          <StepCard 
            number="4"
            title="Get Daily Payouts"
            description="Receive your mining rewards directly to your wallet daily, with complete transparency and no hidden fees."
          />
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default HowItWorks;