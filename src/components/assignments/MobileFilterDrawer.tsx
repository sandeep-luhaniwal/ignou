import React from "react";
import { X, RotateCcw } from "lucide-react";
import MainButton from "@/components/ui/MainButton";
import FilterContent from "./FilterContent";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  isAnyFilterActive: boolean;
  handleResetFilters: () => void;
  filterProps: any;
}

export const MobileFilterDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
  isAnyFilterActive,
  handleResetFilters,
  filterProps,
}) => {
  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden cursor-pointer" onClick={onClose} />
      <div className="fixed top-0 left-0 h-full w-80 sm:w-90 bg-white z-50 shadow-2xl lg:hidden flex flex-col p-6 overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
          <span className="font-heading font-black text-main-black text-base flex items-center gap-2">
            Filters
          </span>
          <button onClick={onClose} className="w-8 h-8 rounded-full border border-gray-150 flex items-center justify-center text-main-gray hover:bg-gray-50 cursor-pointer">
            <X size={16} />
          </button>
        </div>
        <div className="flex-1">
          <FilterContent {...filterProps} hideSearch={true} />
        </div>
        <div className="mt-auto pt-6 border-t border-gray-100 flex flex-col gap-2">
          <MainButton onClick={onClose} className="w-full justify-center text-center">
            Apply Filters
          </MainButton>
          {isAnyFilterActive && (
            <button 
              onClick={() => { handleResetFilters(); onClose(); }}
              className="py-3 text-xs text-center font-bold flex items-center justify-center gap-1 cursor-pointer rounded-lg border-none hover:opacity-85"
              style={{ backgroundColor: "var(--light-gray, #F1F5F9)", color: "var(--gray, #64748B)" }}
            >
              <RotateCcw size={12} />
              Reset All
            </button>
          )}
        </div>
      </div>
    </>
  );
};
export default MobileFilterDrawer;
