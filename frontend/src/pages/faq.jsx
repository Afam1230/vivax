import React from "react";
import {
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Container,
  Text,
} from "@chakra-ui/react";
import AnimatedBackground from "../components/AnimatedBackground";

const Faq = () => {
  return (
    <Box position="relative" overflow="hidden" minH="100vh" bg="purple.900" color="white">
      <AnimatedBackground />

      <Container maxW="4xl" py={20} position="relative" zIndex={1}>
        <Heading fontSize={{ base: "3xl", md: "5xl" }} textAlign="center" mb={12}>
          Frequently Asked <Text as="span" color="purple.300">Questions</Text>
        </Heading>

        <Accordion allowMultiple>
          {faqData.map((faq, idx) => (
            <AccordionItem key={idx} border="none" mb={5} bg="purple.800" borderRadius="md" boxShadow="md">
              <h2>
                <AccordionButton
                  _expanded={{ bg: "purple.700", color: "white" }}
                  px={6}
                  py={4}
                >
                  <Box flex="1" textAlign="left" fontWeight="bold" fontSize="lg">
                    {faq.question}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel px={6} pb={4} fontSize="md" color="gray.200">
                {faq.answer}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Box>
  );
};

const faqData = [
  {
    question: "What is CryptoLab?",
    answer:
      "CryptoLab is a next-generation platform designed to simplify and enhance your crypto investment journey with real-time analytics, expert insights, and powerful tools.",
  },
  {
    question: "Is CryptoLab safe to use?",
    answer:
      "Yes. We use industry-standard security protocols and blockchain transparency to ensure your data and funds are secure.",
  },
  {
    question: "How can I start investing?",
    answer:
      "Simply sign up, complete your profile, and explore our investment tools. We guide you through every step, whether you’re a beginner or pro.",
  },
  {
    question: "Does CryptoLab support multiple cryptocurrencies?",
    answer:
      "Absolutely. We support a wide range of cryptocurrencies including Bitcoin, Ethereum, and many emerging tokens.",
  },
  {
    question: "Can I track my portfolio in real-time?",
    answer:
      "Yes, our live dashboard gives you full control and insights into your portfolio performance, trends, and forecasts.",
  },
];

export default Faq;
