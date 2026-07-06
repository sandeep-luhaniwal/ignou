"use client";

import React, { Suspense } from "react";
import SignInForm from "@/components/auth/SignInForm";

export default function SignInPage() {
  return (
    <div className="flex-grow flex items-center justify-center py-12 md:py-20 px-4 relative z-10">
      <Suspense fallback={<div className="text-xs font-bold text-gray-500">Loading auth screen...</div>}>
        <SignInForm />
      </Suspense>
    </div>
  );
}
