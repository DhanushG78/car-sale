<<<<<<< HEAD
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import CarCard from "@/components/CarCard";
import SkeletonCard from "@/components/SkeletonCard";
import { useCarStore } from "@/store/carStore";
import {
  ArrowRight,
  Shield,
  Star,
  TrendingUp,
  Car,
  Truck,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const { cars, loadCars } = useCarStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCars();
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [loadCars]);

  const featuredCars = cars.filter((c) => c.badge).slice(0, 8);

  const categories = [
    {
      name: "Sedan",
      icon: Car,
      count: cars.filter((c) => c.category === "sedan").length,
      gradient: "from-blue-500 to-cyan-500",
      href: "/marketplace?category=sedan",
    },
    {
      name: "SUV",
      icon: Truck,
      count: cars.filter((c) => c.category === "suv").length,
      gradient: "from-purple-500 to-pink-500",
      href: "/marketplace?category=suv",
    },
    {
      name: "Hatchback",
      icon: Car,
      count: cars.filter((c) => c.category === "hatchback").length,
      gradient: "from-orange-500 to-red-500",
      href: "/marketplace?category=hatchback",
    },
    {
      name: "Electric",
      icon: Zap,
      count: cars.filter((c) => c.fuelType === "electric").length,
      gradient: "from-green-500 to-emerald-500",
      href: "/marketplace?fuelType=electric",
    },
  ];

  const stats = [
    { label: "Cars Listed", value: `${cars.length}+`, icon: Car },
    { label: "Happy Buyers", value: "500+", icon: Star },
    { label: "Cities Covered", value: "10+", icon: TrendingUp },
    { label: "Verified Sellers", value: "100+", icon: Shield },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1.5s" }}
          />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        <div className="relative text-center px-4 max-w-4xl mx-auto animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light border border-primary/20 text-sm text-primary-hover mb-6">
            <Zap className="w-4 h-4" />
            India&apos;s Most Trusted Used Car Platform
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black leading-[1.1] mb-8 tracking-tight">
            Find Your{" "}
            <span className="gradient-text">Perfect</span>
            <br />
            Used Car
          </h1>

          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Browse through thousands of verified listings from trusted sellers.
            Experience the future of car buying with total transparency.
          </p>

          <SearchBar />

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 p-4 rounded-2xl bg-surface/50 border border-border"
              >
                <stat.icon className="w-5 h-5 text-primary mb-1" />
                <span className="text-2xl font-bold text-text">{stat.value}</span>
                <span className="text-xs text-text-muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-text mb-3">
            Browse by Category
          </h2>
          <p className="text-text-secondary">
            Find the type of car that fits your lifestyle
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.name}
              href={cat.href}
              className={`group relative p-6 rounded-2xl bg-card border border-border overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 opacity-0 animate-fade-in stagger-${
                i + 1
              }`}
            >
              <div
                className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${cat.gradient} opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity`}
              />
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <cat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-text">{cat.name}</h3>
              <p className="text-sm text-text-muted mt-1">
                {cat.count} cars available
              </p>
              <ArrowRight className="w-4 h-4 text-text-muted mt-3 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Cars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-text mb-3">
              Featured Cars
            </h2>
            <p className="text-text-secondary">
              Hand-picked deals you don&apos;t want to miss
            </p>
          </div>
          <Link
            href="/marketplace"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium text-text-secondary hover:text-text hover:border-primary/40 transition-all"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : featuredCars.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-white font-medium text-sm shadow-lg shadow-primary/25"
          >
            View All Cars
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="relative bg-card border border-border rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
              Ready to Sell Your Car?
            </h2>
            <p className="text-lg text-text-secondary max-w-xl mx-auto mb-12 leading-relaxed">
              List your car in minutes and reach thousands of potential buyers.
              It&apos;s fast, easy, and completely free.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/sell"
                className="px-10 py-4 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all btn-shine"
              >
                Sell Your Car Now
              </Link>
              <Link
                href="/marketplace"
                className="px-10 py-4 rounded-xl bg-surface border border-border text-text font-semibold hover:border-primary/40 transition-all"
              >
                Browse Cars
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
=======
"use client";

import { useItems, ItemForm } from "@/modules/items";
import { ItemCard } from "@/components/ui/ItemCard";
import { Hero } from "@/components/sections/Hero";
import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore";
import { Filter, X, ChevronRight, SlidersHorizontal, Search } from "lucide-react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const { items, loading, fetchItems, deleteItem } = useItems();
  const [editingItem, setEditingItem] = useState<any>(null);
  const user = useStore((state) => state.user);
  const isSeller = useStore((state) => state.isSeller());

  useEffect(() => {
    setMounted(true);
  }, []);

  
  // Real-time Filtering State
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [minYear, setMinYear] = useState<number | "">("");
  const [maxKmDriven, setMaxKmDriven] = useState<number | "">("");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [selectedFuel, setSelectedFuel] = useState("All Fuels");
  const [selectedTransmission, setSelectedTransmission] = useState("All");
  const [selectedOwner, setSelectedOwner] = useState("All Owners");
  const [sortBy, setSortBy] = useState("Latest");

  const brands = ["All Brands", "Hyundai", "Honda", "Maruti Suzuki", "Toyota", "Tata", "Mahindra", "BMW", "Audi", "Mercedes-Benz"];
  const fuels = ["All Fuels", "petrol", "diesel", "electric"];
  const owners = ["All Owners", "1st", "2nd", "3rd"];

  // Filter and Sort Items Array 
  const filteredAndSortedItems = items.filter((car: any) => {
    const matchesSearch = car.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          car.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMinPrice = minPrice === "" ? true : car.price >= minPrice;
    const matchesMaxPrice = maxPrice === "" ? true : car.price <= maxPrice;
    const matchesMinYear = minYear === "" ? true : car.year >= minYear;
    const matchesMaxKm = maxKmDriven === "" ? true : car.kmDriven <= maxKmDriven;
    const matchesBrand = selectedBrand === "All Brands" ? true : car.brand === selectedBrand;
    const matchesFuel = selectedFuel === "All Fuels" ? true : car.fuelType === selectedFuel;
    const matchesTransmission = selectedTransmission === "All" ? true : car.transmission === selectedTransmission;
    const matchesOwner = selectedOwner === "All Owners" ? true : car.ownerType === selectedOwner;

    return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesMinYear && matchesMaxKm && matchesBrand && matchesFuel && matchesTransmission && matchesOwner;
  }).sort((a: any, b: any) => {
    if (sortBy === "Price: Low to High") return a.price - b.price;
    if (sortBy === "Price: High to Low") return b.price - a.price;
    if (sortBy === "Newest Year") return b.year - a.year;
    if (sortBy === "Latest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    return 0;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setMinYear("");
    setMaxKmDriven("");
    setSelectedBrand("All Brands");
    setSelectedFuel("All Fuels");
    setSelectedTransmission("All");
    setSelectedOwner("All Owners");
    setSortBy("Latest");
  };

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <Hero />
      
      <main id="browse" className="max-w-[1600px] mx-auto px-6 py-16 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar / Filters Panel */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800/50 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between mb-8">
                <h3 className="font-black text-2xl text-gray-900 dark:text-gray-100 flex items-center gap-3">
                  <SlidersHorizontal className="w-6 h-6 text-blue-600" />
                  Filters
                </h3>
                <button onClick={clearFilters} className="text-sm font-bold text-blue-600 hover:text-blue-700 transition">
                  Reset
                </button>
              </div>
              
              <div className="space-y-10">
                {/* Search */}
                <div className="relative">
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Search</label>
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Brand, model, etc..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full rounded-2xl border-none bg-white dark:bg-gray-800 pl-11 pr-4 py-4 text-sm font-medium focus:ring-4 focus:ring-blue-500/10 dark:text-gray-100 transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Price Range (₹)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      placeholder="Min"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-full rounded-2xl border-none bg-white dark:bg-gray-800 px-4 py-4 text-sm font-medium focus:ring-4 focus:ring-blue-500/10 dark:text-gray-100 transition-all shadow-sm"
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-full rounded-2xl border-none bg-white dark:bg-gray-800 px-4 py-4 text-sm font-medium focus:ring-4 focus:ring-blue-500/10 dark:text-gray-100 transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Year and KM */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Min Year</label>
                    <input
                      type="number"
                      placeholder="2015"
                      value={minYear}
                      onChange={(e) => setMinYear(e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-full rounded-2xl border-none bg-white dark:bg-gray-800 px-4 py-4 text-sm font-medium focus:ring-4 focus:ring-blue-500/10 dark:text-gray-100 transition-all shadow-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Max KM</label>
                    <input
                      type="number"
                      placeholder="50000"
                      value={maxKmDriven}
                      onChange={(e) => setMaxKmDriven(e.target.value === "" ? "" : Number(e.target.value))}
                      className="w-full rounded-2xl border-none bg-white dark:bg-gray-800 px-4 py-4 text-sm font-medium focus:ring-4 focus:ring-blue-500/10 dark:text-gray-100 transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Brand Select */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Brand</label>
                  <select 
                    value={selectedBrand}
                    onChange={(e) => setSelectedBrand(e.target.value)}
                    className="w-full rounded-2xl border-none bg-white dark:bg-gray-800 px-4 py-4 text-sm font-medium focus:ring-4 focus:ring-blue-500/10 dark:text-gray-100 transition-all shadow-sm appearance-none cursor-pointer"
                  >
                    {brands.map(brand => <option key={brand} value={brand}>{brand}</option>)}
                  </select>
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Fuel Type</label>
                  <div className="flex flex-wrap gap-2">
                    {fuels.map(fuel => (
                      <button
                        key={fuel}
                        onClick={() => setSelectedFuel(fuel)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                          selectedFuel === fuel 
                            ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20" 
                            : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-200"
                        }`}
                      >
                        {fuel}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Transmission */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Transmission</label>
                  <div className="grid grid-cols-2 gap-2">
                    {["All", "manual", "automatic"].map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedTransmission(type)}
                        className={`py-3 rounded-xl text-xs font-bold transition-all border uppercase tracking-widest ${
                          selectedTransmission === type 
                            ? "bg-gray-900 dark:bg-white text-white dark:text-black border-gray-900 dark:border-white shadow-md" 
                            : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Owner Type */}
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-3 ml-1">Owner Type</label>
                  <div className="flex flex-wrap gap-2">
                    {owners.map(owner => (
                      <button
                        key={owner}
                        onClick={() => setSelectedOwner(owner)}
                        className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                          selectedOwner === owner 
                            ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20" 
                            : "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-blue-200"
                        }`}
                      >
                        {owner}
                      </button>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </aside>

          {/* Grid Layout */}
          <div className="flex-1">
            {/* Header / Sort Row */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-12 gap-6 bg-gray-50 dark:bg-gray-900/40 p-6 rounded-[2rem] border border-gray-100 dark:border-gray-800/50">
              <div>
                <h2 className="text-3xl font-black tracking-tight text-gray-900 dark:text-gray-100 mb-1">
                  Available Cars
                </h2>
                <p className="text-gray-500 dark:text-gray-400 font-medium">{filteredAndSortedItems.length} matching result{filteredAndSortedItems.length !== 1 && 's'}</p>
              </div>
              
              <div className="flex items-center gap-4">
                 <span className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">Sort by</span>
                 <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="bg-transparent font-black text-gray-900 dark:text-white border-none focus:ring-0 cursor-pointer"
                 >
                    <option>Latest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Year</option>
                 </select>
              </div>
            </div>
            
            {/* Admin/Seller Section if needed */}
            {mounted && isSeller && (
              <section id="sell-form" className="mb-12 bg-blue-50/50 dark:bg-blue-900/10 p-8 rounded-[2.5rem] border-2 border-dashed border-blue-200 dark:border-blue-800/50">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100">{editingItem ? 'Editing Listing' : 'Create New Listing'}</h2>
                  {editingItem && (
                    <button onClick={() => setEditingItem(null)} className="flex items-center gap-2 text-sm font-black text-red-600 uppercase tracking-widest">
                       <X className="w-4 h-4" /> Cancel
                    </button>
                  )}
                </div>
                <ItemForm 
                  key={editingItem ? editingItem.id : "new-post"} 
                  initialData={editingItem || {}} 
                  onSuccess={() => {
                    setEditingItem(null);
                    fetchItems();
                  }} 
                />
              </section>
            )}


            {loading ? (
               <div className="py-32 flex flex-col items-center justify-center w-full">
                 <div className="w-16 h-16 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin mb-6"></div>
                 <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Searching for cars...</p>
               </div>
            ) : filteredAndSortedItems.length === 0 ? (
               <div className="py-32 flex flex-col items-center justify-center w-full text-center px-4 bg-gray-50 dark:bg-gray-900/40 rounded-[3rem] border border-gray-100 dark:border-gray-800">
                 <div className="w-24 h-24 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center mb-8 shadow-xl">
                   <Search className="w-10 h-10 text-gray-300" />
                 </div>
                 <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-3">No cars match your search</h3>
                 <p className="text-gray-500 dark:text-gray-400 font-medium max-w-sm mx-auto mb-8">Try adjusting your filters or try a different search term to find your perfect car.</p>
                 <button 
                   onClick={clearFilters}
                   className="bg-gray-900 dark:bg-white text-white dark:text-black px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 transition-transform"
                 >
                   Clear all filters
                 </button>
               </div>
            ) : (
               <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-3 gap-8">
                {filteredAndSortedItems.map((car: any) => (
                  <ItemCard 
                    key={car.id} 
                    item={car} 
                    onEdit={(user?.role === 'admin' || car.sellerId === user?.id) ? (i) => setEditingItem(i) : undefined}
                    onDelete={(user?.role === 'admin' || car.sellerId === user?.id) ? (id) => { deleteItem(id); fetchItems(); } : undefined}
                  />
                ))}

              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
>>>>>>> a1a6ea26ca54eab8c6546f91c2993b340edb4007
