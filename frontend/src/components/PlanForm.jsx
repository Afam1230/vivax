import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

const PlanForm = ({ coin, onCreate, initialData = null, isEditing = false, onCancel }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [formData, setFormData] = useState({
    label: "",
    price: "",
    rate: "",
    rewardPerDay: "",
    totalPeriod: "",
    reward: 0,
    cryptoType: coin,
  });

  // 🔁 Load initial data for editing
  useEffect(() => {
    if (initialData) {
      setFormData({
        label: initialData.label || "",
        price: initialData.price || "",
        rate: initialData.rate || "",
        rewardPerDay: initialData.rewardPerDay || "",
        totalPeriod: initialData.totalPeriod || "",
        reward: initialData.reward || 0,
        cryptoType: coin,
      });
      onOpen(); // Open modal automatically in edit mode
    }
  }, [initialData, coin, onOpen]);

  // 🧠 Automatically calculate total reward
  useEffect(() => {
    const daily = parseFloat(formData.rewardPerDay);
    const days = parseFloat(formData.totalPeriod);
    const reward = !isNaN(daily) && !isNaN(days) ? daily * days : 0;
    setFormData((prev) => ({ ...prev, reward }));
  }, [formData.rewardPerDay, formData.totalPeriod]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    onClose();
    setFormData({
      label: "",
      price: "",
      rate: "",
      rewardPerDay: "",
      totalPeriod: "",
      reward: 0,
      cryptoType: coin,
    });
    if (onCancel) onCancel();
  };

  const handleSubmit = () => {
    const plan = {
      ...formData,
      price: parseFloat(formData.price),
      rewardPerDay: parseFloat(formData.rewardPerDay),
      totalPeriod: parseFloat(formData.totalPeriod),
      reward: parseFloat(formData.reward),
      cryptoType: coin,
    };
    onCreate(plan);
    handleClose();
  };

  return (
    <>
      {!isEditing && (
        <Button colorScheme="teal" onClick={onOpen}>
          Add Plan
        </Button>
      )}

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{isEditing ? "Edit Plan" : "Create New Plan"}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Label</FormLabel>
                <Input
                  name="label"
                  placeholder="e.g. '30-Days Investo'"
                  value={formData.label}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input
                  name="price"
                  type="number"
                  placeholder="Plan purchase price"
                  value={formData.price}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Rate</FormLabel>
                <Input
                  name="rate"
                  placeholder="e.g. 10$/day"
                  value={formData.rate}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Reward Per Day</FormLabel>
                <Input
                  name="rewardPerDay"
                  type="number"
                  placeholder="Daily reward amount"
                  value={formData.rewardPerDay}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Total Period (days)</FormLabel>
                <Input
                  name="totalPeriod"
                  type="number"
                  placeholder="Total duration of plan in days"
                  value={formData.totalPeriod}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Total Reward</FormLabel>
                <Input
                  name="reward"
                  isReadOnly
                  fontWeight="bold"
                  fontSize="2xl"
                  value={formData.reward}
                />
              </FormControl>
            </VStack>
          </ModalBody>

          <ModalFooter>
            <HStack spacing={3}>
              <Button colorScheme="teal" onClick={handleSubmit}>
                {isEditing ? "Update Plan" : "Create"}
              </Button>
              {isEditing && (
                <Button onClick={handleClose} colorScheme="gray">
                  Cancel
                </Button>
              )}
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PlanForm;
