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
    Select,
  } from '@chakra-ui/react';
  import { FaGoogle, FaFacebookF, FaTwitter, FaLinkedinIn } from 'react-icons/fa';
  import { useState } from 'react';
  import { useAuthStore } from '../store/useAuthStore';
  import { useNavigate } from 'react-router-dom';
  import herologin from '../images/herologin.png'
  
  export default function Register() {
    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: '',
      country: '',
    });
    const [acceptTerms, setAcceptTerms] = useState(false);
    const toast = useToast();
    const navigate = useNavigate();
    const { register } = useAuthStore();
  
    const handleChange = (e) =>
      setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  
    const handleSubmit = async () => {
      if (!acceptTerms) {
        return toast({
          title: 'Please accept terms and conditions',
          status: 'warning',
        });
      }
  
      if (formData.password !== formData.confirmPassword) {
        return toast({
          title: 'Passwords do not match',
          status: 'error',
        });
      }
  
      try {
        await register(formData.name, formData.email, formData.password);
        toast({ title: 'Registration Successful', status: 'success' });
        navigate('/login');
      } catch (err) {
        toast({
          title: 'Registration failed',
          description: err.response?.data?.message || 'Something went wrong',
          status: 'error',
        });
      }
    };
  
    return (
      <Box position="relative" minH="100vh" overflow="hidden" bg="#0b0e1c" color="white">
        {/* 🌌 Animated BG */}
        <Box
          position="absolute"
          inset={0}
          zIndex={0}
          _before={{
            content: `""`,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '300%',
            height: '300%',
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.3) 2px, transparent 1px)',
            backgroundSize: '40px 40px',
            animation: 'moveBackground 60s linear infinite',
          }}
        />
  
        <Flex
        marginBottom={40}
        mt={10}
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
              Register on <Text as="span" color="cyan.400">EONCOIN</Text>
            </Heading>
            <Text fontSize="md" mb={6} textAlign="center" color="gray.400">
              Create your secure investment account
            </Text>
  
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Full Name</FormLabel>
                <Input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  bg="#0b0e1c"
                />
              </FormControl>
  
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="Enter email"
                  bg="#0b0e1c"
                />
              </FormControl>
  
              <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  bg="#0b0e1c"
                />
              </FormControl>
  
              <FormControl isRequired>
                <FormLabel>Country</FormLabel>
                <Select
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Select country"
                  bg="#0b0e1c"
                >
                  <option>Nigeria</option>
                  <option>USA</option>
                  <option>UK</option>
                  <option>India</option>
                  <option>Canada</option>
                </Select>
              </FormControl>
  
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  bg="#0b0e1c"
                />
              </FormControl>
  
              <FormControl isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm password"
                  bg="#0b0e1c"
                />
              </FormControl>
  
              <Checkbox
                colorScheme="cyan"
                isChecked={acceptTerms}
                onChange={() => setAcceptTerms(!acceptTerms)}
              >
                I agree to the Terms & Conditions
              </Checkbox>
  
              <Button
                w="full"
                colorScheme="cyan"
                rounded="full"
                size="lg"
                fontWeight="bold"
                onClick={handleSubmit}
              >
                Register Account
              </Button>
            </VStack>
  
            <Text my={5} textAlign="center" fontSize="sm" color="gray.400">
              or Sign up with
            </Text>
  
            <Flex justify="center" gap={4}>
              <IconButton icon={<FaGoogle />} aria-label="Google" rounded="full" />
              <IconButton icon={<FaFacebookF />} aria-label="Facebook" rounded="full" />
              <IconButton icon={<FaTwitter />} aria-label="Twitter" rounded="full" />
              <IconButton icon={<FaLinkedinIn />} aria-label="LinkedIn" rounded="full" />
            </Flex>
  
            <Text mt={6} fontSize="sm" textAlign="center" color="gray.400">
              Already have an account?{' '}
              <Link href="/login" color="cyan.400">
                Login
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
  
        <style>{`
          @keyframes moveBackground {
            0% { transform: translate(0, 0); }
            100% { transform: translate(-50%, -50%); }
          }
        `}</style>
      </Box>
    );
  }
  