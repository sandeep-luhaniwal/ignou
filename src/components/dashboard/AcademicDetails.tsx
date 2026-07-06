"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import Card from "@/components/ui/Card";
import Paragraph from "@/components/ui/Paragraph";

interface AcademicDetailsProps {
  program: string;
  email: string;
  session: string;
}

export const AcademicDetails: React.FC<AcademicDetailsProps> = ({ program, email, session }) => {
  return (
    <Card
      border
      className="!border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.015)] text-left flex flex-col gap-6 hover:shadow-xl hover:!border-gray-150 transition-all duration-300"
    >
      <div className="flex items-center gap-2 pb-4 border-b border-gray-100">
        <span className="w-2.5 h-2.5 rounded-full bg-orange" />
        <Paragraph mainblack bold base className="uppercase tracking-wide">
          Academic Details
        </Paragraph>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <Paragraph gray xs bold className="uppercase tracking-wider">
            Registered Program
          </Paragraph>
          <Paragraph mainblack sm bold>
            {program}
          </Paragraph>
        </div>

        <div className="flex flex-col gap-1">
          <Paragraph gray xs bold className="uppercase tracking-wider">
            Email ID
          </Paragraph>
          <Paragraph mainblack sm bold>
            {email}
          </Paragraph>
        </div>

        <div className="flex flex-col gap-1">
          <Paragraph gray xs bold className="uppercase tracking-wider">
            Session Admission
          </Paragraph>
          <Paragraph mainblack sm bold>
            {session}
          </Paragraph>
        </div>

        <div className="flex flex-col gap-1">
          <Paragraph gray xs bold className="uppercase tracking-wider">
            University Status
          </Paragraph>
          <span className="text-xs font-bold text-[#10B981] bg-[#10B981]/10 px-2.5 py-1 rounded-lg w-fit border border-[#10B981]/10 flex items-center gap-1.5 mt-0.5">
            <CheckCircle2 size={12} /> Active Student
          </span>
        </div>
      </div>
    </Card>
  );
};

export default AcademicDetails;
