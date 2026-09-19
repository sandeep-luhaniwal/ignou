"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import InputWithLabel from "@/components/ui/InputWithLabel";
import MainButton from "@/components/ui/MainButton";
import Card from "@/components/ui/Card";
import { useAppDispatch, useAppSelector } from "@/store";
import { registerSuccess } from "@/store/slices/authSlice";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";

export const SignUpForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
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
      // Focus the first OTP input automatically when the modal is shown
      setTimeout(() => {
        otpInputsRef.current[0]?.focus();
      }, 50);

      // Check clipboard immediately when modal is shown
      checkClipboardAndPaste();

      // Check clipboard when window gains focus (e.g., returning after copying OTP)
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
    if (token) {
      router.push(redirectPath);
      router.refresh();
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
    if (isNaN(Number(value))) return; // Allow only numeric entries

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input field
    if (value !== "" && index < 5) {
      otpInputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        // Focus previous input and clear it
        const newOtp = [...otp];
        newOtp[index - 1] = "";
        setOtp(newOtp);
        otpInputsRef.current[index - 1]?.focus();
      } else {
        // Clear current input
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

  if (token) {
    return (
      <Card border className="w-full max-w-md p-8 shadow-sm text-center py-16">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-4 border-orange border-t-transparent rounded-full animate-spin"></div>
          <span className="text-xs font-bold text-gray">Redirecting to portal...</span>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card border className="w-full max-w-md p-8 shadow-sm text-left">
        <div className="mb-6">
          <Heading small mainblack bold className="mb-1.5">
            Create Account
          </Heading>
          <Paragraph gray sm className="leading-relaxed">
            Sign up to track your orders and download assignments easily.
          </Paragraph>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <InputWithLabel
            label="Full Name"
            type="text"
            placeholder="e.g. Rahul Kumar"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            labelbold
          />

          <InputWithLabel
            label="Email Address"
            type="email"
            placeholder="e.g. student@ignou.ac.in"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            labelbold
          />

          <InputWithLabel
            label="Password"
            type="password"
            placeholder="At least 6 characters"
            showpassword="eye-off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            labelbold
          />

          <InputWithLabel
            label="Confirm Password"
            type="password"
            placeholder="Re-enter your password"
            showpassword="eye-off"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            labelbold
          />

          {(error || localError) && (
            <div className="p-3 bg-red/5 border border-red/10 rounded-xl text-xs text-red font-semibold">
              {error || localError}
            </div>
          )}

          <MainButton
            type="submit"
            disabled={loading || localLoading}
            className="w-full justify-center py-3.5 mt-2"
          >
            {loading || localLoading ? "Creating account..." : "Sign Up"}
          </MainButton>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
          <p className="text-xs text-gray font-medium">
            Already have an account?{" "}
            <Link
              href={`/auth/sign-in?redirect=${encodeURIComponent(redirectPath)}`}
              className="text-orange font-bold hover:underline ml-1"
            >
              Sign In
            </Link>
          </p>
        </div>
      </Card>

      {/* Modern High-End OTP Verification Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md transition-all duration-300">
          <div className="w-full max-w-md p-8 bg-white border border-border-white rounded-2xl shadow-2xl text-left animate-in fade-in zoom-in-95 duration-200">
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-orange animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 19v-8.93a2 2 0 01.89-1.664l8-5.333a2 2 0 012.22 0l8 5.333A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-2.25-1.5a2 2 0 00-2.22 0l-2.25 1.5" />
                </svg>
              </div>
              <Heading small mainblack bold className="mb-1.5">
                Verify Your Email
              </Heading>
              <Paragraph gray sm className="leading-relaxed">
                We've sent a 6-digit verification code to <strong className="text-mainblack font-semibold">{email}</strong>.
              </Paragraph>
            </div>

            <form onSubmit={handleOtpSubmit} className="flex flex-col gap-5">
              <div className="flex justify-between gap-2.5 my-2">
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
                    className="w-12 h-14 text-center text-xl font-bold text-mainblack bg-gray-50 border border-gray-200 rounded-xl focus:border-orange focus:ring-1 focus:ring-orange/30 outline-none transition-all"
                    required
                  />
                ))}
              </div>

              {otpError && (
                <div className="p-3 bg-red/5 border border-red/10 rounded-xl text-xs text-red font-semibold">
                  {otpError}
                </div>
              )}

              <MainButton
                type="submit"
                disabled={otpLoading}
                className="w-full justify-center py-3.5 mt-2"
              >
                {otpLoading ? "Verifying OTP..." : "Verify & Create Account"}
              </MainButton>

              <div className="flex items-center justify-between mt-3 text-xs text-gray font-semibold">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  className="text-orange hover:underline cursor-pointer"
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
                  className="hover:text-mainblack transition-colors cursor-pointer"
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
