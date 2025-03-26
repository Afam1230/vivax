import { Box, VStack, Heading, Text, Image, Container, HStack, Button } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const MotionBox = motion(Box);

const AboutPage = () => {
  return (
    <Container maxW="100%"         bgGradient={"linear(to-br, white, orange.100)"}
    py={10} mt={{base:10,lg:20,xl:30}}>
      {/* Profile Section */}
      <MotionBox 
        textAlign="center" 
        initial={{ opacity: 0, y: -80 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.8 }}
      >
        <Image 
          src="https://scontent.flos1-3.fna.fbcdn.net/v/t39.30808-6/481899812_1036814558466142_93037116377118753_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_ohc=XyOKx9xd7AEQ7kNvgGYaDs2&_nc_oc=AdlmrcGJsq0wQMpzscpACcwHkknbf-2csJU6yGbcZOJMBoMb0IugUCNc52bgvc6qqBw&_nc_zt=23&_nc_ht=scontent.flos1-3.fna&_nc_gid=AghnqFX4mvmqiWh2Z94W8A&oh=00_AYE6cg2x4hLK765XI8pF7PBcvGXtLQA2d8vHNuIATVn9dg&oe=67E9320A" 
          alt="Devarishi Das Asamoah" 
          borderRadius="60" 
          boxSize={{ base: "300px", md: "400px" }} 
          mx="auto" 
          width={'auto'}
          mb={5} 
        />
        <Heading fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" color="orange.700" fontFamily="DM Serif Text">
          Devarishi Das Asamoah
        </Heading>
        <Text fontSize="lg" color="gray.600" mt={2}>Astrologer | Vedic Priest | Life Coach</Text>
      </MotionBox>

      {/* The Journey */}
      <MotionBox mt={10} px={1} bgGradient={"radial(white, white)"} boxShadow="md" borderRadius="lg" textAlign="center"         initial={{ opacity: 0, x: -80 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 0.8 }}>
        <Heading fontFamily="DM Serif Text" fontSize="3xl" color="brown.700">The Journey</Heading>
        <Text fontSize="xl" mt={3} color="gray.800">
          From an early age, I was drawn to the celestial mysteries of the universe. My deep studies in 
          <b> Jyotish Shastra (Vedic Astrology) </b> and <b> Vedic scriptures </b> led me to understand the 
          profound connection between planetary influences and human destiny. Over the years, I have 
          guided individuals through astrological readings, sacred rituals, and spiritual coaching to help 
          them navigate life’s challenges.
        </Text>
      </MotionBox>

      {/* Expertise Section */}
      <MotionBox  mt={10} p={5} bg="white" boxShadow="md" borderRadius="lg"          initial={{ opacity: 0, y: 80 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 2 }}>
        <Heading fontFamily="DM Serif Text" fontSize="3xl" color="brown.700" textAlign="center">My Expertise</Heading>
        <VStack align="start" spacing={4} mt={5}>
          <Text fontSize="xl" color="gray.700">🔹 <b>Vedic Astrology & Birth Chart Readings</b> – Decode your cosmic blueprint.</Text>
          <Text fontSize="xl" color="gray.700">🔹 <b>Spiritual Counseling & Life Coaching</b> – Transform your mindset and embrace self-discovery.</Text>
          <Text fontSize="xl" color="gray.700">🔹 <b>Vedic Rituals & Remedies</b> – Harmonize your energies through sacred pujas and mantra sadhana.</Text>
          <Text fontSize="xl" color="gray.700">🔹 <b>Relationship & Career Guidance</b> – Personalized astrological insights for love, career, and finances.</Text>
        </VStack>
      </MotionBox>

      {/* Contact Section */}
      <MotionBox mt={10} textAlign="center" >
        <Heading fontFamily="DM Serif Text" fontSize="3xl" color="orange.700">Let's Connect</Heading>
        <Text fontSize="xl" mt={3} color="gray.800">
          Ready to unlock the deeper mysteries of your life? Book a consultation and begin your journey.
        </Text>
        <HStack justify="center" mt={5}>
          <Link to="/book">
            <Button colorScheme="orange" borderRadius="full" _hover={{ bg: "brown.700" }}>
              Book a Consultation
            </Button>
          </Link>
        </HStack>
      </MotionBox>
    </Container>
  );
};

export default AboutPage;
