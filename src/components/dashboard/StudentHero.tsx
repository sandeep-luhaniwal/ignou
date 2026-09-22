"use client";

import React, { useState } from "react";
import { User, LogOut, Copy, Check, Sparkles, ShieldCheck } from "lucide-react";
import { toast } from "react-hot-toast";

interface StudentHeroProps {
  name: string;
  enrolmentNo: string;
  onLogout: () => void;
}

export const StudentHero: React.FC<StudentHeroProps> = ({ name, enrolmentNo, onLogout }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyEnrolment = () => {
    navigator.clipboard.writeText(enrolmentNo);
    setCopied(true);
    toast.success("Enrolment number copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  const getInitials = (fullName: string) => {
    return fullName
      .split(" ")
      .map((n) => n[0])
      .slice(0, 2)
      .join("")
      .toUpperCase();
  };

  return (
    <div className="relative rounded-2xl overflow-hidden bg-linear-to-r from-rose via-purple-600 to-azure p-6 sm:p-7 text-white flex flex-col md:flex-row md:items-center justify-between gap-5  mb-6 ring-1 ring-white/20">
      {/* Background Glows & Patterns */}
      <div className="absolute -right-12 -top-12 size-72 bg-white/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 size-72 bg-azure/25 rounded-full blur-3xl pointer-events-none" />

      {/* Student Details Left */}
      <div className="flex flex-col sm:flex-row items-center sm:items-center gap-4 relative z-10 text-center sm:text-left">
        <div className="size-16 sm:size-18 rounded-xl bg-white/20 border border-white/30 backdrop-blur-md flex items-center justify-center shrink-0 shadow-inner font-black text-xl text-white">
          {getInitials(name || "Student")}
        </div>

        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-2 justify-center sm:justify-start">
            <span className="bg-white/20 border border-white/30 px-2.5 py-0.5 rounded-full text-[10.5px] font-bold uppercase tracking-wider backdrop-blur-xs flex items-center gap-1">
              <Sparkles className="size-3" />
              IGNOU Student Portal
            </span>
            <span className="bg-emerald-400/25 border border-emerald-300/30 text-emerald-100 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <ShieldCheck className="size-3" /> Verified
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white mt-1.5">
            Welcome back, {name}
          </h1>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 mt-1.5 text-xs text-white/95">
            <div className="flex items-center gap-1.5 bg-black/15 border border-white/20 px-2.5 py-1 rounded-lg">
              <span className="text-white/70">Enrolment:</span>
              <span className="font-mono font-bold tracking-wider">{enrolmentNo}</span>
              <button
                type="button"
                onClick={handleCopyEnrolment}
                className="size-5 ml-1 rounded flex items-center justify-center hover:bg-white/20 transition-all cursor-pointer"
                title="Copy Enrolment No"
              >
                {copied ? <Check className="size-3 text-emerald-300" /> : <Copy className="size-3 text-white/80" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Action Right */}
      <div className="relative z-10 self-center md:self-center">
        <button
          type="button"
          onClick={onLogout}
          className="bg-white/15 hover:bg-white/25 active:scale-95 text-white border border-white/30 px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs backdrop-blur-md hover:shadow-md"
        >
          <LogOut className="size-3.5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default StudentHero;
