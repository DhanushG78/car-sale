"use client";

import { useEffect } from "react";
import { useStore } from "@/store/useStore";

export const StoreInitializer = () => {
  const init = useStore((state) => state.init);

  useEffect(() => {
    const unsub = init();
    return () => unsub();
  }, [init]);

  return null;
};
