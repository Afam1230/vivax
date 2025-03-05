{/* Tracking Section */}
<Container maxW="container.lg" py={8}>
<Tabs variant="soft-rounded" colorScheme="blue">
    <TabList>
    <Tab>Tracking</Tab>
    <Tab>Schedules</Tab>
    <Tab>Local offices</Tab>
    </TabList>
    <TabPanels>
    <TabPanel>
        <HStack spacing={4} p={4} borderWidth={1} borderRadius="md" boxShadow="md">
        <FaMapMarkerAlt />
        <Input placeholder="B/L, container number or parcel" />
        <Button colorScheme="blue">Track</Button>
        </HStack>
    </TabPanel>
    </TabPanels>
</Tabs>
</Container>

{/* Hero Section */}
<Box position="relative" h={{ base: "55vh", md: "70vh" }} bg="black">
<Image src={hero} alt="Hero Background" objectFit="cover" w="full" h="full" opacity={0.7} />
<VStack position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)" spacing={4} color="white">
    <Heading textAlign="center" fontSize={{ base: "2xl", md: "4xl" }}>
    See how truly integrated logistics delivers
    </Heading>
    <Text textAlign="center" maxW="lg">
    With truly integrated logistics, there’s always a new way to keep your goods moving and your business growing.
    </Text>
    <Button colorScheme="blue">Discover new paths</Button>
</VStack>
</Box>

