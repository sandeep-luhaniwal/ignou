"use client";

import React from "react";
import { Award, CheckCircle2, TrendingUp, ShieldCheck } from "lucide-react";

export const QuickMetrics: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Metric 1 */}
      <div className="relative overflow-hidden rounded-xl bg-glass p-5 ring-1 ring-glass-edge backdrop-blur-xl transition-all duration-300 hover:shadow-md hover:ring-azure/40 text-left">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-bold tracking-wider text-ink/50">Overall GPA</span>
          <div className="grid size-8 place-items-center rounded-lg bg-azure-soft/40 text-azure-deep ring-1 ring-azure/25">
            <Award className="size-4.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-1.5 mt-2.5">
          <span className="text-3xl font-black text-foreground tracking-tight">8.8</span>
          <span className="text-xs font-semibold text-ink/45">/ 10</span>
        </div>
        <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold mt-2.5 flex items-center gap-1.5 bg-emerald-500/10 px-2 py-0.5 rounded-md w-fit ring-1 ring-emerald-500/20">
          <TrendingUp className="size-3.5" />
          Top 10% in Program
        </span>
      </div>

      {/* Metric 2 */}
      <div className="relative overflow-hidden rounded-xl bg-glass p-5 ring-1 ring-glass-edge backdrop-blur-xl transition-all duration-300 hover:shadow-md hover:ring-rose/40 text-left">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-bold tracking-wider text-ink/50">Solved Accuracy</span>
          <div className="grid size-8 place-items-center rounded-lg bg-rose-soft/40 text-rose-deep ring-1 ring-rose/25">
            <CheckCircle2 className="size-4.5" />
          </div>
        </div>
        <div className="flex items-baseline gap-1 mt-2.5">
          <span className="text-3xl font-black bg-linear-to-r from-rose to-azure bg-clip-text text-transparent tracking-tight">
            100%
          </span>
        </div>
        <span className="text-xs text-ink/65 font-medium mt-2.5 flex items-center gap-1.5">
          <ShieldCheck className="size-3.5 text-rose-deep" />
          Verified Solutions
        </span>
      </div>
    </div>
  );
};

export default QuickMetrics;


