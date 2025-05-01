// components/BalanceCard.js
import { Box, Text, ButtonGroup, VStack, HStack, Button, Icon, Stack } from "@chakra-ui/react";
import { FaWallet } from "react-icons/fa";
import { FaChartLine } from "react-icons/fa";
import { FaBriefcase } from "react-icons/fa";
import { FaDollarSign } from "react-icons/fa";
import { FaBitcoin, FaEthereum } from "react-icons/fa";

const BalanceItem = ({ label, amount, icon }) => (
  <HStack justify="space-between" w="full">
    <HStack>
      <Icon as={icon} boxSize={5} color="yellow.400" />
      <Text>{label}</Text>
    </HStack>
    <Text fontWeight="bold">{amount}</Text>
  </HStack>
);

export function WalletBalanceCard({ balance }) {
  return (
    <Box bg="#1B263B" p={5} borderRadius="xl" color="white">
      <Text fontSize="md" mb={4}>Wallet Balances</Text>
      <VStack spacing={3} align="stretch">
        <BalanceItem label="BTC" amount={balance?.btc ?? 0} icon={FaBitcoin} />
        <BalanceItem label="ETH" amount={balance?.eth ?? 0} icon={FaEthereum} />
        <BalanceItem label="USDT" amount={balance?.usd ?? 0} icon={FaDollarSign} />
      </VStack>
    </Box>
  );
}


export function BalanceCard({ balance }) {
  return (
    <Box backdropFilter="blur(0px)"  bg="#1B263B" p={5} borderRadius="xl" color="white">
      <Text fontSize="sm" color="gray.400">Total Balance</Text>
      <Stack spacing={2} justifyContent={'center'} direction={'row-reverse'}>
      <Text fontSize="2xl" fontWeight="bold">${balance.toFixed(2)}</Text>
      
      </Stack>
    </Box>
  );
}


export function DailyProfitCard({ profit = 0 }) {
  return (
    <Box bg="#1B263B" p={[4, 6]} borderRadius="2xl" color="white" w="full" shadow="md">
      <VStack spacing={2} align="start">
        <Text fontSize={["sm", "md"]} color="gray.400">24h Profit</Text>
        <Text fontSize={["2xl", "3xl"]} fontWeight="bold">${profit.toFixed(2)}</Text>
        <Text fontSize={["xs", "sm"]} color="green.300">+5.2%</Text>
        <Icon as={FaChartLine} mt={2} boxSize={[5, 6]} />
      </VStack>
    </Box>
  );
}

// components/ActivePlansCard.js

export function ActivePlansCard({ count }) {
  return (
    <Box bg="#1B263B" p={[4, 6]} borderRadius="2xl" color="white" w="full" shadow="md">
      <Stack spacing={2} direction="row" align="center" justify="space-between">
        <Box>
          <Text fontSize={["sm", "md"]} color="gray.400">Active Plans</Text>
          <Text fontSize={["2xl", "3xl"]} fontWeight="bold">{count}</Text>
        </Box>
        <Icon as={FaBriefcase} boxSize={[6, 8]} />
      </Stack>
    </Box>
  );
}

// components/TotalReturnsCard.js
export function TotalReturnsCard({ returns = 0 }) {
  return (
    <Box bg="#1B263B" p={[4, 6]} borderRadius="2xl" color="white" w="auto" maxW={'100vh'} shadow="md">
      <VStack spacing={2} align="start">
        <Text fontSize={["sm", "md"]} color="gray.400">Total Returns</Text>
        <Text fontSize={["2xl", "3xl"]} fontWeight="bold">
          ${returns.toFixed(2)}
        </Text>
        <Text fontSize={["xs", "sm"]} color="green.300">+12.4%</Text>
        <Icon as={FaDollarSign} mt={2} boxSize={[5, 6]} />
      </VStack>
    </Box>
  );
}


// components/PortfolioPerformance.js
export  function PortfolioPerformance() {
  return (
    <Box bg="#1B263B" p={5} borderRadius="xl" color="white" flex={1}>
      <Text fontSize="md" mb={3}>Portfolio Performance</Text>
      <ButtonGroup size="sm" isAttached mb={4}>
        <Button variant="solid">1D</Button>
        <Button variant="ghost">1W</Button>
        <Button variant="ghost">1M</Button>
        <Button variant="ghost">1Y</Button>
      </ButtonGroup>
      <Box bgGradient="linear(to-r, blue.900, purple.900)" h="150px" borderRadius="lg" />
    </Box>
  );
}

// components/ActiveInvestments.js
const Investment = ({ title, amount, change, symbol }) => (
  <HStack justify="space-between" w="full">
    <Text fontWeight="semibold" fontSize={["md", "lg"]}>{title}</Text>
    <Box textAlign="right">
      <Text fontWeight="bold" fontSize={["md", "lg"]}><Icon as={symbol} boxSize={4} color="yellow.400" />{amount.toFixed(2)}</Text>
      <Text fontSize="sm" color={change > 0 ? "green.300" : "red.400"}>
        {change > 0 ? `+${change}%` : `${change}%`}
      </Text>
    </Box>
  </HStack>
);

export function ActiveInvestments({ data }) {
  return (
    <Box bg="#1B263B" p={[4, 6]} borderRadius="2xl" color="white" w="full" shadow="md">
      <Text fontSize={["md", "lg"]} mb={4}>Active Investments</Text>
      <VStack spacing={4} align="stretch">
        {data.map((item, idx) => (
          <Investment key={idx} {...item} />
        ))}
      </VStack>
    </Box>
  );
}
