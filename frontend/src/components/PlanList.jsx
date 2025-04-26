// src/components/PlanList.jsx
import { SimpleGrid, Box, Button, HStack, useBreakpointValue } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import PlanCard from "./PlanCard";
import { usePlanStore } from "../store/usePlanStore"; // Zustand store for plans
import PlanForm from "./PlanForm";

const PlanList = ({
  coin = "BTC",
  onMine,
  isAdmin = false,
}) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [pageIndex, setPageIndex] = useState(0);
  const itemsPerPage = 5;

  const { plans, loading, fetchPlans, createPlan, updatePlan, deletePlan } = usePlanStore();

  useEffect(() => {
    fetchPlans(); // Fetch plans on component mount
  }, [fetchPlans]);

  const currentPlans = plans[coin] || []; // fallback to empty array
  const paginatedPlans = isMobile
    ? currentPlans.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
    : currentPlans;


  const handleNext = () => {
    setPageIndex((prev) => (prev + 1) % plans[coin].length);
  };

  const handlePrev = () => {
    setPageIndex((prev) => (prev - 1 + plans[coin].length) % plans[coin].length);
  };

  const handleCreate = () => {
    <Box mt={4}>
      <PlanForm onCreate={(newPlan) => createPlan(coin, newPlan)} />
    </Box>
  };

  const handleEdit = (planId) => {
    const updatedPlan = { price: 20.0, rate: "0.6 TH/s" };
    updatePlan(coin, planId, updatedPlan);
  };

  const handleDelete = (planId) => {
    deletePlan(coin, planId);
  };

  return (
    <Box>
      {loading ? (
        <Box>Loading plans...</Box>
      ) : (
        <>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {paginatedPlans.map((plan) => (
              <PlanCard
                key={plan._id}
                plan={plan}
                coin={coin}
                onMine={onMine}
                onEdit={handleEdit}
                onDelete={handleDelete}
                isAdmin={isAdmin}
              />
            ))}
          </SimpleGrid>

          {isMobile && currentPlans.length > 1 && (
            <HStack justify="center" mt={4}>
              <Button size="sm" onClick={handlePrev}>Previous</Button>
              <Button size="sm" onClick={handleNext}>Next</Button>
            </HStack>
          )}


          {isAdmin && (
            <Box mt={4}>
              <PlanForm onCreate={(newPlan) => createPlan(coin, newPlan)} />
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default PlanList;
