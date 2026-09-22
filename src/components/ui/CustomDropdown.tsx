"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export interface DropdownOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

interface CustomDropdownProps<T extends string = string> {
  value: T;
  onChange: (value: T) => void;
  options: DropdownOption<T>[];
  className?: string;
  placeholder?: string;
}

export function CustomDropdown<T extends string = string>({
  value,
  onChange,
  options,
  className = "",
  placeholder = "Select...",
}: CustomDropdownProps<T>) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="h-9.5 min-w-42.5 inline-flex items-center justify-between gap-2.5 rounded-lg bg-surface-strong px-3.5 text-xs font-bold text-foreground ring-1 ring-border shadow-xs hover:bg-glass hover:ring-azure-deep/40 transition-all duration-200 cursor-pointer active:scale-95 select-none"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className="flex items-center gap-2 truncate">
          {selectedOption?.icon}
          <span>{selectedOption ? selectedOption.label : placeholder}</span>
        </span>
        <ChevronDown
          className={`size-3.5 text-ink/50 transition-transform duration-200 shrink-0 ${isOpen ? "rotate-180 text-azure-deep" : ""
            }`}
        />
      </button>

      {/* Glassmorphic Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 top-full mt-1.5 w-full min-w-47.5 rounded-lg bg-card/98 p-1.5 ring-1 ring-border shadow-2xl backdrop-blur-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="space-y-0.5">
            {options.map((opt) => {
              const isSelected = opt.value === value;
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange(opt.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between gap-2 rounded-md px-2.5 py-2 text-xs font-semibold transition-all duration-150 cursor-pointer text-left ${isSelected
                    ? "bg-linear-to-r from-rose-soft/40 to-azure-soft/40 text-azure-deep font-bold ring-1 ring-azure-deep/20"
                    : "text-ink/75 hover:bg-surface-strong hover:text-foreground"
                    }`}
                >
                  <span className="flex items-center gap-2 truncate">
                    {opt.icon}
                    <span>{opt.label}</span>
                  </span>
                  {isSelected && (
                    <Check className="size-3.5 text-azure-deep stroke-3 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default CustomDropdown;
