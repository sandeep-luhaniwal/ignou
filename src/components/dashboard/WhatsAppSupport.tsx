"use client";

import React from "react";
import Card from "@/components/ui/Card";
import Paragraph from "@/components/ui/Paragraph";

export const WhatsAppSupport: React.FC = () => {
  return (
    <Card
      className="shadow-lg text-left flex flex-col gap-4 relative overflow-hidden text-white bg-linear-to-br from-emerald-500 to-emerald-600"
    >
      <div className="absolute -right-4 -bottom-4 w-30 h-30 bg-white/10 rounded-full blur-xl pointer-events-none" />
      <div className="absolute left-0 top-0 w-full h-full bg-white/5 pointer-events-none" />

      <Paragraph white xs bold className="uppercase tracking-widest opacity-80 bg-white/20 border border-white/20 px-2.5 py-0.5 rounded-lg w-fit">
        Instant Chat Help
      </Paragraph>
      
      <Paragraph white bold xl className="tracking-tight">
        WhatsApp Expert Desk
      </Paragraph>

      <Paragraph white xs semibold className="opacity-90 leading-relaxed">
        Facing issues downloading assignment PDFs or need help with custom projects? Connect with an expert directly.
      </Paragraph>

      <a
        href="https://wa.me/919999999999"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-white text-emerald-700 hover:bg-gray-50 py-3.5 rounded-2xl text-xs font-black text-center shadow-lg transition-transform hover:-translate-y-0.5 active:scale-95 duration-200"
      >
        Chat on WhatsApp
      </a>
    </Card>
  );
};

export default WhatsAppSupport;
