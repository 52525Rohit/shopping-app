import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api/axios";
import toast from "react-hot-toast";

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [], // local (guest) cart
      dbCart: null, // server-synced cart (logged-in)
      isOpen: false,

      // Guest cart operations
      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existing = items.find((i) => i._id === product._id);
        if (existing) {
          set({
            items: items.map((i) =>
              i._id === product._id
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            ),
          });
        } else {
          set({ items: [...items, { ...product, quantity }] });
        }
        toast.success(`${product.name} added to cart!`);
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((i) => i._id !== productId) });
        toast("Item removed from cart", { icon: "🗑️" });
      },

      updateQty: (productId, quantity) => {
        if (quantity <= 0) return get().removeItem(productId);
        set({
          items: get().items.map((i) =>
            i._id === productId ? { ...i, quantity } : i,
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      // Server-synced operations (logged-in users)
      fetchCart: async () => {
        try {
          const { data } = await api.get("/cart");
          set({ dbCart: data.cart });
        } catch (err) {
          console.error("Failed to fetch cart:", err);
        }
      },

      addToServerCart: async (productId, quantity = 1) => {
        try {
          const { data } = await api.post("/cart", { productId, quantity });
          set({ dbCart: data.cart });
          toast.success("Added to cart!");
        } catch (err) {
          toast.error(err.response?.data?.message || "Failed to add to cart");
        }
      },

      removeFromServerCart: async (productId) => {
        try {
          const { data } = await api.delete(`/cart/${productId}`);
          set({ dbCart: data.cart });
          toast("Item removed", { icon: "🗑️" });
        } catch (err) {
          toast.error("Failed to remove item");
        }
      },

      updateServerQty: async (productId, quantity) => {
        try {
          const { data } = await api.put(`/cart/${productId}`, { quantity });
          set({ dbCart: data.cart });
        } catch (err) {
          toast.error("Failed to update quantity");
        }
      },

      toggleCart: () => set((s) => ({ isOpen: !s.isOpen })),

      getTotal: () =>
        get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
      getCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
    }),
    { name: "cart-storage", partialize: (state) => ({ items: state.items }) },
  ),
);

export default useCartStore;
