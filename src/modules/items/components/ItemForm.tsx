"use client";

import { useState, FormEvent, useEffect } from "react";
import { appConfig } from "@/config/appConfig";
import { DynamicField } from "@/components/shared/DynamicField";
import { useStore } from "@/store/useStore";

type Props = {
  initialData?: Record<string, any>;
  onSuccess?: () => void;
};

export const ItemForm = ({ initialData = {}, onSuccess }: Props) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const { user, addCar, updateCar } = useStore();

  const handleChange = (name: string, value: any) => {
    if (value instanceof File) {
      const imageUrl = URL.createObjectURL(value);
      setFormData((prev: any) => ({
        ...prev,
        [name]: imageUrl,
      }));
    } else {
      setFormData((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Respect 'required' property from appConfig fields
      for (const field of appConfig.fields) {
        if (field.required && (!formData[field.name] || formData[field.name] === "")) {
          // Exception for image if it already exists (editing)
          if (field.name === 'image' && formData.image) continue;
          throw new Error(`${field.label} is required.`);
        }
      }

      if (formData.id) {
        updateCar(formData as any);
      } else {
        const newCar = {
          ...formData,
          id: Math.random().toString(36).substr(2, 9),
          sellerId: user?.id || "anonymous",
          createdAt: new Date().toISOString(),
          status: "available"
        };
        addCar(newCar as any);
        setFormData({});
      }
      
      onSuccess?.();
    } catch (err: any) {
      setError(err.message || "Something went wrong while saving the car.");
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="p-8 border-2 border-gray-100 dark:border-gray-800 rounded-[2rem] space-y-8 bg-white dark:bg-gray-900 shadow-xl">
      <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-6">
        <h2 className="text-2xl font-black tracking-tight text-gray-900 dark:text-white uppercase italic">
          {formData.id ? "Edit" : "Post"} Your <span className="text-blue-600">Car</span>
        </h2>
      </div>

      {error && (
        <div className="p-4 text-xs font-black uppercase tracking-widest text-red-600 bg-red-50 dark:bg-red-900/10 dark:text-red-400 rounded-2xl border border-red-100 dark:border-red-800/30">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {appConfig.fields.map((field) => (
          <div key={field.name} className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
              {field.label}
            </label>
            <DynamicField
              field={field}
              value={formData[field.name]}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 disabled:bg-blue-400 text-white font-black uppercase tracking-widest text-sm px-4 py-5 rounded-[2rem] hover:bg-blue-700 transition-all transform hover:-translate-y-1 active:scale-95 shadow-2xl shadow-blue-500/20"
      >
        {loading ? "Processing..." : (formData.id ? `Update Listing` : `Publish Listing`)}
      </button>
    </form>
  );
};
