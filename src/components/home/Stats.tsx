"use client";

import React from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import { Users, GraduationCap, Award, BookOpen } from "lucide-react";

interface StatItem {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  colorClass: string;
}

const statsData: StatItem[] = [
  {
    icon: <Users className="w-8 h-8 text-orange" />,
    value: "50,000+",
    label: "Students Assisted",
    description: "Empowering learners across BCA, MCA, MBA, BA programs.",
    colorClass: "from-orange/10 to-orange/5 border-orange/10",
  },
  {
    icon: <GraduationCap className="w-8 h-8 text-yellow" />,
    value: "99.4%",
    label: "Success Rate",
    description: "Highly accurate assignments aligned with IGNOU guidelines.",
    colorClass: "from-yellow/10 to-yellow/5 border-yellow/10",
  },
  {
    icon: <Award className="w-8 h-8 text-green-500" style={{ color: "var(--dark-green, #10B981)" }} />,
    value: "150+",
    label: "Expert Writers",
    description: "Subject matter experts drafting flawless reference answers.",
    colorClass: "from-dark-green/10 to-dark-green/5 border-dark-green/10",
  },
  {
    icon: <BookOpen className="w-8 h-8 text-blue" />,
    value: "10+",
    label: "Years of Experience",
    description: "Trusted IGNOU resources with deep academic experience.",
    colorClass: "from-blue/10 to-blue/5 border-blue/10",
  },
];

const Stats = () => {
  return (
    <section className="relative py-16 bg-main-background overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="absolute top-1/2 left-0 w-100 h-100 bg-orange/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-100 h-100 bg-yellow/5 rounded-full blur-3xl -translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 xl:px-0 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statsData.map((stat, idx) => (
            <div
              key={idx}
              className={`group flex flex-col p-6 md:p-8 rounded-3xl border bg-linear-to-br ${stat.colorClass} shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
            >
              {/* Icon Container with Glow */}
              <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center shadow-md mb-6 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>

              {/* Stat Value */}
              <Heading
                mainblack
                bold
                className="mb-2 tracking-tight group-hover:text-orange transition-colors duration-300"
              >
                {stat.value}
              </Heading>

              {/* Stat Label */}
              <Heading
                mainblack
                semibold
                small
                className="mb-3"
              >
                {stat.label}
              </Heading>

              {/* Stat Description */}
              <Paragraph
                gray
                xs
                className="leading-relaxed mt-auto"
              >
                {stat.description}
              </Paragraph>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
