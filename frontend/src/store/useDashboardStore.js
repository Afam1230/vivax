// src/store/useDashboardStore.js
import {create} from "zustand";
import axios from "axios";
import { FaBitcoin, FaEthereum, FaDollarSign } from "react-icons/fa";


export const useDashboardStore = create((set) => ({
  loading: false,
  error: null,

  // the data our cards need
  dailyProfit: 0,
  activePlansCount: 0,
  totalReturns: 0,
  activeInvestments: [],

  // fetch & compute everything
  fetchDashboard: async () => {
    set({ loading: true, error: null });
    try {
      const userId = localStorage.getItem("userId")
      const { data } = await axios.get(`/api/user/stats/${userId}`);  // Send userId in URL params
      const { balance, earnings, plans } = data;

      // 1) Active plans count
      const activePlansCount = ["BTC", "ETH", "USD"]
        .reduce((sum, coin) => sum + (plans[coin]?.length || 0), 0);

      // 2) Total returns (we’ll display USD earnings)
      const totalReturns = earnings.USD + earnings.BTC * 93869.35 + earnings.ETH * 1762.63;

      // 3) Daily profit = sum of rewardPerDay for all *currently* active plans
      const today = new Date();
      let dailyProfit = 0;
      for (const coin of ["BTC", "ETH", "USD"]) {
        for (const plan of plans[coin] || []) {
          const start = new Date(plan.purchaseDate);
          const end = new Date(start);
          end.setDate(end.getDate() + plan.totalPeriod);
          if (today >= start && today <= end) {
            dailyProfit += plan.rewardPerDay;
          }
        }
      }

      // 4) Active investments data
      const activeInvestments = [
        { title: "Bitcoin",  amount: balance.btc, change: 0, symbol: FaBitcoin },
        { title: "Ethereum", amount: balance.eth, change: 0, symbol: FaEthereum },
        { title: "USD",      amount: balance.usd, change: 0, symbol: FaDollarSign },
      ];

      set({
        loading: false,
        dailyProfit,
        activePlansCount,
        totalReturns,
        activeInvestments,
      });
    } catch (err) {
      set({ loading: false, error: err.message });
    }
  },
}));
