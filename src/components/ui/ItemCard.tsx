import { useStore } from "@/store/useStore";
import { Car } from "@/modules/items/types";
import { Heart, ArrowLeftRight } from "lucide-react";
import Link from "next/link";

type Props = {
  item: Car;
  onEdit?: (item: Car) => void;
  onDelete?: (id: string) => void;
};

export const ItemCard = ({ item, onEdit, onDelete }: Props) => {
  const { wishlist, toggleWishlist, compareList, addToCompare } = useStore();
  const isWishlisted = wishlist.includes(item.id);
  const isInCompare = compareList.some((c) => c.id === item.id);

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this listing?")) {
      onDelete?.(item.id);
    }
  };

  return (
    <div className="group bg-white dark:bg-gray-900 rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100 dark:border-gray-800 flex flex-col h-full relative">
      {/* Badge for New/Sold */}
      {item.status === 'sold' ? (
        <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
          Sold
        </div>
      ) : (
        <div className="absolute top-4 left-4 z-10 bg-green-600 text-white text-xs font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
          Available
        </div>
      )}

      {/* Wishlist Button */}
      <button 
        onClick={(e) => { e.stopPropagation(); toggleWishlist(item.id); }}
        className={`absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
          isWishlisted 
            ? "bg-red-500 text-white" 
            : "bg-white/80 dark:bg-black/40 text-gray-900 dark:text-white hover:bg-red-50"
        }`}
      >
        <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
      </button>

      <div className="relative h-56 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img 
          src={item.image || "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80"} 
          alt={item.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h2 className="font-bold text-xl text-gray-900 dark:text-gray-100 line-clamp-1 group-hover:text-blue-600 transition-colors">
            {item.title}
          </h2>
        </div>
        
        <p className="text-2xl font-black text-gray-900 dark:text-white mb-4">
          ₹ {Number(item.price).toLocaleString()}
        </p>

        {/* Spec Chips */}
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-gray-200 dark:border-gray-700">
            📅 {item.year}
          </span>
          <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-gray-200 dark:border-gray-700">
            🛣️ {Number(item.kmDriven).toLocaleString()} km
          </span>
          <span className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-gray-200 dark:border-gray-700">
            ⛽ {item.fuelType}
          </span>
        </div>

        <div className="mt-auto pt-4 flex gap-3">
          {(!onEdit && !onDelete) ? (
            <div className="flex gap-2 w-full">
              <Link 
                href={`/cars/${item.id}`}
                className="flex-1 bg-blue-600 dark:bg-blue-500 text-white py-3.5 rounded-2xl font-bold shadow-lg shadow-blue-500/20 hover:bg-blue-700 dark:hover:bg-blue-600 transform hover:-translate-y-0.5 transition-all text-center"
              >
                View Details
              </Link>
              <button
                onClick={(e) => { e.preventDefault(); addToCompare(item); }}
                disabled={isInCompare}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl font-bold transform hover:-translate-y-0.5 transition-all text-sm border ${
                  isInCompare
                    ? "bg-gray-100 dark:bg-gray-800 text-gray-400 border-gray-200 dark:border-gray-700 cursor-not-allowed"
                    : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm"
                }`}
              >
                <ArrowLeftRight className="w-4 h-4" />
                {isInCompare ? "Added" : "Compare"}
              </button>
            </div>
          ) : (
            <>
              {onEdit && (
                <button
                  onClick={() => onEdit(item)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 py-3 rounded-2xl font-bold text-sm transition-all border border-gray-200 dark:border-gray-700"
                >
                  Edit
                </button>
              )}
              {onDelete && (
                <button
                  onClick={handleDelete}
                  className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 dark:bg-red-900/20 dark:hover:bg-red-900/40 dark:text-red-400 py-3 rounded-2xl font-bold text-sm transition-all border border-red-100 dark:border-red-900/30"
                >
                  Delete
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

