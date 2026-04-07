"use client";

<<<<<<< HEAD
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
=======
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore, User } from "@/store/useStore";
import { useAppConfig } from "@/hooks/useAppConfig";
import { Car, User as UserIcon, ShoppingCart, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const router = useRouter();
  const login = useStore((state) => state.login);
  const register = useStore((state) => state.register);
  const { appName } = useAppConfig();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) return;
    
    setLoading(true);
    setError("");

    try {
      if (isRegister) {
        await register(email, password, name || email.split("@")[0], role);
      } else {
        await login(email, password);
      }
      router.push("/");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "An error occurred during authentication");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950 px-6 py-12">
      <div className="w-full max-w-xl space-y-10 rounded-[2.5rem] bg-white dark:bg-gray-900 p-12 shadow-2xl border border-gray-100 dark:border-gray-800">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-3xl flex items-center justify-center shadow-xl shadow-blue-500/20 mb-6">
            <Car className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
            {isRegister ? "Join " : "Welcome to "}{appName}
          </h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            {isRegister ? "Select your persona to get started" : "Sign in to manage your showroom"}
          </p>
        </div>

        <form className="space-y-8" onSubmit={handleSubmit}>
          
          {/* Mode Toggle */}
          <div className="flex p-1 bg-gray-100 dark:bg-gray-800 rounded-2xl">
            <button
              type="button"
              onClick={() => setIsRegister(false)}
              className={`flex-1 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${!isRegister ? "bg-white dark:bg-gray-700 text-blue-600 shadow-md" : "text-gray-400"}`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => setIsRegister(true)}
              className={`flex-1 py-3 rounded-xl text-sm font-black uppercase tracking-widest transition-all ${isRegister ? "bg-white dark:bg-gray-700 text-blue-600 shadow-md" : "text-gray-400"}`}
            >
              Register
            </button>
          </div>

          <div className="space-y-5">
            {isRegister && (
              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full rounded-2xl border-none bg-gray-50 dark:bg-gray-800 px-5 py-4 font-medium focus:ring-4 focus:ring-blue-500/10 dark:text-gray-100 transition shadow-sm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-2xl border-none bg-gray-50 dark:bg-gray-800 px-5 py-4 font-medium focus:ring-4 focus:ring-blue-500/10 dark:text-gray-100 transition shadow-sm"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Password</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-2xl border-none bg-gray-50 dark:bg-gray-800 px-5 py-4 font-medium focus:ring-4 focus:ring-blue-500/10 dark:text-gray-100 transition shadow-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-xl text-xs font-bold border border-red-100 dark:border-red-900/30">
                ⚠️ {error}
              </div>
            )}

            {/* Role Selection (Only for Register) */}
            {isRegister && (
              <div className="space-y-3">
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2 ml-1">Account Type</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setRole("buyer")}
                    className={`flex flex-col items-center gap-3 p-6 rounded-3xl border-2 transition-all ${role === "buyer" ? "bg-blue-50/50 border-blue-600 dark:bg-blue-900/10" : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"}`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${role === "buyer" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-400"}`}>
                      <ShoppingCart className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-black uppercase tracking-widest ${role === "buyer" ? "text-blue-600 dark:text-blue-400" : "text-gray-400"}`}>Buyer</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole("seller")}
                    className={`flex flex-col items-center gap-3 p-6 rounded-3xl border-2 transition-all ${role === "seller" ? "bg-blue-50/50 border-blue-600 dark:bg-blue-900/10" : "bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-800"}`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${role === "seller" ? "bg-blue-600 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-400"}`}>
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-black uppercase tracking-widest ${role === "seller" ? "text-blue-600 dark:text-blue-400" : "text-gray-400"}`}>Seller</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-2xl shadow-blue-500/30 hover:bg-blue-700 transition transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {loading && <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
            {isRegister ? "Create Account" : "Sign In"}
          </button>

          {!isRegister && (
             <div className="text-center font-bold text-xs text-gray-400 uppercase tracking-widest py-4 border-t border-gray-100 dark:border-gray-800">
                Securely synced with <span className="text-blue-600">Firebase</span> base cloud
             </div>
          )}
        </form>
>>>>>>> a1a6ea26ca54eab8c6546f91c2993b340edb4007
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> a1a6ea26ca54eab8c6546f91c2993b340edb4007
