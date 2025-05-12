import React, { useEffect, useState } from "react";
import {
    Box,
    Text,
    Avatar,
    HStack,
    VStack,
    Fade,
    useColorModeValue,
} from "@chakra-ui/react";

const testimonials = [
    {
        name: "Emily R.",
        location: "Canada",
        amount: "$2,500",
        type: "Withdrawal",
        time: "2 mins ago",
        avatar: "https://i.pravatar.cc/150?img=32",
    },
    {
        name: "James T.",
        location: "USA",
        amount: "$1,200",
        type: "Deposit",
        time: "5 mins ago",
        avatar: "https://i.pravatar.cc/150?img=14",
    },
    {
        name: "Liam W.",
        location: "UK",
        amount: "$3,000",
        type: "Withdrawal",
        time: "10 mins ago",
        avatar: "https://i.pravatar.cc/150?img=18",
    },
    {
        name: "Sophia M.",
        location: "Germany",
        amount: "$4,700",
        type: "Deposit",
        time: "15 mins ago",
        avatar: "https://i.pravatar.cc/150?img=25",
    },
    {
        name: "Sarah Johnson",
        country: "USA",
        amount: "$2,000",
        type: "withdrawal",
        time: "2 minutes ago",
        avatar: "https://i.pravatar.cc/150?img=25",

    },
    {
        name: "Liam Wong",
        country: "Singapore",
        amount: "$5,400",
        type: "deposit",
        time: "5 minutes ago",
        avatar: "https://i.pravatar.cc/300",

    },
    {
        name: "Elena Rodriguez",
        country: "Spain",
        amount: "$1,200",
        type: "withdrawal",
        time: "just now",
        avatar: "https://i.pravatar.cc/300",

    },
    {
        name: "James Smith",
        country: "UK",
        amount: "$3,800",
        type: "deposit",
        time: "3 minutes ago",
        avatar: "https://i.pravatar.cc/300",

    },
];

const getRandomInterval = () => {
    // Random time between 15s and 40s
    return Math.floor(Math.random() * (40000 - 20000 + 1)) + 15000;
};

const TestimonialPopup = () => {
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState(0);
    const [initialPopupShown, setInitialPopupShown] = useState(false); // To track if the first popup has been shown

    useEffect(() => {
        let timeout;

        const showTestimonial = () => {
            setCurrent((prev) => Math.floor(Math.random() * testimonials.length));
            setVisible(true);

            // Hide after 6 seconds
            setTimeout(() => setVisible(false), 6000);

            // Schedule next appearance randomly
            timeout = setTimeout(showTestimonial, getRandomInterval());
        };

        // Show the first popup after 5 seconds
        if (!initialPopupShown) {
            timeout = setTimeout(() => {
                showTestimonial();
                setInitialPopupShown(true); // Mark that the first popup was shown
            }, 5000);
        } else {
            timeout = setTimeout(showTestimonial, getRandomInterval());
        }

        return () => clearTimeout(timeout);
    }, [initialPopupShown]);

    const t = testimonials[current];

    return (
        <Fade in={visible}>
            <Box
                position="fixed"
                bottom={{ base: 4, md: 6 }}
                right={{ base: 4, md: 6 }}
                zIndex={2000} // increased zIndex
                maxW="sm"
                bg={useColorModeValue("white", "gray.800")}
                border="1px solid"
                borderColor="gray.200"
                boxShadow="lg"
                borderRadius="lg"
                overflow="hidden"
                p={4}
                pointerEvents="none"
                color="black" // Force color for visibility
            >
                <HStack align="start" spacing={4}>
                    <Avatar src={t.avatar} name={t.name} size="md" />
                    <VStack align="start" spacing={1}>
                        <Text fontWeight="bold">
                            {t.name} • <Text as="span" color="gray.500" fontWeight="normal">{t.location}</Text>
                        </Text>
                        <Text fontSize="sm">
                            {t.type === "Deposit" ? "Deposited" : "Withdrew"}{" "}
                            <Text as="span" fontWeight="semibold" color={t.type === "Deposit" ? "green.500" : "red.500"}>
                                {t.amount}
                            </Text>
                        </Text>
                        <Text fontSize="xs" color="gray.500">
                            {t.time}
                        </Text>
                    </VStack>
                </HStack>
            </Box>
        </Fade>
    );
};

export default TestimonialPopup;