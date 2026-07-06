"use client";

import React from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import Card from "@/components/ui/Card";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Clock,
  ArrowRight
} from "lucide-react";

export default function ContactInfo() {
  return (
    <div className="space-y-6">
      <div>
        <Heading level={2} bold mainblack className="mb-2 text-2xl md:text-3xl tracking-tight">
          Get in Touch Instantly
        </Heading>
        <Paragraph sm gray className="leading-relaxed">
          We respond to queries within 2 hours during our business support window.
        </Paragraph>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        {/* WhatsApp Card */}
        <a
          href="https://wa.me/919876543210"
          target="_blank"
          rel="noopener noreferrer"
          className="block group"
        >
          <Card
            border
            className="hover:border-green hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer p-6"
          >
            <div className="w-12 h-12 bg-light-green text-green rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-xs">
              <MessageCircle size={22} fill="currentColor" />
            </div>
            <Heading level={4} semibold mainblack className="text-base mb-1.5">
              WhatsApp Chat
            </Heading>
            <Paragraph xs gray className="mb-4 leading-relaxed">
              Connect directly for solved assignments support.
            </Paragraph>
            <span className="text-xs font-bold text-green mt-auto flex items-center gap-1 group-hover:gap-2 transition-all">
              Chat Now <ArrowRight size={12} className="transition-transform" />
            </span>
          </Card>
        </a>

        {/* Phone Card */}
        <a
          href="tel:+919876543210"
          className="block group"
        >
          <Card
            border
            className="h-full hover:shadow-lg hover:border-cta hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer p-6"
          >
            <div className="w-12 h-12 bg-light-orange text-cta rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-xs">
              <Phone size={22} />
            </div>
            <Heading level={4} semibold mainblack className="text-base mb-1.5">
              Phone Call
            </Heading>
            <Paragraph xs gray className="mb-4 leading-relaxed">
              Talk to our academic team (Mon-Sat, 10am-6pm).
            </Paragraph>
            <span className="text-xs font-bold text-cta mt-auto flex items-center gap-1 group-hover:gap-2 transition-all">
              Call Helpline <ArrowRight size={12} />
            </span>
          </Card>
        </a>

        {/* Email Card */}
        <a
          href="mailto:support@ignouhelping.com"
          className="block group"
        >
          <Card
            border
            className="h-full hover:shadow-lg hover:border-blue hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer p-6"
          >
            <div className="w-12 h-12 bg-light-blue text-blue rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 shadow-xs">
              <Mail size={22} />
            </div>
            <Heading level={4} semibold mainblack className="text-base mb-1.5">
              Email Support
            </Heading>
            <Paragraph xs gray className="mb-4 leading-relaxed">
              Submit complex project & assignment requirements.
            </Paragraph>
            <span className="text-xs font-bold text-blue mt-auto flex items-center gap-1 group-hover:gap-2 transition-all">
              support@ignouhelping.com <ArrowRight size={12} />
            </span>
          </Card>
        </a>

        {/* Working Hours Card */}
        <Card border className="flex flex-col p-6 hover:shadow-xs transition-shadow">
          <div className="w-12 h-12 bg-light-yellow text-primary rounded-2xl flex items-center justify-center mb-5 shadow-xs">
            <Clock size={22} className="text-[#D97706]" />
          </div>
          <Heading level={4} semibold mainblack className="text-base mb-1.5">
            Support Hours
          </Heading>
          <Paragraph xs gray className="mb-2 leading-relaxed">
            Coordinators are active & online.
          </Paragraph>
          <span className="text-xs font-bold text-main-black mt-auto bg-light-gray px-3 py-1.5 rounded-lg w-fit">
            10:00 AM - 06:00 PM
          </span>
        </Card>
      </div>

      {/* Address Info */}
      <Card border className="flex gap-4 items-start p-6 mt-6 bg-linear-to-r from-white to-[#F8FAFC]">
        <div className="p-3.5 bg-light-gray text-main-gray rounded-2xl shrink-0 shadow-xs">
          <MapPin size={22} />
        </div>
        <div>
          <Heading level={4} semibold mainblack className="text-base mb-1.5">
            Our Study Guidance Hub
          </Heading>
          <Paragraph xs gray className="leading-relaxed">
            Sector 62, Noida, Uttar Pradesh, 201301 <br />
            <span className="text-main-gray font-medium">(Opposite IGNOU Regional Center, near Metro Station)</span>
          </Paragraph>
        </div>
      </Card>
    </div>
  );
}
