"use client";

import Link from "next/link";
import { useStore } from "@/store/useStore";
import { appConfig } from "@/config/appConfig";
import { Search, Heart, User, Menu, Bell, Car, LogOut } from "lucide-react";

export const Navbar = () => {
  const user = useStore((state) => state.user);
  const setUser = useStore((state) => state.setUser);
  const wishlist = useStore((state) => state.wishlist);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 dark:bg-gray-950/90 backdrop-blur-2xl border-b border-gray-100 dark:border-gray-800 shadow-sm transition-all">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-8">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-4 shrink-0">
            <button className="lg:hidden p-2 text-gray-500 hover:text-black dark:text-gray-400 dark:hover:text-white transition rounded-xl bg-gray-50 dark:bg-gray-900">
              <Menu size={24} />
            </button>
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-xl shadow-blue-500/20 group-hover:scale-110 transition-all duration-300">
                <Car className="w-7 h-7" />
              </div>
              <span className="text-2xl font-[1000] tracking-tighter text-gray-900 dark:text-white hidden sm:block uppercase italic">
                Auto<span className="text-blue-600">Bazaar</span>
              </span>
            </Link>
          </div>

          {/* Nav Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8 font-black text-xs uppercase tracking-widest text-gray-500">
             <Link href="/" className="hover:text-blue-600 transition-colors">Marketplace</Link>
             <Link href="/#browse" className="hover:text-blue-600 transition-colors">Sell Car</Link>
             <Link href="/wishlist" className="hover:text-blue-600 transition-colors flex items-center gap-2">
                Wishlist
                {wishlist.length > 0 && <span className="bg-red-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-[10px]">{wishlist.length}</span>}
             </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden sm:flex h-10 w-px bg-gray-100 dark:bg-gray-800 mx-2"></div>

            {user ? (
              <div className="flex items-center gap-4">
                <Link 
                  href="/profile"
                  className="flex items-center gap-3 p-1 pr-4 rounded-2xl bg-gray-50 dark:bg-gray-900 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all border border-transparent hover:border-blue-100"
                >
                  <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-blue-600 text-white font-black">
                    {user.email[0].toUpperCase()}
                  </div>
                  <div className="hidden lg:flex flex-col items-start leading-none">
                    <span className="text-sm font-black text-gray-900 dark:text-white uppercase tracking-tighter">{user.name?.split(' ')[0] || "Profile"}</span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{user.role}</span>
                  </div>
                </Link>
                
                <button
                  onClick={() => setUser(null)}
                  className="p-3 text-gray-400 hover:text-red-500 transition rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10"
                  title="Logout"
                >
                   <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex gap-3">
                <Link
                  href="/login"
                  className="hidden sm:flex px-6 py-3 text-xs font-black uppercase tracking-widest text-gray-700 hover:text-blue-600 transition"
                >
                  Log in
                </Link>
                <Link
                  href="/login"
                  className="px-6 py-3 text-xs font-black uppercase tracking-widest text-white bg-blue-600 rounded-2xl hover:bg-blue-700 shadow-xl shadow-blue-500/20 transition transform hover:-translate-y-0.5"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};


