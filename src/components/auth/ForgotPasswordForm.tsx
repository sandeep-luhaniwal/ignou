"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { KeyRound, Lock, Mail, AlertCircle, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";

export const ForgotPasswordForm: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  React.useEffect(() => {
    const isLocalLoggedIn =
      typeof window !== "undefined" &&
      (localStorage.getItem("ignou_token") || localStorage.getItem("ignou_logged_in"));

    if (isLocalLoggedIn) {
      router.replace("/dashboard");
    } else {
      setIsCheckingAuth(false);
    }
  }, [router]);

  if (isCheckingAuth) {
    return (
      <div className="w-full max-w-md p-8 text-center py-16 rounded-lg bg-glass ring-1 ring-glass-edge shadow-xs backdrop-blur-xl">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 border-3 border-azure-deep border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold text-ink/60">Checking session & redirecting...</span>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    if (!showOtp) {
      // Step 1: Request OTP
      if (!email) {
        setError("Please enter your email address.");
        return;
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Please enter a valid email address.");
        return;
      }

      try {
        setLoading(true);
        const res = await api.auth.forgotPassword(email);
        toast.success(res.message || "OTP sent to your email!");
        setShowOtp(true);
      } catch (err: any) {
        setError(err.message || "Something went wrong. Please check your email.");
      } finally {
        setLoading(false);
      }
    } else {
      // Step 2: Reset Password
      if (!otp || !newPassword || !confirmPassword) {
        setError("Please fill in all verification fields.");
        return;
      }

      if (otp.length !== 6) {
        setError("OTP must be 6 digits.");
        return;
      }

      if (newPassword.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
      }

      if (newPassword !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      try {
        setLoading(true);
        const res = await api.auth.resetPassword({
          email,
          otp,
          newPassword,
        });
        toast.success(res.message || "Password reset successful!");
        setSuccessMessage("Password reset successfully! Redirecting you to sign in...");
        
        setTimeout(() => {
          router.push("/auth/sign-in");
        }, 2500);
      } catch (err: any) {
        setError(err.message || "Failed to reset password. Please check your OTP.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-lg bg-glass ring-1 ring-glass-edge shadow-xs backdrop-blur-xl text-left">
      <div className="mb-6">
        <span className="inline-flex items-center gap-1.5 rounded-full bg-azure-soft/30 px-3 py-1 text-xs font-bold text-azure-deep ring-1 ring-azure-deep/20 mb-3">
          <KeyRound className="size-3.5" />
          <span>Security Reset</span>
        </span>
        <h2 className="text-2xl font-bold text-foreground">
          {showOtp ? "Reset Password" : "Forgot Password"}
        </h2>
        <p className="text-sm text-ink/65 mt-1 leading-relaxed">
          {showOtp 
            ? "Verify the 6-digit OTP code sent to your email and set your new password."
            : "Enter your registered email address to receive a verification OTP."}
        </p>
      </div>

      {successMessage ? (
        <div className="p-4 bg-azure-soft/20 ring-1 ring-azure-deep/30 rounded-lg text-sm text-azure-deep font-semibold text-center mb-4 flex items-center justify-center gap-2">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>{successMessage}</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {!showOtp ? (
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
          ) : (
            <>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full rounded-lg bg-surface-strong/50 opacity-70 px-4 py-2.5 text-sm text-foreground ring-1 ring-border outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5">
                  One-Time Password (OTP) *
                </label>
                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                  required
                  className="w-full rounded-lg bg-surface-strong px-4 py-2.5 text-sm text-foreground placeholder:text-ink/40 ring-1 ring-border outline-none focus:ring-2 focus:ring-azure-deep/50 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5">
                  New Password *
                </label>
                <div className="relative">
                  <Lock className="size-4 text-ink/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="At least 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full rounded-lg bg-surface-strong pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-ink/40 ring-1 ring-border outline-none focus:ring-2 focus:ring-azure-deep/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-foreground cursor-pointer transition-colors p-0.5"
                    aria-label={showNewPassword ? "Hide password" : "Show password"}
                  >
                    {showNewPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5">
                  Confirm New Password *
                </label>
                <div className="relative">
                  <Lock className="size-4 text-ink/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Re-enter your new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full rounded-lg bg-surface-strong pl-10 pr-10 py-2.5 text-sm text-foreground placeholder:text-ink/40 ring-1 ring-border outline-none focus:ring-2 focus:ring-azure-deep/50 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-foreground cursor-pointer transition-colors p-0.5"
                    aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                  >
                    {showConfirmPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                  </button>
                </div>
              </div>

              <div className="text-right">
                <button
                  type="button"
                  onClick={() => {
                    setShowOtp(false);
                    setOtp("");
                    setNewPassword("");
                    setConfirmPassword("");
                    setError(null);
                  }}
                  className="text-xs text-azure-deep hover:underline font-semibold cursor-pointer"
                >
                  Change Email Address
                </button>
              </div>
            </>
          )}

          {error && (
            <div className="p-3 bg-rose-soft/20 ring-1 ring-rose-deep/20 rounded-lg text-xs text-rose-deep font-semibold flex items-center gap-2">
              <AlertCircle className="size-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Button
            type="submit"
            variant="gradient"
            size="lg"
            disabled={loading}
            className="w-full rounded-lg font-bold shadow-md mt-2"
          >
            {loading 
              ? (showOtp ? "Resetting password..." : "Sending OTP...") 
              : (showOtp ? "Reset Password" : "Send Reset OTP")}
          </Button>
        </form>
      )}

      <div className="mt-8 pt-6 border-t border-border text-center">
        <p className="text-xs text-ink/60 font-medium">
          Remember your password?{" "}
          <Link
            href="/auth/sign-in"
            className="text-azure-deep font-bold hover:underline ml-1"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;

