import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],  // Holds all products for immediate UI updates
  loading: false, // Tracks loading state

  setProducts: (products) => set({ products }),

  fetchProducts: async () => {
    try {
      set({ loading: true }); // Start loading
      const res = await fetch("/api/products");
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      
      set({ products: data.data, loading: false });
    } catch (error) {
      console.error("Fetch Products Error:", error);
      set({ loading: false });
    }
  },

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }
  
    const formData = new FormData();
    formData.append("name", newProduct.name);
    formData.append("price", newProduct.price);
    formData.append("image", newProduct.image); // Image file
  
    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData, // Use FormData instead of JSON
      });
  
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
  
      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      console.error("Create Product Error:", error);
      return { success: false, message: error.message };
    }
  },
  

  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      set((state) => ({
        products: state.products.map((product) =>
          product._id === pid ? data.data : product
        ),
      }));

      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      console.error("Update Product Error:", error);
      return { success: false, message: error.message };
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, { method: "DELETE" });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);

      set((state) => ({
        products: state.products.filter((product) => product._id !== pid),
      }));

      return { success: true, message: "Product deleted successfully" };
    } catch (error) {
      console.error("Delete Product Error:", error);
      return { success: false, message: error.message };
    }
  },
}));
