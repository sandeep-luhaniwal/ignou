"use client";

import React, { useRef, useState, useEffect } from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import Badge from "@/components/ui/Badge";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Are these solved assignments verified and accurate?",
    answer: "Yes, 100%. All our assignments are solved by qualified subject teachers and experts who understand the IGNOU grading criteria. Every assignment undergoes a rigorous accuracy and plagiarism check before release.",
  },
  {
    question: "Will I get good marks using these solutions?",
    answer: "Absolutely. Our solutions are formatted with clear headings, proper structures, and correct diagrams wherever applicable. Students who submit our reference solutions regularly score 90% or above in their courses.",
  },
  {
    question: "How does the handwritten doorstep delivery service work?",
    answer: "When you place a handwritten order, a writer is assigned to your course subjects. The assignment is neatly handwritten on premium sheets, margins are drawn, page numbers are indicated, and the IGNOU front-sheet is attached. Once finished, they are securely bubble-wrapped and delivered directly to your home.",
  },
  {
    question: "How do I access the PDF solved assignments after purchase?",
    answer: "Immediately after completing the checkout, you will receive a direct download link on the screen, as well as an order confirmation email containing your secure download link. You can download and save the PDFs on any device.",
  },
  {
    question: "Do you offer solutions for projects and synopses?",
    answer: "Yes, we specialize in project synopses and final project reports for BCA, MCA, MBA, and other programs. We ensure high approval rates from IGNOU coordinators and offer complete research and report drafting assistance.",
  },
];

const FAQ = () => {
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

    // Close others
    contentRefs.current.forEach((el, i) => {
      if (!el) return;
      if (i !== openIndex) {
        el.style.maxHeight = "0px";
      }
    });
  }, [openIndex]);

  return (
    <section className="py-20 bg-white relative">
      <div className="absolute top-0 right-1/4 w-125 h-125 bg-orange/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-300 mx-auto px-4 xl:px-0 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Sticky Title */}
        <div className="lg:col-span-5 lg:sticky lg:top-32 self-start text-left">
          <div className="mb-4">
            <Badge orange sm className="w-fit uppercase tracking-wider">
              Got Questions?
            </Badge>
          </div>
          
          <Heading mainblack bold className="mb-6 leading-tight">
            Frequently Asked <span className="text-orange-gradient font-extrabold">Questions</span>
          </Heading>
          
          <Paragraph gray base className="max-w-md leading-relaxed">
            Clear all your doubts about IGNOU reference solutions, submission guidelines, exam preparations, and handwritten assignment delivery options.
          </Paragraph>
        </div>

        {/* Right Column: Interactive Accordion List */}
        <div className="lg:col-span-7 space-y-6">
          {faqData.map((item, idx) => {
            const isActive = openIndex === idx;
            return (
              <div
                key={idx}
                className="border-b border-border-white pb-6"
              >
                {/* Accordion Header */}
                <div
                  onClick={() => toggleFAQ(idx)}
                  className="flex items-center justify-between cursor-pointer group select-none"
                >
                  <Heading
                    mainblack
                    semibold
                    small
                    className="text-base md:text-lg leading-snug pr-4"
                  >
                    {item.question}
                  </Heading>

                  {/* Icon Button Container */}
                  <div
                    className={`relative h-9 w-9 min-w-9 rounded-full flex justify-center items-center overflow-hidden duration-300 ${
                      isActive ? "border-0" : "border-2 border-orange/40 group-hover:border-transparent"
                    }`}
                  >
                    <div
                      className={`absolute inset-0 bg-custom-orange-gradient transition-opacity duration-500 ${
                        isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                      }`}
                    />

                    <span
                      className={`relative z-10 transition-all duration-500 ${
                        isActive ? "text-white rotate-180" : "text-main-black group-hover:text-white"
                      }`}
                    >
                      <ChevronDown className="w-4 h-4" />
                    </span>
                  </div>
                </div>

                {/* Accordion Content with Height Transition */}
                <div
                  ref={(el) => {
                    contentRefs.current[idx] = el;
                  }}
                  className="overflow-hidden transition-all duration-500 ease-in-out"
                  style={{ maxHeight: idx === openIndex ? "auto" : "0px" }}
                >
                  <div className="pt-4">
                    <Paragraph gray sm className="leading-relaxed">
                      {item.answer}
                    </Paragraph>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
