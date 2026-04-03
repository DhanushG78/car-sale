import { create } from "zustand";
import { persist } from "zustand/middleware";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "seller" | "buyer" | "admin";
};

type Store = {
  user: User | null;
  setUser: (user: User | null) => void;
  wishlist: string[]; // Car IDs
  addToWishlist: (carId: string) => void;
  removeFromWishlist: (carId: string) => void;
  toggleWishlist: (carId: string) => void;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      user: {
        id: "user-123",
        name: "John Doe",
        email: "john@example.com",
        role: "seller",
      }, // Default logged in for demo
      setUser: (user) => set({ user }),
      wishlist: [],
      addToWishlist: (carId) => 
        set((state) => ({ 
          wishlist: state.wishlist.includes(carId) ? state.wishlist : [...state.wishlist, carId] 
        })),
      removeFromWishlist: (carId) => 
        set((state) => ({ 
          wishlist: state.wishlist.filter((id) => id !== carId) 
        })),
      toggleWishlist: (carId) =>
        set((state) => ({
          wishlist: state.wishlist.includes(carId)
            ? state.wishlist.filter((id) => id !== carId)
            : [...state.wishlist, carId]
        })),
    }),
    {
      name: "autobazaar-store",
    }
  )
);

