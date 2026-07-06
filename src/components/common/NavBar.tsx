"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Menu, X, MessageCircle, Phone, Mail, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Study Store", href: "/study-store" },
    { label: "Solved Assignments", href: "/assignments" },
    { label: "Projects Help", href: "/projects" },
    { label: "Admission 2026", href: "/admission" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-[40] shadow-sm">
        {/* Top Bar Announcement */}
        <div className="bg-primary text-white text-[11px] md:text-xs py-2">
          <div className="max-w-[1200px] mx-auto px-4 xl:px-0 flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-4">
            <p className="font-medium text-center sm:text-left">
              🔥 IGNOU July 2026 Admissions & Assignment Submissions Open!
            </p>
            <div className="flex items-center gap-4 text-[10px] md:text-xs text-gray-300">
              <a href="tel:+919876543210" className="hover:text-accent font-semibold flex items-center gap-1 transition-colors">
                <Phone size={11} />
                <span>+91 98765 43210</span>
              </a>
              <span className="hidden sm:inline">|</span>
              <a href="mailto:support@ignouhelping.com" className="hover:text-accent font-semibold hidden sm:flex items-center gap-1 transition-colors">
                <Mail size={11} />
                <span>support@ignouhelping.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Navbar Container */}
        <div className="max-w-[1200px] mx-auto px-4 xl:px-0">
          <div className="flex items-center justify-between py-3.5 md:py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5 md:gap-2 group shrink-0">
              <div className="bg-cta text-white p-2 rounded-xl font-black text-lg md:text-xl shadow-md shadow-cta/15 transition-transform group-hover:scale-105 duration-300">
                IH
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-heading font-black text-base md:text-lg text-primary tracking-tight">
                  IGNOU <span className="text-cta">HELPING</span>
                </span>
                <span className="text-[8px] md:text-[9px] text-gray font-bold tracking-widest uppercase">
                  Academic Partner
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-[13px] xl:text-sm font-bold transition-all duration-300 relative py-1 hover:text-cta
                      ${isActive ? "text-cta" : "text-main-gray"}
                    `}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-cta rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              {/* User Profile */}
              <Link
                href="/dashboard"
                className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-150 flex items-center justify-center text-main-gray hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                title="Dashboard"
              >
                <User size={16} className="md:size-[18px]" />
              </Link>

              {/* Cart Icon */}
              <Link
                href="/cart"
                className="relative w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-150 flex items-center justify-center text-main-gray hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                title="Shopping Cart"
              >
                <ShoppingCart size={16} className="md:size-[18px]" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 md:w-5 md:h-5 rounded-full bg-cta text-white text-[9px] md:text-[10px] font-black flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              </Link>

              {/* WhatsApp Contact button */}
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 bg-green text-white px-4 py-2 rounded-full text-xs font-bold shadow-md shadow-green/10 hover:bg-green/90 transition-all active:scale-[0.98]"
              >
                <MessageCircle size={14} fill="currentColor" />
                WhatsApp Help
              </a>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-150 flex items-center justify-center text-main-gray hover:bg-gray-50 transition-all cursor-pointer"
              >
                <Menu size={18} className="md:size-[20px]" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[50] lg:hidden transition-opacity duration-300 cursor-pointer"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[310px] sm:w-[350px] bg-white z-[60] shadow-2xl lg:hidden transform transition-transform duration-300 ease-in-out flex flex-col p-6
          ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-5 border-b border-gray-100 mb-6">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="bg-cta text-white p-2 rounded-xl font-black text-lg">IH</div>
            <div className="flex flex-col leading-tight">
              <span className="font-heading font-black text-base text-primary">IGNOU HELPING</span>
              <span className="text-[8px] text-gray font-bold tracking-widest uppercase">Student Desk</span>
            </div>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="w-9 h-9 rounded-full border border-gray-150 flex items-center justify-center text-main-gray hover:bg-gray-50 transition-all cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="flex flex-col gap-1.5 flex-1 overflow-y-auto pr-1">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all duration-200
                  ${isActive 
                    ? "bg-cta/5 text-cta" 
                    : "text-main-gray hover:bg-gray-50 hover:text-primary"
                  }
                `}
              >
                <span>{item.label}</span>
                <ChevronRight size={16} className={`opacity-50 ${isActive ? "text-cta opacity-100" : ""}`} />
              </Link>
            );
          })}
        </div>

        {/* Drawer Footer Contact Section */}
        <div className="pt-6 border-t border-gray-100 mt-auto flex flex-col gap-4">
          <div className="flex flex-col gap-2 text-xs text-main-gray px-1">
            <span className="font-bold text-primary">Have any queries? Contact us:</span>
            <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-cta transition-colors">
              <Phone size={14} className="text-cta" />
              <span>+91 98765 43210</span>
            </a>
            <a href="mailto:support@ignouhelping.com" className="flex items-center gap-2 hover:text-cta transition-colors">
              <Mail size={14} className="text-cta" />
              <span>support@ignouhelping.com</span>
            </a>
          </div>

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 bg-green text-white py-3.5 rounded-full text-sm font-bold shadow-md hover:bg-green/90 transition-all active:scale-[0.98]"
          >
            <MessageCircle size={18} fill="currentColor" />
            Chat on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
};

export default NavBar;
