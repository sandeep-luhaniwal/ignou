import React, { useEffect, useState } from "react";
import SearchInput from "@/components/ui/SearchInput";
import { api } from "@/lib/api";

interface FilterProps {
  searchQuery: string; setSearchQuery: (val: string) => void;
  selectedCategories: string[]; handleCategoryToggle: (cat: string) => void;
  selectedYears: string[]; handleYearToggle: (yr: string) => void;
  pricePreset: string; setPricePreset: (val: string) => void;
  minPrice: string; setMinPrice: (val: string) => void;
  maxPrice: string; setMaxPrice: (val: string) => void;
  hideSearch?: boolean;
}

interface ProgramOption {
  code: string;
  name: string;
  count?: number;
}

interface SessionOption {
  year: string;
  label: string;
  count?: number;
}

const DEFAULT_PROGRAMS: ProgramOption[] = [
  { code: "BCA", name: "BCA Programs" },
  { code: "MCA", name: "MCA Programs" },
  { code: "MBA", name: "MBA Programs" },
  { code: "BA", name: "BA Programs" },
];

const DEFAULT_SESSIONS: SessionOption[] = [
  { year: "2025-26", label: "2025-26 Session" },
  { year: "2024-25", label: "2024-25 Session" },
  { year: "2023-24", label: "2023-24 Session" },
];

const OPTS = [
  { value: "all", label: "All Prices" },
  { value: "under100", label: "Under ₹100" },
  { value: "100to150", label: "₹100 - ₹150" },
  { value: "over150", label: "Over ₹150" },
  { value: "custom", label: "Custom Range" },
];

export const FilterContent: React.FC<FilterProps> = ({
  searchQuery, setSearchQuery, selectedCategories, handleCategoryToggle,
  selectedYears, handleYearToggle, pricePreset, setPricePreset, minPrice, setMinPrice, maxPrice, setMaxPrice,
  hideSearch = false,
}) => {
  const [programs, setPrograms] = useState<ProgramOption[]>(DEFAULT_PROGRAMS);
  const [sessions, setSessions] = useState<SessionOption[]>(DEFAULT_SESSIONS);

  useEffect(() => {
    let isMounted = true;
    const fetchOptions = async () => {
      try {
        const data = await api.categories.filters();
        if (isMounted && data) {
          if (Array.isArray(data.programs) && data.programs.length > 0) {
            setPrograms(data.programs);
          }
          if (Array.isArray(data.sessions) && data.sessions.length > 0) {
            setSessions(data.sessions);
          }
        }
      } catch (e) {
        // Use defaults if fetch fails
      }
    };
    fetchOptions();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="space-y-6">
      {!hideSearch && (
        <div>
          <h5 className="font-bold text-xs text-main-black uppercase tracking-wider mb-3">Search Course</h5>
          <SearchInput placeholder="Search code (e.g. MCS-011)..." defaultValue={searchQuery} onChange={setSearchQuery} className="max-w-none" />
        </div>
      )}
      <div>
        <h5 className="font-bold text-xs text-main-black uppercase tracking-wider mb-3">PROGRAM / CATEGORY</h5>
        <div className="space-y-2">
          {programs.map((prog) => {
            const isChecked = selectedCategories.includes(prog.code) || selectedCategories.includes(prog.code.toLowerCase());
            return (
              <label key={prog.code} className="flex items-center justify-between text-sm text-main-gray cursor-pointer hover:text-main-black transition-colors py-0.5">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleCategoryToggle(prog.code)}
                    className="w-4 h-4 rounded border-gray-300 text-orange focus:ring-orange cursor-pointer"
                  />
                  <span className={isChecked ? "font-bold text-main-black" : "font-medium"}>
                    {prog.name}
                  </span>
                </div>
                {typeof prog.count === "number" && prog.count > 0 && (
                  <span className="text-xs text-gray bg-gray-100 font-semibold px-2 py-0.5 rounded-full">
                    {prog.count}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>
      <div>
        <h5 className="font-bold text-xs text-main-black uppercase tracking-wider mb-3">SESSION / YEAR</h5>
        <div className="space-y-2">
          {sessions.map((sess) => {
            const isChecked = selectedYears.includes(sess.year);
            return (
              <label key={sess.year} className="flex items-center justify-between text-sm text-main-gray cursor-pointer hover:text-main-black transition-colors py-0.5">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => handleYearToggle(sess.year)}
                    className="w-4 h-4 rounded border-gray-300 text-orange focus:ring-orange cursor-pointer"
                  />
                  <span className={isChecked ? "font-bold text-main-black" : "font-medium"}>
                    {sess.label || `${sess.year} Session`}
                  </span>
                </div>
                {typeof sess.count === "number" && sess.count > 0 && (
                  <span className="text-xs text-gray bg-gray-100 font-semibold px-2 py-0.5 rounded-full">
                    {sess.count}
                  </span>
                )}
              </label>
            );
          })}
        </div>
      </div>
      <div>
        <h5 className="font-bold text-xs text-main-black uppercase tracking-wider mb-3">Price Range</h5>
        <div className="space-y-2.5">
          {OPTS.map((opt) => (
            <label key={opt.value} className="flex items-center gap-3 text-sm text-main-gray cursor-pointer hover:text-main-black transition-colors">
              <input
                type="radio"
                name={`price-preset-${hideSearch ? 'mobile' : 'desktop'}`}
                value={opt.value}
                checked={pricePreset === opt.value}
                onChange={() => setPricePreset(opt.value)}
                className="text-orange focus:ring-orange cursor-pointer"
              />
              <span className={pricePreset === opt.value ? "font-bold text-main-black" : "font-medium"}>{opt.label}</span>
            </label>
          ))}
          {pricePreset === "custom" && (
            <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-50">
              <input
                type="number"
                placeholder="Min"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 text-xs outline-none focus:border-orange bg-white text-main-black"
              />
              <span className="text-gray text-xs">to</span>
              <input
                type="number"
                placeholder="Max"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full border border-gray-200 rounded-lg p-2 text-xs outline-none focus:border-orange bg-white text-main-black"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterContent;
