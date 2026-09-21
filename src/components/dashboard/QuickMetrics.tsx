"use client";

import React from "react";
import Card from "@/components/ui/Card";

export const QuickMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

      <Card
        border
        className="border-gray-100! shadow-sm text-left flex flex-col gap-1 hover:shadow-xl hover:border-gray-150! transition-all duration-300 bg-slate-50/50 group"
      >
        <span className="text-sm text-gray uppercase font-bold tracking-wider">Overall GPA</span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-3xl font-black text-primary tracking-tight">8.8</span>
          <span className="text-xs font-bold text-gray">/ 10</span>
        </div>
        <span className="text-sm text-emerald-500 font-semibold mt-1 flex items-center gap-0.5">
          Top 10% in Program
        </span>
      </Card>

      <Card
        border
        className="border-gray-100! shadow-sm text-left flex flex-col gap-1 hover:shadow-xl hover:border-gray-150! transition-all duration-300 bg-slate-50/50 group"
      >
        <span className="text-sm text-gray uppercase font-bold tracking-wider">Solved Guides</span>
        <div className="flex items-baseline gap-1 mt-1">
          <span className="text-3xl font-black text-orange tracking-tight">100%</span>
        </div>
        <span className="text-sm text-gray font-semibold mt-1">
          Verified Solutions
        </span>
      </Card>

    </div>
  );
};

export default QuickMetrics;
