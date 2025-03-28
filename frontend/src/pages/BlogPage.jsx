import { Box, Heading, Text, IconButton, Image, Flex, Avatar, HStack } from "@chakra-ui/react";
import { motion } from "framer-motion";
import BlogExtra from "../components/BlogExtra";
import { FaSquareXTwitter } from "react-icons/fa6";

import { FaYoutube, FaTelegramPlane, FaFacebook, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTwitterSquare } from "react-icons/fa";

const MotionBox = motion(Box);

const BlogPage = () => {
  return (
    <Box w="100%" bg="white" mt={{ base: 50 }}>
      {/* hero section */}
      <MotionBox initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} position={'relative'} maxW={'100%'} display={'flex'} justifyContent={'center'}>
        <Image src="https://scontent.flos5-2.fna.fbcdn.net/v/t39.30808-6/485057968_1046071844207080_313747992668637985_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ypw11Z64oS8Q7kNvgFBbfWa&_nc_oc=AdnyS8euktMzAtJa603w4cp2_IJWBp2d7rAmcBFWk77I5UpiS_Lg-3GgtchGL9ZFjtE&_nc_zt=23&_nc_ht=scontent.flos5-2.fna&_nc_gid=vehS5HrlwhGMV5RCu59bwQ&oh=00_AYHmso9P78vEUkf3wmI3jxk4fM806d0ficy0LHDAG5UwPw&oe=67E92627" objectFit={'cover'} width={{ base: 'full', lg: 'full', xl: '50%' }} />
      </MotionBox>


      {/* Header Section */}
      <MotionBox initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} bgGradient="linear(to-b, orange.50, white)" py={{ base: 10, md: 16 }} textAlign="center">
        <Heading fontSize={{ base: "3xl", md: "4xl" }} color="brown.700">
          Astrological Insights & Wisdom
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} mt={3} color="brown.500">
          Explore the mysteries of the cosmos through our collection of articles about astrology, zodiac signs, and celestial events.
        </Text>
      </MotionBox>

      {/* Featured Post Section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        p={{ base: 5, md: 10 }}
        alignItems="center"
        justifyContent="center"
        gap={6}
      >
        {/* Featured Image */}
        <MotionBox
          flex={{ base: "1", md: "0.4" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}
        >
          <Image
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQytmsf7wcdRRYHPtp_bFgdFcE1aXk01OSAhA&s" // Replace with actual image source
            alt="Astrology Chart"
            borderRadius="md"
            objectFit="cover"
            width={{ base: "100%", xl: '60%' }}
          />
        </MotionBox>

        {/* Blog Content */}
        <MotionBox initial={{ opacity: 0, x: -80 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} flex={{ base: "1", md: "0.4" }} bg="orange.50" p={6} borderRadius="md">
          <Text fontSize="sm" fontWeight="bold" color="brown.600">
            Featured Post
          </Text>
          <Heading fontSize={{ base: "xl", md: "2xl" }} mt={2} color="brown.700">
            The Great Conjunction of 2025: What It Means For You
          </Heading>
          <Text fontSize={{ base: "sm", md: "md" }} mt={2} color="brown.500">
            Discover how this rare celestial event will impact each zodiac sign and what transformations it may bring to your life journey.
          </Text>
          <Flex alignItems="center" mt={4} gap={3}>
            <Avatar size="sm" src="/author.jpg" /> {/* Replace with actual author image */}
            <Text fontSize="sm" color="brown.600">
              Devarishi Das Asamoah
            </Text>
          </Flex>
          <HStack spacing={4} mt={3} display={'flex'}>
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
          <Text mt={4} fontWeight="bold" color="brown.700" cursor="pointer">
            Subscribe to Channel
          </Text>
        </MotionBox>
      </Flex>
      <BlogExtra />
    </Box>
  );
};

export default BlogPage;
