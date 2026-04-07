"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useCarStore } from "@/store/carStore";
import { Car } from "@/types/car";
import Link from "next/link";
import toast from "react-hot-toast";
import {
  Car as CarIcon,
  Plus,
  Trash2,
  Edit,
  Eye,
  Calendar,
  IndianRupee,
  MapPin,
} from "lucide-react";

export default function MyListingsPage() {
  const router = useRouter();
  const { user, isAuthenticated, loadSession } = useAuthStore();
  const { cars, loadCars, removeCar } = useCarStore();
  const [mounted, setMounted] = useState(false);
  const [listings, setListings] = useState<Car[]>([]);

  useEffect(() => {
    loadSession();
    loadCars();
    setMounted(true);
  }, [loadSession, loadCars]);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/login");
    }
  }, [mounted, isAuthenticated, router]);

  useEffect(() => {
    if (user && cars.length > 0) {
      setListings(cars.filter((c) => c.sellerId === user.id));
    }
  }, [user, cars]);

  const handleDelete = (id: string, title: string) => {
    if (confirm(`Delete "${title}"?`)) {
      removeCar(id);
      setListings((prev) => prev.filter((c) => c.id !== id));
      toast.success("Listing deleted");
    }
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(2)} Cr`;
    if (price >= 100000) return `₹${(price / 100000).toFixed(2)} L`;
    return `₹${price.toLocaleString("en-IN")}`;
  };

  if (!mounted || !isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-24 skeleton rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-text mb-2">My Listings</h1>
          <p className="text-text-secondary">
            {listings.length} car{listings.length !== 1 ? "s" : ""} listed
          </p>
        </div>
        <Link
          href="/sell"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-white font-medium text-sm shadow-lg shadow-primary/25 btn-shine"
        >
          <Plus className="w-4 h-4" />
          Add New
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 rounded-2xl bg-surface border border-border flex items-center justify-center mb-6">
            <CarIcon className="w-10 h-10 text-text-muted" />
          </div>
          <h3 className="text-xl font-bold text-text mb-2">
            No listings yet
          </h3>
          <p className="text-sm text-text-muted max-w-sm mb-6">
            Start selling your car by creating your first listing.
          </p>
          <Link
            href="/sell"
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-white font-medium text-sm shadow-lg shadow-primary/25"
          >
            List Your First Car
          </Link>
        </div>
      ) : (
        <div className="space-y-4">
          {listings.map((car, i) => (
            <div
              key={car.id}
              className={`flex flex-col sm:flex-row items-start gap-4 bg-card rounded-2xl border border-border p-4 hover:border-primary/30 transition-all opacity-0 animate-fade-in stagger-${
                (i % 8) + 1
              }`}
            >
              {/* Image */}
              <div className="w-full sm:w-40 h-28 rounded-xl overflow-hidden shrink-0">
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-base font-semibold text-text truncate">
                      {car.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 flex-wrap">
                      <span className="flex items-center gap-1 text-xs text-text-secondary">
                        <IndianRupee className="w-3 h-3" />
                        {formatPrice(car.price)}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-text-secondary">
                        <Calendar className="w-3 h-3" />
                        {car.year}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-text-secondary">
                        <MapPin className="w-3 h-3" />
                        {car.location}
                      </span>
                    </div>
                  </div>

                  {car.badge && (
                    <span
                      className={`px-2 py-1 rounded-lg text-xs font-bold shrink-0 ${
                        car.badge === "new"
                          ? "bg-success-light text-success"
                          : "bg-warning-light text-warning"
                      }`}
                    >
                      {car.badge === "new" ? "New" : "Best Deal"}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-4">
                  <Link
                    href={`/car/${car.id}`}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface border border-border text-xs font-medium text-text-secondary hover:text-text hover:border-primary/40 transition-all"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    View
                  </Link>
                  <button
                    onClick={() => handleDelete(car.id, car.title)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-surface border border-border text-xs font-medium text-danger hover:bg-danger-light hover:border-danger/40 transition-all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
