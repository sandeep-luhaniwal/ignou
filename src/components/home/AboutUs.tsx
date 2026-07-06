"use client";

import React from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import MainButton from "@/components/ui/MainButton";
import Badge from "@/components/ui/Badge";
import { CheckCircle2, Award, BookOpen, ShieldCheck } from "lucide-react";

const AboutUs = () => {
  return (
    <section id="about" className="py-20 bg-light-gray relative overflow-hidden">
      {/* Decorative Glow Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-yellow/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-4 xl:px-0 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Visual Grid of Trust Indicators (Cards) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Box 1 */}
            <div className="p-6 rounded-xl bg-white border border-border-white hover:border-orange hover:bg-orange/[0.01] hover:shadow-md transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-orange/10 text-orange group-hover:bg-orange group-hover:text-white transition-all duration-300 flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <Heading small mainblack bold className="mb-2">
                Expert Educators
              </Heading>
              <Paragraph gray sm className="opacity-80">
                Solutions prepared by qualified professors and top IGNOU course graduates.
              </Paragraph>
            </div>

            {/* Box 2 */}
            <div className="p-6 rounded-xl bg-white border border-border-white hover:border-orange hover:bg-orange/[0.01] hover:shadow-md transition-all duration-300 group mt-0 sm:mt-6">
              <div className="w-12 h-12 rounded-xl bg-yellow/10 text-yellow group-hover:bg-yellow group-hover:text-black transition-all duration-300 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <Heading small mainblack bold className="mb-2">
                100% Quality Check
              </Heading>
              <Paragraph gray sm className="opacity-80">
                Every solved assignment undergoes a double accuracy review before publish.
              </Paragraph>
            </div>

            {/* Box 3 */}
            <div className="p-6 rounded-xl bg-white border border-border-white hover:border-orange hover:bg-orange/[0.01] hover:shadow-md transition-all duration-300 group">
              <div className="w-12 h-12 rounded-xl bg-blue/10 text-blue group-hover:bg-blue group-hover:text-white transition-all duration-300 flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <Heading small mainblack bold className="mb-2">
                Latest Curriculum
              </Heading>
              <Paragraph gray sm className="opacity-80">
                Always updated for the latest 2025-26 academic cycles and question papers.
              </Paragraph>
            </div>

            {/* Box 4 */}
            <div className="p-6 rounded-xl bg-white border border-border-white hover:border-orange hover:bg-orange/[0.01] hover:shadow-md transition-all duration-300 group mt-0 sm:mt-6">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 text-dark-green group-hover:bg-dark-green group-hover:text-white transition-all duration-300 flex items-center justify-center mb-4" style={{ backgroundColor: "rgba(16, 185, 129, 0.1)", color: "var(--dark-green, #10B981)" }}>
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <Heading small mainblack bold className="mb-2">
                High Grades Assured
              </Heading>
              <Paragraph gray sm className="opacity-80">
                Structured layout, detailed tables, and clear explanations guarantee 90%+ scores.
              </Paragraph>
            </div>

          </div>

          {/* Right Column: About Content */}
          <div className="lg:col-span-6 text-left flex flex-col justify-center">
            <div className="mb-4">
              <Badge orange sm className="w-fit uppercase tracking-wider">
                Who We Are
              </Badge>
            </div>
            
            <Heading mainblack bold className="mb-6 leading-tight">
              Empowering IGNOU Students Towards <span className="text-orange-gradient font-extrabold">Academic Excellence</span>
            </Heading>
            
            <Paragraph gray base className="mb-8 leading-relaxed">
              We understand that distance education presents unique challenges. Many students balance studies with full-time jobs, families, and other life commitments. Our platform bridges this gap, providing top-tier, reliable reference materials and handwriting services to make your IGNOU experience smooth and successful.
            </Paragraph>

            {/* Benefit Row Items */}
            <div className="space-y-6 mb-10">
              <div className="pl-4 border-l-2 border-orange/30 hover:border-orange transition-all duration-300">
                <Heading small mainblack bold className="mb-1">
                  Customized Handwritten Delivery
                </Heading>
                <Paragraph gray sm className="opacity-80">
                  Neatly written copies sent straight to your address, completely matching IGNOU guidelines.
                </Paragraph>
              </div>
              <div className="pl-4 border-l-2 border-orange/30 hover:border-orange transition-all duration-300">
                <Heading small mainblack bold className="mb-1">
                  Plagiarism-Free Solved Answers
                </Heading>
                <Paragraph gray sm className="opacity-80">
                  Answers formulated individually by subject experts, keeping plagiarism strictly at zero.
                </Paragraph>
              </div>
              <div className="pl-4 border-l-2 border-orange/30 hover:border-orange transition-all duration-300">
                <Heading small mainblack bold className="mb-1">
                  End-to-End Support
                </Heading>
                <Paragraph gray sm className="opacity-80">
                  Providing solved assignments, projects, previous papers, and direct exam guidance.
                </Paragraph>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <MainButton url="/assignments" className="shadow-lg shadow-orange/20">
                Get Solved PDFs
              </MainButton>
              <MainButton mainblack url="/admission" className="border-white/20 hover:border-white">
                Contact Counselor
              </MainButton>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
