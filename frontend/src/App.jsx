import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import LogisticsApp from "./pages/CreatePage";
import HomePage  from "./pages/HomePage";
import Navbar from "./components/Navbar1";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminPage";
import TrackingPage from "./pages/TrackingPage";
import PricingPage from "./pages/PricingPage";
import SupportPage from "./pages/SupportPage";
import ServicePage from "./pages/ServicePage";
import RequestAccount from "./pages/RequestAccount";
import ThankYou from "./pages/ThankYou";
import ContactPage from "./pages/ContactPage";
import WhatsAppButton from "./components/WhatsAppButton";
import ContactUsCard from "./components/ContactUsCard";


function App() {
	return (
		<Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
			<Navbar />
			<WhatsAppButton />
			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/create' element={<LogisticsApp />} />
				<Route path='/track' element={<TrackingPage />} />
        		<Route path='/pricing' element={<PricingPage />} />
        		<Route path='/admin' element={<AdminDashboard />} />
				<Route path='/support' element={<SupportPage />} />
				<Route path='/services' element={<ServicePage />} />
				<Route path='/request-account' element={<RequestAccount />} />
				<Route path='/thank-you' element={<ThankYou />} />	
				<Route path='/contact' element={<ContactPage />} />
		
				</Routes>
      		<Footer /> codded by jay
			
		</Box>
	);
}

export default App;
