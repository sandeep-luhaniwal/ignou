"use client";

import React, { useState, useEffect, useRef } from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import Badge from "@/components/ui/Badge";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What is the last date for IGNOU July 2026 Admissions?",
    answer: "Admissions for the July 2026 cycle are currently open. The standard deadline is generally updated on the IGNOU official website, but we recommend applying early to ensure timely document verification and study material dispatch."
  },
  {
    question: "What documents are required for IGNOU admission?",
    answer: "You will need scanned copies of your photo, signature, age proof (10th certificate), educational qualification certificates (12th mark sheet for UG, graduation degree for PG), and category certificate (if applicable)."
  },
  {
    question: "How long does it take for IGNOU to confirm admission?",
    answer: "Once the application and fee are submitted, the regional center verifies your documents. It typically takes 7 to 15 working days for your admission to be confirmed and your digital ID card to be generated."
  },
  {
    question: "Can I pay the admission fee in installments?",
    answer: "No, IGNOU requires full payment of the first-semester or first-year fee at the time of online application submission. We provide safe guidance during the online payment process."
  }
];

export default function AdmissionFAQ() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  useEffect(() => {
    if (activeFaq !== null && contentRefs.current[activeFaq]) {
      const el = contentRefs.current[activeFaq];
      el.style.maxHeight = el.scrollHeight + "px";
    }

    contentRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i !== activeFaq) {
        el.style.maxHeight = "0px";
      }
    });
  }, [activeFaq]);

  return (
    <section className="py-20 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge orange roundedfull className="mb-3 px-3 py-1 font-bold uppercase tracking-wider text-sm">
            FAQs
          </Badge>
          <Heading level={2} bold mainblack className="text-2xl md:text-3xl tracking-tight mb-3">
            Frequently Asked Questions
          </Heading>
          <Paragraph sm gray>
            Common concerns regarding IGNOU new admissions.
          </Paragraph>
        </div>

        <div className="space-y-4">
          {faqData.map((faq, i) => {
            const isOpen = activeFaq === i;
            return (
              <div
                key={i}
                className="border border-border-white rounded-2xl overflow-hidden bg-gray-50 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left font-bold text-main-black hover:bg-light-orange/10 transition-colors outline-none focus:outline-none"
                >
                  <span className="text-sm md:text-base pr-4">{faq.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-main-gray transition-transform duration-300 shrink-0 ${isOpen ? "rotate-180 text-cta" : ""
                      }`}
                  />
                </button>

                <div
                  ref={(el) => {
                    contentRefs.current[i] = el;
                  }}
                  className="transition-all duration-300 ease-out overflow-hidden max-h-0 bg-white"
                >
                  <div className="p-6 text-xs md:text-sm text-main-gray leading-relaxed border-t border-border-white">
                    {faq.answer}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
