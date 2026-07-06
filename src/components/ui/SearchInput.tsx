"use client";

import React, { ChangeEvent, useState } from "react";
import Icons from "../common/Icons";

interface SearchInputProps {
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  inputClassName?: string;
  lightwhite?: boolean;
  xs?: boolean;
  sm?: boolean;
  maxw?: string;
  onChange?: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({
  placeholder = "Search...",
  defaultValue = "",
  className = "",
  inputClassName = "",
  lightwhite,
  xs,
  sm,
  maxw,
  onChange,
}) => {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChange?.(e.target.value);
  };

  return (
    <div className={`relative w-full ${maxw ? maxw : "max-w-80"} ${className}`}>
      <span className="absolute top-1/2 -translate-y-1/2 left-3">
        <Icons icon="search" />
      </span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        className={`
          w-full border rounded-lg ps-9 pe-4 py-2.5
          outline-none transition-all duration-300
          border-off-white focus:border-orange placeholder:text-gray
          ${xs ? "text-[10px]" : sm ? "text-xs" : "text-sm"}
          ${lightwhite ? "bg-light-white" : "bg-dark-white"}
          ${inputClassName}
        `}
      />
    </div>
  );
};

export default SearchInput;
