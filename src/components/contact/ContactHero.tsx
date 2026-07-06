"use client";

import React from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";

export default function ContactHero() {
  return (
    <section className="bg-gradient-to-b from-white via-[#F8FAFC] to-[#F1F5F9] py-14 md:py-16 px-6 relative overflow-hidden">
     
      <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
        <Heading level={1} big bold center mainblack className="mb-4 tracking-tight leading-tight">
          How Can We <span className="text-orange-gradient font-black">Help You</span> Today?
        </Heading>

        <Paragraph base center gray className="max-w-2xl mx-auto leading-relaxed">
          Need support with solved assignments, project reports, or IGNOU admission assistance? 
          Submit a ticket below or connect with our support coordinators directly.
        </Paragraph>
      </div>
    </section>
  );
}
