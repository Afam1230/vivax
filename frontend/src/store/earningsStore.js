// store/earningsStore.js
import { create } from 'zustand';
import axios from 'axios';

const useEarningsStore = create((set) => ({
  profit: 0,
  loading: false,
  error: null,

  fetchProfit: async (userId) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.get(`/api/earnings/${userId}`);
      set({ profit: response.data.totalProfit, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useEarningsStore;
