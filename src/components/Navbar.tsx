"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";
import { useWishlistStore } from "@/store/wishlistStore";
import {
  Car,
  Heart,
  Menu,
  X,
  LogIn,
  LogOut,
  User,
  Plus,
  Search,
  Store,
} from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout, loadSession } = useAuthStore();
  const { wishlist, loadWishlist } = useWishlistStore();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    loadSession();
    loadWishlist();
  }, [loadSession, loadWishlist]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/marketplace", label: "Marketplace", icon: Store },
    { href: "/sell", label: "Sell Car", icon: Plus },
    { href: "/wishlist", label: "Wishlist", icon: Heart, badge: wishlist.length },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow">
              <Car className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-black text-text hidden sm:block tracking-tighter">
              Auto<span className="gradient-text">Bazaar</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive(link.href)
                    ? "bg-primary-light text-primary-hover shadow-sm"
                    : "text-text-secondary hover:text-text hover:bg-surface-hover"
                }`}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
                {link.badge ? (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-[10px] flex items-center justify-center font-black border-2 border-background shadow-lg">
                    {link.badge}
                  </span>
                ) : null}
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/marketplace"
              className="w-10 h-10 rounded-xl bg-surface hover:bg-surface-hover border border-border flex items-center justify-center text-text-secondary hover:text-text transition-all"
            >
              <Search className="w-4.5 h-4.5" />
            </Link>

            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <Link
                  href="/profile"
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive("/profile")
                      ? "bg-primary-light text-primary-hover"
                      : "text-text-secondary hover:text-text hover:bg-surface-hover"
                  }`}
                >
                  <User className="w-4 h-4" />
                  {user?.name?.split(" ")[0]}
                </Link>
                <button
                  onClick={logout}
                  className="flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-semibold text-danger hover:bg-danger-light transition-all"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-text-secondary hover:text-text transition-all"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-primary to-primary-hover text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all btn-shine"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-text transition-all"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden glass border-t border-border animate-slide-down">
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive(link.href)
                    ? "bg-primary/15 text-primary-hover"
                    : "text-text-secondary hover:text-text hover:bg-surface-hover"
                }`}
              >
                <link.icon className="w-5 h-5" />
                {link.label}
                {link.badge ? (
                  <span className="ml-auto w-6 h-6 rounded-full bg-primary text-white text-xs flex items-center justify-center font-bold">
                    {link.badge}
                  </span>
                ) : null}
              </Link>
            ))}

            <div className="border-t border-border pt-3 mt-3">
              {isAuthenticated ? (
                <>
                  <Link
                    href="/profile"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-text hover:bg-surface-hover transition-all"
                  >
                    <User className="w-5 h-5" />
                    Profile ({user?.name})
                  </Link>
                  <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-danger hover:bg-danger-light transition-all w-full"
                  >
                    <LogOut className="w-5 h-5" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-text-secondary hover:text-text hover:bg-surface-hover transition-all"
                  >
                    <LogIn className="w-5 h-5" />
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium bg-gradient-to-r from-primary to-primary-hover text-white transition-all mt-1"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
