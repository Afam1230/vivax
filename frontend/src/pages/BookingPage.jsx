import { useState } from "react";
import {
  Box, Input, Textarea, Button, Link, IconButton, FormControl, FormLabel, VStack, HStack, Heading, useToast
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { FaYoutube, FaTelegramPlane, FaFacebook, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTwitterSquare } from "react-icons/fa";


const BookingPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    dob: null, // Date of Birth
    timeOfBirth: null, // Time of Birth
  });

  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
  };

  const handleTimeChange = (time) => {
    setFormData({ ...formData, timeOfBirth: time });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          dob: formData.dob ? moment(formData.dob).format("YYYY-MM-DD") : "",
          timeOfBirth: formData.timeOfBirth ? moment(formData.timeOfBirth).format("HH:mm") : "",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send booking request");
      }

      toast({
        title: "Booking request sent!",
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/thank-you"); // Redirect to Thank-You page
    } catch (error) {
      toast({
        title: "Error sending request",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="md" mx="auto" mt={{ base: 40, md: 40, lg: 40, xl: 60 }} p={5} boxShadow="lg" borderRadius="lg">
      <Heading textAlign="center" fontSize="2xl" color="orange.700">Book a Consultation</Heading>
      <VStack spacing={6} mt={5} as="form" onSubmit={handleSubmit}>
        <FormControl isRequired>
          <FormLabel>Name</FormLabel>
          <Input type="text" name="name" value={formData.name} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Email</FormLabel>
          <Input type="email" name="email" value={formData.email} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Phone</FormLabel>
          <Input type="text" name="phone" placeholder="+1 (XXX) XXX-XXXX" value={formData.phone} onChange={handleChange} />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Message</FormLabel>
          <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Please drop a message" />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Date of Birth</FormLabel>
          <DatePicker
            selected={formData.dob}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            showYearDropdown
            scrollableYearDropdown
            yearDropdownItemNumber={100}
            placeholderText="Select your date of birth"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel>Time of Birth</FormLabel>
          <DatePicker
            selected={formData.timeOfBirth}
            onChange={handleTimeChange}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeFormat="HH:mm"
            dateFormat="HH:mm"
            placeholderText="Select time of birth"
          />
        </FormControl>
        <Button type="submit" colorScheme="orange" isLoading={loading}>Submit</Button>
        {/* Social Links */}
        <HStack spacing={10} p={10} >
          <Link href="https://youtube.com/@astrodevaraj108?si=kyY-4IE-RvHo9uDi" isExternal><IconButton icon={<FaYoutube />} aria-label="YouTube" colorScheme="red" /></Link>
          <Link href="https://x.com/AsamoahDas108" isExternal><IconButton icon={<FaTwitterSquare />} aria-label="Telegram" colorScheme="blue" /></Link>
          <Link href="https://web.facebook.com/DevaRishiDasAsamoah/?_rdc=1&_rdr#" isExternal><IconButton icon={<FaFacebook />} aria-label="Facebook" colorScheme="blue" /></Link>
          <Link href="https://wa.me/2348175725656" isExternal><IconButton icon={<FaWhatsapp />} aria-label="WhatsApp" colorScheme="green" /></Link>
        </HStack>
      </VStack>
    </Box>
  );
};

export default BookingPage;
