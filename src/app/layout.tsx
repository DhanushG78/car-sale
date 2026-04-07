import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: "AutoBazaar - Find Your Perfect Used Car",
  description:
    "Discover thousands of verified used cars at the best prices. Buy and sell with confidence on AutoBazaar, India's most trusted used car marketplace.",
  keywords: "used cars, buy car, sell car, second hand cars, AutoBazaar",
};

export default function RootLayout({
  children,
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
      </body>
    </html>
  );
}
