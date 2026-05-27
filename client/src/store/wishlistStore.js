import { create } from "zustand";
import { persist } from "zustand/middleware";
import toast from "react-hot-toast";

const useWishlistStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (product) => {
        const items = get().items;
        if (!items.find((item) => item.id === product.id)) {
          set({ items: [...items, product] });
          toast.success("Added to wishlist!");
        } else {
          toast.error("Already in wishlist");
        }
      },

      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
        toast.success("Removed from wishlist");
      },

      moveToCart: (product, addToCart) => {
        addToCart(product);
        get().removeItem(product.id);
        toast.success("Moved to cart!");
      },

      isInWishlist: (productId) => {
        return get().items.some((item) => item.id === productId);
      },
    }),
    {
      name: "wishlist-storage",
    },
  ),
);

export default useWishlistStore;
