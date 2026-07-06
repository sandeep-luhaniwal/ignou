"use client";

import React from "react";
import Link from "next/link";

interface BreadcrumbsProps {
  code: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ code }) => {
  return (
    <div className="max-w-[1200px] mx-auto px-4 xl:px-0 mb-6">
      <div className="flex items-center gap-2 text-xs font-bold text-gray">
        <Link href="/" className="hover:text-orange transition-colors">Home</Link>
        <span>/</span>
        <Link href="/assignments" className="hover:text-orange transition-colors">Solved Assignments</Link>
        <span>/</span>
        <span className="text-main-black">{code}</span>
      </div>
    </div>
  );
};

export default Breadcrumbs;
