"use client";

import React, { useRef, useState, useEffect } from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "What is the difference between a Project Synopsis and a Project Report?",
    answer: "A synopsis is a brief proposal or outline of the project (typically 10-15 pages) that must be submitted and approved by IGNOU first. A project report is the complete, comprehensive thesis report (typically 80-120 pages) submitted after the synopsis has been approved."
  },
  {
    question: "Do you guarantee synopsis approval from IGNOU coordinators?",
    answer: "Yes, we guarantee synopsis approval! Our topics are checked against database records to avoid topic overlap. If your synopsis gets rejected or requires corrections, our team will modify and correct it for you at no additional cost."
  },
  {
    question: "Does the project package include software source code?",
    answer: "Yes, for computer science streams (like BCA BCSP-064 and MCA MCSP-060), our packages include the complete running source code, the database SQL scripts, and software setup guides along with the written project report."
  },
  {
    question: "How should I prepare for the Project Viva-Voce?",
    answer: "Every project report we deliver includes a complimentary Viva-Voce preparation guide containing frequently asked questions about the project tech stack, system design diagrams, and software logic to help you score high marks in your exams."
  }
];

export default function ProjectFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    if (openIndex !== null && contentRefs.current[openIndex]) {
      const el = contentRefs.current[openIndex];
      el.style.maxHeight = el.scrollHeight + "px";
    }

    contentRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i !== openIndex) {
        el.style.maxHeight = "0px";
      }
    });
  }, [openIndex]);

  return (
    <section className="py-12 bg-white border-t border-border-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-10">
          <div className="w-12 h-12 bg-light-orange text-cta rounded-full flex items-center justify-center mx-auto mb-4">
            <HelpCircle size={22} />
          </div>
          <Heading level={2} bold mainblack className="text-2xl md:text-3xl tracking-tight mb-2">
            Frequently Asked Questions
          </Heading>
          <Paragraph sm gray>
            Have questions about synopsis submissions, guide signs, or report formatting? Find answers here.
          </Paragraph>
        </div>

        <div className="space-y-4">
          {faqData.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="border border-border-white rounded-2xl overflow-hidden transition-all duration-300 bg-gray-50"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left font-bold text-main-black hover:bg-light-orange/10 transition-colors"
                >
                  <span className="text-sm md:text-base pr-4">{item.question}</span>
                  <ChevronDown
                    size={18}
                    className={`text-main-gray transition-transform duration-300 shrink-0 ${
                      isOpen ? "rotate-180 text-cta" : ""
                    }`}
                  />
                </button>

                <div
                  ref={(el) => {
                    contentRefs.current[index] = el;
                  }}
                  className="transition-all duration-300 ease-out overflow-hidden max-h-0 bg-white"
                >
                  <div className="p-5 text-xs md:text-sm text-main-gray leading-relaxed border-t border-border-white">
                    {item.answer}
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
