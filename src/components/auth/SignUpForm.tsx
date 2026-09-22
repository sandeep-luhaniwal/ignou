"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { UserPlus, Lock, Mail, User, AlertCircle, MailCheck, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { registerSuccess } from "@/store/slices/authSlice";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";

export const SignUpForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/dashboard";

  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  
  // Custom states for local register/OTP handling
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState<string[]>(Array(6).fill(""));
  const [otpError, setOtpError] = useState<string | null>(null);
  const [otpLoading, setOtpLoading] = useState(false);

  const otpInputsRef = useRef<HTMLInputElement[]>([]);

  const checkClipboardAndPaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      const cleaned = text.trim().replace(/\D/g, "");
      if (cleaned.length === 6) {
        setOtp(cleaned.split(""));
        otpInputsRef.current[5]?.focus();
      }
    } catch (err) {
      // Fail silently if clipboard API is not permitted or supported
    }
  };

  useEffect(() => {
    if (showOtpModal) {
      setTimeout(() => {
        otpInputsRef.current[0]?.focus();
      }, 50);

      checkClipboardAndPaste();

      const handleWindowFocus = () => {
        checkClipboardAndPaste();
      };
      window.addEventListener("focus", handleWindowFocus);
      return () => {
        window.removeEventListener("focus", handleWindowFocus);
      };
    }
  }, [showOtpModal]);

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

    if (!name || !email || !password || !confirmPassword) {
      setLocalError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setLocalError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    try {
      setLocalLoading(true);
      const res = await api.auth.register({ name, email, password });
      toast.success(res.message || "OTP sent to email for verification!");
      setShowOtpModal(true);
    } catch (err: any) {
      setLocalError(err.message || "Registration failed. Please try again.");
    } finally {
      setLocalLoading(false);
    }
  };

  const handleOtpChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (isNaN(Number(value))) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value !== "" && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        otpInputsRef.current[index - 1]?.focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").replace(/\D/g, "");
    if (pastedData.length === 6) {
      const newOtp = pastedData.split("");
      setOtp(newOtp);
      otpInputsRef.current[5]?.focus();
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setOtpError(null);

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setOtpError("Please enter all 6 digits of the OTP.");
      return;
    }

    try {
      setOtpLoading(true);
      const res = await api.auth.verifySignupOtp(email, otpString);
      dispatch(registerSuccess(res));
      toast.success("Account registered and verified successfully!");
      setShowOtpModal(false);
    } catch (err: any) {
      setOtpError(err.message || "Invalid or expired OTP. Please try again.");
    } finally {
      setOtpLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setOtpError(null);
    try {
      toast.loading("Sending code...", { id: "resend-otp" });
      await api.auth.register({ name, email, password });
      toast.success("A new OTP has been sent to your email!", { id: "resend-otp" });
      setOtp(Array(6).fill(""));
    } catch (err: any) {
      toast.error(err.message || "Failed to resend OTP. Please try again.", { id: "resend-otp" });
    }
  };

  if (isCheckingAuth || token) {
    return (
      <div className="w-full max-w-md p-8 text-center py-16 rounded-lg bg-glass ring-1 ring-glass-edge shadow-xs backdrop-blur-xl">
        <div className="flex flex-col items-center gap-3">
          <div className="size-8 border-3 border-rose-deep border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-bold text-ink/60">Checking session & redirecting...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-md p-8 rounded-lg bg-glass ring-1 ring-glass-edge shadow-xs backdrop-blur-xl text-left">
        <div className="mb-6">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-soft/30 px-3 py-1 text-xs font-bold text-rose-deep ring-1 ring-rose-deep/20 mb-3">
            <UserPlus className="size-3.5" />
            <span>Join IGNOU Power</span>
          </span>
          <h2 className="text-2xl font-bold text-foreground">
            Create Account
          </h2>
          <p className="text-sm text-ink/65 mt-1 leading-relaxed">
            Sign up to track your orders and download assignments easily.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5">
              Full Name *
            </label>
            <div className="relative">
              <User className="size-4 text-ink/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Rahul Kumar"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full rounded-lg bg-surface-strong pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-ink/40 ring-1 ring-border outline-none focus:ring-2 focus:ring-azure-deep/50 transition-all"
              />
            </div>
          </div>

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
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5">
              Password *
            </label>
            <div className="relative">
              <Lock className="size-4 text-ink/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="At least 6 characters"
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

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-1.5">
              Confirm Password *
            </label>
            <div className="relative">
              <Lock className="size-4 text-ink/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Re-enter your password"
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
            {loading || localLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-ink/60 font-medium">
            Already have an account?{" "}
            <Link
              href={`/auth/sign-in?redirect=${encodeURIComponent(redirectPath)}`}
              className="text-azure-deep font-bold hover:underline ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 transition-all duration-300">
          <div className="w-full max-w-md p-8 rounded-lg bg-card ring-1 ring-border shadow-2xl text-left animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center mb-6">
              <div className="size-12 bg-azure-soft/30 text-azure-deep rounded-full flex items-center justify-center mx-auto mb-4 ring-1 ring-azure-deep/20">
                <MailCheck className="size-6" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1.5">
                Verify Your Email
              </h3>
              <p className="text-sm text-ink/65 leading-relaxed">
                We've sent a 6-digit verification code to <strong className="text-foreground font-semibold">{email}</strong>.
              </p>
            </div>

            <form onSubmit={handleOtpSubmit} className="flex flex-col gap-5">
              <div className="flex justify-between gap-2 my-2">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      if (el) otpInputsRef.current[idx] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(e.target, idx)}
                    onKeyDown={(e) => handleKeyDown(e, idx)}
                    onPaste={handlePaste}
                    className="size-12 text-center text-xl font-bold text-foreground bg-surface-strong ring-1 ring-border rounded-lg focus:ring-2 focus:ring-azure-deep/50 outline-none transition-all"
                    required
                  />
                ))}
              </div>

              {otpError && (
                <div className="p-3 bg-rose-soft/20 ring-1 ring-rose-deep/20 rounded-lg text-xs text-rose-deep font-semibold flex items-center gap-2">
                  <AlertCircle className="size-4 shrink-0" />
                  <span>{otpError}</span>
                </div>
              )}

              <Button
                type="submit"
                variant="gradient"
                size="lg"
                disabled={otpLoading}
                className="w-full rounded-lg font-bold shadow-md mt-2"
              >
                {otpLoading ? "Verifying OTP..." : "Verify & Create Account"}
              </Button>

              <div className="flex items-center justify-between mt-2 text-xs font-semibold">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-azure-deep hover:underline cursor-pointer"
                >
                  Resend OTP
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowOtpModal(false);
                    setOtp(Array(6).fill(""));
                    setOtpError(null);
                  }}
                  className="text-ink/60 hover:text-foreground transition-colors cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default SignUpForm;

