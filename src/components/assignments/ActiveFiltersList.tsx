import React from "react";
import { X, RotateCcw } from "lucide-react";

interface ActiveFiltersProps {
  searchQuery: string; setSearchQuery: (val: string) => void;
  selectedCategories: string[]; handleCategoryToggle: (cat: string) => void;
  selectedYears: string[]; handleYearToggle: (yr: string) => void;
  pricePreset: string; setPricePreset: (val: string) => void;
  minPrice: string; setMinPrice: (val: string) => void;
  maxPrice: string; setMaxPrice: (val: string) => void;
  isAnyFilterActive: boolean; handleResetFilters: () => void;
}

export const ActiveFiltersList: React.FC<ActiveFiltersProps> = ({
  searchQuery, setSearchQuery, selectedCategories, handleCategoryToggle,
  selectedYears, handleYearToggle, pricePreset, setPricePreset, minPrice, setMinPrice, maxPrice, setMaxPrice,
  isAnyFilterActive, handleResetFilters,
}) => {
  if (!isAnyFilterActive) return null;
  const Badge: React.FC<{ children: React.ReactNode; onDismiss: () => void }> = ({ children, onDismiss }) => (
    <span 
      className="text-xs font-bold px-3 py-1 rounded-lg flex items-center gap-1 border"
      style={{ backgroundColor: "rgba(255, 106, 0, 0.08)", borderColor: "rgba(255, 106, 0, 0.15)", color: "var(--orange)" }}
    >
      {children}
      <X size={12} className="cursor-pointer hover:opacity-80" onClick={onDismiss} />
    </span>
  );
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-xs font-bold uppercase mr-1" style={{ color: "var(--gray, #64748B)" }}>Active:</span>
      {searchQuery && <Badge onDismiss={() => setSearchQuery("")}>Search: "{searchQuery}"</Badge>}
      {selectedCategories.map(cat => <Badge key={cat} onDismiss={() => handleCategoryToggle(cat)}>{cat}</Badge>)}
      {selectedYears.map(yr => <Badge key={yr} onDismiss={() => handleYearToggle(yr)}>{yr}</Badge>)}
      {pricePreset !== "all" && (
        <Badge onDismiss={() => { setPricePreset("all"); setMinPrice(""); setMaxPrice(""); }}>
          {pricePreset === "custom" ? `₹${minPrice || 0}-₹${maxPrice || "Max"}` : pricePreset}
        </Badge>
      )}
      <button onClick={handleResetFilters} className="text-xs font-bold flex items-center gap-1 cursor-pointer border-none bg-transparent hover:opacity-85" style={{ color: "var(--orange, #FF6A00)" }}>
        <RotateCcw size={11} />Clear All
      </button>
    </div>
  );
};
export default ActiveFiltersList;
