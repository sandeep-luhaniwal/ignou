"use client";

import React from "react";
import { MessageCircle, Headphones, Sparkles } from "lucide-react";

export const WhatsAppSupport: React.FC = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-emerald-600 via-teal-700 to-emerald-900 p-5 text-white shadow-md ring-1 ring-white/25 flex flex-col gap-3.5 text-left group">
      {/* Decorative Blur and Accent */}
      <div className="absolute -right-6 -bottom-6 size-32 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
      <div className="absolute top-0 right-0 p-3 opacity-10 text-white pointer-events-none">
        <Headphones className="size-20" />
      </div>

      <div className="flex items-center justify-between relative z-10">
        <span className="text-[10px] font-bold uppercase tracking-wider bg-white/20 border border-white/25 px-2.5 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-300 animate-ping" />
          Instant Support
        </span>

        <span className="text-[10px] font-semibold text-emerald-100/80">
          Avg reply: 5 mins
        </span>
      </div>

      <div className="flex flex-col gap-1 relative z-10">
        <h4 className="text-base font-bold text-white tracking-tight flex items-center gap-1.5">
          <span>Student Helpdesk</span>
          <Sparkles className="size-3.5 text-emerald-200" />
        </h4>
        <p className="text-xs text-white/85 leading-relaxed">
          Need help downloading PDFs, subject selection, or project guidance? Chat directly with an academic mentor.
        </p>
      </div>

      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noopener noreferrer"
        className="relative z-10 bg-white text-emerald-900 hover:bg-emerald-50 h-9.5 px-4 rounded-lg text-xs font-bold flex items-center justify-center gap-2 shadow-md  hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer mt-1"
      >
        <MessageCircle className="size-4 text-emerald-600 fill-emerald-600/20" />
        <span>Chat on WhatsApp</span>
      </a>
    </div>
  );
};

export default WhatsAppSupport;


