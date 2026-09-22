"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Search, X } from "lucide-react";

interface SearchableSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
  searchPlaceholder?: string;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  value,
  onChange,
  options,
  placeholder = "Select an option...",
  searchPlaceholder = "Search...",
  disabled = false,
  className = "",
  icon,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter options based on search query
  const filteredOptions = options.filter((opt) =>
    opt.toLowerCase().includes(searchTerm.toLowerCase().trim())
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 50);
    } else {
      setSearchTerm("");
    }
  }, [isOpen]);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm("");
  };

  return (
    <div
      className={`relative w-full ${className} ${isOpen ? "z-9999" : "z-20"}`}
      ref={containerRef}
    >
      {/* Trigger Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full h-10 px-3.5 rounded-lg bg-surface-strong text-left text-sm flex items-center justify-between gap-2 ring-1 ring-border transition-all duration-200 cursor-pointer select-none ${disabled
            ? "opacity-50 cursor-not-allowed bg-surface-strong/50"
            : "hover:bg-glass hover:ring-azure/50 active:scale-[0.99]"
          } ${isOpen ? "ring-2 ring-azure/60 shadow-md bg-glass" : "shadow-2xs"}`}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2 truncate min-w-0 flex-1">
          {icon && <span className="shrink-0 text-azure-deep">{icon}</span>}
          <span
            className={`truncate font-medium ${value ? "text-foreground font-semibold" : "text-ink/40"
              }`}
          >
            {value || placeholder}
          </span>
        </div>

        <ChevronDown
          className={`size-4 text-ink/50 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180 text-azure-deep" : ""
            }`}
        />
      </button>

      {/* Floating Dropdown Menu */}
      {isOpen && !disabled && (
        <div
          role="listbox"
          className="absolute left-0 top-full mt-1.5 w-full min-w-60 sm:min-w-70 rounded-xl bg-white dark:bg-zinc-900 p-2.5 ring-1 ring-border/90 shadow-2xl z-9999 animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-2 border border-border"
        >
          {/* Search Header */}
          <div className="relative flex items-center">
            <Search className="size-3.5 text-ink/45 absolute left-3 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full h-8.5 pl-8.5 pr-7 text-xs rounded-lg bg-surface-strong ring-1 ring-border/80 outline-none focus:ring-2 focus:ring-azure/50 text-foreground placeholder:text-ink/40"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute right-2.5 size-4 rounded flex items-center justify-center text-ink/50 hover:text-foreground cursor-pointer"
              >
                <X className="size-3" />
              </button>
            )}
          </div>

          {/* Options List */}
          <div className="overflow-y-auto max-h-56 space-y-1 pr-1">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt) => {
                const isSelected = opt === value;
                return (
                  <button
                    key={opt}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(opt)}
                    className={`w-full flex items-center justify-between gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition-all duration-150 cursor-pointer text-left ${isSelected
                        ? "bg-linear-to-r from-rose-soft/40 to-azure-soft/40 text-azure-deep font-bold ring-1 ring-azure/30"
                        : "text-ink/80 hover:bg-surface-strong hover:text-foreground"
                      }`}
                  >
                    <span className="truncate">{opt}</span>
                    {isSelected && (
                      <Check className="size-3.5 text-azure-deep stroke-3 shrink-0" />
                    )}
                  </button>
                );
              })
            ) : (
              <div className="py-4 text-center text-xs text-ink/50 font-medium">
                No matching results found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
