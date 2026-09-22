"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  X,
  Phone,
  ShoppingCart,
  User,
  LogOut,
  LayoutDashboard,
  GraduationCap,
  FolderGit2,
  HelpCircle,
  Mail,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useAppDispatch, useAppSelector } from "@/store";
import { logout } from "@/store/slices/authSlice";
import Image from "next/image";

const nav = [
  { label: "Assignments", href: "/assignments", icon: GraduationCap, badge: "Solved" },
  { label: "Project Help", href: "/project-help", icon: FolderGit2, badge: "Synopsis" },
  { label: "Admission 2026", href: "/admission-2026", icon: Sparkles, badge: "Guidance" },
  { label: "FAQ", href: "/faq", icon: HelpCircle, badge: null },
  { label: "Contact", href: "/contact", icon: Mail, badge: null },
] as const;

const NavBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { cartItems } = useCart();
  const { user } = useAppSelector((state) => state.auth);

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const cartCount = cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Lock document scroll completely when full-screen mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-glass-edge bg-paper/85 backdrop-blur-2xl shadow-xs transition-all">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:py-3">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 group shrink-0" aria-label="IGNOU Power home">
          <Image
            src="/images/svg/main-logo.svg"
            alt="IGNOU Power Logo"
            width={140}
            height={48}
            className="h-9.5 w-auto object-contain transition-transform group-hover:scale-[1.02]"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {nav.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3.5 py-1.5 text-sm font-medium transition-colors ${isActive
                    ? "bg-surface-strong text-azure-deep shadow-xs ring-1 ring-border font-bold"
                    : "text-ink/70 hover:bg-surface-strong hover:text-ink"
                  }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden lg:flex items-center gap-2.5 shrink-0">
          {/* Shopping Cart Button */}
          <Link
            href="/cart"
            className="relative grid size-9.5 place-items-center rounded-lg bg-surface-strong ring-1 ring-border text-ink/80 shadow-xs hover:bg-glass hover:text-foreground transition-all duration-200"
            title="Shopping Cart"
          >
            <ShoppingCart className="size-4.5 text-azure-deep" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-rose text-[10.5px] font-black text-white animate-in zoom-in-75">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Profile / Login */}
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="inline-flex h-9.5 items-center gap-2 rounded-lg bg-surface-strong px-3 text-sm font-semibold text-foreground ring-1 ring-border shadow-xs hover:bg-glass cursor-pointer transition-all duration-200 active:scale-95"
                title="Account Menu"
              >
                <span className="grid size-6 place-items-center rounded-md bg-linear-to-br from-rose to-azure text-[11px] font-bold text-white shadow-xs">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </span>
                <span className="max-w-24 truncate">{user.name?.split(" ")[0] || "Account"}</span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-lg bg-card p-3 shadow-xl ring-1 ring-border backdrop-blur-xl z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150">
                  <div className="px-2 py-1.5 border-b border-border mb-2">
                    <p className="text-xs font-bold text-foreground truncate">{user.name || "Student"}</p>
                    <p className="text-[11px] text-ink/50 truncate">{user.email || ""}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-semibold text-ink/80 hover:bg-surface-strong hover:text-foreground transition-colors"
                  >
                    <LayoutDashboard className="size-3.5 text-azure-deep" />
                    <span>Student Dashboard</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setUserDropdownOpen(false);
                      dispatch(logout());
                      router.push("/auth/sign-in");
                    }}
                    className="flex items-center gap-2 w-full rounded-lg px-2.5 py-2 text-xs font-semibold text-rose-deep hover:bg-rose-soft/20 transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="size-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              href="/auth/sign-in"
              className="inline-flex h-9.5 items-center justify-center gap-2 rounded-lg bg-surface-strong px-4 text-sm font-semibold text-ink/80 ring-1 ring-border shadow-xs hover:bg-glass hover:text-foreground transition-all duration-200"
            >
              <User className="size-4 text-azure-deep" />
              <span>Login</span>
            </Link>
          )}

          {/* Call Us Button */}
          <Button
            asChild
            variant="gradient"
            className="inline-flex h-9.5 rounded-lg px-4 text-sm font-semibold gap-2"
          >
            <a href="tel:+919876543210">
              <Phone className="size-4" />
              <span>Call us</span>
            </a>
          </Button>
        </div>

        {/* Mobile Header Controls */}
        <div className="flex lg:hidden items-center gap-2">
          {/* Mobile Cart Icon */}
          <Link
            href="/cart"
            className="relative grid size-9.5 place-items-center rounded-lg bg-surface-strong ring-1 ring-border text-ink/80 shadow-xs active:scale-95 transition-transform"
            aria-label="View Shopping Cart"
          >
            <ShoppingCart className="size-4.5 text-azure-deep" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-rose text-[10.5px] font-black text-white animate-in zoom-in-75">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Hamburger Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="grid size-9.5 place-items-center rounded-lg bg-surface-strong ring-1 ring-border text-ink/80 active:scale-95 transition-transform cursor-pointer hover:text-foreground"
            aria-label="Open Mobile Menu"
          >
            <Menu className="size-5" />
          </button>
        </div>
      </div>

      {/* FULL-SCREEN Clean Mobile Navigation Modal Rendered directly to document.body via Portal */}
      {mounted &&
        mobileMenuOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[99999] w-screen h-[100dvh] bg-card flex flex-col justify-between overflow-hidden lg:hidden animate-in fade-in duration-200"
            style={{ overscrollBehavior: "contain" }}
          >
            {/* Top Bar inside Fullscreen Menu - EXACT match with header dimensions to prevent jump */}
            <div className="flex items-center justify-between px-4 py-2.5 sm:py-3 border-b border-border bg-paper shrink-0 shadow-xs">
              <Link
                href="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 group shrink-0"
              >
                <Image
                  src="/images/svg/main-logo.svg"
                  alt="IGNOU Power Logo"
                  width={140}
                  height={48}
                  className="h-9.5 w-auto object-contain"
                  priority
                />
              </Link>

              <div className="flex items-center gap-2">
                {/* Mobile Cart Icon in Drawer */}
                <Link
                  href="/cart"
                  onClick={() => setMobileMenuOpen(false)}
                  className="relative grid size-9.5 place-items-center rounded-lg bg-surface-strong ring-1 ring-border text-ink/80 shadow-xs active:scale-95 transition-transform"
                  aria-label="View Shopping Cart"
                >
                  <ShoppingCart className="size-4.5 text-azure-deep" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex size-5 items-center justify-center rounded-full bg-rose text-[10.5px] font-black text-white animate-in zoom-in-75">
                      {cartCount}
                    </span>
                  )}
                </Link>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="grid size-9.5 place-items-center rounded-lg bg-surface-strong ring-1 ring-border text-ink/80 active:scale-95 transition-transform cursor-pointer hover:text-foreground"
                  aria-label="Close menu"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Navigation Links Area (Scrollable within menu only) */}
            <div className="px-4 py-4 flex-1 overflow-y-auto space-y-1.5 overscroll-contain">
              <p className="text-[11px] font-bold uppercase tracking-wider text-ink/45 px-2 mb-2">
                Explore Services
              </p>
              {nav.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between p-3 rounded-xl text-[15px] font-bold transition-all ${
                      isActive
                        ? "bg-azure-soft/35 text-azure-deep ring-1 ring-azure-deep/30 shadow-xs"
                        : "text-foreground hover:bg-surface-strong"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`grid size-9.5 place-items-center rounded-lg ring-1 ${
                          isActive
                            ? "bg-azure-deep text-white ring-azure-deep"
                            : "bg-surface-strong text-ink/75 ring-border"
                        }`}
                      >
                        <Icon className="size-4.5" />
                      </div>
                      <span>{item.label}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {item.badge && (
                        <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-azure-soft/50 text-azure-deep">
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight className="size-4 text-ink/40" />
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Bottom Account & Actions Area */}
            <div className="p-4 pb-6 border-t border-border bg-paper/95 backdrop-blur-md space-y-2.5 shrink-0 shadow-lg">
              {/* User Account / Auth */}
              {user ? (
                <div className="p-3 bg-surface-strong/60 rounded-xl ring-1 ring-border flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="grid size-9 place-items-center rounded-lg bg-linear-to-br from-rose to-azure text-white font-bold text-xs shadow-xs">
                      {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-foreground leading-tight truncate max-w-40">
                        {user.name || "Student"}
                      </p>
                      <p className="text-[11px] text-ink/50 leading-tight mt-0.5 truncate max-w-40">
                        {user.email || ""}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Link
                      href="/dashboard"
                      onClick={() => setMobileMenuOpen(false)}
                      className="p-2 rounded-lg bg-azure-soft/30 text-azure-deep hover:bg-azure-soft transition-colors"
                      title="Dashboard"
                    >
                      <LayoutDashboard className="size-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileMenuOpen(false);
                        dispatch(logout());
                        router.push("/auth/sign-in");
                      }}
                      className="p-2 rounded-lg bg-rose-soft/30 text-rose-deep hover:bg-rose-soft transition-colors cursor-pointer"
                      title="Logout"
                    >
                      <LogOut className="size-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="/auth/sign-in"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-surface-strong text-foreground font-bold text-sm ring-1 ring-border shadow-xs hover:bg-glass active:scale-98 transition-all"
                >
                  <User className="size-4 text-azure-deep" />
                  <span>Student Login / Register</span>
                </Link>
              )}

              {/* Direct Call Button */}
              <a
                href="tel:+919876543210"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-linear-to-r from-rose to-azure text-white font-bold text-sm shadow-md active:scale-98 transition-transform"
              >
                <Phone className="size-4 fill-current" />
                <span>Direct Call: +91 98765 43210</span>
              </a>
            </div>
          </div>,
          document.body
        )}
    </header>
  );
};

export default NavBar;
