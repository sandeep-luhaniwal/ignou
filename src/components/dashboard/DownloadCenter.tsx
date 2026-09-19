"use client";

import React from "react";
import { Download, BookOpen } from "lucide-react";
import Card from "@/components/ui/Card";
import MainButton from "@/components/ui/MainButton";
import Paragraph from "@/components/ui/Paragraph";

interface PurchasedAssignment {
  id: string;
  code: string;
  title: string;
  purchaseDate: string;
}

interface DownloadCenterProps {
  purchasedAssignments: PurchasedAssignment[];
}

export const DownloadCenter: React.FC<DownloadCenterProps> = ({ purchasedAssignments }) => {
  return (
    <Card
      border
      className="border-gray-200! shadow-xs text-left transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange/10 text-orange flex items-center justify-center shrink-0">
            <Download size={16} />
          </div>
          <div>
            <Paragraph mainblack bold xl className="tracking-tight">
              Download Center
            </Paragraph>
            <Paragraph gray xs medium>
              Access your purchased solved assignments anytime.
            </Paragraph>
          </div>
        </div>
        
        <span className="bg-gray-100 text-main-black text-2xs font-black px-3 py-1.5 rounded-xl border border-gray-200">
          {purchasedAssignments.length} Assignments purchased
        </span>
      </div>

      {purchasedAssignments.length > 0 ? (
        <div className="flex flex-col gap-4">
          {purchasedAssignments.map((assignment) => (
            <div
              key={assignment.id}
              className="p-5 border border-gray-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-gray-300 hover:shadow-sm transition-all duration-300 bg-white"
            >
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-2">
                  <span className="text-2xs bg-gray-100 text-main-black font-black px-2.5 py-1 rounded-lg border border-gray-200">
                    {assignment.code}
                  </span>
                  <span className="text-2xs text-gray font-semibold">Purchased on {assignment.purchaseDate}</span>
                </div>
                <Paragraph mainblack bold sm className="mt-3 leading-relaxed">
                  {assignment.title}
                </Paragraph>
              </div>
              
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  alert(`Downloading ${assignment.code} Solved PDF...`);
                }}
                className="bg-custom-orange-gradient hover:opacity-95 text-white px-5 py-3.5 rounded-xl text-xs font-black flex items-center gap-1.5 shrink-0 shadow-md shadow-orange/10 active:scale-95 transition-transform hover:-translate-y-0.5 duration-200 w-full sm:w-auto justify-center"
              >
                <Download size={13} />
                <span>Download PDF</span>
              </a>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-4">
            <BookOpen size={24} />
          </div>
          <Paragraph mainblack bold base className="mb-1">
            No Solved Assignments
          </Paragraph>
          <Paragraph gray xs className="max-w-xs leading-relaxed mb-6">
            You haven't purchased or downloaded any solved assignments yet. Let's find some study materials!
          </Paragraph>
          <MainButton url="/assignments">Browse Solved Assignments</MainButton>
        </div>
      )}
    </Card>
  );
};

export default DownloadCenter;
