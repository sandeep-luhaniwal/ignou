"use client";

import React from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { HelpCircle, FileCheck, GraduationCap, Clock } from "lucide-react";

export default function AdmissionSteps() {
  return (
    <section className="py-20 px-6 bg-white border-b border-border-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge orange roundedfull className="mb-3 px-3 py-1 font-bold uppercase tracking-wider text-2xs">
            The Process
          </Badge>
          <Heading level={2} bold mainblack className="text-2xl md:text-3xl tracking-tight mb-3">
            Our Streamlined Admission Steps
          </Heading>
          <Paragraph sm gray className="max-w-xl mx-auto">
            We ensure your application forms are accurate and optimized to prevent rejection.
          </Paragraph>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StepItem
            icon={<HelpCircle size={24} />}
            number="01"
            title="Profile & Eligibility"
            desc="We verify your credentials, previous certificates, and age limits according to official IGNOU guidelines."
          />
          <StepItem
            icon={<FileCheck size={24} />}
            number="02"
            title="Document Optimization"
            desc="We resize, format, and review all mandatory uploads (marksheet, identity proofs) to meet strict system requirements."
          />
          <StepItem
            icon={<GraduationCap size={24} />}
            number="03"
            title="Form Submission"
            desc="Our experts register you on the official Samarth portal, fill the course options, and verify details before confirmation."
          />
          <StepItem
            icon={<Clock size={24} />}
            number="04"
            title="Admission Tracking"
            desc="We track the approval status at the regional center and notify you immediately when your digital ID card is generated."
          />
        </div>
      </div>
    </section>
  );
}

const StepItem = ({ icon, number, title, desc }: { icon: React.ReactNode; number: string; title: string; desc: string }) => (
  <Card border className="relative group hover:border-cta/30 hover:shadow-md transition-all duration-300 rounded-2xl p-6 bg-gray-50 border-border-white">
    <div className="w-12 h-12 bg-light-orange text-cta rounded-xl flex items-center justify-center mb-6 group-hover:bg-cta group-hover:text-white transition-all duration-300">
      {icon}
    </div>
    <span className="absolute top-6 right-6 text-2xl font-black text-main-gray/25 group-hover:text-cta/15 transition-all">
      {number}
    </span>
    <Heading level={4} bold mainblack className="text-base mb-2 tracking-tight">
      {title}
    </Heading>
    <Paragraph xs gray className="leading-relaxed">
      {desc}
    </Paragraph>
  </Card>
);
