"use client";

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

  );
}
