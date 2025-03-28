import { Box, Image, Text, IconButton, VStack, HStack, Input, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaYoutube, FaTelegramPlane, FaFacebook, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTwitterSquare } from "react-icons/fa";

import articles from "../store/articles";

const MotionBox = motion(Box);

const BlogCard = ({ image, category, title, excerpt, author, date, avatar, id }) => {
  return (
    <MotionBox
      bg="white"
      borderRadius="2xl"
      overflow="hidden"
      boxShadow="lg"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/article/${id}`} key={id} style={{ width: "100%" }}>
        <Image src={image} alt={title} w="full" h={{ base: "200px", md: "250px" }} objectFit="cover" />
        <VStack p={5} align="start">
          <Text fontSize="sm" color="orange.600" fontWeight="bold">{category}</Text>
          <Text fontSize="lg" fontWeight="bold">{title}</Text>
          <Text fontSize="sm" color="gray.600">{excerpt}</Text>
          <HStack spacing={2} mt={3}>
            <Image src={avatar} boxSize={6} borderRadius="full" />
            <Text fontSize="sm" fontWeight="medium">{author}</Text>
            <Text fontSize="sm" color="gray.500">• {date}</Text>
          </HStack>
        </VStack>
      </Link>
    </MotionBox>
  );
};

const SubscribeSection = () => {
  return (
    <Box bg="#FFF7E6" p={10} textAlign="center" borderRadius="xl" maxW={'100vh'} >
      <Text fontSize="2xl" fontWeight="bold" color="brown.700">Subscribe to Celestial Updates</Text>
      <Text fontSize="md" color="gray.600" mt={2}>subscribe to our channels to get more celestial updates.</Text>
      <HStack mt={5} justify="center">
        <Button colorScheme="orange" borderRadius="full" _hover={{ bg: "brown.700" }}>Subscribe Now</Button>
      </HStack>
      <HStack spacing={7} mt={10} display={'flex'} justifyContent={'center'}>
        <a href="https://youtube.com/@astrodevaraj108?si=kyY-4IE-RvHo9uDi" target="_blank" rel="noopener noreferrer">
          <IconButton icon={<FaYoutube />} aria-label="YouTube" colorScheme="red" />
        </a>

        <a href="https://x.com/AsamoahDas108" target="_blank" rel="noopener noreferrer">
          <IconButton icon={<FaSquareXTwitter />} aria-label="X (Twitter)" colorScheme="gray" />
        </a>

        <a href="https://web.facebook.com/DevaRishiDasAsamoah/?_rdc=1&_rdr#" target="_blank" rel="noopener noreferrer">
          <IconButton icon={<FaFacebook />} aria-label="Facebook" colorScheme="blue" />
        </a>

        <a href="https://wa.me/2348175725656" target="_blank" rel="noopener noreferrer">
          <IconButton icon={<FaWhatsapp />} aria-label="WhatsApp" colorScheme="green" />
        </a>
      </HStack>
    </Box>
  );
};

const BlogExtra = () => {
  const posts = [
    {
      id: '2',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRINaHwtYbLv8SadwctNn2vXPWse1vAg2s7-Q&s",
      category: "Lunar Phases",
      title: "Understanding Moon Phases and Their Impact",
      excerpt: "How different moon phases affect your emotions and energy levels...",
      author: "Devarishi Das Asamoah",
      date: "Jan 10, 2025",
      avatar: "https://example.com/avatar1.jpg",
    },
    {
      id: '3',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_W_m0fpTT4xfieHhByBANSNWDaYzccWCjPg&s",
      category: "Planetary Movements",
      title: "Mercury Retrograde Survival Guide",
      excerpt: "Essential tips to navigate through the upcoming Mercury retrograde...",
      author: "Devarishi Das Asamoah",
      date: "Jan 5, 2025",
      avatar: "https://example.com/avatar2.jpg",
    },
    {
      id: '4',
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRo1vg65HNqvgzuTZedCkMt5i9OBJMp2qcaKw&s",
      category: "Zodiac Signs",
      title: "Your 2025 Zodiac Love Forecast",
      excerpt: "What the stars reveal about your romantic life this year...",
      author: "Devarishi Das Asamoah",
      date: "Jan 1, 2025",
      avatar: "https://example.com/avatar3.jpg",
    },
  ];

  return (
    <VStack spacing={10} p={5}>
      <HStack spacing={5} wrap="wrap" justify="center">
        {posts.map((post, index) => (
          <BlogCard key={index} {...post} />
        ))}
      </HStack>
      <SubscribeSection />
    </VStack>

  );
};

export default BlogExtra;
