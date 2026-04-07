"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/store/authStore";
import toast from "react-hot-toast";
import { LogIn, Mail, Lock, Eye, EyeOff, Car } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, loadSession } = useAuthStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/profile");
    }
  }, [isAuthenticated, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        toast.success("Welcome back!");
        router.push("/");
      } else {
        toast.error("Invalid email or password");
      }
      setLoading(false);
    }, 800);
  };

  const inputClass =
    "w-full pl-11 pr-4 py-3.5 bg-surface border border-border rounded-xl text-sm text-text placeholder:text-text-muted focus:border-primary transition-all";

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-scale-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
              <Car className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-text">
              Auto<span className="gradient-text">Bazaar</span>
            </span>
          </div>
          <h1 className="text-2xl font-bold text-text">Welcome Back</h1>
          <p className="text-text-secondary text-sm mt-1">
            Sign in to your account
          </p>
        </div>

        {/* Form */}
        <div className="bg-card rounded-2xl border border-border p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className={inputClass}
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className={`${inputClass} pr-11`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-primary to-primary-hover text-white font-semibold text-sm shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all btn-shine disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Demo credentials */}
          <div className="mt-6 p-4 rounded-xl bg-primary-light border border-primary/20">
            <p className="text-xs text-primary-hover font-medium mb-2">
              Demo Account
            </p>
            <p className="text-xs text-text-secondary">
              Register a new account first, then use those credentials to login.
            </p>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-text-muted">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="text-primary-hover hover:underline font-medium"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
