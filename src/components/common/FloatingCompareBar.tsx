"use client";

import { useStore } from "@/store/useStore";
import { ArrowRight, X, ArrowLeftRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export const FloatingCompareBar = () => {
  const { compareList, removeFromCompare, clearCompare } = useStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (compareList.length > 0) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  }, [compareList.length]);

  if (!isVisible || compareList.length === 0) return null;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-[min(90%,600px)]">
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 shadow-2xl rounded-[2.5rem] p-4 flex items-center justify-between gap-6 overflow-hidden">
        
        {/* Selected Cars Thumbnails */}
        <div className="flex items-center gap-3">
          <div className="flex -space-x-3">
            {compareList.map((car) => (
              <div 
                key={car.id} 
                className="relative group h-12 w-12 rounded-2xl overflow-hidden border-2 border-white dark:border-gray-900 shadow-lg"
              >
                <img 
                  src={car.image} 
                  alt={car.title} 
                  className="h-full w-full object-cover"
                />
                <button 
                  onClick={() => removeFromCompare(car.id)}
                  className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            ))}
            {[...Array(3 - compareList.length)].map((_, i) => (
              <div 
                key={`empty-${i}`} 
                className="h-12 w-12 rounded-2xl border-2 border-dashed border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center text-gray-300 dark:text-gray-600"
              >
                <ArrowLeftRight className="w-4 h-4" />
              </div>
            ))}
          </div>
          
          <div className="hidden sm:block">
            <p className="text-sm font-black text-gray-900 dark:text-white">
              {compareList.length} {compareList.length === 1 ? 'Car' : 'Cars'} Selected
            </p>
            <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
              {compareList.length < 2 ? "Select 1 more to compare" : "Ready to compare"}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button 
            onClick={clearCompare}
            className="hidden sm:block text-xs font-black text-gray-500 hover:text-red-500 uppercase tracking-widest px-4 transition-colors"
          >
            Clear
          </button>
          
          <Link 
            href={compareList.length >= 2 ? "/compare" : "#"}
            className={`flex items-center gap-2 px-6 py-3.5 rounded-[1.5rem] font-black uppercase tracking-widest text-[10px] transition-all ${
              compareList.length >= 2 
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:scale-105" 
                : "bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
            }`}
            onClick={(e) => {
              if (compareList.length < 2) {
                e.preventDefault();
                alert("Please select at least 2 cars to compare.");
              }
            }}
          >
            Compare Now
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </div>
  );
};
