"use client";

import { useEffect, useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CarCard from "@/components/CarCard";
import SkeletonCard from "@/components/SkeletonCard";
import FiltersPanel from "@/components/Filters";
import { useCarStore } from "@/store/carStore";
import { Filters } from "@/types/car";
import { SlidersHorizontal, Search, X, Car } from "lucide-react";

const defaultFilters: Filters = {
  priceRange: [0, 50000000],
  brand: "",
  year: "",
  fuelType: "",
  transmission: "",
  kmDriven: "",
  ownerType: "",
  location: "",
  category: "",
  search: "",
};

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const { cars, loadCars } = useCarStore();
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>({
    ...defaultFilters,
    search: searchParams.get("search") || "",
    category: searchParams.get("category") || "",
    fuelType: searchParams.get("fuelType") || "",
  });

  useEffect(() => {
    loadCars();
    const timer = setTimeout(() => setLoading(false), 600);
    return () => clearTimeout(timer);
  }, [loadCars]);

  useEffect(() => {
    setFilters((f) => ({
      ...f,
      search: searchParams.get("search") || f.search,
      category: searchParams.get("category") || f.category,
      fuelType: searchParams.get("fuelType") || f.fuelType,
    }));
  }, [searchParams]);

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const match =
          car.brand.toLowerCase().includes(q) ||
          car.model.toLowerCase().includes(q) ||
          car.title.toLowerCase().includes(q) ||
          car.location.toLowerCase().includes(q);
        if (!match) return false;
      }
      if (car.price < filters.priceRange[0] || car.price > filters.priceRange[1])
        return false;
      if (filters.brand && car.brand !== filters.brand) return false;
      if (filters.year && car.year !== Number(filters.year)) return false;
      if (filters.fuelType && car.fuelType !== filters.fuelType) return false;
      if (filters.transmission && car.transmission !== filters.transmission)
        return false;
      if (filters.kmDriven && car.kmDriven > Number(filters.kmDriven))
        return false;
      if (filters.ownerType && car.ownerType !== filters.ownerType) return false;
      if (filters.location && car.location !== filters.location) return false;
      if (filters.category && car.category !== filters.category) return false;
      return true;
    });
  }, [cars, filters]);

  const activeFilterCount = Object.entries(filters).filter(([key, value]) => {
    if (key === "priceRange")
      return (value as [number, number])[0] !== 0 || (value as [number, number])[1] !== 50000000;
    if (key === "search") return false;
    return value !== "";
  }).length;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-text mb-2">Marketplace</h1>
        <p className="text-text-secondary">
          Browse {cars.length}+ verified used cars
        </p>
      </div>

      {/* Search + Filter Toggle */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
            placeholder="Search cars..."
            className="w-full pl-11 pr-10 py-3 bg-surface border border-border rounded-xl text-sm text-text placeholder:text-text-muted transition-all"
          />
          {filters.search && (
            <button
              onClick={() => setFilters({ ...filters, search: "" })}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-surface-hover flex items-center justify-center text-text-muted hover:text-text"
            >
              <X className="w-3 h-3" />
            </button>
          )}
        </div>
        <button
          onClick={() => setShowFilters(true)}
          className="lg:hidden relative flex items-center gap-2 px-4 py-3 bg-surface border border-border rounded-xl text-sm font-medium text-text-secondary hover:text-text transition-all"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {/* Main Layout */}
      <div className="flex gap-6">
        {/* Filters Sidebar */}
        <div className="hidden lg:block w-72 shrink-0">
          <FiltersPanel
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(defaultFilters)}
            showMobile={showFilters}
            onCloseMobile={() => setShowFilters(false)}
          />
        </div>

        {/* Mobile Filters Drawer */}
        <div className="lg:hidden">
          <FiltersPanel
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(defaultFilters)}
            showMobile={showFilters}
            onCloseMobile={() => setShowFilters(false)}
          />
        </div>

        {/* Car Grid */}
        <div className="flex-1">
          {/* Results Count */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-sm text-text-muted">
              Showing {filteredCars.length} of {cars.length} results
            </span>
            {activeFilterCount > 0 && (
              <button
                onClick={() => setFilters(defaultFilters)}
                className="text-sm text-primary hover:text-primary-hover transition-colors"
              >
                Clear all filters
              </button>
            )}
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {Array.from({ length: 9 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : filteredCars.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-16 h-16 rounded-2xl bg-surface border border-border flex items-center justify-center mb-4">
                <Car className="w-8 h-8 text-text-muted" />
              </div>
              <h3 className="text-lg font-semibold text-text mb-2">
                No cars found
              </h3>
              <p className="text-sm text-text-muted max-w-sm">
                Try adjusting your filters or search query to find more results.
              </p>
              <button
                onClick={() => setFilters(defaultFilters)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filteredCars.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      }
    >
      <MarketplaceContent />
    </Suspense>
  );
}
