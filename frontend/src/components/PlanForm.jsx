// src/components/PlanForm.jsx
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, FormControl, FormLabel, Input, useDisclosure, VStack } from "@chakra-ui/react";
import { useState } from "react";

const PlanForm = ({ onCreate }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState({
    label: "",
    price: "",
    rate: "",
    reward: "",
    rewardPerDay: "",
    totalPeriod: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    const plan = {
      ...formData,
      price: parseFloat(formData.price),
      reward: parseFloat(formData.reward),
      rewardPerDay: parseFloat(formData.rewardPerDay),
      totalPeriod: parseFloat(formData.totalPeriod)
    };
    onCreate(plan);
    onClose();
    setFormData({ label: "", price: "", rate: "", reward: "", rewardPerDay:"", totalPeriod:"" });
    console.log(plan)
  };

  return (
    <>
      <Button colorScheme="teal" onClick={onOpen}>Add Plan</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create New Plan</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl>
                <FormLabel>Label</FormLabel>
                <Input name="label" placeholder="the plan name. eg '30-Days investo'" value={formData.label} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Price</FormLabel>
                <Input name="price" placeholder="purchase price of the plan" type="number" value={formData.price} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Rate</FormLabel>
                <Input name="rate"  placeholder="eg. 10$/day" value={formData.rate} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>add Reward Per-day</FormLabel>
                <Input name="rewardPerDay" placeholder ="input the amount the client would get daily" type="number" value={formData.rewardPerDay} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>totalPeriod (in days)</FormLabel>
                <Input name="totalPeriod" placeholder="input the total duration of the plan in days" type="number" value={formData.totalPeriod} onChange={handleChange} />
              </FormControl>
              <FormControl>
                <FormLabel>Total Reward</FormLabel>
                <Input fontWeight={'bold'} fontSize={'2xl'} width={'100px'} name="reward" type="number" value={formData.rewardPerDay*formData.totalPeriod} onChange={handleChange} />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" onClick={handleSubmit}>Create</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default PlanForm; //this is a simple that gets user input from frontend and using the "createPlan" function from zustand, it sends the form data to the backend
