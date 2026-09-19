"use client";

import React from "react";
import { User, LogOut } from "lucide-react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";

interface StudentHeroProps {
  name: string;
  enrolmentNo: string;
  onLogout: () => void;
}

export const StudentHero: React.FC<StudentHeroProps> = ({ name, enrolmentNo, onLogout }) => {
  return (
    <div 
      className="relative rounded-4xl overflow-hidden bg-orange p-8 md:p-10 text-white flex flex-col md:flex-row md:items-end justify-between gap-6 shadow-xl mb-10"
    >
      {/* Background Decorative Glows */}
      <div className="absolute -right-10 -top-10 w-75 h-75 bg-white/15 rounded-full blur-2xl pointer-events-none animate-pulse" />
      <div className="absolute left-1/3 -bottom-16 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none animate-pulse" />
      
      {/* Student Details Left */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 relative z-10 text-center sm:text-left">
        <div className="w-20 h-20 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 shadow-inner">
          <User size={36} className="text-white" />
        </div>
        <div className="flex flex-col justify-center">
          <Paragraph white xs bold className="bg-white/20 border border-white/25 px-3 py-1 rounded-lg uppercase tracking-wider w-fit mx-auto sm:mx-0">
            IGNOU Student Portal
          </Paragraph>
          <Heading level={2} white bold className="mt-3 tracking-tight">
            Hello, {name}
          </Heading>
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 mt-2">
            <Paragraph xs semibold className="flex items-center gap-1.5 text-white/90">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Enrolment No: <strong className="text-white">{enrolmentNo}</strong>
            </Paragraph>
          </div>
        </div>
      </div>

      {/* Logout Action Right */}
      <div className="relative z-10 self-center md:self-end">
        <button
          onClick={onLogout}
          className="bg-white/10 hover:bg-white/15 active:scale-95 text-white border border-white/20 px-5 py-3 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-md"
        >
          <LogOut size={13} />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
};

export default StudentHero;
