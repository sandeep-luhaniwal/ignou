"use client";

import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  containerClassName?: string;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onChange,
  containerClassName = "",
}) => {

  const pages = Array.from(
    { length: totalPages },
    (_, i) => i + 1
  );

  return (
    <div className={`flex items-center gap-2 ${containerClassName}`}>

      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onChange(currentPage - 1)}
        className="w-9 h-9 cursor-pointer rounded-lg border border-off-white flex items-center justify-center disabled:opacity-50"
      >
        ‹
      </button>

      {pages.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => onChange(page)}
          className={`
            px-3 h-9 min-w-9
            rounded-lg
            text-sm
            font-medium
            transition-all
            duration-300 cursor-pointer
            ${currentPage === page
              ? "bg-orange text-white"
              : "border border-off-white text-main-black bg-white"
            }
          `}
        >
          {page}
        </button>
      ))}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onChange(currentPage + 1)}
        className="w-9 h-9 rounded-lg cursor-pointer border border-off-white flex items-center justify-center disabled:opacity-50"
      >
        ›
      </button>

    </div>
  );
};

export default Pagination;