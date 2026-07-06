"use client";

import React from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import Card from "@/components/ui/Card";
import ProgressBar from "@/components/ui/ProgressBar";
import Badge from "@/components/ui/Badge";
import { Award, CheckCircle } from "lucide-react";

export default function ProjectProgress() {
  return (
    <div className="space-y-6">
      <div>
        <Heading level={2} bold mainblack className="mb-2 text-2xl md:text-3xl tracking-tight">
          Project Progress Roadmap
        </Heading>
        <Paragraph sm gray className="leading-relaxed">
          Track the standard milestones required for successful IGNOU project submission and approval.
        </Paragraph>
      </div>

      <Card border className="p-6 md:p-8 bg-white shadow-xs">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-border-white">
          <div className="p-2.5 bg-light-orange text-cta rounded-xl">
            <Award size={20} />
          </div>
          <div>
            <Heading level={4} bold mainblack className="text-base">
              Milestone Checklist
            </Heading>
            <Paragraph xs gray>
              Recommended timelines for 2026 submissions
            </Paragraph>
          </div>
          <Badge className="ml-auto" orange roundedfull>Active Guidance</Badge>
        </div>

        <div className="space-y-6">
          <ProgressBar
            title="Phase 1: Project Topic Selection & Outline Definition"
            value={100}
            color="green"
          />
          <ProgressBar
            title="Phase 2: Synopsis Preparation & Guide Signature"
            value={90}
            color="orange"
          />
          <ProgressBar
            title="Phase 3: Final Project Report Writing & Software Code Setup"
            value={75}
            color="yellow"
          />
          <ProgressBar
            title="Phase 4: Final Submission Formatting & Viva-Voce Prep"
            value={45}
            color="red"
          />
        </div>

        <div className="mt-8 pt-4.5 border-t border-border-white flex gap-3 items-start bg-light-white p-4.5 rounded-2xl">
          <CheckCircle size={18} className="text-green shrink-0 mt-0.5" />
          <p className="text-xs text-main-gray leading-relaxed">
            <span className="font-bold text-main-black">Special Note:</span> IGNOU requires synopsis approval BEFORE submitting the final report. Our team assists with custom corrections if your synopsis is rejected.
          </p>
        </div>
      </Card>
    </div>
  );
}
