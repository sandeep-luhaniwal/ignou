"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  X,
  Flame,
  ArrowUpNarrowWide,
  ArrowDownWideNarrow,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomDropdown } from "@/components/ui/CustomDropdown";
import { AssignmentCard, AssignmentItemProps } from "./AssignmentCard";
import { AssignmentFilterSidebar } from "./AssignmentFilterSidebar";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchAssignmentsRequest } from "@/store/slices/assignmentsSlice";
import { api } from "@/lib/api";

const DEFAULT_CATEGORIES = [
  { code: "BCA", label: "BCA Programs" },
  { code: "MCA", label: "MCA Programs" },
  { code: "MBA", label: "MBA Programs" },
  { code: "BA", label: "BA Programs" },
  { code: "B.Com", label: "B.Com Programs" },
  { code: "B.Sc", label: "B.Sc Programs" },
  { code: "M.Com", label: "M.Com Programs" },
  { code: "MA English", label: "MA English Programs" },
  { code: "PGDCA", label: "PGDCA Programs" },
  { code: "DECE", label: "DECE Diploma" },
];

const SESSIONS_LIST = ["2025-26", "2024-25", "2023-24"];

export function AssignmentsListView() {
  const searchParams = useSearchParams();
  const urlSearch = searchParams.get("search") ?? "";

  const dispatch = useAppDispatch();
  const { list: apiAssignments, loading, loadingMore, pagination, error } = useAppSelector(
    (state) => state.assignments
  );

  const [searchQuery, setSearchQuery] = useState(urlSearch);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedSessions, setSelectedSessions] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<"all" | "under50" | "50to60" | "over60">("all");
  const [sortBy, setSortBy] = useState<"popular" | "price-asc" | "price-desc">("popular");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [dynamicCategories, setDynamicCategories] = useState<
    { code: string; label: string; count?: number }[]
  >(DEFAULT_CATEGORIES);
  const [dynamicSessions, setDynamicSessions] = useState<
    { year: string; label?: string; count?: number }[]
  >(SESSIONS_LIST.map((year) => ({ year, label: `${year} Session`, count: 0 })));

  // Fetch filter metadata (programs, categories, sessions with real counts) from API on mount
  useEffect(() => {
    async function loadFilters() {
      try {
        const res = await api.categories.filters();
        if (res) {
          let list: { code: string; label: string; count?: number }[] = [];

          // 1. Add programs (BCA, MCA, MBA, BAG, BCOMG, etc.)
          if (Array.isArray(res.programs) && res.programs.length > 0) {
            const mappedPrograms = res.programs.map((p: any) => ({
              code: p.code,
              label: p.name || `${p.code} Programs`,
              count: typeof p.count === "number" ? p.count : 0,
            }));
            list = [...list, ...mappedPrograms];
          }

          // 2. Add main categories (Bachelor Degree, Master Degree, etc.) if present and not duplicated
          if (Array.isArray(res.categories) && res.categories.length > 0) {
            res.categories.forEach((c: any) => {
              const code = c.name || c._id;
              const displayName = c.displayName || (c.name ? c.name.charAt(0).toUpperCase() + c.name.slice(1) : "Degree");
              const exists = list.some((item) => item.code.toLowerCase() === code.toLowerCase());
              if (!exists && code) {
                list.push({
                  code: code,
                  label: displayName,
                  count: typeof c.count === "number" ? c.count : 0,
                });
              }
            });
          }

          if (list.length > 0) {
            setDynamicCategories(list);
          }

          // 3. Set real sessions with counts from API
          if (Array.isArray(res.sessions) && res.sessions.length > 0) {
            const mappedSessions = res.sessions.map((s: any) => ({
              year: s.year,
              label: s.label || `${s.year} Session`,
              count: typeof s.count === "number" ? s.count : 0,
            }));
            setDynamicSessions(mappedSessions);
          }
        }
      } catch {
        // Fallback: try api.categories.all()
        try {
          const allRes = await api.categories.all();
          const cats = Array.isArray(allRes?.data) ? allRes.data : Array.isArray(allRes) ? allRes : [];
          if (cats.length > 0) {
            const mapped = cats.map((c: any) => {
              const rawName = c.name || c.code || "";
              const formattedLabel =
                rawName.length <= 6 && !rawName.includes(" ")
                  ? rawName.toUpperCase() + " Programs"
                  : rawName
                      .split(" ")
                      .map((w: string) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
                      .join(" ");
              return {
                code: c.code || c.name || c._id,
                label: formattedLabel,
              };
            });
            setDynamicCategories(mapped);
          }
        } catch {
          // Keep default categories
        }
      }
    }
    loadFilters();
  }, []);

  // Sync url search query
  useEffect(() => {
    if (urlSearch !== searchQuery) {
      setSearchQuery(urlSearch);
    }
  }, [urlSearch]);

  // Fetch assignments from API whenever search/filter parameters change
  useEffect(() => {
    let minPrice: string | undefined;
    let maxPrice: string | undefined;

    if (priceRange === "under50") {
      maxPrice = "50";
    } else if (priceRange === "50to60") {
      minPrice = "50";
      maxPrice = "60";
    } else if (priceRange === "over60") {
      minPrice = "60";
    }

    let sortParam: string | undefined;
    if (sortBy === "price-asc") sortParam = "price_asc";
    else if (sortBy === "price-desc") sortParam = "price_desc";

    setPage(1);
    dispatch(
      fetchAssignmentsRequest({
        search: searchQuery.trim() || undefined,
        category: selectedCategories.length > 0 ? selectedCategories : undefined,
        year: selectedSessions.length > 0 ? selectedSessions : undefined,
        minPrice,
        maxPrice,
        sortBy: sortParam,
        page: 1,
        limit: 12,
      })
    );
  }, [searchQuery, selectedCategories, selectedSessions, priceRange, sortBy, dispatch]);

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const toggleSession = (sess: string) => {
    setSelectedSessions((prev) =>
      prev.includes(sess) ? prev.filter((s) => s !== sess) : [...prev, sess]
    );
  };

  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedSessions([]);
    setPriceRange("all");
    setSortBy("popular");
    setPage(1);
  };

  // Convert API raw items to AssignmentItemProps for rendering
  const assignmentItems: AssignmentItemProps[] = useMemo(() => {
    if (!Array.isArray(apiAssignments)) return [];
    return apiAssignments.map((item: any) => {
      const code = item.code || item.title?.split(/[:\s]/)[0] || "IGNOU";
      const cat = typeof item.category === "string" ? item.category : item.category?.name || item.program || "IGNOU";
      
      let degreeType: "MASTER DEGREE" | "BACHELOR DEGREE" | "DIPLOMA" = "BACHELOR DEGREE";
      const upper = (cat + " " + (item.title || "")).toUpperCase();
      if (upper.includes("MASTER") || upper.includes("MBA") || upper.includes("MCA") || upper.includes("M.COM") || upper.includes("MA ")) {
        degreeType = "MASTER DEGREE";
      } else if (upper.includes("DIPLOMA") || upper.includes("DECE") || upper.includes("PGD")) {
        degreeType = "DIPLOMA";
      }

      return {
        id: item._id || item.id || item.code || String(Math.random()),
        code: code,
        title: item.title || "",
        degreeType,
        category: cat,
        categoryLabel: `${cat} Programs`,
        session: item.year || item.session || "2024-25",
        price: Number(item.price) || 49,
        oldPrice: item.oldPrice ? Number(item.oldPrice) : Number(item.price ? item.price * 2 : 99),
        rating: typeof item.rating === "number" ? item.rating : 5,
        reviews: typeof item.reviews === "number" ? item.reviews : 20,
        image: item.image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
      };
    });
  }, [apiAssignments]);

  // Dynamic fallback counts from current items if needed
  const categoryCounts = useMemo(() => {
    const map: Record<string, number> = {};
    assignmentItems.forEach((item) => {
      const catKey = (item.category || "").toLowerCase();
      map[catKey] = (map[catKey] || 0) + 1;
      map[item.category] = (map[item.category] || 0) + 1;
    });
    return map;
  }, [assignmentItems]);

  const sessionCounts = useMemo(() => {
    const map: Record<string, number> = {};
    assignmentItems.forEach((item) => {
      if (item.session) {
        map[item.session] = (map[item.session] || 0) + 1;
      }
    });
    return map;
  }, [assignmentItems]);

  const hasMore = pagination?.totalPages ? page < pagination.totalPages : false;

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);

    let minPrice: string | undefined;
    let maxPrice: string | undefined;

    if (priceRange === "under50") {
      maxPrice = "50";
    } else if (priceRange === "50to60") {
      minPrice = "50";
      maxPrice = "60";
    } else if (priceRange === "over60") {
      minPrice = "60";
    }

    let sortParam: string | undefined;
    if (sortBy === "price-asc") sortParam = "price_asc";
    else if (sortBy === "price-desc") sortParam = "price_desc";

    dispatch(
      fetchAssignmentsRequest({
        search: searchQuery.trim() || undefined,
        category: selectedCategories.length > 0 ? selectedCategories : undefined,
        year: selectedSessions.length > 0 ? selectedSessions : undefined,
        minPrice,
        maxPrice,
        sortBy: sortParam,
        page: nextPage,
        limit: 12,
      })
    );
  };

  const hasActiveFilters =
    searchQuery !== "" ||
    selectedCategories.length > 0 ||
    selectedSessions.length > 0 ||
    priceRange !== "all";

  const filterSidebarProps = {
    selectedCategories,
    toggleCategory,
    selectedSessions,
    toggleSession,
    priceRange,
    setPriceRange,
    categoriesList: dynamicCategories,
    sessionsList: dynamicSessions,
    categoryCounts,
    sessionCounts,
    hasActiveFilters,
    resetFilters,
  };

  const totalCount = pagination?.total || assignmentItems.length;

  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
        {/* Desktop Left Filter Sidebar */}
        <aside className="hidden lg:block sticky top-20 self-start max-h-[calc(100vh-6rem)] overflow-y-auto rounded-lg bg-glass p-6 ring-1 ring-glass-edge shadow-xs backdrop-blur-xl">
          <AssignmentFilterSidebar {...filterSidebarProps} />
        </aside>

        {/* Right Main Content */}
        <div className="space-y-6">
          {/* Top Search & Filter Bar */}
          <div className="relative z-30 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-lg bg-glass p-3.5 ring-1 ring-glass-edge backdrop-blur-xl shadow-xs">
            <div className="relative flex-1 border rounded-lg">
              <Search className="size-4 text-ink/40 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search assignments by course code (e.g. MCS-011), title or keyword..."
                className="w-full rounded-lg bg-surface-strong pl-10 pr-3.5 py-2.5 text-sm text-foreground placeholder:text-ink/40 ring-1 ring-border outline-none focus:ring-2 focus:ring-azure-deep/50 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-ink/40 hover:text-ink cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              )}
            </div>

            <div className="flex items-center border rounded-lg gap-2">
              <Button
                variant="glass"
                size="default"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden rounded-lg gap-2 font-medium"
              >
                <SlidersHorizontal className="size-4 text-rose-deep" />
                <span>Filters</span>
                {hasActiveFilters && (
                  <span className="size-2 rounded-full bg-rose" />
                )}
              </Button>

              <CustomDropdown<"popular" | "price-asc" | "price-desc">
                value={sortBy}
                onChange={setSortBy}
                options={[
                  {
                    value: "popular",
                    label: "Most Popular",
                    icon: <Flame className="size-3.5 text-rose-deep" />,
                  },
                  {
                    value: "price-asc",
                    label: "Price: Low to High",
                    icon: <ArrowUpNarrowWide className="size-3.5 text-azure-deep" />,
                  },
                  {
                    value: "price-desc",
                    label: "Price: High to Low",
                    icon: <ArrowDownWideNarrow className="size-3.5 text-azure-deep" />,
                  },
                ]}
              />
            </div>
          </div>

          {/* Active Filters Tag Pills */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-ink/50 font-semibold">Active filters:</span>
              {searchQuery && (
                <span className="inline-flex items-center gap-1 rounded-full bg-surface-strong px-3 py-1 font-medium ring-1 ring-border">
                  Search: {searchQuery}
                  <button onClick={() => setSearchQuery("")} className="cursor-pointer">
                    <X className="size-3" />
                  </button>
                </span>
              )}
              {selectedCategories.map((cat) => (
                <span
                  key={cat}
                  className="inline-flex items-center gap-1 rounded-full bg-azure-soft/30 text-azure-deep px-3 py-1 font-semibold ring-1 ring-azure-deep/20"
                >
                  {cat}
                  <button onClick={() => toggleCategory(cat)} className="cursor-pointer">
                    <X className="size-3" />
                  </button>
                </span>
              ))}
              {selectedSessions.map((sess) => (
                <span
                  key={sess}
                  className="inline-flex items-center gap-1 rounded-full bg-rose-soft/30 text-rose-deep px-3 py-1 font-semibold ring-1 ring-rose-deep/20"
                >
                  {sess}
                  <button onClick={() => toggleSession(sess)} className="cursor-pointer">
                    <X className="size-3" />
                  </button>
                </span>
              ))}
              <button
                onClick={resetFilters}
                className="text-xs font-bold text-rose-deep underline cursor-pointer ml-1"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Results Count Summary */}
          <div className="flex items-center justify-between text-sm text-ink/60 font-medium">
            <p>
              Showing <strong className="text-foreground font-bold">{assignmentItems.length}</strong> of{" "}
              <strong className="text-foreground font-bold">{totalCount}</strong> assignments
            </p>
          </div>

          {/* Loading Spinner for initial / filter fetch */}
          {loading && (
            <div className="py-20 flex flex-col items-center justify-center gap-3">
              <Loader2 className="size-8 animate-spin text-azure-deep" />
              <p className="text-sm font-medium text-ink/60">Loading assignments from API...</p>
            </div>
          )}

          {/* Cards Grid */}
          {!loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {assignmentItems.map((item) => (
                <AssignmentCard key={item.id} item={item} />
              ))}
            </div>
          )}

          {/* Load More Button Section */}
          {!loading && hasMore && (
            <div className="pt-6 pb-2 flex flex-col items-center justify-center gap-2.5">
              <button
                type="button"
                disabled={loadingMore}
                onClick={handleLoadMore}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-xl bg-linear-to-r from-rose to-azure text-white text-sm font-bold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loadingMore ? (
                  <>
                    <Loader2 className="size-4.5 animate-spin" />
                    <span>Loading next page...</span>
                  </>
                ) : (
                  <span>Load More Assignments</span>
                )}
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && assignmentItems.length === 0 && (
            <div className="rounded-lg bg-glass p-12 text-center ring-1 ring-glass-edge shadow-xs">
              <div className="size-12 rounded-full bg-azure-soft/30 text-azure-deep grid place-items-center mx-auto mb-3">
                <Search className="size-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground">
                No matching assignment found
              </h3>
              <p className="mt-1 text-sm text-ink/65 max-w-md mx-auto">
                {error || "We could not find any assignments matching your current filter criteria."}
              </p>
              <Button
                variant="gradient"
                size="sm"
                onClick={resetFilters}
                className="mt-4 gap-1.5 rounded-lg font-bold shadow-md transition-all duration-300 active:scale-95 cursor-pointer"
              >
                <RotateCcw className="size-3.5" />
                <span>Reset all filters</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-card p-6 shadow-2xl overflow-y-auto ring-1 ring-border">
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
              <span className="font-bold text-base text-foreground">Filter Options</span>
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="p-1 rounded-lg text-ink/60 hover:text-ink cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>
            <AssignmentFilterSidebar {...filterSidebarProps} />
            <Button
              variant="gradient"
              className="w-full mt-6 rounded-lg font-bold shadow-md  transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
              onClick={() => setMobileFilterOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}

export default AssignmentsListView;

