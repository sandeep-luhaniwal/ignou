"use client";

import React from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import Badge from "@/components/ui/Badge";
import { CheckSquare, Truck, HelpCircle, FileText, LayoutTemplate, Clock } from "lucide-react";

interface FeatureItem {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const featuresData: FeatureItem[] = [
  {
    icon: <LayoutTemplate className="w-6 h-6" />,
    title: "Double-checked Solutions",
    description: "Our answers are formulated and double-verified by subject-matter experts to eliminate mistakes.",
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Copy-Ready Format",
    description: "Answers are structured clearly with proper headings, sections, and margins, ready to copy and paste.",
  },
  {
    icon: <Truck className="w-6 h-6" />,
    title: "Handwritten Doorstep Delivery",
    description: "Order neatly handwritten assignments on high-quality sheets. Safely packaged and delivered to your home.",
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Instant PDF Downloads",
    description: "Purchase any solved assignment online and get access to the download link instantly in your dashboard.",
  },
  {
    icon: <CheckSquare className="w-6 h-6" />,
    title: "100% IGNOU Compliant",
    description: "Every solution matches the word limits, structure, and guidelines specified in the IGNOU guidelines.",
  },
  {
    icon: <HelpCircle className="w-6 h-6" />,
    title: "Dedicated Student Support",
    description: "Stuck with project synopsis registration or admission? Our customer counselors are here to guide you.",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-main-background relative overflow-hidden">
      {/* Background grids */}
      <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-orange/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 xl:px-0 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <Badge orange sm className="mb-3 mx-auto w-fit uppercase tracking-wider">
            Our Features
          </Badge>
          <Heading mainblack bold center className="mb-4">
            Why IGNOU Students Choose Us
          </Heading>
          <Paragraph gray base center className="max-w-xl">
            We provide everything a distance learning student needs to achieve outstanding academic performance with zero hassle.
          </Paragraph>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresData.map((feature, idx) => (
            <div
              key={idx}
              className="p-8 rounded-xl bg-white border border-border-white hover:border-orange hover:bg-orange/[0.01] hover:shadow-md transition-all duration-300 flex flex-col items-start text-left group"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-orange/10 text-orange group-hover:bg-orange group-hover:text-white transition-all duration-300 flex items-center justify-center mb-6">
                {feature.icon}
              </div>

              {/* Title */}
              <Heading small mainblack bold className="mb-3">
                {feature.title}
              </Heading>

              {/* Description */}
              <Paragraph gray xs className="leading-relaxed">
                {feature.description}
              </Paragraph>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Features;
