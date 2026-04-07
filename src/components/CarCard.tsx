"use client";

import Link from "next/link";
import { Heart } from "lucide-react";
import { Car } from "@/types/car";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore } from "@/store/authStore";
import { Fuel, Gauge, Calendar } from "lucide-react";
import toast from "react-hot-toast";

interface CarCardProps {
  car: Car;
  index?: number;
}

export default function CarCard({ car, index = 0 }: CarCardProps) {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();
  const wishlisted = isInWishlist(car.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAuthenticated) {
      toast.error("Please login to add to wishlist");
      return;
    }
    if (wishlisted) {
      removeFromWishlist(car.id);
      toast.success("Removed from wishlist");
    } else {
      addToWishlist(car.id);
      toast.success("Added to wishlist!");
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
    return `₹${price.toLocaleString("en-IN")}`;
  };

  const formatKm = (km: number) => {
    if (km >= 1000) return `${(km / 1000).toFixed(0)}k km`;
    return `${km} km`;
  };

  return (
    <Link href={`/car/${car.id}`}>
      <div
        className={`car-card group relative bg-card rounded-2xl border border-border overflow-hidden opacity-0 animate-fade-in stagger-${
          (index % 8) + 1
        }`}
      >
        {/* Image */}
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={car.image}
            alt={car.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Badge */}
          {car.badge && (
            <div
              className={`absolute top-3 left-3 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${
                car.badge === "new"
                  ? "bg-success/90 text-white"
                  : "bg-warning/90 text-black"
              }`}
            >
              {car.badge === "new" ? "✨ New" : "🔥 Best Deal"}
            </div>
          )}

          {/* Wishlist Button */}
          <button
            onClick={handleWishlist}
            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
              wishlisted
                ? "bg-danger text-white shadow-lg shadow-danger/30"
                : "bg-black/40 backdrop-blur-sm text-white hover:bg-danger hover:shadow-lg hover:shadow-danger/30"
            }`}
          >
            <Heart
              className={`w-4 h-4 transition-transform duration-300 ${
                wishlisted ? "fill-current scale-110" : "group-hover:scale-110"
              }`}
            />
          </button>

          {/* Price Tag */}
          <div className="absolute bottom-3 left-3">
            <span className="text-xl font-bold text-white drop-shadow-lg">
              {formatPrice(car.price)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="text-base font-bold text-text truncate group-hover:text-primary-hover transition-colors mb-1">
            {car.title}
          </h3>

          <div className="flex items-center gap-1.5 mb-4">
            <span className="text-xs text-text-muted">{car.location}</span>
          </div>

          {/* Specs */}
          <div className="flex items-center justify-between py-6 border-y border-border">
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-text-muted uppercase tracking-widest font-black">Year</span>
              <div className="flex items-center gap-2 text-text-secondary">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold">{car.year}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 border-x border-border px-4 flex-1 items-center">
              <span className="text-[10px] text-text-muted uppercase tracking-widest font-black">KM Driven</span>
              <div className="flex items-center gap-2 text-text-secondary">
                <Gauge className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold">{formatKm(car.kmDriven)}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 pl-4 items-end">
              <span className="text-[10px] text-text-muted uppercase tracking-widest font-black">Fuel</span>
              <div className="flex items-center gap-2 text-text-secondary">
                <Fuel className="w-4 h-4 text-primary" />
                <span className="text-sm font-bold capitalize">{car.fuelType}</span>
              </div>
            </div>
          </div>

          {/* Transmission & Owner Badge */}
          <div className="mt-4 flex items-center gap-2">
            <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-primary-light text-primary-hover capitalize">
              {car.transmission}
            </span>
            <span className="px-3 py-1.5 rounded-lg text-xs font-bold bg-surface text-text-secondary border border-border">
              {car.ownerType} Owner
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
