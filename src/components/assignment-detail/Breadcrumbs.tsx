"use client";

import React from "react";
import Link from "next/link";

interface BreadcrumbsProps {
  code: string;
}

const isHexId = (str?: string) => Boolean(str && /^[0-9a-fA-F]{24}$/i.test(str.trim()));

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ code }) => {
  const displayCode = code && !isHexId(code) ? code : "Details";

  return (
    <div className="max-w-300 mx-auto px-4 xl:px-0 mb-6">
      <div className="flex items-center gap-2 text-xs font-bold text-gray">
        <Link href="/" className="hover:text-orange transition-colors">Home</Link>
        <span>/</span>
        <Link href="/assignments" className="hover:text-orange transition-colors">Solved Assignments</Link>
        <span>/</span>
        <span className="text-main-black">{displayCode}</span>
      </div>
    </div>
  );
};

export default Breadcrumbs;
