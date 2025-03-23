import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: {}, // { productId: { _id, name, image, price, quantity } }
  totalPrice: 0,

  addToCart: (product) =>
    set((state) => {
      const cart = { ...state.cart };
      if (cart[product._id]) {
        cart[product._id].quantity += 1;
      } else {
        cart[product._id] = { ...product, quantity: 1 };
      }
      return { cart, totalPrice: state.totalPrice + product.price };
    }),

  removeFromCart: (productId) =>
    set((state) => {
      const cart = { ...state.cart };
      if (!cart[productId]) return state;

      const product = cart[productId];
      if (product.quantity > 1) {
        cart[productId].quantity -= 1;
        return { cart, totalPrice: state.totalPrice - product.price };
      }

      delete cart[productId];
      return { cart, totalPrice: state.totalPrice - product.price };
    }),

    addFromCart: (productId) =>
      set((state) => {
        const cart = { ...state.cart };
        if (!cart[productId]) return state;
  
        const product = cart[productId];
          cart[productId].quantity += 1;
          return { cart, totalPrice: state.totalPrice + product.price };
      }),

  updateQuantity: (productId, quantity) =>
    set((state) => {
      const cart = { ...state.cart };
      if (cart[productId]) {
        const priceDiff = (quantity - cart[productId].quantity) * cart[productId].price;
        cart[productId].quantity = quantity;
        return { cart, totalPrice: state.totalPrice + priceDiff };
      }
      return state;
    }),
}));
