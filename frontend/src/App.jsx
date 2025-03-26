import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import LogisticsApp from "./pages/CreatePage";
import HomePage  from "./pages/HomePage"
import Navbar from "./components/Navbar1"
import Footer from "./components/Footer"
import AdminDashboard from "./pages/AdminPage"
import ServicePage from "./pages/ServicePage"
import WhatsAppButton from "./components/WhatsAppButton"
import AboutPage from "./pages/AboutPage"
import BookingPage from "./pages/BookingPage"
import BlogPage from "./pages/BlogPage"
import ShopPage from "./pages/ShopPage"
import ArticlePage from "./pages/ArticlePage"

import Cart from "./pages/Cart";
import ThankYouPage from "./pages/Thankyou";
import ContactPage from "./store/ContactPage";


function App() {
	return (
		<Box minH={"100vh"} bg={'white'} >
			<Navbar />
			<WhatsAppButton />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/create' element={<LogisticsApp />} />
        		<Route path='/admin' element={<AdminDashboard />} />
				<Route path='/services' element={<ServicePage />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/blog" element={<BlogPage />} />
				<Route path="/book" element={<BookingPage />} />
				<Route path="/shop" element={<ShopPage />} />
				<Route path="/article/:id" element={<ArticlePage />} />
				<Route path="/thank-you" element={ <ThankYouPage/>} />
				<Route path="/contact" element={ <ContactPage/>} />

			</Routes>
      		<Footer />
			
		</Box>
	);
}

export default App;
