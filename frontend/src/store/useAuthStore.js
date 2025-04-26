import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { useEffect } from "react";

const API = "http://localhost:5000/api/auth";

// Create the Zustand store for authentication
export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,

      login: async (email, password) => {
        try {
          const res = await axios.post(`${API}/login`, { email, password });
      
          // ✅ Store token
          localStorage.setItem("token", res.data.token);
      
          // ✅ Store userId
          localStorage.setItem("userId", res.data.user._id);
      
          // ✅ Store full user in Zustand
          set({ user: res.data.user, isAuthenticated: true });
        } catch (error) {
          console.error("Login failed:", error.response?.data?.message || error.message);
          throw error;
        }
      },
      


      register: async (name, email, password) => {
        try {
          const res = await axios.post(`${API}/register`, { name, email, password });
          set({ user: res.data.user, isAuthenticated: true });
        } catch (error) {
          console.error("Registration failed:", error?.response?.data?.message || error.message);
          throw error;
        }
      },

      logout: () => {
        localStorage.removeItem("token");
        set({ user: null, isAuthenticated: false });
      },

      fetchUser: async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          set({ user: null, isAuthenticated: false });
          return;
        }

        try {
          const res = await axios.get(`${API}/user`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          set({ user: res.data, isAuthenticated: true });
          console.log('userFromFetch:', res.data)
        } catch (error) {
          console.error("Fetch user failed:", error);
          localStorage.removeItem("token");
          set({ user: null, isAuthenticated: false });
        }
      },


    })));

// Custom hook for authentication logic
export const useAuth = () => {
  const { isAuthenticated, login, logout, fetchUser } = useAuthStore((state) => ({
    isAuthenticated: state.isAuthenticated,
    login: state.login,
    logout: state.logout,
    fetchUser: state.fetchUser,
  }));

  // Check for token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser(); // Fetch user if token exists
    }
  }, [fetchUser]);

  // Setup Axios interceptors to send the token with every request
  useEffect(() => {
    axios.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          config.headers["Authorization"] = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
  }, []);

  return { isAuthenticated, login, logout };
};
