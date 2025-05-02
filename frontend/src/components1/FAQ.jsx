
import {
    Box,
    Container,
    Heading,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from "@chakra-ui/react";
  
  const FAQItem = ({ question, answer }) => {
    return (
      <AccordionItem border="none" mb={4}>
        {({ isExpanded }) => (
          <>
            <AccordionButton
              bg={isExpanded ? "purple.900" : "rgba(30, 30, 60, 0.5)"}
              color="white"
              p={4}
              borderRadius="md"
              _hover={{ bg: "purple.900" }}
              borderWidth={1}
              borderColor={isExpanded ? "purple.500" : "purple.900"}
            >
              <Box flex="1" textAlign="left" fontWeight="medium" position={'relative'}>
                {question}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4} pt={4} px={4} bg="rgba(30, 30, 60, 0.3)" color="gray.300" borderRadius="md">
              {answer}
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    );
  };
  
  const FAQ = () => {
    const faqItems = [
      {
        question: "What is cryptocurrency mining?",
        answer:
          "Cryptocurrency mining is the process of validating transactions on a blockchain network and being rewarded with newly created coins. It requires specialized hardware and significant computational power.",
      },
      {
        question: "How does cloud mining differ from traditional mining?",
        answer:
          "Cloud mining allows you to mine cryptocurrencies without purchasing, setting up, or maintaining mining hardware. Instead, you rent computing power from our data centers and receive mining rewards proportional to your investment.",
      },
      {
        question: "When will I start receiving mining rewards?",
        answer:
          "Mining rewards begin accumulating immediately after your purchase is confirmed. The first payout is typically processed within 24 hours, with subsequent payments made daily to your connected wallet.",
      },
      {
        question: "Is cryptocurrency mining still profitable?",
        answer:
          "Yes, cryptocurrency mining can still be profitable, especially with our optimized operations that minimize costs and maximize efficiency. We carefully select cryptocurrencies to mine based on market conditions to ensure the best returns.",
      },
    ];
  
    return (
      <Box bg="gray.900" py={16}>
        <Container maxW="container.xl">
          <Box textAlign="center" mb={12}>
            <Text color="purple.400" fontWeight="bold" mb={3}>
              FREQUENTLY ASKED QUESTIONS
            </Text>
            <Heading as="h2" size="xl" color="white" mb={5}>
              Common Questions About Mining
            </Heading>
          </Box>
  
          <Accordion allowToggle maxW="800px" mx="auto">
            {faqItems.map((item, index) => (
              <FAQItem
                key={index}
                question={item.question}
                answer={item.answer}
              />
            ))}
          </Accordion>
        </Container>
      </Box>
    );
  };
  
  export default FAQ;