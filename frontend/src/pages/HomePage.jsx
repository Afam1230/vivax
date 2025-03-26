import { useState, useEffect } from "react";
import React from "react";
import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Input,
  Stack,
  Text,
  VStack,
  SimpleGrid,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Progress,
  useToast,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { FaSun, FaMoon, FaMercury, FaVenus, FaStar, FaInfinity, FaHandSparkles } from "react-icons/fa";
import { ArrowForwardIcon, DeleteIcon, EditIcon, InfoIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import ProductCard from "../components/UserProductCard";
import { useProductStore } from "../store/product"; // Import Zustand store
import img9 from "../images/img9.png"
import img8 from "../images/img8.png"
import lotus1 from "../images/lotus1.png"
import hero1 from "../images/hero1.jpg"
import { useCartStore } from "../store/cart"; 
import articles from "../store/articles";
import { motion } from "framer-motion";
const MotionBox = motion(Box);


const HomePage = () => {
  const { products, fetchProducts } = useProductStore(); // Get products & fetch function
  const { cart, addToCart, addFromCart, removeFromCart, updateQuantity, totalPrice } = useCartStore();
  const [isCartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetchProducts(); // Fetch products when the page loads
  }, []);

  const InfoCard = [
    {
      title: "Personal compatibility reading",
      info: "Gain deep insights into your relationships with a personalized compatibility reading, revealing strengths, challenges, and cosmic alignment.",
      image: "https://astromary.com/assets/medias/pictures/reading-card-1.jpg",
    },
    {
      title: "Personal 2025 reading",
      info: "Discover what 2025 holds for you with a personalized reading, covering key opportunities, challenges, and cosmic influences.",
      image: "https://astromary.com/assets/medias/pictures/reading-card-2.jpg",
    },
    {
      title: "Your character reading",
      info: "Uncover your true nature, strengths, and hidden traits with a personalized character reading.",
      image: "https://astromary.com/assets/medias/pictures/reading-card-3.jpg",
    },
    {
      title: "Past life reading",
      info: "Explore your past lives to uncover karmic patterns, lessons, and their influence on your present journey.",
      image: "https://astromary.com/assets/medias/pictures/reading-card-4.jpg",
    },
    {
      title: "Personal chinese reading",
      info: "Unlock insights from your Chinese astrology chart, revealing personality traits, life path, and future opportunities.",
      image: "https://astromary.com/assets/medias/pictures/reading-card-5.jpg",
    },
    {
      title: "3 Months Forecst",
      info: "Get a detailed three-month forecast revealing upcoming opportunities, challenges, and key cosmic influences.",
      image: "https://astromary.com/assets/medias/pictures/reading-card-6.jpg",
    },
    {
      title: "Puja and Homa",
      info: "Experience divine blessings through sacred Puja and Homa rituals, designed to attract positive energy and remove obstacles.",
      image: "https://www.tirthpurohit.org/wp-content/uploads/2017/11/img3.jpg",
    },
    {
      title: "",
      info: ".",
      image: "",
    },

  ];

  

  return (
    <Box bgColor={"#F8F9FA"}>
      <Box mt={19}>
        <Box
          as="section"
          position="relative"
          bgGradient="linear(to-r,rgb(250, 240, 199), white)"
          py={{ base: 10, md: 20, lg: 24 }}
          px={{ base: 6, md: 10, lg: 16 }}
          display="flex"
          justifyContent="center"
        >
          <Stack
            direction={{ base: "column-reverse", lg: "row" }}
            alignItems="center"
            spacing={{ base: 8, lg: 16 }}
            maxW="1200px"
            w="full"
          >

         
       
            {/* Text Section */}
            <MotionBox flex={1} textAlign={{ base: "center", lg: "left" }} initial={{ opacity: 0, y: -80 }} animate={{ opacity: 1, y: 0 }}  transition={{ duration: 0.8 }}
            >
              <Heading
                fontSize={{ base: "2xl", md: "4xl", lg: "5xl" }}
                color="orange.900"
                fontFamily="DM Serif Text"
              >
                Discover Your Cosmic Path
              </Heading>
              <Text
                fontSize={{ base: "sm", md: "lg" }}
                color="orange.700"
                mt={4}
              >
                Expert Vedic Astrology & Life Coaching to Guide Your Journey
              </Text>
              <Stack
                direction={{ base: "column", md: "row" }}
                spacing={4}
                mt={6}
                justify={{ base: "center", lg: "flex-start" }}
              >
                <Link to={'/book'}>
                <Button bg="orange.600" color="white" _hover={{ bg: "orange.700" }} w={'full'}>
                  Book Consultation
                </Button>
                </Link>

                <Link to={'/about'}>
                <Button
                  variant="outline"
                  borderColor="orange.600"
                  color="orange.600"
                  _hover={{ bg: "orange.600", color: "white" }}
                  w={'full'}
                >
                  Learn More
                </Button>
                </Link>

              </Stack>
            </MotionBox>

            {/* Image Section */}
            <MotionBox flex={1} display="flex" justifyContent="center" initial={{ opacity: 0, y: 80 }} animate={{ opacity: 1, y: 0 }}  transition={{ duration: 0.8 }} >
              <Box
                w={{ base: "80%", md: "60%", lg: "500px" }}
                aspectRatio={1} // Ensures circular aspect ratio
                borderRadius="full"
                overflow="hidden"
                shadow="xl"
              >
                <Image
                  src={hero1} // Change to actual image path
                  alt="Astrologer"
                  objectFit="cover"
                  w="full"
                  h="full"
                  objectPosition={'100% 0vh'}
                />
              </Box>
            </MotionBox>
          </Stack>
        </Box>



        <MotionBox bgGradient="linear(to-l,rgb(250, 240, 199), white)" color="#8B5E3C" p={{ base: 4, lg: 10 }} initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }}  transition={{ duration: 0.8 }}>
          {/* First Section */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10} >
            <VStack align="start" spacing={4}>
              <Heading fontSize={{ base: "2xl", lg: "4xl" }}>The Cosmic Path: A Journey Through Astrology</Heading>
              <Text fontSize={{ base: "md", lg: "lg" }}>
                Astrology is an ancient practice that connects celestial movements with human experiences. By understanding planetary influences, we gain insights into our personalities, relationships, and life paths.
              </Text>
            </VStack>
            <VStack align="start" spacing={4}>
              <Heading fontSize={{ base: "md", lg: "lg" }} fontWeight="medium">OUR VISION</Heading>
              <Text fontSize={{ base: "md", lg: "lg" }}>
                Our mission is to guide individuals on a transformative journey of self-discovery through astrology, helping them align with the cosmic flow and live with purpose.
              </Text>
            </VStack>
          </SimpleGrid>

          {/* Second Section */}
          <MotionBox mt={20} initial={{ opacity: 0, x: 80 }} animate={{ opacity: 1, x: 0 }}  transition={{ duration: 0.8 }}>
            <VStack align="start" spacing={6}>
              <Heading fontSize={{ base: "2xl", lg: "4xl" }}>Life Coaching: Empowering Your True Potential</Heading>
              <Text fontSize={{ base: "md", lg: "lg" }}>
                Personal growth is a journey, and life coaching provides the tools and guidance needed to unlock your fullest potential. By setting clear goals and aligning actions with values, you can achieve meaningful transformation.
              </Text>
            </VStack>
          </MotionBox>
        </MotionBox>



        {/* Daily Planetary Influences */}
        <Container maxW="100%" py={{ base: '10', md: '20' }} textAlign="center">
          <Heading fontSize="3xl">Daily Planetary Influences</Heading>
          <Text mt={2} color="gray.600">Discover how the stars align for you today</Text>
          <Flex wrap="wrap" justify="center" mt={6} gap={{ base: 4, xl: 5 }}>
            {[
              { icon: FaSun, title: "Sun", desc: "Currently in Aries, bringing energy and initiative" },
              { icon: FaMoon, title: "Moon", desc: "Waxing in Taurus, enhancing stability" },
              { icon: FaMercury, title: "Mercury", desc: "Direct in Gemini, favoring communication" },
              { icon: FaVenus, title: "Venus", desc: "In Libra, harmonizing relationships" }
            ].map(({ icon: Icon, title, desc }) => (
              <Flex key={title} p={{ base: '5', md: '50px' }} bg="yellow.50" borderRadius="md" align="center" w={{ base: "90%", md: "48%", lg: "40%", xl: '20%' }}>
                <Icon size={40} color="orange" />
                <MotionBox ml={{ xl: 3, base: '20%' }} initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }}  transition={{ duration: 0.8 }} >
                  <Text align={'center'} fontSize={{ base: 15, md: 25 }} fontWeight="bold">{title}</Text>
                  <Text fontSize={{ base: 'sm', md: 17 }} color="gray.600">{desc}</Text>
                </MotionBox>
              </Flex>
            ))}
          </Flex>
        </Container>

        {/* My Expertise */}
        <Box bg="yellow.50" py={10}>
          <Container maxW={{ xl: "100%", base: '6xl' }} textAlign="center">
            <Heading fontSize="3xl">My Expertise</Heading>
            <Text mt={2} color="gray.600">Comprehensive spiritual guidance for your journey</Text>
            <Flex wrap="wrap" justify="center" mt={6} gap={4}>
              {[
                { icon: FaStar, title: "Vedic Astrology", desc: "In-depth birth chart analysis and life path guidance" },
                { icon: FaHandSparkles, title: "Life Coaching", desc: "Personal development and spiritual growth guidance" },
                { icon: FaInfinity, title: "Numerology", desc: "Understanding life's patterns through numbers" }
              ].map(({ icon: Icon, title, desc }) => (
                <Flex key={title} p={{ base: 6, lg: 7, xl: 10 }} bg="white" borderRadius="md" boxShadow="md" align="center" w={{ base: "100%", md: "48%", lg: "30%", xl: '25%' }}>
                  <Icon size={40} color="orange" />
                  <Link to={'/book'}>
                  <Box ml={{ xl: 3, base: '20%' }}                   _hover={{ transform: "scale(1.05)", transition: "0.3s ease-in-out" }}
                  >
                    <Text fontWeight="bold" fontSize={{ base: 15, md: 25 }}>{title}</Text>
                    <Text color="gray.600" fontSize={{ base: 'sm', md: 15 }}>{desc}</Text>
                    <Text color="orange.500" mt={2} fontSize={{ base: 'sm', md: 20 }} cursor="pointer">Learn more →</Text>
                  </Box>
                  </Link>

                </Flex>
              ))}
            </Flex>
          </Container>
        </Box>




        {/* Services Section */}
        <Box bgColor={"white"} shadow={"lg"} color={"orange.700"} py={5} paddingTop={{ base: '20', lg: '100', xl:'40' }}>
          <Text
            textAlign={"center"}
            fontSize={{ base: 24, md: 30 }}
            fontWeight={400}
            fontFamily={"Playfair Display"}
          >
            Sacred Services
          </Text>
        </Box>

        {/* Services Grid */}
        <Box
          bgColor={"#FFFBEB"}
          bgGradient="linear(to-r,rgb(253, 244, 209), white)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          py={10}
          textAlign="center"
          color={"#2C3E50"}
        >
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} px={{ base: 4, md: 8, lg: 12 }} w="100%" maxW="1200px">
            {InfoCard.map((info, index) => (
              <Box key={index} display="flex" justifyContent="center" py={5}>
                <VStack
                  width={{ base: "90%", md: "40vh" }}
                  align="center"
                  borderWidth={1}
                  borderRadius={20}
                  shadow={"2xl"}
                  bgColor={"white"}
                  p={4}
                  _hover={{ transform: "scale(1.05)", transition: "0.3s ease-in-out" }}
                >
                  <Image src={info.image} alt="image" borderRadius={20} w="full" />

                  <Text fontSize={{ base: 18, md: 20 }} fontWeight={"bold"} fontFamily={"Playfair Display"} color={"orange.700"}>
                    {info.title}
                  </Text>

                  <Text fontSize={{ base: 14, md: 16 }} px={2} fontFamily="Poppins">
                    {info.info}
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Articles Section */}
        <Container maxW="100%" py={12} bg="white" borderRadius={20} shadow="lg">
          {/* Section Heading */}
          <Heading
            fontWeight={600}
            fontFamily="Playfair Display"
            size={{ base: "xl", md: "2xl", lg: "3xl" }}
            textAlign="center"
            mb={8}
            color="#2C3E50"
          >
            Wisdom Insights
          </Heading>

          {/* Articles Grid */}
          <SimpleGrid columns={{ base: 2, md: 2, lg: 3 }} spacing={10} px={2} justifyItems="center">
            {articles.map((articles, index) => (
              <Link to={`/article/${articles.id}`} key={articles.id} style={{ width: "100%" }}>  
                <VStack
                  p={{ base: 0, md: 6, lg: 8 }}
                  borderWidth={2}
                  rounded={"full"}
                  bg="white"
                  width="full"
                  textAlign="center"
                  cursor="pointer"
                  _hover={{ transform: "scale(1.05)", transition: "0.3s ease-in-out", shadow: "xl" }}
                >
                  <Image src={articles.image} alt={articles.title} borderRadius="md" w={{ base: "full", xl: 300 }} maxH="250px" objectFit="cover" rounded={'full'} />

                  <Text fontSize={{ base: "lg", md: "xl", lg: "2xl" }} fontWeight="bold" fontFamily="Playfair Display" textColor="orange.700" mt={3}>
                    {articles.title}
                  </Text>

                  <Text fontSize={{ base: "sm", md: "md", lg: "lg" }} fontFamily="Poppins" px={3} noOfLines={3}>
                    {articles.info}
                  </Text>

                  <Text fontWeight="bold" color="orange.700" mt={2} _hover={{ textDecoration: "underline" }}>
                    Read more <ArrowForwardIcon />
                  </Text>
                </VStack>
              </Link>
            ))}
          </SimpleGrid>
        </Container>

        {/* Our Products Section */}
        <Box textAlign={"center"} paddingY={10} paddingTop={{base:20, lg:30, xl:30}}>
          <Text fontSize={25} fontStyle={"bold"}>
            Our Sacred Items
          </Text>
        </Box>

        {/* Shop Section */}
        {/* Product Grid */}
        <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={6}>
          {Array.isArray(products) ? (
            products.map((product) => (
              <Box key={product._id} borderWidth="1px" borderRadius="lg" overflow="hidden" p={4}>
                <Link to={'/shop'}>
                  <Image src={product.image} alt={product.name} h="200px" w="full" objectFit="cover" />
                  <VStack align="start" spacing={2} mt={3}>
                    <Heading size="md">{product.name}</Heading>
                    <Text fontSize="sm">{product.description.substring(0, 50)}...</Text>
                    <Text align={'center'} fontWeight="bold">${product.price}</Text>
                  </VStack>
                </Link>

                <Box mt={4} textAlign="center">
                    <Link to={'/shop'}>
                    <Button
                      colorScheme="orange"
                      size="sm"
                    >
                      go to shop
                    </Button>
                    </Link>
                </Box>


              </Box>

            ))
          ) : (
            <Text>Loading products...</Text>
          )}
        </SimpleGrid>



      </Box>
    </Box>


  );
};

export default HomePage;