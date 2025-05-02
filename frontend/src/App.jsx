import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage"
import WhatsAppButton from "./components/WhatsAppButton"
import AboutPage from "./pages/AboutPage"
import ScrollToTop from "./components/ScrollToTop";
import Login from "./pages/Login";
import PaymentPage from "./pages/PaymentPage";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from './components/Navbar';
import PricingPage from "./pages/PricingPage";
import AdminPlansPage from "./pages/AdminPlansPage";
import DepositPage from "./pages/DepositPage";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import ManageUser from "./pages/ManageUser";
import AllTransactions from "./pages/AllTransactions";
import ManageOperations from "./pages/ManageOperations";
import WithdrawPage from "./pages/WithdrawPage";
import TransactionHistoryPage from "./pages/TransactionHistoryPage";
import Index from "./pages/Index";
import Footer from "./components1/Footer";


function App() {
	return (
		
		<Box minH={"100vh"} bg={'white'} >
			<ScrollToTop />
			<Navbar/>
			<WhatsAppButton />
			<Routes>
				<Route path='/' element={<Index />} />
				<Route path="/admin/manage-operations" element={<ManageOperations/>} />
				<Route path="/admin/transactions" element={<AllTransactions />} />
				<Route path='/admin/plans' element={<AdminPlansPage />} />
				<Route path="/admin/users" element={<AdminUsers />} />
				<Route path="/admin/manage-users/:userId" element={<ManageUser />} />
				<Route path='/admin' element={<AdminDashboard />} />
				<Route path="/about" element={<AboutPage />} />
				<Route path="/payment/:planId" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
				<Route path="/login" element={<Login />} />
				<Route path="/register" element={<Register />} />
				<Route path="/pricing" element={<ProtectedRoute><PricingPage /></ProtectedRoute>} />
				<Route
					path="/dashboard"
					element={
						<ProtectedRoute>
							<Dashboard />
						</ProtectedRoute>
					}
				/>
				<Route path="/payment/:planId" element={<ProtectedRoute><PaymentPage /></ProtectedRoute>} />
				<Route path="/deposit" element={<ProtectedRoute><DepositPage /></ProtectedRoute>} />
				<Route path="/withdraw" element={<ProtectedRoute><WithdrawPage /></ProtectedRoute>} />
				<Route path="/transactions" element={<ProtectedRoute><TransactionHistoryPage /></ProtectedRoute>} />
			</Routes>
			<Footer/>

		</Box>
	);
}

export default App;
