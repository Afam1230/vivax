import { create } from "zustand";
import axios from "axios";

const API = "http://localhost:5000/api";

export const usePlanStore = create((set) => ({
  plans: { BTC: [], ETH: [], USD: [] },
  loading: false,
  error: null,

  fetchPlans: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API}/plans`);
      set({ plans: res.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  createPlan: async (type, newPlan) => {
    try {
      const res = await axios.post(`${API}/plans/${type}`, newPlan);
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
      const res = await axios.put(`${API}/plans/${type}/${planId}`, updatedPlan);
      set((state) => ({
        plans: {
          ...state.plans,
          [type]: state.plans[type].map((plan) =>
            plan._id === planId ? res.data : plan
          ),
        },
      }));
    } catch (error) {
      console.error("Update plan failed:", error);
    }
  },

  deletePlan: async (type, planId) => {
    try {
      await axios.delete(`${API}/plans/${type}/${planId}`);
      set((state) => ({
        plans: {
          ...state.plans,
          [type]: state.plans[type].filter((plan) => plan._id !== planId),
        },
      }));
    } catch (error) {
      console.error("Delete plan failed:", error);
    }
  },
}));
