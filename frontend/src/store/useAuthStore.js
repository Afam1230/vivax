import { create } from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,

  login: async (email, password) => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", { email, password }, { withCredentials: true });
      set({ user: res.data.user, isAuthenticated: true });
    } catch (error) {
      console.error("Login failed:", error);
    }
  },

  register: async (name, email, password) => {
    try {
      await axios.post("http://localhost:5000/api/auth/register", { name, email, password });
    } catch (error) {
      console.error("Registration failed:", error);
    }
  },

  logout: async () => {
    await axios.post("http://localhost:5000/api/auth/logout", {}, { withCredentials: true });
    set({ user: null, isAuthenticated: false });
  },

  fetchUser: async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/auth/user", { withCredentials: true });
      set({ user: res.data, isAuthenticated: true });
    } catch {
      set({ user: null, isAuthenticated: false });
    }
  },
}));
