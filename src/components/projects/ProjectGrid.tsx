"use client";

import React, { useState, useMemo } from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import MainButton from "@/components/ui/MainButton";
import { Search, Check, Sparkles, MessageCircle, ChevronDown, Loader2 } from "lucide-react";

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
  },
  {
    code: "MSW-017",
    title: "Master of Social Work (MSW) Dissertation & Field Work Report",
    category: "MA",
    price: "₹1,799",
    features: ["Field Work Diary Entries", "Community Intervention Case Study", "Verified Guide Signature Form", "Complete 90-Page Thesis"],
    approvalRate: "99.3%"
  },
  {
    code: "PGDRD-04",
    title: "PGDRD Project: Rural Development Planning & Action Research",
    category: "Diploma",
    price: "₹1,199",
    features: ["Panchayat Level Survey Data", "Government Scheme Assessment", "Synopsis & Full Project Report", "Format Compliant with Guidelines"],
    approvalRate: "99.0%"
  },
  {
    code: "MLIP-002",
    title: "MLIS Project Report: Library Information Systems & Digital Repositories",
    category: "MA",
    price: "₹1,499",
    features: ["Koha & DSpace Implementation Logs", "Bibliometric Study Models", "Complete Printed Report Draft", "Synopsis Guide Included"],
    approvalRate: "98.7%"
  },
  {
    code: "MTTM-16",
    title: "Master of Tourism and Travel Management (MTTM) Dissertation",
    category: "Management",
    price: "₹1,650",
    features: ["Eco-tourism Empirical Analysis", "Field Survey Questionnaires", "Statistical Graphs & Summary", "Approved Topic Framework"],
    approvalRate: "99.5%"
  },
  {
    code: "BCSP-065",
    title: "BCA AI-Powered Hospital & Diagnostic Clinic System",
    category: "Computer",
    price: "₹1,599",
    features: ["Next.js & Python Backend Code", "Complete UML & ER Diagrams", "Verified Synopsis Document", "Viva Prep Notes Included"],
    approvalRate: "99.6%"
  },
  {
    code: "MCSP-061",
    title: "MCA Deep Learning Computer Vision & OCR Analysis System",
    category: "Computer",
    price: "₹2,699",
    features: ["TensorFlow & PyTorch Models", "Full Frontend & API Code", "110-Page Standard Project Report", "Synopsis with Literature Review"],
    approvalRate: "99.2%"
  },
  {
    code: "MS-100",
    title: "MBA Comprehensive Project in Supply Chain & Operations",
    category: "Management",
    price: "₹1,899",
    features: ["Real Logistics Case Studies", "Optimization Quantitative Models", "Complete Project File", "Expert Guide Support"],
    approvalRate: "99.8%"
  },
  {
    code: "MARD-004",
    title: "MA Rural Development Dissertation: Microfinance & SHGs",
    category: "MA",
    price: "₹1,599",
    features: ["Self-Help Group Field Data", "Primary Research Questionnaire", "Tabulated SPSS Analytics", "Approved Guide Format"],
    approvalRate: "99.1%"
  },
  {
    code: "PGDCA-P2",
    title: "PGDCA E-Commerce Web Portal with Secure Gateway",
    category: "Computer",
    price: "₹1,399",
    features: ["React & Node.js Implementation", "SRS & SDLC Documentation", "Project Report + Database Dump", "Synopsis Included"],
    approvalRate: "98.9%"
  },
  {
    code: "MCO-101",
    title: "M.Com Project: Financial Performance of Indian Fintechs",
    category: "Management",
    price: "₹1,750",
    features: ["5-Year Balance Sheet Analysis", "Ratio Calculations & Charts", "Comprehensive Report File", "Full Synopsis Blueprint"],
    approvalRate: "99.4%"
  },
  {
    code: "MAH-010",
    title: "MA History Dissertation: Archival Records & Colonial Trade",
    category: "MA",
    price: "₹1,499",
    features: ["Primary Archival Sources Cited", "Historiographical Essay", "Chicago Citation Style", "Guide Synopsis Draft"],
    approvalRate: "99.0%"
  },
  {
    code: "DECE-Project-2",
    title: "DECE Crèche & Nursery Activity Center Operational Manual",
    category: "Diploma",
    price: "₹950",
    features: ["Curriculum & Milestone Charts", "30-Day Activity Worksheets", "Complete Logbook Records", "Print-Ready PDF"],
    approvalRate: "98.8%"
  },
  {
    code: "MSO-005",
    title: "MA Sociology Project: Urban Migration & Sociological Trends",
    category: "MA",
    price: "₹1,599",
    features: ["Qualitative Interview Summaries", "Demographic Field Data", "Complete 85-Page Dissertation", "Synopsis Template"],
    approvalRate: "99.3%"
  },
  {
    code: "PGDESD-04",
    title: "PGD Environment & Sustainable Development Project Work",
    category: "Diploma",
    price: "₹1,250",
    features: ["EIA Site Assessment Logs", "Carbon Footprint Calculation", "Standard IGNOU Template", "Synopsis + Report Draft"],
    approvalRate: "99.0%"
  },
  {
    code: "MEC-015",
    title: "MA Economics Project: Inflation Dynamics & Monetary Policy",
    category: "MA",
    price: "₹1,699",
    features: ["Econometric Time-Series Data", "R / Stata Model Outputs", "Fully Typed Dissertation", "Approved Synopsis"],
    approvalRate: "99.5%"
  },
  {
    code: "MAPY-006",
    title: "MA Philosophy Research Paper & Dissertation Submission",
    category: "MA",
    price: "₹1,450",
    features: ["Comparative Ethical Analysis", "Extensive Bibliography & Index", "Ready for Submission PDF", "Guide Guidance"],
    approvalRate: "99.2%"
  }
];

