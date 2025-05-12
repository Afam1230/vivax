import {
  Box, Heading, Input, Button, VStack, HStack, Text, Spinner,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';


export default function ManageUser() {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const cancelRef = useRef();



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

  const deleteUser = () => {
    setSaving(true);
    axios.delete(`/api/admin/users/${userId}`)
      .then(() => {
        alert("User deleted successfully");
        navigate('/admin/users');
      })
      .catch(() => alert("Failed to delete user"))
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
        <Button
          mt={2}
          colorScheme="red"
          onClick={() => setIsDeleteOpen(true)}
          isLoading={saving}
        >
          Delete User
        </Button>

        <AlertDialog
          isOpen={isDeleteOpen}
          leastDestructiveRef={cancelRef}
          onClose={() => setIsDeleteOpen(false)}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                Delete User
              </AlertDialogHeader>

              <AlertDialogBody>
                Are you sure you want to delete this user? This action is irreversible.
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button ref={cancelRef} onClick={() => setIsDeleteOpen(false)}>
                  Cancel
                </Button>
                <Button colorScheme="red" onClick={deleteUser} ml={3} isLoading={saving}>
                  Delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>


      </VStack>
    </Box>
  );
}
