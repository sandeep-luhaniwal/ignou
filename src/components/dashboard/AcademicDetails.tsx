"use client";

import React, { useState } from "react";
import {
  GraduationCap,
  Copy,
  Check,
  Mail,
  Calendar,
  Sparkles,
  Phone,
  Building2,
  BookMarked,
  ShieldCheck,
  Layers,
  Globe2,
  IdCard,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { toast } from "react-hot-toast";

interface AcademicDetailsProps {
  name?: string;
  program: string;
  email: string;
  phone?: string;
  enrolmentNo?: string;
  session: string;
  regionalCentre?: string;
  studyCentre?: string;
  medium?: string;
  validity?: string;
  semester?: string;
  apaarId?: string;
}

export const AcademicDetails: React.FC<AcademicDetailsProps> = ({
  program,
  email,
  phone = "+91 98765 43210",
  enrolmentNo = "260984321",
  session,
  regionalCentre = "RC Delhi-2 (Rajghat - 07)",
  studyCentre = "07107 - Shaheed Bhagat Singh College",
  medium = "English",
  validity = "Valid up to Dec 2028",
  semester = "Semester 3 (2nd Year)",
  apaarId = "7829-4102-9931",
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [activeView, setActiveView] = useState<"academic" | "centre" | "id">("academic");

  const copyToClipboard = (text: string, key: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    toast.success(`${label} copied to clipboard!`);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="rounded-xl bg-glass p-5 ring-1 ring-glass-edge  backdrop-blur-xl text-left flex flex-col gap-4 hover:ring-azure/40 transition-all duration-300">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-border/70">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-lg bg-linear-to-br from-azure/25 to-rose/20 text-azure-deep flex items-center justify-center ring-1 ring-azure/25">
            <GraduationCap className="size-4.5" />
          </div>
          <div>
            <h3 className="font-bold text-xs uppercase tracking-wider text-foreground">
              Student Profile
            </h3>
            <span className="text-[10px] text-ink/50 block font-medium">
              Official IGNOU Record
            </span>
          </div>
        </div>

        <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full ring-1 ring-emerald-500/20 flex items-center gap-1.5">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Active
        </span>
      </div>

      {/* Mini Profile Switcher Pills */}
      <div className="grid grid-cols-3 gap-1 p-1 rounded-lg bg-surface-strong ring-1 ring-border/70 text-center">
        <button
          type="button"
          onClick={() => setActiveView("academic")}
          className={`py-1.5 px-2 rounded-md text-[11px] font-bold transition-all cursor-pointer ${activeView === "academic"
              ? "bg-linear-to-r from-rose to-azure text-white shadow-2xs"
              : "text-ink/65 hover:text-foreground hover:bg-glass"
            }`}
        >
          Academic
        </button>
        <button
          type="button"
          onClick={() => setActiveView("centre")}
          className={`py-1.5 px-2 rounded-md text-[11px] font-bold transition-all cursor-pointer ${activeView === "centre"
              ? "bg-linear-to-r from-rose to-azure text-white shadow-2xs"
              : "text-ink/65 hover:text-foreground hover:bg-glass"
            }`}
        >
          Centres
        </button>
        <button
          type="button"
          onClick={() => setActiveView("id")}
          className={`py-1.5 px-2 rounded-md text-[11px] font-bold transition-all cursor-pointer ${activeView === "id"
              ? "bg-linear-to-r from-rose to-azure text-white shadow-2xs"
              : "text-ink/65 hover:text-foreground hover:bg-glass"
            }`}
        >
          Identity
        </button>
      </div>

      {/* Tab 1: Academic & Program Details */}
      {activeView === "academic" && (
        <div className="flex flex-col gap-2.5 animate-in fade-in-50 duration-200">
          {/* Registered Program */}
          <div className="flex flex-col gap-0.5 p-3 rounded-lg bg-surface-strong/70 ring-1 ring-border/60">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-ink/50 flex items-center gap-1">
              <Sparkles className="size-3 text-rose-deep" />
              Registered Program
            </span>
            <span className="text-sm font-bold text-foreground leading-snug">
              {program}
            </span>
          </div>

          {/* Current Semester & Medium */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex flex-col gap-0.5 p-2.5 rounded-lg bg-surface-strong/70 ring-1 ring-border/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink/50 flex items-center gap-1">
                <Layers className="size-3 text-azure-deep" />
                Current Term
              </span>
              <span className="text-xs font-bold text-foreground truncate">
                {semester}
              </span>
            </div>

            <div className="flex flex-col gap-0.5 p-2.5 rounded-lg bg-surface-strong/70 ring-1 ring-border/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink/50 flex items-center gap-1">
                <Globe2 className="size-3 text-purple-600" />
                Medium
              </span>
              <span className="text-xs font-bold text-foreground">
                {medium}
              </span>
            </div>
          </div>

          {/* Session & Validity */}
          <div className="flex flex-col gap-1 p-3 rounded-lg bg-surface-strong/70 ring-1 ring-border/60">
            <div className="flex justify-between items-center text-xs">
              <span className="text-ink/55 font-medium flex items-center gap-1">
                <Calendar className="size-3 text-amber-600" />
                Admission:
              </span>
              <span className="font-bold text-foreground">{session}</span>
            </div>
            <div className="flex justify-between items-center text-xs pt-1 border-t border-border/50">
              <span className="text-ink/55 font-medium flex items-center gap-1">
                <ShieldCheck className="size-3 text-emerald-600" />
                Validity:
              </span>
              <span className="font-bold text-emerald-700 dark:text-emerald-400">{validity}</span>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Regional & Study Centre Details */}
      {activeView === "centre" && (
        <div className="flex flex-col gap-2.5 animate-in fade-in-50 duration-200">
          {/* Regional Centre */}
          <div className="flex flex-col gap-0.5 p-3 rounded-lg bg-surface-strong/70 ring-1 ring-border/60">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-ink/50 flex items-center gap-1">
              <Building2 className="size-3 text-azure-deep" />
              Regional Centre (RC)
            </span>
            <span className="text-xs sm:text-sm font-bold text-foreground leading-snug">
              {regionalCentre}
            </span>
          </div>

          {/* Study Centre */}
          <div className="flex flex-col gap-0.5 p-3 rounded-lg bg-surface-strong/70 ring-1 ring-border/60">
            <span className="text-[10.5px] font-bold uppercase tracking-wider text-ink/50 flex items-center gap-1">
              <BookMarked className="size-3 text-rose-deep" />
              Study Centre (LSC)
            </span>
            <span className="text-xs sm:text-sm font-bold text-foreground leading-snug">
              {studyCentre}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-azure-soft/20 ring-1 ring-azure/20 text-[11px] text-azure-deep font-medium">
            Assignments & projects must be submitted to your designated Study Centre.
          </div>
        </div>
      )}

      {/* Tab 3: Identification & Contact Details */}
      {activeView === "id" && (
        <div className="flex flex-col gap-2.5 animate-in fade-in-50 duration-200">
          {/* Enrolment Number */}
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-surface-strong/70 ring-1 ring-border/60">
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink/50 flex items-center gap-1">
                <IdCard className="size-3 text-purple-600" />
                Enrolment No
              </span>
              <span className="text-xs sm:text-sm font-mono font-bold text-foreground">
                {enrolmentNo}
              </span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(enrolmentNo, "enrolment", "Enrolment No")}
              className="size-7 rounded-md bg-paper hover:bg-glass ring-1 ring-border flex items-center justify-center text-ink/70 hover:text-foreground transition-all cursor-pointer shrink-0"
              title="Copy enrolment number"
            >
              {copiedKey === "enrolment" ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
            </button>
          </div>

          {/* Email ID */}
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-surface-strong/70 ring-1 ring-border/60">
            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink/50 flex items-center gap-1">
                <Mail className="size-3 text-azure-deep" />
                Email ID
              </span>
              <span className="text-xs font-semibold text-foreground truncate">
                {email}
              </span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(email, "email", "Email ID")}
              className="size-7 rounded-md bg-paper hover:bg-glass ring-1 ring-border flex items-center justify-center text-ink/70 hover:text-foreground transition-all cursor-pointer shrink-0"
              title="Copy email"
            >
              {copiedKey === "email" ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
            </button>
          </div>

          {/* Mobile Phone */}
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-surface-strong/70 ring-1 ring-border/60">
            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink/50 flex items-center gap-1">
                <Phone className="size-3 text-emerald-600" />
                Registered Mobile
              </span>
              <span className="text-xs font-semibold text-foreground truncate">
                {phone}
              </span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(phone, "phone", "Mobile number")}
              className="size-7 rounded-md bg-paper hover:bg-glass ring-1 ring-border flex items-center justify-center text-ink/70 hover:text-foreground transition-all cursor-pointer shrink-0"
              title="Copy phone"
            >
              {copiedKey === "phone" ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
            </button>
          </div>

          {/* APAAR / ABC ID */}
          <div className="flex items-center justify-between gap-2 p-2.5 rounded-lg bg-surface-strong/70 ring-1 ring-border/60">
            <div className="flex flex-col gap-0.5 min-w-0 flex-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-ink/50 flex items-center gap-1">
                <ShieldCheck className="size-3 text-rose-deep" />
                APAAR / ABC ID
              </span>
              <span className="text-xs font-mono font-bold text-foreground truncate">
                {apaarId}
              </span>
            </div>
            <button
              type="button"
              onClick={() => copyToClipboard(apaarId, "apaar", "APAAR / ABC ID")}
              className="size-7 rounded-md bg-paper hover:bg-glass ring-1 ring-border flex items-center justify-center text-ink/70 hover:text-foreground transition-all cursor-pointer shrink-0"
              title="Copy APAAR ID"
            >
              {copiedKey === "apaar" ? <Check className="size-3.5 text-emerald-600" /> : <Copy className="size-3.5" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcademicDetails;


