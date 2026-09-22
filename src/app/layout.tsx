import type { Metadata } from "next";
import { Geist, Geist_Mono, Spectral } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import { SiteShell } from "@/components/page-kit";
import { CartProvider } from "@/context/CartContext";
import { StoreProvider } from "@/store/provider";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "@/components/common/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spectral = Spectral({
  variable: "--font-display",
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://ignoupower.shop"
  ),
  title: "IGNOU Power - Solved Assignments & Academic Support",
  description:
    "Get 100% accurate IGNOU solved assignments, projects, handwritten hardcopies, and academic support.",
  icons: {
    icon: "/icon.svg",
    shortcut: "/icon.svg",
    apple: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${spectral.variable} antialiased overflow-x-clip max-w-full`}
    >
      <body className="min-h-screen bg-paper text-ink overflow-x-clip max-w-full">
        <StoreProvider>
          <CartProvider>
            <Suspense fallback={null}>
              <ScrollToTop />
            </Suspense>
            <SiteShell>{children}</SiteShell>
            <Toaster position="top-right" />
          </CartProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
