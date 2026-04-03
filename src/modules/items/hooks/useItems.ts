import { useEffect, useState } from "react";
import { itemService } from "../services/item.service";
import { Car } from "../types";

export const useItems = () => {
  const [items, setItems] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    setLoading(true);
    try {
      const data = await itemService.getItems();
      setItems(data);
    } catch (error) {
      console.error("Failed to fetch items:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    try {
      await itemService.deleteItem(id);
      await fetchItems();
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return { items, loading, fetchItems, deleteItem };
};