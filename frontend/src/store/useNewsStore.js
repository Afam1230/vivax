// src/store/useNewsStore.js
import { create } from 'zustand';
import axios from 'axios';

export const useNewsStore = create((set) => ({
  news: [],
  lastFetched: null,

  fetchNews: async () => {
    const now = new Date().getTime();
    const { lastFetched } = useNewsStore.getState();

    if (lastFetched && now - lastFetched < 1000 * 60 * 5) return; // 5-minute cache

    try {
        const response = await fetch('http://localhost:5000/api/news');      
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      
        const data = await response.json();
        set({ news: data.news, lastFetched: now });
      } catch (err) {
        console.error('Failed to fetch news:', err);
      }
      
  },
}));
