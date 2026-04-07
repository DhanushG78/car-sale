"use client";

<<<<<<< HEAD
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
=======
import { useItems, ItemForm } from "@/modules/items";
import { ItemCard } from "@/components/ui/ItemCard";
import { useStore } from "@/store/useStore";
import { Car, Plus, ArrowLeft, MoreVertical, X } from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function MyListingsPage() {
  const [mounted, setMounted] = useState(false);
  const { items, loading, fetchItems, deleteItem } = useItems();
  const [editingItem, setEditingItem] = useState<any>(null);
  const { user } = useStore();
  const isSeller = useStore((state) => state.isSeller());
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !loading && !isSeller) {
      router.push("/");
    }
  }, [isSeller, loading, router, mounted]);

  if (!mounted || !isSeller) return null;

  const myCars = items.filter(car => car.sellerId === user?.id || car.sellerId === 'admin');

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <header className="max-w-7xl mx-auto px-6 py-16 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <Link href="/profile" className="flex items-center gap-2 text-sm font-black text-gray-500 uppercase tracking-widest hover:text-black dark:hover:text-white transition mb-4">
             <ArrowLeft className="w-4 h-4" /> Back to profile
          </Link>
          <h1 className="text-4xl font-black text-gray-900 dark:text-white">My Listings</h1>
          <p className="text-gray-500 font-medium">Manage and monitor your active car listings</p>
        </div>
        
        <Link 
          href="/#browse" 
          className="flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 hover:scale-105 transition-all"
        >
          <Plus className="w-5 h-5" /> Add New Car
        </Link>
      </header>

      <main className="max-w-7xl mx-auto px-6 pb-32">
        {editingItem && (
          <section className="mb-12 bg-blue-50/50 dark:bg-blue-900/10 p-8 rounded-[2.5rem] border-2 border-dashed border-blue-200 dark:border-blue-800/50">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100">Editing Listing</h2>
              <button onClick={() => setEditingItem(null)} className="flex items-center gap-2 text-sm font-black text-red-600 uppercase tracking-widest">
                 <X className="w-4 h-4" /> Cancel
              </button>
            </div>
            <ItemForm 
              key={editingItem.id} 
              initialData={editingItem} 
              onSuccess={() => {
                setEditingItem(null);
                fetchItems();
              }} 
            />
          </section>
        )}

        {loading ? (
           <div className="py-24 flex flex-col items-center justify-center">
             <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
           </div>
        ) : myCars.length === 0 ? (
           <div className="py-24 flex flex-col items-center justify-center text-center bg-gray-50 dark:bg-gray-900/50 rounded-[3rem] border border-gray-100 dark:border-gray-800 p-12">
             <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mb-8 shadow-xl">
               <Car className="w-10 h-10 text-gray-200" />
             </div>
             <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4">No active listings</h2>
             <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto mb-10 font-medium">You haven't listed any cars for sale yet. Start selling today!</p>
             <Link href="/#browse" className="bg-black dark:bg-white text-white dark:text-black px-12 py-4 rounded-2xl font-black uppercase tracking-widest text-xs">
               Create First Listing
             </Link>
           </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {myCars.map(car => (
              <ItemCard 
                key={car.id} 
                item={car} 
                onEdit={(c) => setEditingItem(c)}
                onDelete={(id) => { deleteItem(id); fetchItems(); }}
              />
            ))}
          </div>
        )}
      </main>
    </div>

>>>>>>> a1a6ea26ca54eab8c6546f91c2993b340edb4007
  );
}
