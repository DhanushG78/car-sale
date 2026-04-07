"use client";

import { create } from "zustand";
import { Car } from "@/types/car";
import { dummyCars } from "@/data/cars";

interface CarState {
  cars: Car[];
  loadCars: () => void;
  addCar: (car: Car) => void;
  removeCar: (id: string) => void;
  updateCar: (id: string, updates: Partial<Car>) => void;
  getUserCars: (userId: string) => Car[];
  getCarById: (id: string) => Car | undefined;
}

export const useCarStore = create<CarState>((set, get) => ({
  cars: [],

  loadCars: () => {
    if (typeof window === "undefined") return;
    const stored = localStorage.getItem("cars_v3");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          set({ cars: parsed });
        } else {
          set({ cars: dummyCars });
          localStorage.setItem("cars_v3", JSON.stringify(dummyCars));
        }
      } catch (e) {
        set({ cars: dummyCars });
        localStorage.setItem("cars_v3", JSON.stringify(dummyCars));
      }
    } else {
      localStorage.setItem("cars_v3", JSON.stringify(dummyCars));
      set({ cars: dummyCars });
    }
  },

  addCar: (car: Car) => {
    const updated = [car, ...get().cars];
    if (typeof window !== "undefined") {
      localStorage.setItem("cars_v3", JSON.stringify(updated));
    }
    set({ cars: updated });
  },

  removeCar: (id: string) => {
    const updated = get().cars.filter((c) => c.id !== id);
    if (typeof window !== "undefined") {
      localStorage.setItem("cars_v3", JSON.stringify(updated));
    }
    set({ cars: updated });
  },

  updateCar: (id: string, updates: Partial<Car>) => {
    const updated = get().cars.map((c) =>
      c.id === id ? { ...c, ...updates } : c
    );
    if (typeof window !== "undefined") {
      localStorage.setItem("cars_v3", JSON.stringify(updated));
    }
    set({ cars: updated });
  },

  getUserCars: (userId: string) => {
    return get().cars.filter((c) => c.sellerId === userId);
  },

  getCarById: (id: string) => {
    return get().cars.find((c) => c.id === id);
  },
}));
