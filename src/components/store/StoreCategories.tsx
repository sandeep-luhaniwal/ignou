"use client";

import React from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { Laptop, Cpu, Briefcase, BookOpen, TrendingUp, FlaskConical } from "lucide-react";

interface StoreCategoriesProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const categories = [
  { id: "all", label: "All", subtext: "All Courses", icon: BookOpen, badgeText: "Full" },
  { id: "BCA", label: "BCA", subtext: "Computer", icon: Laptop, badgeText: "IT" },
  { id: "MCA", label: "MCA", subtext: "Computer", icon: Cpu, badgeText: "CS" },
  { id: "MBA", label: "MBA", subtext: "Business", icon: Briefcase, badgeText: "Mgmt" },
  { id: "BA", label: "BA", subtext: "Arts", icon: BookOpen, badgeText: "Arts" },
  { id: "BCOM", label: "B.Com", subtext: "Commerce", icon: TrendingUp, badgeText: "Comm" },
  { id: "BSC", label: "B.Sc", subtext: "Science", icon: FlaskConical, badgeText: "Sci" }
];

export default function StoreCategories({ selectedCategory, setSelectedCategory }: StoreCategoriesProps) {
  return (
    <section className="py-10 bg-white border-b border-off-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-8">
          <Heading level={2} bold mainblack className="text-xl md:text-2xl mb-1.5 tracking-tight">
            Browse Study Programs
          </Heading>
          <Paragraph xs gray className="max-w-lg mx-auto">
            Select your program stream to view solved assignments and study materials.
          </Paragraph>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className="w-full text-left outline-none group cursor-pointer relative pt-2"
              >
                {/* Floating badge placed and styled cleanly */}
                <span className="absolute top-0 right-3 z-10">
                  <Badge 
                    xs 
                    gray={!isActive} 
                    orange={isActive}
                    className="font-black text-[9px] uppercase tracking-wider px-2 py-0.5 shadow-xs"
                  >
                    {cat.badgeText}
                  </Badge>
                </span>

                <Card
                  border
                  className={`h-full p-5 flex flex-col items-center text-center transition-all duration-300 rounded-2xl
                    ${isActive 
                      ? "border-cta bg-light-orange/10 shadow-sm" 
                      : "hover:border-cta/40 hover:shadow-md"
                    }
                  `}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-all duration-300
                    ${isActive 
                      ? "bg-cta text-white shadow-md shadow-cta/20" 
                      : "bg-light-gray text-main-gray group-hover:bg-light-orange group-hover:text-cta"
                    }
                  `}>
                    <Icon size={20} />
                  </div>
                  <Heading level={4} bold mainblack className="text-base mb-1 tracking-tight">
                    {cat.label}
                  </Heading>
                  <Paragraph xs gray className="font-medium">
                    {cat.subtext}
                  </Paragraph>
                </Card>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
