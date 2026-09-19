"use client";

import React from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import { Headphones, ShieldCheck, Clock } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="bg-linear-to-b from-white via-slate-50 to-slate-100 py-12 md:py-16 px-6 relative overflow-hidden border-b border-border-white">
      {/* Background Accent Blur */}
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-border-white shadow-2xs text-xs font-bold text-main-black mb-4">
          <Headphones size={14} className="text-orange" />
          <span>24/7 Academic Assistance Helpline</span>
        </div>

        <Heading level={1} big bold center mainblack className="mb-4 tracking-tight leading-tight">
          How Can We <span className="text-orange-gradient font-black">Help You</span> Today?
        </Heading>

        <Paragraph base center gray className="max-w-2xl mx-auto leading-relaxed text-sm md:text-base">
          Need support with solved assignments, project reports, or IGNOU admission assistance? 
          Submit a ticket below or connect with our specialized academic counselors directly.
        </Paragraph>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 pt-6 border-t border-border-white/60 text-xs font-semibold text-main-gray">
          <div className="flex items-center gap-1.5">
            <Clock size={15} className="text-orange" />
            <span>Average 2-Hour Response Time</span>
          </div>
          <span className="text-border-white hidden sm:inline">•</span>
          <div className="flex items-center gap-1.5">
            <ShieldCheck size={15} className="text-emerald-500" />
            <span>100% IGNOU Syllabus Compliant</span>
          </div>
        </div>
      </div>
    </section>
  );
}
