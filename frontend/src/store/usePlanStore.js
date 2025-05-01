import { create } from "zustand";
import axios from "axios";

// const API = "http://localhost:5000/api";

export const usePlanStore = create((set) => ({
  plans: { BTC: [], ETH: [], USD: [] },
  loading: false,
  error: null,

  fetchPlans: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`/api/plans`);
      set({ plans: res.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createPlan: async (type, newPlan) => {
    try {
      const res = await axios.post(`/api/plans/${type}`, newPlan);
      set((state) => ({
        plans: {
          ...state.plans,
          [type]: [...state.plans[type], res.data],
        },
      }));
    } catch (error) {
      console.error("Create plan failed:", error);
    }
  },

  updatePlan: async (type, planId, updatedPlan) => {
    try {
      const res = await axios.put(`/api/plans/${type}/${planId}`, updatedPlan);
  
      set((state) => {
        const updatedPlans = state.plans[type]?.map((plan) =>
          plan._id === planId ? res.data.plan : plan
        ) || [];
  
        return {
          plans: {
            ...state.plans,
            [type]: updatedPlans,
          },
        };
      });
    } catch (error) {
      console.error("Update plan failed:", error.response?.data || error.message);
    }
  },
  

  deletePlan: async (type, planId) => {
    try {
      await axios.delete(`/api/plans/${type}/${planId}`);
      set((state) => ({
        plans: {
          ...state.plans,
          [type]: state.plans[type].filter((plan) => plan._id !== planId),
        },
      }));
    } catch (error) {
      console.error("Deletel plan failed:", error);
    }
  },
}));
