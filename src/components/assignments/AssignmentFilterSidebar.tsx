import React from "react";
import { SlidersHorizontal, RotateCcw, Search, X } from "lucide-react";

interface FilterSidebarProps {
  selectedCategories: string[];
  toggleCategory: (cat: string) => void;
  selectedSessions: string[];
  toggleSession: (sess: string) => void;
  priceRange: "all" | "under50" | "50to60" | "over60";
  setPriceRange: (val: "all" | "under50" | "50to60" | "over60") => void;
  categoriesList: { code: string; label: string }[];
  sessionsList: string[];
  categoryCounts: Record<string, number>;
  hasActiveFilters: boolean;
  resetFilters: () => void;
}

export function AssignmentFilterSidebar({
  selectedCategories,
  toggleCategory,
  selectedSessions,
  toggleSession,
  priceRange,
  setPriceRange,
  categoriesList,
  sessionsList,
  categoryCounts,
  hasActiveFilters,
  resetFilters,
}: FilterSidebarProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-border/80">
        <div className="flex items-center gap-2 text-foreground font-bold text-lg">
          <SlidersHorizontal className="size-5 text-rose-deep" />
          <span>Filters</span>
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1 text-xs font-semibold text-rose-deep hover:text-rose transition-colors cursor-pointer"
          >
            <RotateCcw className="size-3" />
            <span>Reset</span>
          </button>
        )}
      </div>

      {/* PROGRAM / CATEGORY */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-2.5">
          PROGRAM / CATEGORY
        </label>
        <div className="space-y-1.5">
          {categoriesList.map((cat) => {
            const count = categoryCounts[cat.code] || 0;
            const isChecked = selectedCategories.includes(cat.code);
            return (
              <label
                key={cat.code}
                className="flex items-center justify-between py-1 px-1.5 rounded-lg text-sm text-ink/80 hover:text-foreground hover:bg-surface-strong/60 cursor-pointer transition-colors select-none"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleCategory(cat.code)}
                    className="size-4 rounded border-border text-azure-deep focus:ring-azure-deep cursor-pointer"
                  />
                  <span className="font-medium text-[13.5px]">{cat.label}</span>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                    isChecked
                      ? "bg-azure-soft/40 text-azure-deep"
                      : "bg-surface-strong text-ink/50"
                  }`}
                >
                  {count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* SESSION / YEAR */}
      <div className="pt-2 border-t border-border/70">
        <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-2.5">
          SESSION / YEAR
        </label>
        <div className="space-y-2">
          {sessionsList.map((sess) => {
            const isChecked = selectedSessions.includes(sess);
            return (
              <label
                key={sess}
                className="flex items-center gap-2.5 py-1 px-1 rounded-lg text-sm text-ink/80 hover:text-foreground cursor-pointer transition-colors select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggleSession(sess)}
                  className="size-4 rounded border-border text-azure-deep focus:ring-azure-deep cursor-pointer"
                />
                <span className="font-medium text-[13.5px]">{sess} Session</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* PRICE RANGE */}
      <div className="pt-2 border-t border-border/70">
        <label className="block text-xs font-bold uppercase tracking-wider text-ink/80 mb-2.5">
          PRICE RANGE
        </label>
        <div className="grid grid-cols-2 gap-1.5 text-xs font-medium">
          {[
            { id: "all", label: "All Prices" },
            { id: "under50", label: "Under ₹50" },
            { id: "50to60", label: "₹50 - ₹60" },
            { id: "over60", label: "Over ₹60" },
          ].map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setPriceRange(opt.id as any)}
              className={`py-1.5 px-2.5 rounded-lg border text-center transition-all cursor-pointer ${
                priceRange === opt.id
                  ? "bg-azure text-white border-azure font-bold shadow-xs"
                  : "bg-surface-strong border-border text-ink/70 hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
