"use client";

import React, { useState, useMemo, useEffect } from "react";
import SearchInput from "@/components/ui/SearchInput";
import { SlidersHorizontal, ArrowUpDown, RotateCcw, ChevronDown, CheckCircle2 } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchAssignmentsRequest } from "@/store/slices/assignmentsSlice";
import FilterContent from "./FilterContent";
import MobileFilterDrawer from "./MobileFilterDrawer";
import AssignmentsGrid from "./AssignmentsGrid";
import AssignmentHero from "./AssignmentHero";
import DropDownMenu from "@/components/ui/DropDownMenu";
import ActiveFiltersList from "./ActiveFiltersList";

export const SolvedAssignments: React.FC = () => {
  const dispatch = useAppDispatch();
  const { list: products, pagination, loading, loadingMore, error } = useAppSelector((state) => state.assignments);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedYears, setSelectedYears] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [pricePreset, setPricePreset] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(9);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleCategoryToggle = (c: string) => {
    setSelectedCategories((p) => (p.includes(c) ? p.filter((x) => x !== c) : [...p, c]));
  };

  const handleYearToggle = (y: string) => {
    setSelectedYears((p) => (p.includes(y) ? p.filter((x) => x !== y) : [...p, y]));
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedYears([]);
    setSelectedCategories([]);
    setPricePreset("all");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("default");
    setCurrentPage(1);
  };

  // Reset to page 1 whenever any filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategories, selectedYears, pricePreset, minPrice, maxPrice, sortBy]);

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

  useEffect(() => {
    let min = minPrice;
    let max = maxPrice;
    if (pricePreset === "under100") {
      min = "";
      max = "99";
    } else if (pricePreset === "100to150") {
      min = "100";
      max = "150";
    } else if (pricePreset === "over150") {
      min = "151";
      max = "";
    }

    dispatch(
      fetchAssignmentsRequest({
        search: searchQuery,
        program: selectedCategories,
        category: selectedCategories,
        year: selectedYears,
        minPrice: min,
        maxPrice: max,
        sortBy: sortBy,
        page: currentPage,
        limit: limit,
      })
    );
  }, [searchQuery, selectedCategories, selectedYears, pricePreset, minPrice, maxPrice, sortBy, currentPage, limit, dispatch]);

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

  const hasMore = pagination && (pagination.page < pagination.totalPages || products.length < pagination.total);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <AssignmentHero />
      <section className="max-w-7xl mx-auto w-full px-4 xl:px-0 py-10 flex-1">
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
            {loading && products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 bg-white border border-gray-100 rounded-2xl shadow-sm">
                <div className="w-8 h-8 border-3 border-orange border-t-transparent rounded-full animate-spin mb-3"></div>
                <p className="text-sm font-bold text-gray">Fetching solved assignments...</p>
              </div>
            ) : error ? (
              <div className="p-6 bg-red/5 border border-red/10 rounded-2xl text-center text-red font-semibold">
                {error}
              </div>
            ) : (
              <>
                <AssignmentsGrid products={products} handleResetFilters={handleResetFilters} />
                
                {/* Load More Section */}
                {products.length > 0 && (
                  <div className="flex flex-col items-center justify-center pt-8 pb-4 gap-3">
                    {pagination?.total > 0 && (
                      <div className="flex flex-col items-center gap-1.5 text-xs text-gray-500 font-medium">
                        <span>
                          Showing <strong className="text-main-black">{products.length}</strong> of{" "}
                          <strong className="text-main-black">{pagination.total}</strong> assignments
                        </span>
                        <div className="w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-orange transition-all duration-500 rounded-full"
                            style={{
                              width: `${Math.min(100, Math.round((products.length / pagination.total) * 100))}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {hasMore ? (
                      <button
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                        disabled={loadingMore}
                        className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-orange hover:bg-orange/90 active:scale-98 transition-all shadow-md shadow-orange/20 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed border-none mt-2"
                      >
                        {loadingMore ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>Loading More Assignments...</span>
                          </>
                        ) : (
                          <>
                            <span>Load More Assignments</span>
                            <ChevronDown size={16} className="transition-transform group-hover:translate-y-0.5" />
                          </>
                        )}
                      </button>
                    ) : pagination && pagination.total > 0 && products.length >= pagination.total ? (
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-600 text-xs font-semibold mt-2">
                        <CheckCircle2 size={14} className="text-emerald-500" />
                        <span>All {pagination.total} assignments loaded</span>
                      </div>
                    ) : null}
                  </div>
                )}
              </>
            )}
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
