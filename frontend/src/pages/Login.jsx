import {
  Box,
  Button,
  Flex,
  Heading,
  Input,
  Text,
  FormControl,
  FormLabel,
  Link,
  VStack,
  Checkbox,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { FaGoogle, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useNavigate } from 'react-router-dom';
import herologin from '../images/herologin.png'

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const toast = useToast();
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuthStore();

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async () => {
    try {
      await login(formData.email, formData.password);
      if (rememberMe) {
        localStorage.setItem("rememberMe", true);
      }
      toast({ title: 'Login Successful', status: 'success' });
      navigate('/dashboard');
    } catch (err) {
      toast({
        title: 'Login failed',
        description: err.response?.data?.message || 'Incorrect Password or Email',
        status: 'error',
      });
    }
  };

  // You can read "rememberMe" from localStorage on mount and handle the auto-login accordingly
  useEffect(() => {
    const remembered = localStorage.getItem("rememberMe");
    if (remembered && isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);



  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  return (
    <Box position="relative" minH="100vh" overflow="hidden" bg="#0b0e1c" color="white">
      {/* 🌟 Background animation layer */}
      <Box
        position="absolute"
        inset={0}
        bg="transparent"
        zIndex={0}
        _before={{
          content: `""`,
          position: 'absolute',
          top: 0,
          left: 0,
          width: '300%',
          height: '300%',
          backgroundImage:
            'radial-gradient(circle, rgba(255,255,255,0.4) 2px, transparent 1px)',
          backgroundSize: '40px 40px',
          animation: 'moveBackground 60s linear infinite',
        }}
      />

      {/* 🧩 Actual content */}
      <Flex
        minH="100vh"
        direction={{ base: 'column', md: 'row' }}
        justify="center"
        align="center"
        position="relative"
        zIndex={1}
        px={6}
      >
        <Box
          bg="#12172c"
          p={10}
          rounded="2xl"
          shadow="2xl"
          maxW="lg"
          w="full"
        >
          <Heading fontSize="3xl" textAlign="center" mb={4}>
            Login to <Text as="span" color="cyan.400">EONCOIN</Text>
          </Heading>
          <Text fontSize="md" mb={6} textAlign="center" color="gray.400">
            To keep connected with us please login with your personal info
          </Text>

          <VStack spacing={5}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                name="email"
                value={formData.email}
                onChange={handleChange}
                bg="#0b0e1c"
                border="1px solid #1e293b"
                _hover={{ borderColor: 'cyan.400' }}
                _focus={{ borderColor: 'cyan.500' }}
                placeholder="Enter email"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                bg="#0b0e1c"
                border="1px solid #1e293b"
                _hover={{ borderColor: 'cyan.400' }}
                _focus={{ borderColor: 'cyan.500' }}
                placeholder="Enter password"
              />
            </FormControl>

            <Flex justify="space-between" w="full" fontSize="sm" color="gray.400">
              <Checkbox size="sm" colorScheme="cyan">Remember Me</Checkbox>
              <Link href="#">Forgot Password?</Link>
            </Flex>

            <Button
              w="full"
              colorScheme="cyan"
              rounded="full"
              size="lg"
              fontWeight="bold"
              onClick={handleSubmit}
            >
              Login to your Account
            </Button>
          </VStack>

          <Text my={5} textAlign="center" fontSize="sm" color="gray.400">
            or Sign In with
          </Text>

          <Flex justify="center" gap={4}>
            <IconButton icon={<FaGoogle />} aria-label="Google" rounded="full" />
            <IconButton icon={<FaFacebookF />} aria-label="Facebook" rounded="full" />
            <IconButton icon={<FaTwitter />} aria-label="Twitter" rounded="full" />
            <IconButton icon={<FaLinkedinIn />} aria-label="LinkedIn" rounded="full" />
          </Flex>

          <Text mt={6} fontSize="sm" textAlign="center" color="gray.400">
            Don’t have an account?{' '}
            <Link href="/register" color="cyan.400">
              Register Now
            </Link>
          </Text>
        </Box>

        <Box display={{ base: 'none', md: 'block' }} maxW="lg" ml={10}>
          <img
            src={herologin}
            alt="Illustration"
            style={{ maxWidth: '100%' }}
          />
        </Box>
      </Flex>

      {/* 🔁 CSS Keyframes */}
      <style>{`
          @keyframes moveBackground {
            0% { transform: translate(0, 0); }
            100% { transform: translate(-50%, -50%); }
          }
        `}</style>
    </Box>
  );
}
