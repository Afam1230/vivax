
import { Box, Container, Heading, Text, SimpleGrid, Image, Button, Badge, VStack, HStack } from "@chakra-ui/react";

const BlogCard = ({ image, category, title, excerpt }) => {
  return (
    <Box 
      bg="rgba(30, 30, 60, 0.5)" 
      borderRadius="lg" 
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-8px)" }}
    >
      <Box position="relative">
        <Image src={image} alt={title} w="100%" h="200px" objectFit="cover" />
        <Badge 
          position="absolute" 
          bottom={3}
          left={3}
          colorScheme="purple"
          borderRadius="full"
          px={3}
          py={1}
        >
          {category}
        </Badge>
      </Box>
      
      <VStack p={6} align="flex-start" spacing={3}>
        <Heading as="h3" size="md" color="white" noOfLines={2}>
          {title}
        </Heading>
        <Text color="gray.300" noOfLines={3}>
          {excerpt}
        </Text>
        {/* <Button colorScheme="purple" variant="link" rightIcon="→">
          Read More
        </Button> */}
      </VStack>
    </Box>
  );
};

const BlogPosts = () => {
  const posts = [
    {
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475",
      category: "Technology",
      title: "The Future of Cryptocurrency Mining",
      excerpt: "Explore how advances in hardware and renewable energy are transforming the mining industry landscape."
    },
    {
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
      category: "Investment",
      title: "Why Institutional Money is Flowing into Crypto",
      excerpt: "Analyzing the shift in investment patterns as major financial institutions embrace digital assets."
    },
    {
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5",
      category: "Security",
      title: "Keeping Your Digital Assets Safe",
      excerpt: "Essential security practices every crypto investor should implement to protect their holdings."
    }
  ];
  
  return (
    <Box bg="gray.900" py={16}>
      <Container maxW="container.xl">
        <Box textAlign="center" mb={12}>
          <Heading as="h2" size="xl" color="white" mb={5}>
            Insights from Our Experts
          </Heading>
        </Box>
        
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
          {posts.map((post, index) => (
            <BlogCard
              key={index}
              image={post.image}
              category={post.category}
              title={post.title}
              excerpt={post.excerpt}
            />
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default BlogPosts;