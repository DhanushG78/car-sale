"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SearchBar from "@/components/SearchBar";
import CarCard from "@/components/CarCard";
import SkeletonCard from "@/components/SkeletonCard";
import { useCarStore } from "@/store/carStore";
import {
  ArrowRight,
  Shield,
  Star,
  TrendingUp,
  Car,
  Truck,
  Zap,
} from "lucide-react";

export default function HomePage() {
  const { cars, loadCars } = useCarStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCars();
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [loadCars]);

  const featuredCars = cars.filter((c) => c.badge).slice(0, 8);

  const categories = [
    {
      name: "Sedan",
      icon: Car,
      count: cars.filter((c) => c.category === "sedan").length,
      gradient: "from-blue-500 to-cyan-500",
      href: "/marketplace?category=sedan",
    },
    {
      name: "SUV",
      icon: Truck,
      count: cars.filter((c) => c.category === "suv").length,
      gradient: "from-purple-500 to-pink-500",
      href: "/marketplace?category=suv",
    },
    {
      name: "Hatchback",
      icon: Car,
      count: cars.filter((c) => c.category === "hatchback").length,
      gradient: "from-orange-500 to-red-500",
      href: "/marketplace?category=hatchback",
    },
    {
      name: "Electric",
      icon: Zap,
      count: cars.filter((c) => c.fuelType === "electric").length,
      gradient: "from-green-500 to-emerald-500",
      href: "/marketplace?fuelType=electric",
    },
  ];

  const stats = [
    { label: "Cars Listed", value: `${cars.length}+`, icon: Car },
    { label: "Happy Buyers", value: "500+", icon: Star },
    { label: "Cities Covered", value: "10+", icon: TrendingUp },
    { label: "Verified Sellers", value: "100+", icon: Shield },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float"
            style={{ animationDelay: "1.5s" }}
          />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
        </div>

        <div className="relative text-center px-4 max-w-4xl mx-auto animate-slide-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-light border border-primary/20 text-sm text-primary-hover mb-6">
            <Zap className="w-4 h-4" />
            India&apos;s Most Trusted Used Car Platform
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black leading-[1.1] mb-8 tracking-tight">
            Find Your{" "}
            <span className="gradient-text">Perfect</span>
            <br />
            Used Car
          </h1>

          <p className="text-xl text-text-secondary max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
            Browse through thousands of verified listings from trusted sellers.
            Experience the future of car buying with total transparency.
          </p>

          <SearchBar />

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 p-4 rounded-2xl bg-surface/50 border border-border"
              >
                <stat.icon className="w-5 h-5 text-primary mb-1" />
                <span className="text-2xl font-bold text-text">{stat.value}</span>
                <span className="text-xs text-text-muted">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl font-bold text-text mb-3">
            Browse by Category
          </h2>
          <p className="text-text-secondary">
            Find the type of car that fits your lifestyle
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat, i) => (
            <Link
              key={cat.name}
              href={cat.href}
              className={`group relative p-6 rounded-2xl bg-card border border-border overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 opacity-0 animate-fade-in stagger-${
                i + 1
              }`}
            >
              <div
                className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${cat.gradient} opacity-10 rounded-bl-full group-hover:opacity-20 transition-opacity`}
              />
              <div
                className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
              >
                <cat.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-text">{cat.name}</h3>
              <p className="text-sm text-text-muted mt-1">
                {cat.count} cars available
              </p>
              <ArrowRight className="w-4 h-4 text-text-muted mt-3 group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Cars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-text mb-3">
              Featured Cars
            </h2>
            <p className="text-text-secondary">
              Hand-picked deals you don&apos;t want to miss
            </p>
          </div>
          <Link
            href="/marketplace"
            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface border border-border text-sm font-medium text-text-secondary hover:text-text hover:border-primary/40 transition-all"
          >
            View All
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))
            : featuredCars.map((car, i) => (
                <CarCard key={car.id} car={car} index={i} />
              ))}
        </div>

        <div className="text-center mt-8 sm:hidden">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-white font-medium text-sm shadow-lg shadow-primary/25"
          >
            View All Cars
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="relative rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20" />
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
          <div className="relative bg-card border border-border rounded-3xl p-8 sm:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-4">
              Ready to Sell Your Car?
            </h2>
            <p className="text-lg text-text-secondary max-w-xl mx-auto mb-12 leading-relaxed">
              List your car in minutes and reach thousands of potential buyers.
              It&apos;s fast, easy, and completely free.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/sell"
                className="px-10 py-4 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-white font-bold shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all btn-shine"
              >
                Sell Your Car Now
              </Link>
              <Link
                href="/marketplace"
                className="px-10 py-4 rounded-xl bg-surface border border-border text-text font-semibold hover:border-primary/40 transition-all"
              >
                Browse Cars
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
