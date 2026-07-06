"use client";

import React from "react";
import AdmissionHero from "@/components/admission/AdmissionHero";
import AdmissionSteps from "@/components/admission/AdmissionSteps";
import AdmissionBenefits from "@/components/admission/AdmissionBenefits";
import AdmissionFAQ from "@/components/admission/AdmissionFAQ";

export default function AdmissionSupportPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Hero Header & Form Block */}
      <AdmissionHero />

      {/* Grid Process Steps Block */}
      <AdmissionSteps />

      {/* Details & WhatsApp Support Cards */}
      <AdmissionBenefits />

      {/* Accordion FAQ Block */}
      <AdmissionFAQ />
    </main>
  );
}
