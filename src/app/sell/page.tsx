"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useCarStore } from "@/store/carStore";
import { Car, CarCategory, FuelType, OwnerType, Transmission } from "@/types/car";
import { brands, locations } from "@/data/cars";
import toast from "react-hot-toast";
import {
  Car as CarIcon,
  Upload,
  DollarSign,
  Fuel,
  Gauge,
  Calendar,
  MapPin,
  Palette,
  FileText,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function SellPage() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuthStore();
  const { addCar } = useCarStore();
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    brand: "",
    model: "",
    year: new Date().getFullYear(),
    price: "",
    fuelType: "petrol" as FuelType,
    transmission: "manual" as Transmission,
    kmDriven: "",
    ownerType: "1st" as OwnerType,
    location: "",
    color: "",
    image: "",
    description: "",
    category: "sedan" as CarCategory,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated || !user) {
      toast.error("Please login to sell a car");
      router.push("/login");
      return;
    }

    if (!form.title || !form.brand || !form.model || !form.price || !form.location) {
      toast.error("Please fill in all required fields");
      return;
    }

    setSubmitting(true);

    const newCar: Car = {
      id: `car-${Date.now()}`,
      title: form.title,
      brand: form.brand,
      model: form.model,
      year: form.year,
      price: Number(form.price),
      fuelType: form.fuelType,
      transmission: form.transmission,
      kmDriven: Number(form.kmDriven) || 0,
      ownerType: form.ownerType,
      location: form.location,
      color: form.color || "Not Specified",
      description: form.description || "No description provided.",
      image:
        form.image ||
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&q=80",
      sellerId: user.id,
      createdAt: new Date().toISOString(),
      category: form.category,
      badge: "new",
    };

    setTimeout(() => {
      addCar(newCar);
      toast.success("Car listed successfully!");
      setSubmitting(false);
      router.push("/my-listings");
    }, 1000);
  };

  const update = (key: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const inputClass =
    "w-full px-4 py-3 bg-surface border border-border rounded-xl text-sm text-text placeholder:text-text-muted focus:border-primary transition-all";
  const labelClass =
    "text-xs font-semibold text-text-secondary uppercase tracking-wider mb-2 block";

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light border border-primary/20 text-sm text-primary-hover mb-4">
          <Upload className="w-4 h-4" />
          List Your Car
        </div>
        <h1 className="text-3xl font-bold text-text">Sell Your Car</h1>
        <p className="text-text-secondary mt-2">
          Fill in the details below to list your car on AutoBazaar
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-6">
            <CarIcon className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-text">Basic Information</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className={labelClass}>Title *</label>
              <input
                type="text"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                placeholder="e.g., 2022 Hyundai Creta SX"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Brand *</label>
              <select
                value={form.brand}
                onChange={(e) => update("brand", e.target.value)}
                className={inputClass}
                required
              >
                <option value="">Select Brand</option>
                {brands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Model *</label>
              <input
                type="text"
                value={form.model}
                onChange={(e) => update("model", e.target.value)}
                placeholder="e.g., Creta"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Category</label>
              <select
                value={form.category}
                onChange={(e) => update("category", e.target.value)}
                className={inputClass}
              >
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="hatchback">Hatchback</option>
                <option value="coupe">Coupe</option>
                <option value="convertible">Convertible</option>
                <option value="truck">Truck</option>
              </select>
            </div>

            <div>
              <label className={labelClass}>Year *</label>
              <select
                value={form.year}
                onChange={(e) => update("year", Number(e.target.value))}
                className={inputClass}
              >
                {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() - i).map(
                  (y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
        </div>

        {/* Pricing & Specs */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-6">
            <DollarSign className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-text">Pricing & Specs</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Price (₹) *</label>
              <input
                type="number"
                value={form.price}
                onChange={(e) => update("price", e.target.value)}
                placeholder="e.g., 1350000"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>KM Driven</label>
              <input
                type="number"
                value={form.kmDriven}
                onChange={(e) => update("kmDriven", e.target.value)}
                placeholder="e.g., 15000"
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Fuel Type</label>
              <div className="grid grid-cols-3 gap-2">
                {(["petrol", "diesel", "electric"] as FuelType[]).map((ft) => (
                  <button
                    type="button"
                    key={ft}
                    onClick={() => update("fuelType", ft)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium capitalize transition-all ${
                      form.fuelType === ft
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "bg-surface border border-border text-text-secondary hover:border-primary/40"
                    }`}
                  >
                    {ft}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass}>Transmission</label>
              <div className="grid grid-cols-2 gap-2">
                {(["manual", "automatic"] as Transmission[]).map((t) => (
                  <button
                    type="button"
                    key={t}
                    onClick={() => update("transmission", t)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium capitalize transition-all ${
                      form.transmission === t
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "bg-surface border border-border text-text-secondary hover:border-primary/40"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass}>Owner Type</label>
              <div className="grid grid-cols-3 gap-2">
                {(["1st", "2nd", "3rd"] as OwnerType[]).map((o) => (
                  <button
                    type="button"
                    key={o}
                    onClick={() => update("ownerType", o)}
                    className={`px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                      form.ownerType === o
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "bg-surface border border-border text-text-secondary hover:border-primary/40"
                    }`}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className={labelClass}>Color</label>
              <input
                type="text"
                value={form.color}
                onChange={(e) => update("color", e.target.value)}
                placeholder="e.g., Phantom Black"
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Location & Media */}
        <div className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold text-text">Location & Media</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className={labelClass}>Location *</label>
              <select
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                className={inputClass}
                required
              >
                <option value="">Select City</option>
                {locations.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className={labelClass}>Image URL</label>
              <input
                type="url"
                value={form.image}
                onChange={(e) => update("image", e.target.value)}
                placeholder="https://example.com/car-image.jpg"
                className={inputClass}
              />
            </div>

            <div className="sm:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Describe your car's condition, features, and any recent maintenance..."
                rows={4}
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          className="w-full flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-white font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all btn-shine disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Listing your car...
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5" />
              List Car for Sale
            </>
          )}
        </button>
      </form>
    </div>
  );
}
