import { useParams } from "react-router-dom";
import { Box, Image, Text, VStack, Container } from "@chakra-ui/react";
import articles from "../store/articles";

const ArticlePage = () => {
  const { id } = useParams();
  const article = articles.find((art) => art.id === id);

  if (!article) {
    return <Text fontSize="2xl" textAlign="center">Article Not Found</Text>;
  }

  return (
    <Container maxW={{ base: "95%", md: "85%", lg: "70%" }} py={10} mt={{base:10, md:20, xl:20}}>
      <VStack spacing={6} align="start">
        <Image
          src={article.image}
          alt={article.title}
          borderRadius="md"
          w="full"
          maxH={{ base: "250px", md: "400px", lg: "500px" }}
          objectFit="cover"
        />
        
        <Text fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} fontWeight="bold" fontFamily="Playfair Display" color="orange.700">
          {article.title}
        </Text>

        <Text fontSize="md" fontWeight="bold" color="gray.500">
          Published on {new Date().toDateString()}
        </Text>

        <Text fontSize={{ base: "md", md: "lg", lg: "xl" }} fontFamily="Poppins" lineHeight="tall">
          {article.content}
        </Text>
      </VStack>
    </Container>
  );
};

export default ArticlePage;
