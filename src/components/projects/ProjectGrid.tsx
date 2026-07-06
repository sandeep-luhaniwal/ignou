"use client";

import React, { useState, useMemo } from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import MainButton from "@/components/ui/MainButton";
import { Search, Check, Sparkles, MessageCircle } from "lucide-react";

interface ProjectItem {
  code: string;
  title: string;
  category: "Computer" | "Management" | "MA" | "Diploma";
  price: string;
  features: string[];
  approvalRate: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    code: "BCSP-064",
    title: "BCA Solved Project & Synopsis (Complete PHP/Java/Python Code)",
    category: "Computer",
    price: "₹1,499",
    features: ["Unique Synopsis Draft", "Complete Project Report", "Source Code + Database Setup", "Viva Questions & Answers PDF"],
    approvalRate: "99.4%"
  },
  {
    code: "MCSP-060",
    title: "MCA Final Year Project & Synopsis (Cloud/ML/Android Solutions)",
    category: "Computer",
    price: "₹2,499",
    features: ["Custom Synopsis Writing", "Full Code + Technical Support", "Project Report (80-120 Pages)", "Viva Prep Booklet Included"],
    approvalRate: "98.9%"
  },
  {
    code: "MMPP-001",
    title: "MBA Project Report & Synopsis (HR / Marketing / Finance / Operations)",
    category: "Management",
    price: "₹1,899",
    features: ["Customized Research Topic", "Questionnaire & Analysis Guide", "Ready-to-Print Report File", "Synopsis Guide Included"],
    approvalRate: "100%"
  },
  {
    code: "DECE-4",
    title: "DECE-4 Project Work: Early Childhood Care and Education",
    category: "Diploma",
    price: "₹899",
    features: ["Child Observation Logs", "Activity Implementation Plan", "Approved Project Guide", "Signature Form Guidance"],
    approvalRate: "99.1%"
  },
  {
    code: "DNHE-4",
    title: "DNHE-4 Project: Nutrition and Health Education",
    category: "Diploma",
    price: "₹799",
    features: ["Dietary Survey Reports", "Community Survey Analysis", "Structured Case Reports", "Verified Synopsis Draft"],
    approvalRate: "98.5%"
  },
  {
    code: "MAPC-006",
    title: "MAPC Psychology Internship & Research Project",
    category: "MA",
    price: "₹1,999",
    features: ["120 Hours Internship Log", "Case History Reports", "Standardized Test Protocols", "Approved Research Thesis Draft"],
    approvalRate: "99.7%"
  },
  {
    code: "MESP-085",
    title: "MA Education (M.A. Edu) Dissertation Project Report",
    category: "MA",
    price: "₹1,699",
    features: ["Educational Survey Outline", "Statistical Analysis (SPSS)", "Fully Typed Report File", "Synopsis Guide Included"],
    approvalRate: "99.2%"
  },
  {
    code: "PTS-4 / PTS-5",
    title: "BTS/BA Tourism (PTS-4 / PTS-5) Project Report",
    category: "MA",
    price: "₹999",
    features: ["Tourism Site Case Study", "Itinerary Planning Logs", "Complete Report File", "Verified Submission Guide"],
    approvalRate: "98.8%"
  }
];

export default function ProjectGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Computer" | "Management" | "MA" | "Diploma">("All");

  const filteredProjects = useMemo(() => {
    let list = [...PROJECTS_DATA];

    if (selectedCategory !== "All") {
      list = list.filter((item) => item.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(
        (item) =>
          item.code.toLowerCase().includes(q) ||
          item.title.toLowerCase().includes(q)
      );
    }

    return list;
  }, [searchQuery, selectedCategory]);

  const handleInquiry = (project: ProjectItem) => {
    const text = encodeURIComponent(
      `Hello IGNOU HELPING, I want to order the Project Guide/Synopsis for:\n` +
      `- Course Code: ${project.code}\n` +
      `- Title: ${project.title}\n` +
      `- Price: ${project.price}`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, "_blank");
  };

  return (
    <section className="py-12 bg-gray-50 border-t border-b border-border-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-10">
          <Heading level={2} bold mainblack className="text-2xl md:text-3xl mb-2 tracking-tight">
            Explore IGNOU Projects Library
          </Heading>
          <Paragraph sm gray className="max-w-xl mx-auto">
            Search by course code to find synopsis, project reports, source code files, and study guides matching official guidelines.
          </Paragraph>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center bg-white border border-border-white rounded-xl p-1 shadow-xs">
            {(["All", "Computer", "Management", "MA", "Diploma"] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer
                  ${selectedCategory === cat
                    ? "bg-cta text-white"
                    : "text-main-gray hover:text-main-black"
                  }
                `}
              >
                {cat === "Computer" ? "BCA / MCA" : cat === "Management" ? "MBA" : cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="w-full md:w-80 relative shadow-sm rounded-xl">
            <div className="absolute top-1/2 -translate-y-1/2 left-3 text-main-gray pointer-events-none">
              <Search size={16} />
            </div>
            <input
              type="text"
              placeholder="Search by code (e.g. BCSP, DECE)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 bg-white border border-border-white rounded-xl outline-none focus:border-cta focus:ring-1 focus:ring-cta/15 text-xs text-main-black placeholder:text-gray"
            />
          </div>
        </div>

        {/* Catalog Grid */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Card
                key={project.code}
                border
                className="p-6 bg-white hover:shadow-lg transition-all duration-300 rounded-2xl flex flex-col justify-between h-full border-border-white"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="text-[10px] font-bold text-cta uppercase bg-light-orange/30 px-2 py-0.5 rounded-md">
                      {project.category}
                    </span>
                    <Badge orange roundedfull className="font-extrabold text-[9px] px-2 py-0.5 shadow-xs">
                      {project.approvalRate} Approval
                    </Badge>
                  </div>

                  <span className="font-extrabold text-main-black text-sm block mb-1 uppercase tracking-wide">
                    {project.code}
                  </span>
                  <Heading level={4} bold mainblack className="text-base mb-4 leading-snug line-clamp-2">
                    {project.title}
                  </Heading>

                  {/* Feature Checklist */}
                  <ul className="space-y-2 mb-6 border-t border-border-white pt-4">
                    {project.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-[11px] text-main-gray font-medium">
                        <Check size={12} className="text-green shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between border-t border-border-white pt-4 mt-auto">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray block">Start Price</span>
                    <span className="text-lg font-black text-main-black">{project.price}</span>
                  </div>
                  <MainButton
                    onClick={() => handleInquiry(project)}
                    className="py-2.5 px-4 text-xs font-bold shadow-sm"
                  >
                    <MessageCircle size={14} className="mr-1 fill-current" /> Order Now
                  </MainButton>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center w-full flex flex-col items-center justify-center bg-white border border-border-white rounded-2xl">
            <Sparkles size={36} className="text-cta mb-4 animate-bounce" />
            <Heading level={3} bold mainblack className="mb-2 text-lg">
              No Projects Found
            </Heading>
            <Paragraph xs gray className="max-w-xs mx-auto mb-6">
              We couldn't find any projects matching your search term. Let us write a custom synopsis for your course.
            </Paragraph>
            <MainButton
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
            >
              Reset Search Filters
            </MainButton>
          </div>
        )}
      </div>
    </section>
  );
}
