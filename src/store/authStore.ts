"use client";

import { create } from "zustand";
import { User } from "@/types/car";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  loadSession: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  login: (email: string, password: string) => {
    if (typeof window === "undefined") return false;
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const found = users.find(
      (u) => u.email === email && u.password === password
    );
    if (found) {
      localStorage.setItem("currentUser", JSON.stringify(found));
      set({ user: found, isAuthenticated: true });
      return true;
    }
    return false;
  },

  register: (name: string, email: string, password: string) => {
    if (typeof window === "undefined") return false;
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    if (users.find((u) => u.email === email)) return false;

    const newUser: User = {
      id: `user-${Date.now()}`,
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(newUser));
    set({ user: newUser, isAuthenticated: true });
    return true;
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("currentUser");
    }
    set({ user: null, isAuthenticated: false });
  },

  loadSession: () => {
    if (typeof window === "undefined") return;
    const saved = localStorage.getItem("currentUser");
    if (saved) {
      const user = JSON.parse(saved);
      set({ user, isAuthenticated: true });
    }
  },
}));
