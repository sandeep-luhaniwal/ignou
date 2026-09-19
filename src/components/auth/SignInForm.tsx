"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import InputWithLabel from "@/components/ui/InputWithLabel";
import MainButton from "@/components/ui/MainButton";
import Card from "@/components/ui/Card";
import { useAppDispatch, useAppSelector } from "@/store";
import { loginSuccess } from "@/store/slices/authSlice";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";

export const SignInForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const dispatch = useAppDispatch();
  const { loading, error, token } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localLoading, setLocalLoading] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (token) {
      router.push(redirectPath);
      router.refresh();
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
    } catch (err: any) {
      setLocalError(err.message || "Invalid email or password.");
    } finally {
      setLocalLoading(false);
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
    <Card border className="w-full max-w-md p-8 shadow-sm text-left">
      <div className="mb-6">
        <Heading small mainblack bold className="mb-1.5">
          Welcome Back
        </Heading>
        <Paragraph gray sm className="leading-relaxed">
          Sign in to access your dashboard, orders, and study materials.
        </Paragraph>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
          placeholder="Enter your password"
          showpassword="eye-off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          labelbold
        />

        <div className="text-right">
          <Link
            href="/auth/forgot-password"
            className="text-xs text-gray hover:text-orange font-semibold transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

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
          {loading || localLoading ? "Signing In..." : "Sign In"}
        </MainButton>
      </form>

      <div className="mt-8 pt-6 border-t border-gray-100 text-center">
        <p className="text-xs text-gray font-medium">
          Don't have an account?{" "}
          <Link
            href={`/auth/sign-up?redirect=${encodeURIComponent(redirectPath)}`}
            className="text-orange font-bold hover:underline ml-1"
          >
            Create Account
          </Link>
        </p>
      </div>
    </Card>
  );
};

export default SignInForm;
