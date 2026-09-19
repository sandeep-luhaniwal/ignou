import React from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";

interface AssignmentHeroProps {
  titlePrefix?: string;
  titleSuffix?: string;
  description?: string;
}

export const AssignmentHero: React.FC<AssignmentHeroProps> = ({
  titlePrefix = "Get Solved",
  titleSuffix = "Assignments",
  description = "Secure top marks with assignments solved by subject experts. Easily searchable, ready to download instantly.",
}) => {
  return (
    <section className="px-4 md:px-8 py-8 md:py-10 bg-transparent relative">
      <div 
        className="max-w-300 mx-auto rounded-lg border overflow-hidden relative p-8 md:p-12 text-left"
        style={{ 
          background: "linear-gradient(135deg, #FF7C00 0%, #FF5100 100%)",
          borderColor: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 10px 30px rgba(255, 106, 0, 0.12)"
        }}
      >
        <div className="absolute top-0 right-0 w-75 h-75 rounded-full blur-3xl pointer-events-none" style={{ backgroundColor: "rgba(255, 255, 255, 0.2)" }} />
        <div className="absolute -bottom-10 left-10 w-50 h-50 rounded-full blur-2xl pointer-events-none" style={{ backgroundColor: "rgba(20, 27, 44, 0.2)" }} />
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <Heading level={1} white big extrabold className="leading-tight mb-4 text-3xl sm:text-4xl md:text-5xl">
              {titlePrefix} <span className="font-black" style={{ color: "var(--main-black, #141B2C)" }}>{titleSuffix}</span>
            </Heading>
            <Paragraph white base className="max-w-xl font-medium opacity-90 text-sm md:text-base mb-0">
              {description}
            </Paragraph>
          </div>
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <div 
              className="px-6 py-4 rounded-lg border backdrop-blur-md flex flex-col gap-1 w-full max-w-65 text-left"
              style={{ backgroundColor: "rgba(255,255,255,0.1)", borderColor: "rgba(255,255,255,0.15)" }}
            >
              <span className="text-2xs uppercase font-bold tracking-wider opacity-75 text-white">Instant Access</span>
              <span className="text-lg font-black text-white" style={{ color: "var(--main-black, #141B2C)" }}>100% Solved PDF</span>
              <span className="text-xs opacity-90 font-medium text-white">Prepared by IGNOU Experts</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default AssignmentHero;
