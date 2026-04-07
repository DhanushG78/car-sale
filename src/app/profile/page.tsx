"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useCarStore } from "@/store/carStore";
import { useWishlistStore } from "@/store/wishlistStore";
import Link from "next/link";
import {
  User,
  Mail,
  Calendar,
  Car,
  Heart,
  Settings,
  ChevronRight,
  LogOut,
  Shield,
  Edit,
} from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, logout, loadSession } = useAuthStore();
  const { cars, loadCars } = useCarStore();
  const { wishlist, loadWishlist } = useWishlistStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    loadSession();
    loadCars();
    loadWishlist();
    setMounted(true);
  }, [loadSession, loadCars, loadWishlist]);

  useEffect(() => {
    if (mounted && !isAuthenticated) {
      router.push("/login");
    }
  }, [mounted, isAuthenticated, router]);

  if (!mounted || !isAuthenticated || !user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          <div className="h-32 skeleton rounded-2xl" />
          <div className="h-48 skeleton rounded-2xl" />
        </div>
      </div>
    );
  }

  const userListings = cars.filter((c) => c.sellerId === user.id).length;

  const menuItems = [
    {
      label: "My Listings",
      desc: `${userListings} cars listed`,
      icon: Car,
      href: "/my-listings",
      color: "text-primary",
      bg: "bg-primary-light",
    },
    {
      label: "Wishlist",
      desc: `${wishlist.length} cars saved`,
      icon: Heart,
      href: "/wishlist",
      color: "text-danger",
      bg: "bg-danger-light",
    },
    {
      label: "Sell a Car",
      desc: "List a new car",
      icon: Edit,
      href: "/sell",
      color: "text-success",
      bg: "bg-success-light",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in">
      {/* Profile Card */}
      <div className="bg-card rounded-2xl border border-border overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary/30 to-accent/30 relative">
          <div className="absolute -bottom-10 left-6">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-2xl font-bold border-4 border-background shadow-xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
          </div>
        </div>

        <div className="pt-14 pb-6 px-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-bold text-text">{user.name}</h1>
              <div className="flex items-center gap-2 mt-2 text-text-secondary">
                <Mail className="w-4 h-4" />
                <span className="text-sm">{user.email}</span>
              </div>
              <div className="flex items-center gap-2 mt-1 text-text-muted">
                <Calendar className="w-4 h-4" />
                <span className="text-xs">
                  Member since{" "}
                  {new Date(user.createdAt).toLocaleDateString("en-IN", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-success-light text-success text-xs font-medium">
              <Shield className="w-3.5 h-3.5" />
              Verified
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        {[
          { label: "Listed Cars", value: userListings, icon: Car },
          { label: "Wishlist", value: wishlist.length, icon: Heart },
          { label: "Views", value: "—", icon: User },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-card rounded-2xl border border-border p-5 text-center"
          >
            <stat.icon className="w-5 h-5 text-primary mx-auto mb-2" />
            <p className="text-2xl font-bold text-text">{stat.value}</p>
            <p className="text-xs text-text-muted mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Menu */}
      <div className="bg-card rounded-2xl border border-border mt-6 overflow-hidden divide-y divide-border">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center justify-between px-6 py-4 hover:bg-surface-hover transition-all group"
          >
            <div className="flex items-center gap-4">
              <div
                className={`w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}
              >
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <p className="text-sm font-semibold text-text">{item.label}</p>
                <p className="text-xs text-text-muted">{item.desc}</p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-text-muted group-hover:text-text group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>

      {/* Logout */}
      <button
        onClick={() => {
          logout();
          router.push("/");
        }}
        className="w-full mt-6 flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-danger/20 text-danger hover:bg-danger-light font-medium text-sm transition-all"
      >
        <LogOut className="w-4 h-4" />
        Sign Out
      </button>
    </div>
  );
}
