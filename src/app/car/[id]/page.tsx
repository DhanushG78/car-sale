"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCarStore } from "@/store/carStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useAuthStore } from "@/store/authStore";
import { Car } from "@/types/car";
import toast from "react-hot-toast";
import {
  Heart,
  Phone,
  Calendar,
  Fuel,
  Gauge,
  Users,
  Palette,
  MapPin,
  ArrowLeft,
  Share2,
  Car as CarIcon,
  Settings,
  Clock,
  CalendarCheck,
  MessageCircle,
} from "lucide-react";

export default function CarDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { cars, loadCars } = useCarStore();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlistStore();
  const { isAuthenticated } = useAuthStore();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCars();
  }, [loadCars]);

  useEffect(() => {
    if (cars.length > 0 && params.id) {
      const found = cars.find((c) => c.id === params.id);
      setCar(found || null);
      setLoading(false);
    }
  }, [cars, params.id]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="aspect-[4/3] skeleton rounded-2xl" />
          <div className="space-y-4">
            <div className="h-8 w-3/4 skeleton" />
            <div className="h-6 w-1/3 skeleton" />
            <div className="space-y-3 mt-8">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-12 skeleton" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div className="w-20 h-20 rounded-2xl bg-surface border border-border flex items-center justify-center mb-6">
          <CarIcon className="w-10 h-10 text-text-muted" />
        </div>
        <h2 className="text-2xl font-bold text-text mb-2">Car Not Found</h2>
        <p className="text-text-muted mb-6">
          The car you&#39;re looking for doesn&#39;t exist or has been removed.
        </p>
        <button
          onClick={() => router.push("/marketplace")}
          className="px-6 py-3 rounded-xl bg-primary text-white font-medium"
        >
          Browse Cars
        </button>
      </div>
    );
  }

  const wishlisted = isInWishlist(car.id);

  const handleWishlist = () => {
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
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Crore`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} Lakh`;
    return `₹${price.toLocaleString("en-IN")}`;
  };

  const specs = [
    { label: "Brand", value: car.brand, icon: CarIcon },
    { label: "Model", value: car.model, icon: Settings },
    { label: "Year", value: car.year.toString(), icon: Calendar },
    { label: "Fuel Type", value: car.fuelType, icon: Fuel },
    { label: "Transmission", value: car.transmission, icon: Gauge },
    {
      label: "KM Driven",
      value: `${car.kmDriven.toLocaleString("en-IN")} km`,
      icon: Gauge,
    },
    { label: "Owner Type", value: `${car.ownerType} Owner`, icon: Users },
    { label: "Color", value: car.color, icon: Palette },
    { label: "Location", value: car.location, icon: MapPin },
    { label: "Listed On", value: new Date(car.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" }), icon: Clock },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-text-secondary hover:text-text mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to results
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        {/* Image Section */}
        <div className="lg:col-span-3 space-y-4">
          <div className="relative rounded-2xl overflow-hidden border border-border">
            <img
              src={car.image}
              alt={car.title}
              className="w-full aspect-[4/3] object-cover"
            />
            {car.badge && (
              <div
                className={`absolute top-4 left-4 px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider ${
                  car.badge === "new"
                    ? "bg-success/90 text-white"
                    : "bg-warning/90 text-black"
                }`}
              >
                {car.badge === "new" ? "✨ New Listing" : "🔥 Best Deal"}
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="text-lg font-bold text-text mb-3">Description</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {car.description}
            </p>
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-2 space-y-5">
          {/* Title & Price */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-text">{car.title}</h1>
                <div className="flex items-center gap-2 mt-2 text-text-secondary">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{car.location}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => toast.success("Link copied!")}
                  className="w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-text transition-all"
                >
                  <Share2 className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <span className="text-3xl font-black gradient-text">
                {formatPrice(car.price)}
              </span>
            </div>
          </div>

          {/* Specs */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="text-lg font-bold text-text mb-4">Specifications</h3>
            <div className="grid grid-cols-2 gap-3">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="flex items-center gap-3 p-3 rounded-xl bg-surface border border-border"
                >
                  <div className="w-8 h-8 rounded-lg bg-primary-light flex items-center justify-center shrink-0">
                    <spec.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-text-muted">{spec.label}</p>
                    <p className="text-sm font-medium text-text capitalize truncate">
                      {spec.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="bg-card rounded-2xl border border-border p-6 space-y-3">
            <h3 className="text-lg font-bold text-text mb-4">Interested?</h3>
            <button
              onClick={handleWishlist}
              className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium text-sm transition-all ${
                wishlisted
                  ? "bg-danger text-white shadow-lg shadow-danger/20"
                  : "bg-surface border border-border text-text hover:border-danger hover:text-danger"
              }`}
            >
              <Heart
                className={`w-4 h-4 ${wishlisted ? "fill-current" : ""}`}
              />
              {wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>

            <button
              onClick={() => toast.success("Seller has been notified!")}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-white font-medium text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all btn-shine"
            >
              <Phone className="w-4 h-4" />
              Contact Seller
            </button>

            <button
              onClick={() => toast.success("Test drive scheduled!")}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface border border-border text-text font-medium text-sm hover:border-primary/40 transition-all"
            >
              <CalendarCheck className="w-4 h-4" />
              Schedule Test Drive
            </button>

            <button
              onClick={() => toast.success("Message sent to seller!")}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-surface border border-border text-text font-medium text-sm hover:border-accent/40 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Send Message
            </button>
          </div>

          {/* Seller Info */}
          <div className="bg-card rounded-2xl border border-border p-6">
            <h3 className="text-lg font-bold text-text mb-4">Seller Info</h3>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg">
                {car.sellerId.slice(-1).toUpperCase()}
              </div>
              <div>
                <p className="font-semibold text-text">Verified Seller</p>
                <p className="text-xs text-text-muted">
                  Member since 2024 • Responds in 1 hour
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
