"use client";

import React from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import Badge from "@/components/ui/Badge";
import { Search } from "lucide-react";

interface StoreHeroProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export default function StoreHero({ searchQuery, setSearchQuery }: StoreHeroProps) {
  return (
    <section className="bg-gradient-to-b from-[#FDFCFA] to-[#F1F5F9] border-b border-off-white py-16 md:py-20 px-6 relative overflow-hidden">
      {/* Visual background accents */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#F97316_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cta/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        {/* Standard Badge */}
        <Badge orange roundedfull className="mb-6 px-4.5 py-1.5 font-bold uppercase tracking-wider text-xs">
          IGNOU Digital Store 2026
        </Badge>

        {/* Heading */}
        <Heading level={1} big bold center mainblack className="mb-4 tracking-tight leading-tight">
          Find Solved Assignments & <span className="text-orange-gradient font-black">Project Help</span>
        </Heading>

        {/* Subtitle */}
        <Paragraph base center gray className="max-w-2xl mx-auto mb-8 leading-relaxed">
          Search our catalog for high-scoring, expert-solved assignments, reference books, and IGNOU university guides. Instant PDF download on approval.
        </Paragraph>

        {/* Custom Premium Centered Controlled Search Input */}
        <div className="w-full max-w-xl relative mx-auto shadow-md rounded-2xl">
          <div className="absolute top-1/2 -translate-y-1/2 left-4 flex items-center text-main-gray pointer-events-none">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search by Course Code or Subject (e.g. MCS-011, BCS-012)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-4 bg-white border border-border-white rounded-2xl outline-none focus:border-cta focus:ring-1 focus:ring-cta/15 transition-all text-sm text-main-black placeholder:text-gray"
          />
        </div>
      </div>
    </section>
  );
}
