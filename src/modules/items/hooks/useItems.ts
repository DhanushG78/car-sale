import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";

export const useItems = () => {
  const cars = useStore((state) => state.cars);
  const deleteCar = useStore((state) => state.deleteCar);
  const [loading, setLoading] = useState(false);

  // We keep fetchItems for compatibility + loading state simulation
  const fetchItems = async () => {
    setLoading(true);
    // Simulation of small delay
    await new Promise(r => setTimeout(r, 500));
    setLoading(false);
  };

  const deleteItem = async (id: string) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 300));
    deleteCar(id);
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return { items: cars, loading, fetchItems, deleteItem };
};
