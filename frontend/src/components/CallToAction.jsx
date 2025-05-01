import {
  Box,
  Button,
  Container,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

// Framer-motion variants
const fadeInZoom = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const MotionBox = motion(Box);

const CallToAction = () => {
  const navigate = useNavigate()
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

  if (inView) controls.start("visible");

  return (
    <Box py={20} px={6} bg="#0D1B2A">
      <Container maxW="container.md">
        <motion.div
          ref={ref}
          variants={fadeInZoom}
          initial="hidden"
          animate={controls}
        >
          <MotionBox
            p={10}
            borderRadius="xl"
            bg="rgba(242, 238, 241, 0.05)"
            backdropFilter="blur(12px)"
            border="1px solid rgba(255, 0, 0, 0.1)"
            boxShadow="0 8px 30px rgba(255, 255, 255, 0.3)"
            color="white"
            textAlign="center"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <VStack spacing={4}>
              <Heading size="lg" color="purple.400">
                Ready to grow your crypto?
              </Heading>
              <Text fontSize="md" color="gray.300">
                Join thousands of investors earning passive income every day.
              </Text>
              <Button onClick={()=>navigate("/login")} size="lg" colorScheme="purple">
                Start Now
              </Button>
            </VStack>
          </MotionBox>
        </motion.div>
      </Container>
    </Box>
  );
};

export default CallToAction;
