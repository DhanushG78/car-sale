import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Car } from "@/modules/items/types";
import { dummyCars } from "@/data/cars";

export type User = {
  id: string;
  name: string;
  email: string;
  role: "buyer" | "seller" | "admin";
  createdAt: string;
};

type Store = {
  // Auth state
  user: User | null;
  setUser: (user: User | null) => void;
  getUserRole: () => "buyer" | "seller" | "admin" | null;
  isSeller: () => boolean;
  isBuyer: () => boolean;

  // Car state
  cars: Car[];
  setCars: (cars: Car[]) => void;
  addCar: (car: Car) => void;
  updateCar: (car: Car) => void;
  deleteCar: (id: string) => void;

  // Wishlist state
  wishlist: string[]; // Car IDs
  addToWishlist: (carId: string) => void;
  removeFromWishlist: (carId: string) => void;
  toggleWishlist: (carId: string) => void;
};

export const useStore = create<Store>()(
  persist(
    (set, get) => ({
      // Auth implementation
      user: null,
      setUser: (user) => set({ user }),
      getUserRole: () => get().user?.role || null,
      isSeller: () => get().user?.role === "seller" || get().user?.role === "admin",
      isBuyer: () => get().user?.role === "buyer",

      // Cars implementation
      cars: dummyCars, // Initial data from file
      setCars: (cars) => set({ cars }),
      addCar: (car) => set((state) => ({ cars: [car, ...state.cars] })),
      updateCar: (car) => set((state) => ({ 
        cars: state.cars.map((c) => (c.id === car.id ? car : c)) 
      })),
      deleteCar: (id) => set((state) => ({ 
        cars: state.cars.filter((c) => c.id !== id) 
      })),

      // Wishlist implementation
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



