"use client";

import React from "react";
import { Trophy, Clock, CheckCircle2 } from "lucide-react";

export const CourseProgress: React.FC = () => {
  return (
    <div className="rounded-xl bg-glass p-5 ring-1 ring-glass-edge  backdrop-blur-xl text-left flex flex-col gap-4 hover:ring-azure/40 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/70">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-linear-to-br from-rose/25 to-azure/20 text-rose-deep flex items-center justify-center ring-1 ring-rose/25">
            <Trophy className="size-4.5" />
          </div>
          <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">
            Course Progress
          </h3>
        </div>
        <span className="text-xs font-black text-azure-deep bg-azure-soft/40 px-2.5 py-0.5 rounded-full ring-1 ring-azure/25">
          60% Completed
        </span>
      </div>

      <div className="flex flex-col gap-3.5">
        {/* Progress bar */}
        <div className="w-full h-3 bg-surface-strong ring-1 ring-border/80 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-linear-to-r from-rose via-purple-500 to-azure rounded-full transition-all duration-500 shadow-xs"
            style={{ width: "60%" }}
          />
        </div>

        {/* Progress Details List */}
        <div className="flex flex-col gap-2 text-xs font-medium text-ink/75">
          <div className="flex justify-between items-center p-2.5 rounded-lg bg-surface-strong/70 ring-1 ring-border/60">
            <span className="flex items-center gap-2">
              <Clock className="size-3.5 text-azure-deep" />
              <span>Term End Exam Prep</span>
            </span>
            <span className="font-bold text-foreground bg-paper px-2 py-0.5 rounded-md ring-1 ring-border text-[11px]">
              In Progress
            </span>
          </div>
          <div className="flex justify-between items-center p-2.5 rounded-lg bg-surface-strong/70 ring-1 ring-border/60">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="size-3.5 text-emerald-600" />
              <span>Solved Assignments</span>
            </span>
            <span className="font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md ring-1 ring-emerald-500/20 text-[11px]">
              Ready & Downloaded
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;


