import { Box } from "@chakra-ui/react";
import Navbar from "../components1/Navbar";
import Hero from "../components1/Hero";
import Stats from "../components1/Stats";
import Features from "../components1/Features";
import HowItWorks from "../components1/HowItWorks";
import FAQ from "../components1/FAQ";
import Newsletter from "../components1/Newsletter";
import Transactions from "../components1/Transaction";
import Pricing from "../components1/Pricing";
import BlogPosts from "../components1/BlogPosts";
import Testimonials from "../components1/Testimonials";
import Footer from "../components1/Footer";
import ParticleBg from "../components1/ParticleBg";
import FuturisticBackground from "../components/FuturisticBackground";

const Index = () => {
  return (
    <Box bg="gray.900" minH="100vh">
      <FuturisticBackground/>
      <ParticleBg/>
      <Navbar />
      <Hero />
      <Stats />
      <Features />
      <HowItWorks />
      <Pricing />
      <Transactions />
      <BlogPosts />
      <Testimonials />
      <FAQ />
      <Newsletter />
      <Footer />
    </Box>
  );
};

export default Index;