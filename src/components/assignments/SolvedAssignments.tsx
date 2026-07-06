"use client";

import React, { useState, useMemo } from "react";
import SearchInput from "@/components/ui/SearchInput";
import { SlidersHorizontal, ArrowUpDown, RotateCcw } from "lucide-react";
import { ALL_ASSIGNMENTS } from "./data";
import FilterContent from "./FilterContent";
import MobileFilterDrawer from "./MobileFilterDrawer";
import AssignmentsGrid from "./AssignmentsGrid";
import AssignmentHero from "./AssignmentHero";
import DropDownMenu from "@/components/ui/DropDownMenu";
import ActiveFiltersList from "./ActiveFiltersList";

export const SolvedAssignments: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [pricePreset, setPricePreset] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleCategoryToggle = (c: string) =>
    setSelectedCategories((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));

  const handleYearToggle = (y: string) =>
    setSelectedYears((p) => (p.includes(y) ? p.filter((x) => x !== y) : [...p, y]));

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedYears([]);
    setSelectedCategories([]);
    setPricePreset("all");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("default");
  };

  const isAnyFilterActive = useMemo(
    () =>
      searchQuery !== "" ||
      selectedYears.length > 0 ||
      selectedCategories.length > 0 ||
      pricePreset !== "all" ||
      minPrice !== "" ||
      maxPrice !== "",
    [searchQuery, selectedYears, selectedCategories, pricePreset, minPrice, maxPrice]
  );

  const filteredProducts = useMemo(() => {
    let list = [...ALL_ASSIGNMENTS];
    if (searchQuery) {
      list = list.filter(
        (item) =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.code.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    if (selectedYears.length) {
      list = list.filter((item) => selectedYears.includes(item.year));
    }
    if (selectedCategories.length) {
      list = list.filter((item) => selectedCategories.includes(item.category));
    }
    if (pricePreset === "under100") {
      list = list.filter((item) => item.price < 100);
    } else if (pricePreset === "100to150") {
      list = list.filter((item) => item.price >= 100 && item.price <= 150);
    } else if (pricePreset === "over150") {
      list = list.filter((item) => item.price > 150);
    } else if (pricePreset === "custom") {
      const min = parseFloat(minPrice);
      const max = parseFloat(maxPrice);
      list = list.filter((i) => (isNaN(min) || i.price >= min) && (isNaN(max) || i.price <= max));
    }
    list.sort((a, b) =>
      sortBy === "price-low-high"
        ? a.price - b.price
        : sortBy === "price-high-low"
        ? b.price - a.price
        : sortBy === "rating"
        ? b.rating - a.rating || b.reviews - a.reviews
        : 0
    );
    return list;
  }, [searchQuery, selectedYears, selectedCategories, pricePreset, minPrice, maxPrice, sortBy]);

  const filterProps = {
    searchQuery,
    setSearchQuery,
    selectedCategories,
    handleCategoryToggle,
    selectedYears,
    handleYearToggle,
    pricePreset,
    setPricePreset,
    minPrice,
    setMinPrice,
    maxPrice,
    setMaxPrice,
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-sans">
      <AssignmentHero />
      <section className="max-w-[1200px] mx-auto w-full px-4 xl:px-0 py-10 flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <aside
            className="hidden lg:flex lg:col-span-3 flex-col p-6 rounded-lg border sticky top-28 shadow-sm"
            style={{
              backgroundColor: "var(--card-bg, #ffffff)",
              borderColor: "var(--border-color, #EEF2F6)",
              height: "calc(100vh - 140px)",
            }}
          >
            <div
              className="flex items-center justify-between pb-4 border-b mb-6 shrink-0"
              style={{ borderColor: "rgba(0,0,0,0.05)" }}
            >
              <span
                className="font-heading font-black text-base flex items-center gap-2"
                style={{ color: "var(--main-black, #141B2C)" }}
              >
                <SlidersHorizontal size={18} style={{ color: "var(--orange, #FF6A00)" }} />
                Filters
              </span>
              {isAnyFilterActive && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs font-bold flex items-center gap-1 cursor-pointer border-none bg-transparent hover:opacity-80"
                  style={{ color: "var(--orange, #FF6A00)" }}
                >
                  <RotateCcw size={12} />
                  Reset All
                </button>
              )}
            </div>
            <div
              className="flex-1 overflow-y-auto pr-1 select-none"
              style={{ scrollbarWidth: "thin" }}
            >
              <FilterContent {...filterProps} />
            </div>
          </aside>
          <div className="lg:col-span-9 flex flex-col gap-6 w-full">
            <div
              className="p-4 rounded-lg border flex flex-col sm:flex-row gap-4 items-center justify-between shadow-sm"
              style={{ backgroundColor: "var(--card-bg, #ffffff)", borderColor: "var(--border-color, #EEF2F6)" }}
            >
              <div className="w-full sm:w-auto flex flex-1 items-center gap-4 justify-between lg:justify-start">
                <button
                  onClick={() => setMobileOpen(true)}
                  className="lg:hidden flex items-center gap-1.5 px-4 py-2.5 rounded-lg font-semibold text-xs transition-all duration-300 border-none cursor-pointer hover:opacity-85"
                  style={{ backgroundColor: "var(--light-gray, #F1F5F9)", color: "var(--main-black, #141B2C)" }}
                >
                  <SlidersHorizontal size={14} />
                  <span>Filters</span>
                </button>
                <div className="flex-1 sm:flex-initial sm:w-64">
                  <SearchInput
                    placeholder="Search assignments..."
                    defaultValue={searchQuery}
                    onChange={setSearchQuery}
                    className="max-w-none"
                  />
                </div>
              </div>
              <div
                className="w-full sm:w-auto flex items-center justify-end gap-3 self-stretch sm:self-auto border-t sm:border-t-0 pt-3 sm:pt-0"
                style={{ borderColor: "rgba(0,0,0,0.05)" }}
              >
                <div className="flex items-center gap-2 shrink-0">
                  <ArrowUpDown size={14} style={{ color: "var(--gray, #64748B)" }} />
                  <DropDownMenu
                    options={[
                      { label: "Sort: Recommended", value: "default" },
                      { label: "Price: Low to High", value: "price-low-high" },
                      { label: "Price: High to Low", value: "price-high-low" },
                      { label: "Top Rated", value: "rating" },
                    ]}
                    value={sortBy}
                    onChange={(val) => setSortBy(String(val))}
                    placeholder="Sort: Recommended"
                    xs
                    ptwo
                    buttonClassName="font-bold border-gray-200 bg-white"
                  />
                </div>
              </div>
            </div>
            <ActiveFiltersList
              {...filterProps}
              isAnyFilterActive={isAnyFilterActive}
              handleResetFilters={handleResetFilters}
            />
            <AssignmentsGrid products={filteredProducts} handleResetFilters={handleResetFilters} />
          </div>
        </div>
      </section>
      <MobileFilterDrawer
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        isAnyFilterActive={isAnyFilterActive}
        handleResetFilters={handleResetFilters}
        filterProps={filterProps}
      />
    </div>
  );
};

export default SolvedAssignments;
