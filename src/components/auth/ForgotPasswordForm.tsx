"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import InputWithLabel from "@/components/ui/InputWithLabel";
import MainButton from "@/components/ui/MainButton";
import Card from "@/components/ui/Card";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";

export const ForgotPasswordForm: React.FC = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

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
    <Card border className="w-full max-w-md p-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)] text-left">
      <div className="mb-6">
        <Heading small mainblack bold className="mb-1.5">
          {showOtp ? "Reset Password" : "Forgot Password"}
        </Heading>
        <Paragraph gray sm className="leading-relaxed">
          {showOtp 
            ? "Verify the 6-digit OTP code sent to your email and set your new password."
            : "Enter your registered email address to receive a verification OTP."}
        </Paragraph>
      </div>

      {successMessage ? (
        <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-sm text-emerald-800 font-semibold text-center mb-4">
          {successMessage}
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {!showOtp ? (
            <InputWithLabel
              label="Email Address"
              type="email"
              placeholder="e.g. student@ignou.ac.in"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              labelbold
            />
          ) : (
            <>
              <InputWithLabel
                label="Email Address"
                type="email"
                value={email}
                disabled
                labelbold
              />

              <InputWithLabel
                label="One-Time Password (OTP)"
                type="text"
                placeholder="Enter 6-digit OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
                required
                labelbold
              />

              <InputWithLabel
                label="New Password"
                type="password"
                placeholder="At least 6 characters"
                showpassword="eye-off"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                labelbold
              />

              <InputWithLabel
                label="Confirm New Password"
                type="password"
                placeholder="Re-enter your new password"
                showpassword="eye-off"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                labelbold
              />

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
                  className="text-xs text-gray hover:text-orange font-semibold transition-colors cursor-pointer"
                >
                  Change Email Address
                </button>
              </div>
            </>
          )}

          {error && (
            <div className="p-3 bg-red/5 border border-red/10 rounded-xl text-xs text-red font-semibold">
              {error}
            </div>
          )}

          <MainButton
            type="submit"
            disabled={loading}
            className="w-full justify-center py-3.5 mt-2"
          >
            {loading 
              ? (showOtp ? "Resetting password..." : "Sending OTP...") 
              : (showOtp ? "Reset Password" : "Send Reset OTP")}
          </MainButton>
        </form>
      )}

      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-xs text-gray font-medium">
          Remember your password?{" "}
          <Link
            href="/auth/sign-in"
            className="text-orange font-bold hover:underline ml-1"
          >
            Sign In
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default ForgotPasswordForm;
