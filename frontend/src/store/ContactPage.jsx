import { useState } from "react";
import { VStack, HStack, Heading, Text, Input, Textarea, Button, IconButton, Link, useToast } from "@chakra-ui/react";
import { FaYoutube, FaTelegramPlane, FaFacebook, FaWhatsapp, FaEnvelope, FaPhone, FaMapMarkerAlt, FaTwitterSquare } from "react-icons/fa";
import { motion } from "framer-motion";

const MotionVStack = motion(VStack);

const ContactPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.message) {
      toast({ title: "All fields are required!", status: "error", duration: 3000, isClosable: true });
      return;
    }

    // EmailJS integration (replace YOUR_SERVICE_ID, YOUR_TEMPLATE_ID, YOUR_USER_ID)
    try {
      await fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          service_id: "YOUR_SERVICE_ID",
          template_id: "YOUR_TEMPLATE_ID",
          user_id: "YOUR_USER_ID",
          template_params: formData,
        }),
      });
      toast({ title: "Message sent successfully!", status: "success", duration: 3000, isClosable: true });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      toast({ title: "Failed to send message.", status: "error", duration: 3000, isClosable: true });
    }
  };

  return (
    <MotionVStack p={5} spacing={6} align="center" maxW="600px" mx="auto" initial={{ opacity: 0 }} animate={{ opacity: 1 }} mt={{base:20, md:40, lg:40, xl:40}}>
      <Heading color="orange.700">Contact Us</Heading>
      <Text textAlign="center" color="gray.600">Feel free to reach out with any questions or inquiries.</Text>

      {/* Contact Form */}
      <VStack as="form" onSubmit={handleSubmit} spacing={4} w="full">
        <Input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
        <Input name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required type="email" />
        <Textarea name="message" placeholder="Your Message" value={formData.message} onChange={handleChange} required />
        <Button type="submit" colorScheme="orange" w="full">Send Message</Button>
      </VStack>

      {/* Contact Details */}
      <VStack color="gray.700" spacing={2}>
        <HStack><FaEnvelope /><Text>Devarishidas@gmail.COM</Text></HStack>
        <HStack><FaPhone /><Text>+(233) 54 194-0276</Text></HStack>
        <HStack><FaMapMarkerAlt /><Text>ACCRA, GHANA</Text></HStack>
      </VStack>

      {/* Social Links */}
      <HStack spacing={4}>
        <Link href="https://youtube.com/@astrodevaraj108?si=kyY-4IE-RvHo9uDi" isExternal><IconButton icon={<FaYoutube />} aria-label="YouTube" colorScheme="red" /></Link>
        <Link href="https://x.com/AsamoahDas108" isExternal><IconButton icon={<FaTwitterSquare />} aria-label="Telegram" colorScheme="blue" /></Link>
        <Link href="https://web.facebook.com/DevaRishiDasAsamoah/?_rdc=1&_rdr#" isExternal><IconButton icon={<FaFacebook />} aria-label="Facebook" colorScheme="blue" /></Link>
        <Link href="https://wa.me/2348175725656" isExternal><IconButton icon={<FaWhatsapp />} aria-label="WhatsApp" colorScheme="green" /></Link>
      </HStack>
    </MotionVStack>
  );
};

export default ContactPage;