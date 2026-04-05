"use client";

import { useState, FormEvent, useEffect } from "react";
import { appConfig } from "@/config/appConfig";
import { DynamicField } from "@/components/shared/DynamicField";
import { useStore } from "@/store/useStore";
import { compressImage } from "@/lib/imageUtils";

type Props = {
  initialData?: Record<string, any>;
  onSuccess?: () => void;
};

export const ItemForm = ({ initialData = {}, onSuccess }: Props) => {
  const [formData, setFormData] = useState<Record<string, any>>(initialData);
  const [loading, setLoading] = useState(false);
  const [imageProcessing, setImageProcessing] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);
  const { user, addCar, updateCar } = useStore();

  const handleChange = (name: string, value: any) => {
    setSuccess(false);
    if (value instanceof File) {
      setImageProcessing(true);
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const originalDataUrl = reader.result as string;
          // Only compress if it's over a reasonable threshold (e.g., 100KB)
          // or just always compress for consistency and space saving.
          const compressed = await compressImage(originalDataUrl, 1200, 1200, 0.7);
          
          setFormData((prev: any) => ({
            ...prev,
            [name]: compressed,
          }));
        } catch (err) {
          console.error("Compression failed:", err);
          setError("Failed to process image.");
        } finally {
          setImageProcessing(false);
        }
      };
      reader.onerror = () => {
        setError("Failed to read image file.");
        setImageProcessing(false);
      };
      reader.readAsDataURL(value);
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
    setSuccess(false);

    try {
      if (imageProcessing) {
        throw new Error("Please wait for the image to finish processing.");
      }

      // Respect 'required' property from appConfig fields
      for (const field of appConfig.fields) {
        if (field.required && (formData[field.name] === undefined || formData[field.name] === null || formData[field.name] === "")) {
          // Exception for image if it already exists (editing)
          if (field.name === 'image' && formData.image) continue;
          throw new Error(`${field.label} is required.`);
        }
      }

      if (formData.id) {
        const { id, ...updateData } = formData;
        await updateCar(id, updateData);
      } else {
        await addCar(formData as any);
        setFormData({});
      }
      
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
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
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className="p-4 text-xs font-black uppercase tracking-widest text-emerald-600 bg-emerald-50 dark:bg-emerald-900/10 dark:text-emerald-400 rounded-2xl border border-emerald-100 dark:border-emerald-800/30 anim-pulse">
          🏆 Success! Your listing has been published.
        </div>
      )}

      <div className="space-y-12">
        {/* Section 1: General Info */}
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-blue-600" /> General Information
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {appConfig.fields.filter(f => ['title', 'brand', 'model', 'price', 'year', 'image'].includes(f.name)).map((field) => (
              <div key={field.name} className="flex flex-col gap-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
                  {field.label}
                </label>
                <DynamicField
                  field={field}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
                {field.name === 'image' && formData['image'] && (
                  <div className="mt-4 relative group aspect-video overflow-hidden rounded-2xl border-4 border-gray-100 dark:border-gray-800 shadow-xl">
                    <img 
                      src={formData['image']} 
                      alt="Car Preview" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Specifications */}
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-blue-600" /> Vehicle Specifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appConfig.fields.filter(f => !['title', 'brand', 'model', 'price', 'year', 'image', 'description'].includes(f.name)).map((field) => (
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
        </div>

        {/* Section 3: Description */}
        <div className="space-y-6">
          <h3 className="text-sm font-black uppercase tracking-[0.2em] text-blue-600 flex items-center gap-2">
            <span className="w-8 h-[2px] bg-blue-600" /> Details & Description
          </h3>
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">
              Description
            </label>
            <DynamicField
              field={appConfig.fields.find(f => f.name === 'description')!}
              value={formData['description']}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || imageProcessing}
        className="w-full bg-blue-600 disabled:bg-blue-400 text-white font-black uppercase tracking-widest text-sm px-4 py-5 rounded-[2rem] hover:bg-blue-700 transition-all transform hover:-translate-y-1 active:scale-95 shadow-2xl shadow-blue-500/20"
      >
        {loading ? "Processing..." : (imageProcessing ? "Reading Image..." : (formData.id ? `Update Listing` : `Publish Listing`))}
      </button>
    </form>
  );
};
