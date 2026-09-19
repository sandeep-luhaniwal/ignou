"use client";

import React from "react";
import { Trophy, Clock, FileText } from "lucide-react";
import Card from "@/components/ui/Card";
import Paragraph from "@/components/ui/Paragraph";

export const CourseProgress: React.FC = () => {
  return (
    <Card
      border
      className="border-gray-100! shadow-sm text-left flex flex-col gap-5 hover:shadow-xl hover:border-gray-150! transition-all duration-300"
    >
      <div className="flex items-center justify-between pb-3 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-orange" />
          <Paragraph mainblack bold sm className="uppercase tracking-wide">
            Course Progress
          </Paragraph>
        </div>
        <Paragraph orange xs bold>
          60%
        </Paragraph>
      </div>

      <div className="flex flex-col gap-4">
        {/* Progress bar */}
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden p-0.5">
          <div className="h-full bg-orange rounded-full" style={{ width: "60%" }}></div>
        </div>

        {/* Progress Details List */}
        <div className="flex flex-col gap-2.5 text-xs font-medium text-gray mt-1">
          <div className="flex justify-between items-center p-2.5 rounded-xl bg-gray-50/50">
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-orange" /> 
              <Paragraph gray xs medium>Term End Exam preparation</Paragraph>
            </span>
            <Paragraph mainblack xs bold>Standard</Paragraph>
          </div>
          <div className="flex justify-between items-center p-2.5 rounded-xl bg-gray-50/50">
            <span className="flex items-center gap-1.5">
              <FileText size={12} className="text-orange" /> 
              <Paragraph gray xs medium>Solved Assignments</Paragraph>
            </span>
            <Paragraph green xs bold>Downloaded (2)</Paragraph>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseProgress;
