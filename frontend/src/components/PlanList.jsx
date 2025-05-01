import {
  SimpleGrid,
  Box,
  Button,
  HStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import PlanCard from "./PlanCard";
import { usePlanStore } from "../store/usePlanStore";
import PlanForm from "./PlanForm";

const PlanList = ({ coin = "BTC", onMine, isAdmin = false }) => {
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [pageIndex, setPageIndex] = useState(0);
  const [editingPlan, setEditingPlan] = useState(null); // 🔸 Track editing state
  const itemsPerPage = 5;

  const {
    plans,
    loading,
    fetchPlans,
    createPlan,
    updatePlan,
    deletePlan,
  } = usePlanStore();

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const currentPlans = plans[coin] || [];
  const paginatedPlans = isMobile
    ? currentPlans.slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
    : currentPlans;

  const handleNext = () => {
    setPageIndex((prev) => (prev + 1) % Math.ceil(currentPlans.length / itemsPerPage));
  };

  const handlePrev = () => {
    setPageIndex((prev) => (prev - 1 + Math.ceil(currentPlans.length / itemsPerPage)) % Math.ceil(currentPlans.length / itemsPerPage));
  };

  const handleEdit = (plan) => {
    setEditingPlan(plan); // 🔸 Set selected plan for editing
  };

  const handleUpdate = (updatedPlanData) => {
    updatePlan(coin, editingPlan._id, updatedPlanData);
    setEditingPlan(null); // 🔸 Exit edit mode
  };

  const handleCancelEdit = () => {
    setEditingPlan(null);
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
                onEdit={() => handleEdit(plan)} // 🔸 Send plan to be edited
                onDelete={() => deletePlan(coin, plan._id)}
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
            <Box mt={6}>
              {editingPlan ? (
                <PlanForm
                  coin={coin}
                  initialData={editingPlan}
                  onCreate={handleUpdate} // Reuse for update
                  onCancel={handleCancelEdit}
                  isEditing
                />
              ) : (
                <PlanForm
                  coin={coin}
                  onCreate={(newPlan) => createPlan(coin, newPlan)}
                />
              )}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};

export default PlanList;
