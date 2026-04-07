"use client";

<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useCarStore } from "@/store/carStore";
import { useWishlistStore } from "@/store/wishlistStore";
import Link from "next/link";
import {
  User,
  Mail,
  Calendar,
  Car,
  Heart,
  Settings,
  ChevronRight,
  LogOut,
  Shield,
  Edit,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, loadSession } = useAuthStore();
  const { cars, loadCars } = useCarStore();
  const { wishlist, loadWishlist } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    loadSession();
    loadCars();
    loadWishlist();
    setMounted(true);
  }, [loadSession, loadCars, loadWishlist]);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/login");
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !isAuthenticated || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          <div className="h-32 skeleton rounded-2xl" />
          <div className="h-48 skeleton rounded-2xl" />
=======
import { useStore } from "@/store/useStore";
import { useItems } from "@/modules/items";
import { User, Mail, Shield, Car, Heart, LogOut, Settings, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ProfilePage() {
  const [mounted, setMounted] = useState(false);
  const { user, setUser, wishlist } = useStore();
  const { items } = useItems();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 px-6 text-center">
        <div className="flex flex-col gap-6">
          <h1 className="text-4xl font-black text-gray-900 dark:text-white">Please login to view profile</h1>
          <Link href="/login" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs">
            Go to Login
          </Link>
>>>>>>> a1a6ea26ca54eab8c6546f91c2993b340edb4007
        </div>
      </div>
    );
  }

<<<<<<< HEAD
  const userListings = cars.filter((c) => c.sellerId === user.id).length;

  const menuItems = [
    {
      label: "My Listings",
      desc: `${userListings} cars listed`,
      icon: Car,
      href: "/my-listings",
      color: "text-primary",
      bg: "bg-primary-light",
    },
    {
      label: "Wishlist",
      desc: `${wishlist.length} cars saved`,
      icon: Heart,
      href: "/wishlist",
      color: "text-danger",
      bg: "bg-danger-light",
    },
    {
      label: "Sell a Car",
      desc: "List a new car",
      icon: Edit,
      href: "/sell",
      color: "text-success",
      bg: "bg-success-light",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Profile Card */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/30 to-accent/30 relative">
          <div className="absolute -bottom-10 left-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold border-4 border-background shadow-xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        <div className="pt-14 pb-6 px-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text">{user.name}</h1>
              <div className="flex items-center gap-2 mt-2 text-text-secondary">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-text-muted">
                <Calendar className="w-4 h-4" />
                <span className="text-xs">
                  Member since{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-IN", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success-light text-success text-xs font-medium">
              <Shield className="w-3.5 h-3.5" />
              Verified
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {[
          { label: "Listed Cars", value: userListings, icon: Car },
          { label: "Wishlist", value: wishlist.length, icon: Heart },
          { label: "Views", value: "—", icon: User },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-2xl border border-border p-5 text-center"
          >
            <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-text">{stat.value}</p>
            <p className="text-xs text-text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="bg-card rounded-2xl border border-border mt-6 overflow-hidden divide-y divide-border">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center justify-between px-6 py-4 hover:bg-surface-hover transition-all group"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-text">{item.label}</p>
                <p className="text-xs text-text-muted">{item.desc}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-text group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          logout();
          router.push("/");
        }}
        className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-danger/20 text-danger hover:bg-danger-light font-medium text-sm transition-all"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
=======
  const myListingCount = items.filter(car => car.sellerId === user.id || car.sellerId === 'admin').length;

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen pb-32">
      <header className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-8 text-left">
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-blue-600 flex items-center justify-center text-5xl font-black text-white shadow-2xl shadow-blue-500/30">
            {user.name?.[0] || user.email[0].toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-black text-gray-900 dark:text-white leading-none">{user.name}</h1>
              <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-blue-100 dark:border-blue-800/30">
                {user.role} Account
              </span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium">
                <Mail className="w-4 h-4 text-blue-500" />
                {user.email}
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 font-medium">
                <Shield className="w-4 h-4 text-green-500" />
                Verified Seller
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => setUser(null)}
          className="flex items-center gap-3 px-8 py-4 rounded-2xl bg-red-50 hover:bg-red-100 text-red-600 font-black uppercase tracking-widest text-xs transition-colors"
        >
          <LogOut className="w-4 h-4" /> Sign out
        </button>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
           <Link href="/my-listings" className="group p-8 rounded-[2.5rem] bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 hover:border-blue-500 transition-all shadow-sm">
             <div className="flex items-center justify-between">
                <div className="flex flex-col gap-4">
                   <div className="w-14 h-14 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform">
                      <Car className="w-8 h-8" />
                   </div>
                   <div>
                     <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">My Activity</p>
                     <h3 className="text-3xl font-black text-gray-900 dark:text-white">{myListingCount} Cars Listed</h3>
                   </div>
                </div>
                <ChevronRight className="w-8 h-8 text-gray-300 group-hover:translate-x-2 transition-transform" />
             </div>
           </Link>

           <Link href="/wishlist" className="group p-8 rounded-[2.5rem] bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 hover:border-red-500 transition-all shadow-sm">
             <div className="flex items-center justify-between">
                <div className="flex flex-col gap-4">
                   <div className="w-14 h-14 bg-red-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/20 group-hover:scale-110 transition-transform">
                      <Heart className="w-8 h-8" />
                   </div>
                   <div>
                     <p className="text-sm font-black text-gray-400 uppercase tracking-widest mb-1">Favorites</p>
                     <h3 className="text-3xl font-black text-gray-900 dark:text-white">{wishlist.length} Saved Cars</h3>
                   </div>
                </div>
                <ChevronRight className="w-8 h-8 text-gray-300 group-hover:translate-x-2 transition-transform" />
             </div>
           </Link>
        </div>

        <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="flex items-center gap-3 mb-8">
            <Settings className="w-6 h-6 text-gray-900 dark:text-white" />
            <h3 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Account Settings</h3>
          </div>
          
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
             <SettingRow label="Personal Information" desc="Update your name and email preferences" />
             <SettingRow label="Security" desc="Password reset and two-factor authentication" />
             <SettingRow label="Payments" desc="Manage your bank accounts and transaction history" />
             <SettingRow label="Preferences" desc="Currency, language, and display modes" />
          </div>
        </div>
      </main>
    </div>
  );
}

function SettingRow({ label, desc }: { label: string, desc: string }) {
  return (
    <div className="py-6 flex items-center justify-between group cursor-pointer">
      <div className="flex flex-col">
        <span className="font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors uppercase tracking-widest text-[10px] sm:text-xs">{label}</span>
        <span className="text-xs sm:text-sm text-gray-500 font-medium">{desc}</span>
      </div>
      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:translate-x-1 transition-transform" />
>>>>>>> a1a6ea26ca54eab8c6546f91c2993b340edb4007
    </div>
  );
}
