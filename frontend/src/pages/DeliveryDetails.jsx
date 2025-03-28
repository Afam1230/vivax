import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Select, VStack, Heading } from "@chakra-ui/react";
import { Country, State, City } from "country-state-city";
import { useNavigate } from "react-router-dom";

const DeliveryDetails = () => {
    const navigate = useNavigate();
    const [details, setDetails] = useState({
        fullName: "",
        email: "",
        phone: "",
        address: "",
        country: "",
        state: "",
        city: "",
        zip: "",
    });

    const handleChange = (e) => {
        setDetails({ ...details, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        localStorage.setItem("deliveryDetails", JSON.stringify(details));
        navigate("/checkout");
    };

    return (
        <Box maxW="500px" mx="auto" p={5} borderWidth={1} borderRadius="lg">
            <Heading size="lg" mb={5}>Delivery Details</Heading>
            <VStack spacing={4}>
                <FormControl isRequired>
                    <FormLabel>Full Name</FormLabel>
                    <Input name="fullName" value={details.fullName} onChange={handleChange} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Email</FormLabel>
                    <Input name="email" type="email" value={details.email} onChange={handleChange} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Phone</FormLabel>
                    <Input name="phone" type="tel" value={details.phone} onChange={handleChange} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Address</FormLabel>
                    <Input name="address" value={details.address} onChange={handleChange} />
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>Country</FormLabel>
                    <Select name="country" value={details.country} onChange={handleChange}>
                        <option value="">Select Country</option>
                        {Country.getAllCountries().map((country) => (
                            <option key={country.isoCode} value={country.isoCode}>{country.name}</option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>State</FormLabel>
                    <Select name="state" value={details.state} onChange={handleChange} disabled={!details.country}>
                        <option value="">Select State</option>
                        {State.getStatesOfCountry(details.country).map((state) => (
                            <option key={state.isoCode} value={state.isoCode}>{state.name}</option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>City</FormLabel>
                    <Select name="city" value={details.city} onChange={handleChange} disabled={!details.state}>
                        <option value="">Select City</option>
                        {City.getCitiesOfState(details.country, details.state).map((city) => (
                            <option key={city.name} value={city.name}>{city.name}</option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl isRequired>
                    <FormLabel>ZIP Code</FormLabel>
                    <Input name="zip" value={details.zip} onChange={handleChange} />
                </FormControl>
                <Button colorScheme="blue" width="full" onClick={handleSubmit}>Proceed to Checkout</Button>
            </VStack>
        </Box>
    );
};

export default DeliveryDetails;
