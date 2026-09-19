import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/common/Footer";
import NavBar from "@/components/common/NavBar";
import { CartProvider } from "@/context/CartContext";
import { StoreProvider } from "@/store/provider";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://ignoupower.shop"
  ),
  title: "IGNOU Power - Solved Assignments & Academic Support",
  description: "Get 100% accurate IGNOU solved assignments, projects, handwritten hardcopies, and academic support.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="">
        <StoreProvider>
          <CartProvider>
            <NavBar />
            {children}
            <Footer />
            <Toaster position="top-right" />
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
