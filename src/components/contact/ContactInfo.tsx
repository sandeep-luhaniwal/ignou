"use client";

import React from "react";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const LightningIcon = ({ className = "w-3 h-3" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);

const CheckIcon = ({ className = "w-3.5 h-3.5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      {/* Header with Live Status Badge */}
      <div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange/10 border border-orange/20 text-orange text-xs font-bold mb-3 shadow-2xs">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Academic Support Desk Online</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl font-heading font-black text-main-black tracking-tight leading-tight">
          Get in Touch <span className="text-orange-gradient">Instantly</span>
        </h2>
        <p className="text-sm text-main-gray mt-2 leading-relaxed">
          Need quick help with solved assignments, projects, or session admissions? Reach out directly to our expert counseling team.
        </p>
      </div>

      {/* Featured Primary Card: WhatsApp Direct Desk */}
      <a
        href="https://wa.me/919876543210?text=Hi%2C%20I%20need%20help%20with%20IGNOU%20Solved%20Assignments%2FProjects"
        target="_blank"
        rel="noopener noreferrer"
        className="block group relative overflow-hidden rounded-2xl p-6 bg-linear-to-br from-slate-900 to-slate-800 text-white shadow-xl shadow-slate-900/10 hover:shadow-2xl hover:shadow-orange/10 hover:-translate-y-1 transition-all duration-300 border border-slate-700/50 cursor-pointer"
      >
        {/* Glow Accent */}
        <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />
        
        <div className="relative z-10 flex flex-col h-full">
          <div className="flex items-center justify-between gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
              <MessageCircle size={24} fill="currentColor" />
            </div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-extrabold tracking-wide uppercase flex items-center gap-1">
              <LightningIcon className="w-3 h-3 text-emerald-300" /> &lt; 5 Min Response
            </span>
          </div>

          <h3 className="text-lg font-heading font-black text-white group-hover:text-emerald-300 transition-colors flex items-center gap-1.5">
            Instant WhatsApp Desk
            <Sparkles size={16} className="text-emerald-400" />
          </h3>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Chat 1-on-1 with dedicated academic coordinators for instant PDF downloads & inquiries.
          </p>

          <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 font-mono tracking-wider">
              +91 98765 43210
            </span>
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-500 px-4 py-2 rounded-xl shadow-md transition-all group-hover:translate-x-0.5">
              Chat Now <ArrowRight size={13} />
            </span>
          </div>
        </div>
      </a>

      {/* Grid of Helpline & Email Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Direct Call Card */}
        <a
          href="tel:+919876543210"
          className="group block rounded-2xl p-5 bg-white border border-border-white shadow-xs hover:border-orange/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-orange/10 text-orange flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
            <Phone size={18} />
          </div>
          <h4 className="text-sm font-heading font-bold text-main-black group-hover:text-orange transition-colors">
            Student Helpline
          </h4>
          <p className="text-xs text-main-gray mt-0.5 leading-relaxed">
            Mon - Sat, 10:00 AM – 6:00 PM
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-bold text-main-black font-mono">
              +91 98765 43210
            </span>
            <ArrowRight size={13} className="text-orange group-hover:translate-x-1 transition-transform" />
          </div>
        </a>

        {/* Official Email Desk */}
        <a
          href="mailto:support@ignouhelping.com"
          className="group block rounded-2xl p-5 bg-white border border-border-white shadow-xs hover:border-blue/50 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-blue/10 text-blue flex items-center justify-center mb-3 group-hover:scale-110 transition-transform duration-300">
            <Mail size={18} />
          </div>
          <h4 className="text-sm font-heading font-bold text-main-black group-hover:text-blue transition-colors">
            Official Email Desk
          </h4>
          <p className="text-xs text-main-gray mt-0.5 leading-relaxed">
            For major project synopses & bulk orders
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-xs font-bold text-main-black truncate max-w-36">
              support@ignouhelping.com
            </span>
            <ArrowRight size={13} className="text-blue group-hover:translate-x-1 transition-transform" />
          </div>
        </a>
      </div>

      {/* Guidance Hub Location Card */}
      <div className="rounded-2xl p-5 bg-white border border-border-white shadow-xs flex items-start gap-3.5">
        <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 mt-0.5">
          <MapPin size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <h4 className="text-sm font-heading font-bold text-main-black">
              Study Guidance & Support Hub
            </h4>
            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 text-2xs font-bold">
              HQ Delhi-NCR
            </span>
          </div>
          <p className="text-xs text-main-gray mt-1 leading-relaxed">
            Plot No. 45, Second Floor, Near IGNOU Regional Center, Saket / Noida Sector 62, Delhi-NCR - 110017
          </p>
        </div>
      </div>

      {/* Trust Markers Footer */}
      <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border-white">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-main-gray">
          <CheckIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
          <span>Verified Solutions</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-main-gray">
          <LightningIcon className="w-3.5 h-3.5 text-orange shrink-0" />
          <span>Instant Download</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-main-gray">
          <ShieldCheck size={13} className="text-blue shrink-0" />
          <span>100% Confidential</span>
        </div>
      </div>
    </div>
  );
}

