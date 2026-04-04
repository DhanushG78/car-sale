import type { Metadata } from "next";
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
};

export default function RootLayout({
  children,
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
      </body>
    </html>
  );
}
