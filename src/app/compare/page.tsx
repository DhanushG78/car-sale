"use client";

import { useStore } from "@/store/useStore";
import { ArrowLeft, Trash2, Check, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ComparePage() {
  const { compareList, removeFromCompare, clearCompare } = useStore();
  const router = useRouter();

  useEffect(() => {
    if (compareList.length === 0) {
      router.push("/");
    }
  }, [compareList.length, router]);

  if (compareList.length === 0) return null;

  const specs = [
    { label: "Price", key: "price", format: (v: number) => `₹ ${v.toLocaleString()}` },
    { label: "Brand", key: "brand" },
    { label: "Model", key: "model" },
    { label: "Year", key: "year" },
    { label: "Fuel Type", key: "fuelType" },
    { label: "Transmission", key: "transmission" },
    { label: "KM Driven", key: "kmDriven", format: (v: number) => `${v.toLocaleString()} km` },
    { label: "Owner Type", key: "ownerType" },
    { label: "Location", key: "location" },
  ];

  // Helper to check if a value is the "best" (e.g. lowest price, lowest KM, newest year)
  const isBestValue = (specKey: string, value: any, itemIndex: number) => {
    if (compareList.length < 2) return false;
    
    if (specKey === 'price') {
      const prices = compareList.map(c => c.price);
      return value === Math.min(...prices);
    }
    if (specKey === 'kmDriven') {
      const kms = compareList.map(c => Number(c.kmDriven));
      return value === Math.min(...kms);
    }
    if (specKey === 'year') {
      const years = compareList.map(c => c.year);
      return value === Math.max(...years);
    }
    return false;
  };

  // Helper to check if values are different across cars
  const hasDifference = (specKey: string) => {
    const values = compareList.map(c => (c as any)[specKey]);
    return new Set(values).size > 1;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/"
              className="p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </Link>
            <h1 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tight">Compare <span className="text-blue-600">Cars</span></h1>
          </div>
          <button 
            onClick={clearCompare}
            className="flex items-center gap-2 text-xs font-black text-red-500 uppercase tracking-widest hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 mt-12">
        <div className="overflow-x-auto pb-8 scrollbar-hide">
          <div className="inline-flex min-w-full gap-6">
            
            {/* Spec Labels Column */}
            <div className="flex-shrink-0 w-48 mt-[260px] space-y-0">
               {specs.map((spec) => (
                 <div 
                   key={spec.label} 
                   className="h-20 flex items-center pr-6 text-sm font-black uppercase tracking-widest text-gray-400 border-b border-gray-100 dark:border-gray-800/50"
                 >
                   {spec.label}
                 </div>
               ))}
            </div>

            {/* Car Columns */}
            {compareList.map((car, idx) => (
              <div 
                key={car.id} 
                className="flex-shrink-0 w-72 bg-white dark:bg-gray-900 rounded-[2.5rem] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden"
              >
                {/* Car Preview Card Header */}
                <div className="relative h-48 w-full group">
                   <img 
                      src={car.image} 
                      alt={car.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                   <button 
                      onClick={() => removeFromCompare(car.id)}
                      className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 backdrop-blur-md rounded-full text-white transition-all shadow-lg"
                   >
                     <X className="w-4 h-4" />
                   </button>
                   <div className="absolute bottom-4 left-6 right-6">
                      <h2 className="text-white font-black text-xl line-clamp-1">{car.title}</h2>
                   </div>
                </div>

                {/* Specs */}
                <div className="p-0">
                  {specs.map((spec) => {
                    const value = (car as any)[spec.key];
                    const diff = hasDifference(spec.key);
                    const isBest = isBestValue(spec.key, value, idx);

                    return (
                      <div 
                        key={spec.key} 
                        className={`h-20 px-8 flex items-center border-b border-gray-50 dark:border-gray-800/50 transition-colors ${diff ? 'bg-gray-50/30 dark:bg-gray-800/10' : ''}`}
                      >
                        <div className="flex flex-col">
                          <span className={`font-black text-lg ${isBest ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-gray-100'} transition-all`}>
                            {spec.format ? spec.format(value) : value}
                          </span>
                          {isBest && (
                             <span className="text-[9px] font-black uppercase tracking-widest text-blue-500 flex items-center gap-1">
                               <Check className="w-3 h-3" /> Best Value
                             </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Footer Action */}
                <div className="p-6">
                  <Link 
                    href={`/cars/${car.id}`}
                    className="block w-full bg-gray-900 dark:bg-white text-white dark:text-black py-4 rounded-2xl text-center font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}

            {/* Empty Slots if < 3 */}
            {compareList.length < 3 && (
               <div className="flex-shrink-0 w-72 rounded-[2.5rem] border-2 border-dashed border-gray-200 dark:border-gray-800 flex flex-col items-center justify-center p-8 bg-gray-50/50 dark:bg-gray-900/10 h-max min-h-[500px]">
                  <div className="w-16 h-16 rounded-full bg-white dark:bg-gray-800 flex items-center justify-center mb-6 shadow-md shadow-gray-200/50 dark:shadow-none">
                    <X className="w-8 h-8 text-gray-200 dark:text-gray-700 rotate-45" />
                  </div>
                  <h3 className="text-lg font-black text-gray-400 uppercase tracking-widest text-center mb-2">Available Slot</h3>
                  <p className="text-gray-400 text-xs text-center font-bold mb-8">Add one more car to compare side-by-side</p>
                  <Link 
                    href="/" 
                    className="px-8 py-3 bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:border-blue-500 transition-colors"
                  >
                    Add Car
                  </Link>
               </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
