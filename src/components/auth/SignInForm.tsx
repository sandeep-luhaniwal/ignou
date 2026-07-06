"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import InputWithLabel from "@/components/ui/InputWithLabel";
import MainButton from "@/components/ui/MainButton";
import Card from "@/components/ui/Card";

export const SignInForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    // Mock authentication delay
    setTimeout(() => {
      localStorage.setItem("ignou_logged_in", "true");
      localStorage.setItem("ignou_user_email", email);
      setLoading(false);

      // Redirect
      router.push(redirectPath);
      // Force page refresh to update headers/layouts if necessary
      router.refresh();
    }, 800);
  };

  return (
    <Card border className="w-full max-w-md  p-8 shadow-[0_4px_25px_rgba(0,0,0,0.03)] text-left">
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

        {error && (
          <div className="p-3 bg-red/5 border border-red/10 rounded-xl text-xs text-red font-semibold">
            {error}
          </div>
        )}

        <div className="text-right">
          <Link
            href="/auth/forgot-password"
            className="text-xs text-gray hover:text-orange font-semibold transition-colors"
          >
            Forgot Password?
          </Link>
        </div>

        <MainButton
          type="submit"
          disabled={loading}
          className="w-full justify-center py-3.5 mt-2"
        >
          {loading ? "Signing in..." : "Sign In"}
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
