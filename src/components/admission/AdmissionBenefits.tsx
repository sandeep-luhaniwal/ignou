"use client";

import React from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { CheckCircle, Award, MessageCircle } from "lucide-react";

export default function AdmissionBenefits() {
  return (
    <section className="py-20 px-6 bg-gray-50 border-b border-border-white">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Side */}
        <div className="lg:col-span-7 space-y-6">
          <Badge orange roundedfull className="px-3 py-1 font-bold uppercase tracking-wider text-[10px] w-fit">
            Our Benefits
          </Badge>
          <Heading level={2} bold mainblack className="text-2xl md:text-3xl tracking-tight">
            Why Apply Through IGNOU Power?
          </Heading>
          <Paragraph sm gray className="max-w-lg leading-relaxed">
            Applying to distance education programs can be complex with digital signatures, regional centers, and study code allocations. We take care of everything.
          </Paragraph>

          <div className="space-y-5 pt-4">
            <BenefitItem
              title="Zero Rejection Guarantee"
              desc="We pre-vet all documents and certificates, ensuring a 100% admission confirmation rate."
            />
            <BenefitItem
              title="Immediate ID Card Assistance"
              desc="Get guided support on downloading your enrollment card, selecting regional center codes, and getting study materials."
            />
            <BenefitItem
              title="Complementary Academic Toolkit"
              desc="Students getting admission through us receive exclusive discounts on solved assignments and exam preps."
            />
          </div>
        </div>

        {/* Right Side (WhatsApp support card) */}
        <div className="lg:col-span-5 w-full">
          <Card border className="p-8 md:p-10 bg-white hover:shadow-lg transition-all duration-300 rounded-[2rem] border-border-white flex flex-col justify-between min-h-[350px]">
            <div>
              <div className="w-14 h-14 bg-light-orange text-cta rounded-xl flex items-center justify-center mb-6">
                <Award size={24} />
              </div>
              <Heading level={3} bold mainblack className="text-xl md:text-2xl tracking-tight mb-3">
                Need Urgent Registration Help?
              </Heading>
              <Paragraph sm gray className="leading-relaxed mb-8">
                Connect directly with our dedicated admissions manager over WhatsApp for instant query resolution.
              </Paragraph>
            </div>
            <a
              href="https://wa.me/919876543210?text=Hello%20IGNOU%20HELPING,%20I%20need%20urgent%20admission%20help."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 bg-accent text-primary py-4 rounded-xl font-extrabold hover:bg-accent/90 transition-all text-xs uppercase tracking-wider shadow-sm"
            >
              <MessageCircle size={16} fill="currentColor" /> Chat on WhatsApp
            </a>
          </Card>
        </div>
      </div>
    </section>
  );
}

const BenefitItem = ({ title, desc }: { title: string; desc: string }) => (
  <div className="flex gap-4 items-start">
    <div className="w-6 h-6 rounded-full bg-[#E6FAE5] text-green flex items-center justify-center shrink-0 mt-0.5">
      <CheckCircle size={14} />
    </div>
    <div>
      <h5 className="font-bold text-main-black text-sm mb-1">{title}</h5>
      <Paragraph xs gray className="leading-relaxed">
        {desc}
      </Paragraph>
    </div>
  </div>
);
