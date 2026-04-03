import Link from "next/link";
import { Search } from "lucide-react";
import { useStore } from "@/store/useStore";

import { useState, useEffect } from "react";

export const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const isSeller = useStore((state) => state.isSeller());

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative isolate overflow-hidden bg-white dark:bg-gray-950 pt-16">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=2000"
          alt="Car background"
          className="h-full w-full object-cover opacity-10 dark:opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white/80 to-white dark:from-gray-950 dark:via-gray-950/80 dark:to-gray-950" />
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8 flex flex-col items-center text-center relative">
        <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-black uppercase tracking-widest mb-8 border border-blue-100 dark:border-blue-800/30">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Trusted by 1M+ Drivers
        </div>

        <h1 className="text-6xl font-[1000] tracking-tighter text-gray-900 dark:text-white sm:text-8xl mb-8 leading-[0.9]">
          Find Your Perfect <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-500">
            Used Car 🚗
          </span>
        </h1>

        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mb-12 font-medium">
          The most reliable platform to buy and sell certified pre-owned cars. 
          Expert inspections, instant valuation, and paperless transfers.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 w-full max-w-lg">
          <Link
            href="#browse"
            className="group relative flex items-center justify-center gap-3 rounded-2xl bg-blue-600 text-white px-10 py-5 text-lg font-black shadow-2xl shadow-blue-500/25 hover:bg-blue-700 transition-all duration-300 hover:-translate-y-1 active:scale-95 w-full text-center"
          >
            <Search className="w-5 h-5 flex-shrink-0" />
            Browse Cars
          </Link>
          {mounted && !isSeller && (
            <Link 
              href="/login" 
              className="group flex items-center justify-center gap-3 text-lg font-black text-gray-900 dark:text-white px-10 py-5 rounded-2xl border-2 border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all w-full text-center"
            >
              Sell Your Car
              <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">&rarr;</span>
            </Link>
          )}
        </div>




        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16 border-t border-gray-100 dark:border-gray-800/50 w-full">
           {[
             { label: "Cars Listed", value: "25k+" },
             { label: "Happy Sellers", value: "10k+" },
             { label: "Years Experience", value: "12+" },
             { label: "Cities Covered", value: "50+" }
           ].map((stat, i) => (
             <div key={i} className="flex flex-col gap-1">
               <span className="text-3xl font-black text-gray-900 dark:text-white">{stat.value}</span>
               <span className="text-xs font-black uppercase tracking-widest text-gray-400">{stat.label}</span>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

