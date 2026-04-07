"use client";

import { useState } from "react";
import { Search, MapPin, Car } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/marketplace?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative flex items-center bg-surface border border-border rounded-2xl overflow-hidden transition-all duration-300 group-hover:border-primary/40 focus-within:border-primary focus-within:shadow-lg focus-within:shadow-primary/10">
          <div className="flex items-center gap-2 px-4 text-text-muted border-r border-border">
            <Car className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by brand, model, or location..."
            className="flex-1 px-4 py-4 bg-transparent text-text placeholder:text-text-muted text-sm border-none outline-none focus:ring-0"
            style={{ boxShadow: "none" }}
          />
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-4 bg-gradient-to-r from-primary to-primary-hover text-white font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <Search className="w-4 h-4" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </div>

      {/* Quick suggestions */}
      <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
        <span className="text-xs text-text-muted">Popular:</span>
        {["Hyundai Creta", "Maruti Swift", "Honda City", "BMW"].map((s) => (
          <button
            type="button"
            key={s}
            onClick={() => {
              setQuery(s);
              router.push(`/marketplace?search=${encodeURIComponent(s)}`);
            }}
            className="px-3 py-1.5 rounded-lg text-xs font-medium bg-surface border border-border text-text-secondary hover:text-text hover:border-primary/40 transition-all"
          >
            {s}
          </button>
        ))}
      </div>
    </form>
  );
}
