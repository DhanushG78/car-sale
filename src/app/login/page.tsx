"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore, User } from "@/store/useStore";
import { useAppConfig } from "@/hooks/useAppConfig";
import { Car, User as UserIcon, ShoppingCart, ShieldCheck } from "lucide-react";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"buyer" | "seller">("buyer");
  const router = useRouter();
  const setUser = useStore((state) => state.setUser);
  const { appName } = useAppConfig();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    const dummyUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: name || email.split("@")[0],
      email: email,
      role: email === "admin@gmail.com" ? "admin" : role,
      createdAt: new Date().toISOString()
    };

    setUser(dummyUser);
    router.push("/");
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
            className="w-full bg-blue-600 text-white py-5 rounded-[2rem] font-black uppercase tracking-widest text-sm shadow-2xl shadow-blue-500/30 hover:bg-blue-700 transition transform hover:-translate-y-1 active:scale-95"
          >
            {isRegister ? "Create Account" : "Sign In"}
          </button>

          {!isRegister && (
             <div className="text-center font-bold text-xs text-gray-400 uppercase tracking-widest py-4 border-t border-gray-100 dark:border-gray-800">
                Tip: Login as <span className="text-blue-600">admin@gmail.com</span> for admin features
             </div>
          )}
        </form>
      </div>
    </div>
  );
}

