"use client";

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
    </div>
  );
}
