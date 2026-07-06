"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import InputWithLabel from "@/components/ui/InputWithLabel";
import MainButton from "@/components/ui/MainButton";
import Card from "@/components/ui/Card";

export const SignUpForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    // Mock registration delay
    setTimeout(() => {
      localStorage.setItem("ignou_logged_in", "true");
      localStorage.setItem("ignou_user_name", name);
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
          {loading ? "Creating account..." : "Sign Up"}
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
  );
};

export default SignUpForm;
