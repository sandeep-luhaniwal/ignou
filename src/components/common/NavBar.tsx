"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, User, Menu, X, MessageCircle, Phone, Mail, ChevronRight, LogOut } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout, getProfileRequest } from "@/store/slices/authSlice";

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Auto-hydrate profile if logged in
  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLoggedIn = localStorage.getItem("ignou_logged_in") === "true";
      const token = localStorage.getItem("ignou_token");
      if (isLoggedIn && token && !user) {
        dispatch(getProfileRequest());
      }
    }
  }, [user, dispatch]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
    { label: "Solved Assignments", href: "/assignments" },
    { label: "Projects Help", href: "/projects" },
    { label: "Admission 2026", href: "/admission" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav className="w-full bg-white border-b border-gray-100 sticky top-0 z-40 shadow-sm">
        {/* Top Bar Announcement */}
        <div className="bg-primary text-white text-xs py-2">
          <div className="max-w-7xl mx-auto px-4 xl:px-0 flex flex-col sm:flex-row justify-between items-center gap-1.5 sm:gap-4">
            <p className="font-medium text-center sm:text-left">
              🔥 IGNOU July 2026 Admissions & Assignment Submissions Open!
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-300">
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
        <div className="max-w-7xl mx-auto px-4 xl:px-0">
          <div className="flex items-center justify-between py-3.5 md:py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1.5 md:gap-2 group shrink-0">
              <div className="bg-cta text-white p-2 rounded-xl font-black text-lg md:text-xl shadow-md shadow-cta/15 transition-transform group-hover:scale-105 duration-300">
                IP
              </div>
              <div className="flex flex-col leading-tight">
                <span className="font-heading font-black text-base md:text-lg text-primary tracking-tight">
                  IGNOU <span className="text-cta">POWER</span>
                </span>
                <span className="text-2xs text-gray font-bold tracking-widest uppercase">
                  Academic Partner
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden lg:flex items-center gap-3.5 xl:gap-8">
              {navLinks.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`text-xs xl:text-sm font-bold transition-all duration-300 relative py-1 hover:text-cta
                      ${isActive ? "text-cta" : "text-main-gray"}
                    `}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-cta rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 md:gap-3 shrink-0">
              {/* User Profile / Login Dropdown */}
              {user ? (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="w-9 h-9 md:w-10 md:h-10 rounded-full bg-custom-orange-gradient text-white font-black text-sm flex items-center justify-center cursor-pointer shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
                    title="User Profile Menu"
                  >
                    {user.name ? user.name.charAt(0).toUpperCase() : "S"}
                  </button>

                  {/* Dropdown Menu with animation */}
                  <div
                    className={`absolute -right-20 md:right-0 mt-2.5 w-64 bg-white border border-gray-100 rounded-2xl shadow-xl z-50 p-4 transition-all duration-200 transform origin-top-right
                      ${dropdownOpen 
                        ? "opacity-100 scale-100 translate-y-0" 
                        : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                      }
                    `}
                  >
                    {/* User Info Header */}
                    <div className="flex items-center gap-3 pb-3 border-b border-gray-100">
                      <div className="w-10 h-10 rounded-full bg-cta/10 text-cta flex items-center justify-center font-black text-sm shrink-0">
                        {user.name ? user.name.charAt(0).toUpperCase() : "S"}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-heading font-black text-sm text-primary truncate leading-tight">
                          {user.name || "Student"}
                        </span>
                        <span className="text-xs text-gray truncate mt-0.5">
                          {user.email || ""}
                        </span>
                      </div>
                    </div>

                    {/* Actions List */}
                    <div className="flex flex-col gap-1 mt-3">
                      <Link
                        href="/dashboard"
                        onClick={() => setDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-bold text-main-gray hover:bg-gray-50 hover:text-cta transition-all"
                      >
                        <User size={15} className="shrink-0 text-gray" />
                        <span>Student Dashboard</span>
                      </Link>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          dispatch(logout());
                          router.push("/auth/sign-in");
                        }}
                        className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm font-bold text-main-red hover:bg-red/5 hover:text-red transition-all cursor-pointer text-left w-full"
                      >
                        <LogOut size={15} className="shrink-0 text-main-red" />
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/auth/sign-in"
                  className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-150 flex items-center justify-center text-main-gray hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                  title="Sign In"
                >
                  <User size={16} className="md:w-4.5 md:h-4.5" />
                </Link>
              )}

              {/* Cart Icon */}
              <Link
                href="/cart"
                className="relative w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-150 flex items-center justify-center text-main-gray hover:bg-primary hover:text-white hover:border-primary transition-all duration-300"
                title="Shopping Cart"
              >
                <ShoppingCart size={16} className="md:w-4.5 md:h-4.5" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 md:w-5 md:h-5 rounded-full bg-cta text-white text-2xs font-black flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              </Link>

              {/* WhatsApp Contact button */}
              <a
                href="https://wa.me/919999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 bg-green text-white px-4 py-2 rounded-full text-xs font-bold shadow-md shadow-green/10 hover:bg-green/90 transition-all active:scale-95"
              >
                <MessageCircle size={14} fill="currentColor" />
                WhatsApp Help
              </a>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden w-9 h-9 md:w-10 md:h-10 rounded-full border border-gray-150 flex items-center justify-center text-main-gray hover:bg-gray-50 transition-all cursor-pointer"
              >
                <Menu size={18} className="md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 lg:hidden transition-opacity duration-300 cursor-pointer"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Navigation Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-77.5 sm:w-87.5 bg-white z-60 shadow-2xl lg:hidden transform transition-transform duration-300 ease-in-out flex flex-col p-6
          ${mobileMenuOpen ? "translate-x-0" : "translate-x-full"}
        `}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between pb-5 border-b border-gray-100 mb-6">
          <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="bg-cta text-white p-2 rounded-xl font-black text-lg">IP</div>
            <div className="flex flex-col leading-tight">
              <span className="font-heading font-black text-base text-primary">IGNOU POWER</span>
              <span className="text-2xs text-gray font-bold tracking-widest uppercase">Student Desk</span>
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
          {user && (
            <div className="px-4 py-3 bg-light-orange/30 border border-cta/10 rounded-2xl mb-2">
              <span className="text-2xs uppercase font-bold tracking-widest text-cta block mb-0.5">Logged In As</span>
              <div className="font-heading font-black text-sm text-primary truncate">{user.name}</div>
              <div className="text-xs text-gray truncate">{user.email}</div>
            </div>
          )}
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
          {user ? (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                dispatch(logout());
                router.push("/auth/sign-in");
              }}
              className="flex items-center justify-between w-full px-4 py-3 mt-2 rounded-2xl text-sm font-bold text-main-red hover:bg-red/5 transition-all duration-200 cursor-pointer"
            >
              <span>Logout</span>
              <LogOut size={16} />
            </button>
          ) : (
            <Link
              href="/auth/sign-in"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between px-4 py-3 mt-2 rounded-2xl text-sm font-bold text-cta hover:bg-cta/5 transition-all duration-200"
            >
              <span>Sign In</span>
              <ChevronRight size={16} className="text-cta" />
            </Link>
          )}
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
            className="flex items-center justify-center gap-2 bg-green text-white py-3.5 rounded-full text-sm font-bold shadow-md hover:bg-green/90 transition-all active:scale-95"
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
