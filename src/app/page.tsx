"use client";

import { useItems, ItemForm } from "@/modules/items";
import { ItemCard } from "@/components/ui/ItemCard";
import { Hero } from "@/components/sections/Hero";
import { useState } from "react";
import { useStore } from "@/store/useStore";
import { Filter, X, ChevronRight, SlidersHorizontal, Search } from "lucide-react";

export default function Home() {
  const { items, loading, fetchItems, deleteItem } = useItems();
  const [editingItem, setEditingItem] = useState<any>(null);
  const user = useStore((state) => state.user);
  
  // Real-time Filtering State
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [selectedBrand, setSelectedBrand] = useState("All Brands");
  const [selectedFuel, setSelectedFuel] = useState("All Fuels");
  const [selectedTransmission, setSelectedTransmission] = useState("All");

  const brands = ["All Brands", "Honda", "Hyundai", "Maruti Suzuki", "Toyota", "Tata", "Mahindra", "Kia"];
  const fuels = ["All Fuels", "Petrol", "Diesel", "Electric", "Hybrid"];

  // Filter Items Array 
  const filteredItems = items.filter((car: any) => {
    const matchesSearch = car.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          car.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          car.model.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesMinPrice = minPrice === "" ? true : car.price >= minPrice;
    const matchesMaxPrice = maxPrice === "" ? true : car.price <= maxPrice;
    const matchesBrand = selectedBrand === "All Brands" ? true : car.brand === selectedBrand;
    const matchesFuel = selectedFuel === "All Fuels" ? true : car.fuelType === selectedFuel;
    const matchesTransmission = selectedTransmission === "All" ? true : car.transmission === selectedTransmission;

    return matchesSearch && matchesMinPrice && matchesMaxPrice && matchesBrand && matchesFuel && matchesTransmission;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedBrand("All Brands");
    setSelectedFuel("All Fuels");
    setSelectedTransmission("All");
  };

  return (
    <div className="bg-white dark:bg-gray-950 min-h-screen">
      <Hero />
      
      <main id="browse" className="max-w-[1600px] mx-auto px-6 py-16 md:px-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Sidebar / Filters Panel */}
          <aside className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-gray-50 dark:bg-gray-900/50 p-8 rounded-[2.5rem] border border-gray-100 dark:border-gray-800/50 sticky top-24">
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
                    {["All", "Manual", "Automatic"].map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedTransmission(type)}
                        className={`py-3 rounded-xl text-xs font-bold transition-all border ${
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
                <p className="text-gray-500 dark:text-gray-400 font-medium">{filteredItems.length} matching result{filteredItems.length !== 1 && 's'}</p>
              </div>
              
              <div className="flex items-center gap-4">
                 <span className="text-sm font-bold text-gray-400 uppercase tracking-widest px-2">Sort by</span>
                 <select className="bg-transparent font-black text-gray-900 dark:text-white border-none focus:ring-0 cursor-pointer">
                    <option>Latest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                    <option>Newest Year</option>
                 </select>
              </div>
            </div>
            
            {/* Admin Section if needed */}
            {user?.role === "admin" && (
              <section className="mb-12 bg-blue-50/50 dark:bg-blue-900/10 p-8 rounded-[2.5rem] border-2 border-dashed border-blue-200 dark:border-blue-800/50">
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
            ) : filteredItems.length === 0 ? (
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
                {filteredItems.map((car: any) => (
                  <ItemCard 
                    key={car.id} 
                    item={car} 
                    onEdit={user?.role === 'admin' ? (i) => setEditingItem(i) : undefined}
                    onDelete={user?.role === 'admin' ? (id) => { deleteItem(id); fetchItems(); } : undefined}
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