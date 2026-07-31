"use client";

import React from "react";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import Stats from "@/components/home/Stats";
import FeaturedAssignments from "@/components/home/FeaturedAssignments";
import AboutUs from "@/components/home/AboutUs";
import FAQ from "@/components/home/FAQ";

export default function Home() {
  return (
    <main className="grow bg-[#FAFBFD]">
      <Hero />
      <Features />
      <Stats />
      <FeaturedAssignments />
      <AboutUs />
      <FAQ />
    </main>
  );
}
