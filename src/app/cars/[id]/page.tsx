"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { itemService } from "@/modules/items/services/item.service";
import { Car } from "@/modules/items/types";
import { useStore } from "@/store/useStore";
import { Heart, MapPin, Calendar, Gauge, Fuel, ShieldCheck, ArrowLeft, MessageCircle, Share2, ClipboardList } from "lucide-react";
import Link from "next/link";

export default function CarDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const { toggleWishlist, wishlist } = useStore();

  useEffect(() => {
    const fetchCar = async () => {
      if (typeof id === 'string') {
        const data = await itemService.getItemById(id);
        setCar(data);
      }
      setLoading(false);
    };
    fetchCar();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-950">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!car) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-950 px-6 text-center">
      <h1 className="text-4xl font-black text-gray-900 dark:text-white mb-4">Car Not Found</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">The car you're looking for might have been sold or removed.</p>
      <Link href="/" className="bg-blue-600 text-white px-8 py-3 rounded-2xl font-bold shadow-lg shadow-blue-500/20">
        Back to Marketplace
      </Link>
    </div>
  );

  const isWishlisted = wishlist.includes(car.id);

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen pb-24">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-black dark:hover:text-white transition mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to listings
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column: Image Area */}
          <div className="space-y-6">
            <div className="relative rounded-[2.5rem] overflow-hidden bg-gray-100 dark:bg-gray-900 shadow-2xl">
              <img 
                src={car.image} 
                alt={car.title} 
                className="w-full h-auto object-cover aspect-[4/3] transform hover:scale-105 transition-transform duration-700" 
              />
              <button 
                onClick={() => toggleWishlist(car.id)}
                className={`absolute top-6 right-6 p-4 rounded-full backdrop-blur-xl transition-all ${
                  isWishlisted ? "bg-red-500 text-white shadow-xl shadow-red-500/30" : "bg-white/80 dark:bg-black/40 text-gray-900 dark:text-white hover:bg-red-50"
                }`}
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
              
              {car.status === 'sold' && (
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center">
                   <div className="bg-red-600 text-white text-4xl font-black uppercase tracking-[0.2em] px-12 py-4 rounded-2xl rotate-[-5deg] shadow-2xl">
                      Sold Out
                   </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-4 gap-4">
               {[1,2,3,4].map(i => (
                 <div key={i} className="aspect-square rounded-2xl bg-gray-100 dark:bg-gray-900 overflow-hidden cursor-pointer hover:ring-4 ring-blue-500 transition-all opacity-50 hover:opacity-100">
                    <img src={car.image} className="w-full h-full object-cover" />
                 </div>
               ))}
            </div>
          </div>

          {/* Right Column: Details Area */}
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full border border-blue-100 dark:border-blue-800/30">
                {car.brand} {car.model}
              </span>
              <span className="bg-gray-50 dark:bg-gray-800/50 text-gray-500 dark:text-gray-400 text-xs font-black uppercase tracking-widest px-3 py-1.5 rounded-full">
                {car.year} Model
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-white mb-4 leading-tight">
              {car.title}
            </h1>

            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-8 font-medium">
              <MapPin className="w-5 h-5 text-red-500" />
              {car.location}
            </div>

            <div className="bg-gray-50 dark:bg-gray-900/50 rounded-[2.5rem] p-8 border border-gray-100 dark:border-gray-800/50 mb-8">
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-4xl font-black text-gray-900 dark:text-white font-mono">₹{Number(car.price).toLocaleString()}</span>
                <span className="text-gray-400 font-bold uppercase tracking-wider text-xs">Ex-Showroom Price</span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button className="flex items-center justify-center gap-2 bg-blue-600 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-500/25 hover:bg-blue-700 transition">
                  <MessageCircle className="w-4 h-4" /> Contact Seller
                </button>
                <button className="flex items-center justify-center gap-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-100 dark:border-gray-700 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gray-50 transition">
                  <ClipboardList className="w-4 h-4" /> Compare
                </button>
              </div>
            </div>

            {/* Spec Highlights Grid */}
            <div className="grid grid-cols-3 gap-4 mb-12">
               <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center gap-2">
                 <Calendar className="w-6 h-6 text-blue-500" />
                 <span className="text-xs font-black uppercase tracking-widest text-gray-400">Year</span>
                 <span className="font-bold text-gray-900 dark:text-white">{car.year}</span>
               </div>
               <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center gap-2">
                 <Gauge className="w-6 h-6 text-green-500" />
                 <span className="text-xs font-black uppercase tracking-widest text-gray-400">Distance</span>
                 <span className="font-bold text-gray-900 dark:text-white">{Number(car.kmDriven).toLocaleString()} km</span>
               </div>
               <div className="bg-white dark:bg-gray-900 p-5 rounded-3xl border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col items-center text-center gap-2">
                 <Fuel className="w-6 h-6 text-orange-500" />
                 <span className="text-xs font-black uppercase tracking-widest text-gray-400">Fuel</span>
                 <span className="font-bold text-gray-900 dark:text-white">{car.fuelType}</span>
               </div>
            </div>

            {/* Full Specs Section */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <ShieldCheck className="w-6 h-6 text-blue-600" />
                <h3 className="text-2xl font-black text-gray-900 dark:text-white">Technical Specifications</h3>
              </div>

              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-[2rem] border border-gray-100 dark:border-gray-800/50 overflow-hidden">
                <div className="grid grid-cols-2 divide-x divide-y divide-gray-100 dark:divide-gray-800">
                  <SpecItem label="Transmission" value={car.transmission} />
                  <SpecItem label="Owner Type" value={car.ownerType} />
                  <SpecItem label="Fuel Type" value={car.fuelType} />
                  <SpecItem label="Color" value={car.color} />
                  <SpecItem label="Location" value={car.location} />
                  <SpecItem label="Status" value={car.status.toUpperCase()} />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Description</h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed font-medium">
                {car.description}
              </p>
            </div>

            <div className="mt-12 pt-8 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 font-bold">JD</div>
                  <div>
                    <p className="text-sm font-black text-gray-900 dark:text-white">John Doe</p>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Verified Seller</p>
                  </div>
               </div>
               <button className="p-3 rounded-xl bg-gray-50 dark:bg-gray-900 text-gray-400 hover:text-blue-600 transition">
                  <Share2 className="w-6 h-6" />
               </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

function SpecItem({ label, value }: { label: string, value: string | number }) {
  return (
    <div className="p-6 flex flex-col gap-1">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">{label}</span>
      <span className="font-black text-gray-900 dark:text-gray-100">{value}</span>
    </div>
  );
}
