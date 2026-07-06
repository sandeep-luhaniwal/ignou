import React from "react";
import SearchInput from "@/components/ui/SearchInput";

interface FilterProps {
  searchQuery: string; setSearchQuery: (val: string) => void;
  selectedCategories: string[]; handleCategoryToggle: (cat: string) => void;
  selectedYears: string[]; handleYearToggle: (yr: string) => void;
  pricePreset: string; setPricePreset: (val: string) => void;
  minPrice: string; setMinPrice: (val: string) => void;
  maxPrice: string; setMaxPrice: (val: string) => void;
  hideSearch?: boolean;
}

const CATS = ["BCA", "MCA", "MBA", "BA"];
const YRS = ["2025-26", "2024-25", "2023-24"];
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
}) => (
  <div className="space-y-6">
    {!hideSearch && (
      <div>
        <h5 className="font-bold text-xs text-main-black uppercase tracking-wider mb-3">Search Course</h5>
        <SearchInput placeholder="Search code (e.g. MCS-011)..." defaultValue={searchQuery} onChange={setSearchQuery} className="max-w-none" />
      </div>
    )}
    <div>
      <h5 className="font-bold text-xs text-main-black uppercase tracking-wider mb-3">Program / Category</h5>
      <div className="space-y-2">
        {CATS.map(cat => (
          <label key={cat} className="flex items-center gap-3 text-sm text-main-gray cursor-pointer hover:text-main-black transition-colors">
            <input type="checkbox" checked={selectedCategories.includes(cat)} onChange={() => handleCategoryToggle(cat)} className="rounded border-gray-300 text-orange focus:ring-orange cursor-pointer" />
            <span className={selectedCategories.includes(cat) ? "font-bold text-main-black" : "font-medium"}>{cat} Programs</span>
          </label>
        ))}
      </div>
    </div>
    <div>
      <h5 className="font-bold text-xs text-main-black uppercase tracking-wider mb-3">Session / Year</h5>
      <div className="space-y-2">
        {YRS.map(yr => (
          <label key={yr} className="flex items-center gap-3 text-sm text-main-gray cursor-pointer hover:text-main-black transition-colors">
            <input type="checkbox" checked={selectedYears.includes(yr)} onChange={() => handleYearToggle(yr)} className="rounded border-gray-300 text-orange focus:ring-orange cursor-pointer" />
            <span className={selectedYears.includes(yr) ? "font-bold text-main-black" : "font-medium"}>{yr} Session</span>
          </label>
        ))}
      </div>
    </div>
    <div>
      <h5 className="font-bold text-xs text-main-black uppercase tracking-wider mb-3">Price Range</h5>
      <div className="space-y-2.5">
        {OPTS.map(opt => (
          <label key={opt.value} className="flex items-center gap-3 text-sm text-main-gray cursor-pointer hover:text-main-black transition-colors">
            <input type="radio" name={`price-preset-${hideSearch ? 'mobile' : 'desktop'}`} value={opt.value} checked={pricePreset === opt.value} onChange={() => setPricePreset(opt.value)} className="text-orange focus:ring-orange cursor-pointer" />
            <span className={pricePreset === opt.value ? "font-bold text-main-black" : "font-medium"}>{opt.label}</span>
          </label>
        ))}
        {pricePreset === "custom" && (
          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-50">
            <input type="number" placeholder="Min" value={minPrice} onChange={e => setMinPrice(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2 text-xs outline-none focus:border-orange bg-white text-main-black" />
            <span className="text-gray text-xs">to</span>
            <input type="number" placeholder="Max" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} className="w-full border border-gray-200 rounded-lg p-2 text-xs outline-none focus:border-orange bg-white text-main-black" />
          </div>
        )}
      </div>
    </div>
  </div>
);
export default FilterContent;
