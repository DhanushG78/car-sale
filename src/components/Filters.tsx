"use client";

import { Filters } from "@/types/car";
import { brands, locations } from "@/data/cars";
import {
  SlidersHorizontal,
  X,
  RotateCcw,
  IndianRupee,
  Calendar,
  Fuel,
  Gauge,
  Car,
  MapPin,
  Users,
} from "lucide-react";

interface FiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
  onReset: () => void;
  showMobile: boolean;
  onCloseMobile: () => void;
}

export default function FiltersPanel({
  filters,
  onChange,
  onReset,
  showMobile,
  onCloseMobile,
}: FiltersProps) {
  const updateFilter = (key: keyof Filters, value: string | [number, number]) => {
    onChange({ ...filters, [key]: value });
  };

  const formatPrice = (price: number) => {
    if (price >= 10000000) return `${(price / 10000000).toFixed(1)} Cr`;
    if (price >= 100000) return `${(price / 100000).toFixed(1)} L`;
    return `${(price / 1000).toFixed(0)}K`;
  };

  const hasActiveFilters = () => {
    return (
      filters.brand !== "" ||
      filters.year !== "" ||
      filters.fuelType !== "" ||
      filters.transmission !== "" ||
      filters.kmDriven !== "" ||
      filters.ownerType !== "" ||
      filters.location !== "" ||
      filters.category !== "" ||
      filters.priceRange[0] !== 0 ||
      filters.priceRange[1] !== 10000000
    );
  };

  const selectClass =
    "w-full px-3 py-2.5 bg-surface border border-border rounded-xl text-sm text-text placeholder:text-text-muted focus:border-primary transition-all cursor-pointer appearance-none";

  return (
    <>
      {/* Mobile Overlay */}
      {showMobile && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`${
          showMobile
            ? "fixed inset-y-0 left-0 z-50 w-80 bg-background shadow-2xl animate-slide-down"
            : "hidden lg:block"
        } lg:sticky lg:top-24 lg:self-start`}
      >
        <div className="p-6 space-y-10 max-h-[calc(100vh-6rem)] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-primary-light flex items-center justify-center">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-base font-black text-text uppercase tracking-tight">
                Filters
              </h3>
            </div>
            <div className="flex items-center gap-2">
              {hasActiveFilters() && (
                <button
                  onClick={onReset}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-[11px] font-bold text-danger hover:bg-danger-light transition-all border border-transparent hover:border-danger/20"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
              {showMobile && (
                <button
                  onClick={onCloseMobile}
                  className="w-9 h-9 rounded-xl bg-surface flex items-center justify-center text-text-secondary hover:text-text lg:hidden border border-border"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              )}
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-5">
            <label className="flex items-center gap-2.5 text-xs font-bold text-text-muted uppercase tracking-widest">
              <IndianRupee className="w-3.5 h-3.5 text-primary" />
              Price Range
            </label>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm font-bold text-text">
                <span className="px-2 py-1 rounded-lg bg-surface border border-border text-xs">₹{formatPrice(filters.priceRange[0])}</span>
                <span className="px-2 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary-hover text-xs">₹{formatPrice(filters.priceRange[1])}</span>
              </div>
              <input
                type="range"
                min={0}
                max={10000000}
                step={100000}
                value={filters.priceRange[1]}
                onChange={(e) =>
                  updateFilter("priceRange", [
                    filters.priceRange[0],
                    Number(e.target.value),
                  ])
                }
                className="w-full accent-primary"
              />
            </div>
          </div>

          {/* Brand */}
          <div className="space-y-4">
            <label className="flex items-center gap-2.5 text-xs font-bold text-text-muted uppercase tracking-widest">
              <Car className="w-3.5 h-3.5 text-primary" />
              Brand
            </label>
            <div className="relative group">
              <select
                value={filters.brand}
                onChange={(e) => updateFilter("brand", e.target.value)}
                className="w-full px-4 py-3.5 bg-surface border border-border rounded-xl text-sm font-semibold text-text placeholder:text-text-muted focus:border-primary transition-all cursor-pointer appearance-none outline-none group-hover:border-primary/40"
              >
                <option value="">All Brands</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-hover:text-primary transition-colors">
                <SlidersHorizontal className="w-3.5 h-3.5 rotate-90" />
              </div>
            </div>
          </div>

          {/* Year */}
          <div className="space-y-4">
            <label className="flex items-center gap-2.5 text-xs font-bold text-text-muted uppercase tracking-widest">
              <Calendar className="w-3.5 h-3.5 text-primary" />
              Year
            </label>
            <div className="relative group">
              <select
                value={filters.year}
                onChange={(e) => updateFilter("year", e.target.value)}
                className="w-full px-4 py-3.5 bg-surface border border-border rounded-xl text-sm font-semibold text-text placeholder:text-text-muted focus:border-primary transition-all cursor-pointer appearance-none outline-none group-hover:border-primary/40"
              >
                <option value="">All Years</option>
                {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017].map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-hover:text-primary transition-colors">
                <SlidersHorizontal className="w-3.5 h-3.5 rotate-90" />
              </div>
            </div>
          </div>

          {/* Fuel Type */}
          <div className="space-y-4">
            <label className="flex items-center gap-2.5 text-xs font-bold text-text-muted uppercase tracking-widest">
              <Fuel className="w-3.5 h-3.5 text-primary" />
              Fuel Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["petrol", "diesel", "electric"].map((ft) => (
                <button
                  key={ft}
                  onClick={() =>
                    updateFilter("fuelType", filters.fuelType === ft ? "" : ft)
                  }
                  className={`px-3 py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${
                    filters.fuelType === ft
                      ? "bg-primary text-white shadow-lg shadow-primary/25 border-primary scale-[1.02]"
                      : "bg-background border border-border text-text-secondary hover:text-text hover:border-primary/40 hover:bg-surface"
                  }`}
                >
                  {ft}
                </button>
              ))}
            </div>
          </div>

          {/* Transmission */}
          <div className="space-y-4">
            <label className="flex items-center gap-2.5 text-xs font-bold text-text-muted uppercase tracking-widest">
              <Gauge className="w-3.5 h-3.5 text-primary" />
              Transmission
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["manual", "automatic"].map((t) => (
                <button
                  key={t}
                  onClick={() =>
                    updateFilter(
                      "transmission",
                      filters.transmission === t ? "" : t
                    )
                  }
                  className={`px-3 py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${
                    filters.transmission === t
                      ? "bg-primary text-white shadow-lg shadow-primary/25 border-primary scale-[1.02]"
                      : "bg-background border border-border text-text-secondary hover:text-text hover:border-primary/40 hover:bg-surface"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* KM Driven */}
          <div className="space-y-4">
            <label className="flex items-center gap-2.5 text-xs font-bold text-text-muted uppercase tracking-widest">
              <Gauge className="w-3.5 h-3.5 text-primary" />
              KM Driven
            </label>
            <div className="relative group">
              <select
                value={filters.kmDriven}
                onChange={(e) => updateFilter("kmDriven", e.target.value)}
                className="w-full px-4 py-3.5 bg-surface border border-border rounded-xl text-sm font-semibold text-text placeholder:text-text-muted focus:border-primary transition-all cursor-pointer appearance-none outline-none group-hover:border-primary/40"
              >
                <option value="">Any KM</option>
                <option value="10000">Under 10K km</option>
                <option value="25000">Under 25K km</option>
                <option value="50000">Under 50K km</option>
                <option value="75000">Under 75K km</option>
                <option value="100000">Under 100K km</option>
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-hover:text-primary transition-colors">
                <SlidersHorizontal className="w-3.5 h-3.5 rotate-90" />
              </div>
            </div>
          </div>

          {/* Owner Type */}
          <div className="space-y-4">
            <label className="flex items-center gap-2.5 text-xs font-bold text-text-muted uppercase tracking-widest">
              <Users className="w-3.5 h-3.5 text-primary" />
              Owner Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {["1st", "2nd", "3rd"].map((o) => (
                <button
                  key={o}
                  onClick={() =>
                    updateFilter("ownerType", filters.ownerType === o ? "" : o)
                  }
                  className={`px-3 py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${
                    filters.ownerType === o
                      ? "bg-primary text-white shadow-lg shadow-primary/25 border-primary scale-[1.02]"
                      : "bg-background border border-border text-text-secondary hover:text-text hover:border-primary/40 hover:bg-surface"
                  }`}
                >
                  {o}
                </button>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="space-y-4">
            <label className="flex items-center gap-2.5 text-xs font-bold text-text-muted uppercase tracking-widest">
              <MapPin className="w-3.5 h-3.5 text-primary" />
              Location
            </label>
            <div className="relative group">
              <select
                value={filters.location}
                onChange={(e) => updateFilter("location", e.target.value)}
                className="w-full px-4 py-3.5 bg-surface border border-border rounded-xl text-sm font-semibold text-text placeholder:text-text-muted focus:border-primary transition-all cursor-pointer appearance-none outline-none group-hover:border-primary/40"
              >
                <option value="">All Locations</option>
                {locations.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-muted group-hover:text-primary transition-colors">
                <SlidersHorizontal className="w-3.5 h-3.5 rotate-90" />
              </div>
            </div>
          </div>

          {/* Category */}
          <div className="space-y-4">
            <label className="flex items-center gap-2.5 text-xs font-bold text-text-muted uppercase tracking-widest">
              <Car className="w-3.5 h-3.5 text-primary" />
              Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {["sedan", "suv", "hatchback", "coupe"].map((c) => (
                <button
                  key={c}
                  onClick={() =>
                    updateFilter("category", filters.category === c ? "" : c)
                  }
                  className={`px-4 py-3 rounded-xl text-[10px] font-black uppercase tracking-tighter transition-all ${
                    filters.category === c
                      ? "bg-primary text-white shadow-lg shadow-primary/25 border-primary scale-[1.02]"
                      : "bg-background border border-border text-text-secondary hover:text-text hover:border-primary/40 hover:bg-surface"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
