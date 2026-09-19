"use client";

import React from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import Badge from "@/components/ui/Badge";

export default function ProjectHero() {
  return (
    <section className="relative py-16 md:py-24 flex items-center overflow-hidden bg-main-black text-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-main-black to-main-black/95" />
      <div className="absolute top-0 right-0 w-125 h-125 bg-orange/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-100 h-100 bg-yellow/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full text-center flex flex-col items-center">
        {/* Badge */}
        <Badge orange roundedfull className="mb-6 px-4.5 py-1.5 font-bold uppercase tracking-wider text-xs shadow-md shadow-orange/10">
          July 2026 Session Support Active
        </Badge>

        {/* Heading */}
        <Heading level={1} white big extrabold center className="mb-6 leading-tight max-w-3xl">
          100% Approved IGNOU Project Help & Synopses
        </Heading>

        {/* Description */}
        <Paragraph white base center className="max-w-2xl mx-auto opacity-90 leading-relaxed">
          Boost your academic results with professionally prepared IGNOU projects, custom synopsis documents, and complete thesis reports designed by expert educators. Complete guide sign-offs guaranteed.
        </Paragraph>
      </div>
    </section>
  );
}
