"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { LogIn, Lock, Mail, AlertCircle, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { loginSuccess } from "@/store/slices/authSlice";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";

export const SignInForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/dashboard";

  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const isLocalLoggedIn =
      typeof window !== "undefined" &&
      (localStorage.getItem("ignou_token") || localStorage.getItem("ignou_logged_in"));

    if (token || isLocalLoggedIn) {
      router.replace(redirectPath);
    } else {
      setIsCheckingAuth(false);
    }
  }, [token, redirectPath, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError(null);

    if (!email || !password) {
      setLocalError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setLocalError("Please enter a valid email address.");
      return;
    }

    try {
      setLocalLoading(true);
      const res = await api.auth.login(email, password);
      dispatch(loginSuccess(res));
      toast.success("Logged in successfully!");
      router.replace(redirectPath);
    } catch (err: any) {
      setLocalError(err.message || "Invalid email or password.");
    } finally {
      setLocalLoading(false);
    }
  };

  if (isCheckingAuth || token) {
    return (
      <div className="w-full max-w-md p-8 text-center py-16 rounded-lg bg-glass ring-1 ring-glass-edge shadow-xs backdrop-blur-xl">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 border-3 border-rose border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold text-ink/60">Checking session & redirecting...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md p-8 rounded-lg bg-glass ring-1 ring-glass-edge shadow-xs backdrop-blur-xl text-left">
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-azure-soft/30 px-3 py-1 text-xs font-bold text-azure-deep ring-1 ring-azure-deep/20 mb-3">
          <LogIn className="size-3.5" />
          <span>Student Login</span>
        </span>
        <h2 className="text-2xl font-bold text-foreground">
          Welcome Back
        </h2>
        <p className="text-sm text-ink/65 mt-1 leading-relaxed">
          Sign in to access your dashboard, orders, and study materials.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="size-4 text-ink/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="email"
              placeholder="student@ignou.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg bg-surface-strong pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-ink/40 ring-1 ring-border outline-none focus:ring-2 focus:ring-azure-deep/50 transition-all"
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/80">
              Password *
            </label>
            <Link
              href="/auth/forgot-password"
              className="text-xs text-azure-deep hover:underline font-semibold"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="size-4 text-ink/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-lg bg-surface-strong pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-ink/40 ring-1 ring-border outline-none focus:ring-2 focus:ring-azure-deep/50 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-foreground cursor-pointer transition-colors p-0.5"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
            </button>
          </div>
        </div>

        {(error || localError) && (
          <div className="p-3 bg-rose-soft/20 ring-1 ring-rose-deep/20 rounded-lg text-xs text-rose-deep font-semibold flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0" />
            <span>{error || localError}</span>
          </div>
        )}

        <Button
          type="submit"
          variant="gradient"
          size="lg"
          disabled={loading || localLoading}
          className="w-full rounded-lg font-bold shadow-md mt-2"
        >
          {loading || localLoading ? "Signing In..." : "Sign In"}
        </Button>
      </form>

      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-xs text-ink/60 font-medium">
          Don't have an account?{" "}
          <Link
            href={`/auth/sign-up?redirect=${encodeURIComponent(redirectPath)}`}
            className="text-rose-deep font-bold hover:underline ml-1"
          >
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignInForm;

