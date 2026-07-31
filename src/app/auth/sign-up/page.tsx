"use client";

import React, { Suspense } from "react";
import SignUpForm from "@/components/auth/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="grow flex items-center justify-center py-12 md:py-20 px-4 relative z-10">
      <Suspense fallback={<div className="text-xs font-bold text-gray-500">Loading registration...</div>}>
        <SignUpForm />
      </Suspense>
    </div>
  );
}
