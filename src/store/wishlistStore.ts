"use client";

import { create } from "zustand";

interface WishlistState {
  wishlist: string[];
  loadWishlist: () => void;
  addToWishlist: (carId: string) => void;
  removeFromWishlist: (carId: string) => void;
  isInWishlist: (carId: string) => boolean;
  clearWishlist: () => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: [],

  loadWishlist: () => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("wishlist");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          set({ wishlist: parsed });
        } else {
          set({ wishlist: [] });
        }
      } catch (e) {
        set({ wishlist: [] });
      }
    }
  },

  addToWishlist: (carId: string) => {
    const current = get().wishlist;
    if (current.includes(carId)) return;
    const updated = [...current, carId];
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(updated));
    }
    set({ wishlist: updated });
  },

  removeFromWishlist: (carId: string) => {
    const updated = get().wishlist.filter((id) => id !== carId);
    if (typeof window !== "undefined") {
      localStorage.setItem("wishlist", JSON.stringify(updated));
    }
    set({ wishlist: updated });
  },

  isInWishlist: (carId: string) => {
    return get().wishlist.includes(carId);
  },

  clearWishlist: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("wishlist");
    }
    set({ wishlist: [] });
  },
}));
