"use client";

import React, { useState } from "react";
import StoreHero from "@/components/store/StoreHero";
import StoreCategories from "@/components/store/StoreCategories";
import StoreProducts from "@/components/store/StoreProducts";

export default function StudyStorePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col">
      {/* Search and Main Hero Banner */}
      <StoreHero searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Program Stream Filters */}
      <StoreCategories
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      {/* Solved Assignments Catalog */}
      <StoreProducts
        searchQuery={searchQuery}
        selectedCategory={selectedCategory}
      />
    </main>
  );
}
