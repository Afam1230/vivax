import {
    Box, Heading, Input, Button, VStack, HStack, Text, Spinner,
  } from '@chakra-ui/react';
  import { useParams } from 'react-router-dom';
  import { useEffect, useState } from 'react';
  import axios from 'axios';
  
  export default function ManageUser() {
    const { userId } = useParams();
    const [user, setUser] = useState(null);
    const [saving, setSaving] = useState(false);
  
    useEffect(() => {
      axios.get(`/api/admin/users/${userId}`)
        .then(res => setUser(res.data))
        .catch(() => alert("Error loading user"));
    }, [userId]);
  
    const handleChange = (section, field, value, coin) => {
      setUser(prev => {
        const updated = { ...prev };
        if (section === 'balance' || section === 'earnings') {
          updated[section][field] = value;
        } else if (section === 'reward') {
          const plan = updated.plans[coin].find(p => p._id === field);
          if (plan) plan.rewardPerDay = value;
        }
        return updated;
      });
    };
  
    const saveChanges = () => {
      setSaving(true);
      const { balance, earnings, plans } = user;
  
      // Extract rewardPerDay updates
      const updatedPlans = {};
      ['BTC', 'ETH', 'USD'].forEach(coin => {
        updatedPlans[coin] = user.plans[coin].map(p => ({
          id: p.id,
          rewardPerDay: p.rewardPerDay
        }));
      });
  
      axios.put(`/api/admin/users/${userId}`, {
        balance,
        earnings,
        plans: updatedPlans,
      })
        .then(() => alert("User updated successfully"))
        .catch(() => alert("Update failed"))
        .finally(() => setSaving(false));
    };
  
    if (!user) return <Spinner size="xl" mt={10} />;
  
    return (
      <Box p={5}>
        <Heading size="md" mb={4}>Edit User: {user.name}</Heading>
  
        <VStack align="start" spacing={4}>
          <Text fontWeight="bold">Balance:</Text>
          {['usd', 'btc', 'eth'].map((field) => (
            <HStack key={field}>
              <Text>{field.toUpperCase()}:</Text>
              <Input
                value={user.balance[field]}
                type="number"
                onChange={(e) => handleChange('balance', field, parseFloat(e.target.value))}
                width="150px"
              />
            </HStack>
          ))}
  
          <Text fontWeight="bold" mt={4}>Earnings:</Text>
          {['USD', 'BTC', 'ETH'].map((field) => (
            <HStack key={field}>
              <Text>{field}:</Text>
              <Input
                value={user.earnings[field]}
                type="number"
                onChange={(e) => handleChange('earnings', field, parseFloat(e.target.value))}
                width="150px"
              />
            </HStack>
          ))}
  
          <Text fontWeight="bold" mt={4}>Plans & Reward Per Day:</Text>
          {['BTC', 'ETH', 'USD'].map((coin) =>
            user.plans[coin]?.map(plan => (
              <HStack key={plan._id}>
                <Text>{coin} Plan - {plan.label || 'Untitled'}:</Text>
                <Input
                  value={plan.rewardPerDay}
                  type="number"
                  onChange={(e) => handleChange('reward', plan._id, parseFloat(e.target.value), coin)}
                  width="150px"
                />
              </HStack>
            ))
          )}
  
          <Button
            mt={6}
            colorScheme="blue"
            onClick={saveChanges}
            isLoading={saving}
          >
            Save Changes
          </Button>
        </VStack>
      </Box>
    );
  }
  