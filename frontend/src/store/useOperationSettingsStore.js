// store/useOperationSettingsStore.js
import { create } from 'zustand';
import axios from 'axios';

const useOperationSettingsStore = create((set) => ({
  settings: {
    exchangeRates: {
      BTC: 0,
      ETH: 0,
      USD: 1
    },
    walletAddresses: {
      BTC: '',
      ETH: '',
      USD: ''
    },
    transactionCharge: 0
  },
  loading: false,
  fetchSettings: async () => {
    set({ loading: true });
    try {
      const res = await axios.get('/api/admin/operation-settings');
      set({ settings: res.data });
    } catch (err) {
      console.error('Error fetching settings:', err);
    } finally {
      set({ loading: false });
    }
  },
  updateSettings: async (newSettings) => {
    try {
      await axios.put('/api/admin/operation-settings', newSettings);
      set({ settings: newSettings });
    } catch (err) {
      console.error('Failed to update settings:', err);
    }
  }
}));

export default useOperationSettingsStore;
