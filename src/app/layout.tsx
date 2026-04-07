import type { Metadata } from "next";
<<<<<<< HEAD
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "AutoBazaar - Find Your Perfect Used Car",
  description:
    "Discover thousands of verified used cars at the best prices. Buy and sell with confidence on AutoBazaar, India's most trusted used car marketplace.",
  keywords: "used cars, buy car, sell car, second hand cars, AutoBazaar",
=======
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { FloatingCompareBar } from "@/components/common/FloatingCompareBar";
import { StoreInitializer } from "@/components/shared/StoreInitializer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AutoBazaar - Premium Used Car Marketplace",
  description: "Buy and sell premium used cars with ease and confidence.",
>>>>>>> a1a6ea26ca54eab8c6546f91c2993b340edb4007
};

export default function RootLayout({
  children,
<<<<<<< HEAD
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background text-text">
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "#1a1a25",
              color: "#f1f5f9",
              border: "1px solid #2a2a3a",
              borderRadius: "12px",
              fontSize: "14px",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#fff",
              },
            },
          }}
        />
        <Navbar />
        <main className="pt-16 lg:pt-18 min-h-screen">{children}</main>
        <Footer />
=======
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col font-sans">
        <StoreInitializer />
        <Navbar />
        <main className="flex-1 w-full bg-gray-50 dark:bg-gray-950 px-0">
          {children}
        </main>
        <FloatingCompareBar />
>>>>>>> a1a6ea26ca54eab8c6546f91c2993b340edb4007
      </body>
    </html>
  );
}
