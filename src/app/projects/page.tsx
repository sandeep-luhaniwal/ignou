"use client";

import React from "react";
import ProjectHero from "@/components/projects/ProjectHero";
import ProjectProgress from "@/components/projects/ProjectProgress";
import ProjectOrderForm from "@/components/projects/ProjectOrderForm";
import ProjectGrid from "@/components/projects/ProjectGrid";
import ProjectFAQ from "@/components/projects/ProjectFAQ";

export default function ProjectsHelpPage() {
  return (
    <main className="min-h-screen bg-[#FCFDFE] flex flex-col">
      {/* Premium Dark Theme Hero Header */}
      <ProjectHero />

      {/* Main Grid Content */}
      <section className="py-12 md:py-14 lg:py-16 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          {/* Left Side: Progress roadmaps */}
          <div className="lg:col-span-7">
            <ProjectProgress />
          </div>

          {/* Right Side: Interactive Configurator */}
          <div className="lg:col-span-5 w-full">
            <ProjectOrderForm />
          </div>
        </div>
      </section>

      {/* Real Projects Search Grid (from ignouprojecthelp.in) */}
      <ProjectGrid />

      {/* Projects FAQ Accordion Section */}
      <ProjectFAQ />
    </main>
  );
}