export default function ProjectGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"All" | "Computer" | "Management" | "MA" | "Diploma">("All");
  const [visibleCount, setVisibleCount] = useState<number>(12);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

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

  // Reset pagination when category or search changes
  React.useEffect(() => {
    setVisibleCount(12);
  }, [searchQuery, selectedCategory]);

  const displayedProjects = useMemo(() => {
    return filteredProjects.slice(0, visibleCount);
  }, [filteredProjects, visibleCount]);

  const hasMore = visibleCount < filteredProjects.length;

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 12);
      setIsLoadingMore(false);
    }, 350);
  };

  const handleInquiry = (project: ProjectItem) => {
    const text = encodeURIComponent(
      `Hello IGNOU POWER, I want to order the Project Guide/Synopsis for:\n` +
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
          <div className="w-full md:w-80 relative  rounded-xl">
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
          <>
            <div className="flex items-center justify-between text-xs text-main-gray font-semibold mb-4">
              <span>
                Showing <strong className="text-main-black">{displayedProjects.length}</strong> of{" "}
                <strong className="text-main-black">{filteredProjects.length}</strong> projects
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProjects.map((project) => (
                <Card
                  key={project.code}
                  border
                  className="p-6 bg-white transition-all duration-300 rounded-2xl flex flex-col justify-between h-full border-border-white"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-sm font-bold text-cta uppercase bg-light-orange/30 px-2 py-0.5 rounded-md">
                        {project.category}
                      </span>
                      <Badge orange roundedfull className="font-extrabold text-sm px-2 py-0.5 shadow-xs">
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
                        <li key={idx} className="flex items-start gap-2 text-xs text-main-gray font-medium">
                          <Check size={12} className="text-green shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between border-t border-border-white pt-4 mt-auto">
                    <div>
                      <span className="text-sm uppercase font-bold text-gray block">Start Price</span>
                      <span className="text-lg font-black text-main-black">{project.price}</span>
                    </div>
                    <MainButton
                      onClick={() => handleInquiry(project)}
                      className="py-2.5 px-4 text-xs font-bold "
                    >
                      <MessageCircle size={14} className="mr-1 fill-current" /> Order Now
                    </MainButton>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="pt-10 pb-4 flex flex-col items-center justify-center gap-2">
                <button
                  type="button"
                  disabled={isLoadingMore}
                  onClick={handleLoadMore}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-cta text-white text-xs font-extrabold hover:bg-orange-600 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed uppercase tracking-wider"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      <span>Loading next 12 projects...</span>
                    </>
                  ) : (
                    <>
                      <ChevronDown className="size-4" />
                      <span>Load More Projects</span>
                    </>
                  )}
                </button>
                <span className="text-xs text-main-gray font-medium">
                  {filteredProjects.length - displayedProjects.length} more available
                </span>
              </div>
            )}

            {!hasMore && filteredProjects.length > 12 && (
              <div className="pt-8 text-center">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-main-gray bg-white border border-border-white px-4 py-2 rounded-full">
                  <Sparkles className="size-3.5 text-cta" />
                  All {filteredProjects.length} projects loaded
                </span>
              </div>
            )}
          </>
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
