"use client";

<<<<<<< HEAD
import { useEffect, useState } from "react";
import { useCarStore } from "@/store/carStore";
import { useWishlistStore } from "@/store/wishlistStore";
import CarCard from "@/components/CarCard";
import SkeletonCard from "@/components/SkeletonCard";
import { Heart, Trash2 } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { cars, loadCars } = useCarStore();
  const { wishlist, loadWishlist, clearWishlist } = useWishlistStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCars();
    loadWishlist();
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [loadCars, loadWishlist]);

  const wishlistCars = cars.filter((c) => wishlist.includes(c.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">My Wishlist</h1>
          <p className="text-text-secondary">
            {wishlistCars.length} car{wishlistCars.length !== 1 ? "s" : ""} saved
          </p>
        </div>
        {wishlistCars.length > 0 && (
          <button
            onClick={clearWishlist}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-danger hover:bg-danger-light transition-all"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        )}
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 4 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : wishlistCars.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-2xl bg-surface border border-border flex items-center justify-center mb-6">
            <Heart className="w-10 h-10 text-text-muted" />
          </div>
          <h3 className="text-xl font-bold text-text mb-2">
            Your wishlist is empty
          </h3>
          <p className="text-sm text-text-muted max-w-sm mb-6">
            Start browsing cars and save your favorites here for quick access later.
          </p>
          <Link
            href="/marketplace"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-white font-medium text-sm shadow-lg shadow-primary/25"
          >
            Browse Cars
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {wishlistCars.map((car, i) => (
            <CarCard key={car.id} car={car} index={i} />
          ))}
        </div>
      )}
=======
import { useStore } from "@/store/useStore";
import { ItemCard } from "@/components/ui/ItemCard";
import { useItems } from "@/modules/items";
import { Heart, ArrowLeft, Search } from "lucide-react";
import Link from "next/link";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const { items, loading } = useItems();

  const wishlistedItems = items.filter(item => wishlist.includes(item.id));

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <header className="max-w-7xl mx-auto px-6 py-16 flex flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-black text-gray-500 uppercase tracking-widest hover:text-black dark:hover:text-white transition">
           <ArrowLeft className="w-4 h-4" /> Back to explore
        </Link>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Heart className="w-8 h-8 text-red-500 fill-current" />
            <h1 className="text-4xl font-black text-gray-900 dark:text-white">My Wishlist</h1>
          </div>
          <p className="text-gray-500 font-medium">{wishlistedItems.length} cars saved for later</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-32">
        {loading ? (
           <div className="py-24 flex flex-col items-center justify-center">
             <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
           </div>
        ) : wishlistedItems.length === 0 ? (
           <div className="py-24 flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-gray-900/50 rounded-[3rem] border border-gray-100 dark:border-gray-800 p-12">
             <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mb-8 shadow-xl">
               <Heart className="w-10 h-10 text-gray-200" />
             </div>
             <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">Your wishlist is empty</h2>
             <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-10 font-medium">Save cars you love while browsing to keep track of them here.</p>
             <Link href="/#browse" className="bg-black dark:bg-white text-white dark:text-black px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform">
               Browse Cars
             </Link>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistedItems.map(car => (
              <ItemCard key={car.id} item={car} />
            ))}
          </div>
        )}
      </main>
>>>>>>> a1a6ea26ca54eab8c6546f91c2993b340edb4007
    </div>
  );
}
