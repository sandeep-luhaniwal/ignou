"use client";

import React, { Suspense } from "react";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="grow flex items-center justify-center py-12 md:py-20 px-4 relative z-10">
      <Suspense fallback={<div className="text-xs font-bold text-gray-500">Loading screen...</div>}>
        <ForgotPasswordForm />
      </Suspense>
    </div>
  );
}
