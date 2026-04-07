import { useEffect, useState } from "react";
import { useStore } from "@/store/useStore";

export const useItems = () => {
  const cars = useStore((state) => state.cars);
  const carsLoading = useStore((state) => state.carsLoading);
  const deleteCar = useStore((state) => state.deleteCar);

  const deleteItem = async (id: string) => {
    await deleteCar(id);
  };

  return { items: cars, loading: carsLoading, fetchItems: () => {}, deleteItem };
};
