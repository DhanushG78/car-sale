"use client";

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
        </div>
      </div>
    );
  }

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
    </div>
  );
}
