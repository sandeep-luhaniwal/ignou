"use client";

import React from "react";
import { FileText, CheckCircle2, ShieldCheck, Clock } from "lucide-react";
import Card from "@/components/ui/Card";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";

interface ProductSpecsProps {
  image: string;
  title: string;
  category: string;
  year: string;
  discount: number;
}

export const ProductSpecs: React.FC<ProductSpecsProps> = ({
  image,
  title,
  category,
  year,
  discount,
}) => {
  return (
    <div className="flex flex-col gap-6">
      <Card border className="p-0! overflow-hidden shadow-md">
        <div className="relative aspect-video w-full overflow-hidden bg-gray-100 border-b border-gray-100">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <span className="absolute top-4 left-4 bg-main-black text-white text-sm font-black px-3 py-1 rounded-lg tracking-wider">
            {category}
          </span>
          {discount > 0 && (
            <span className="absolute top-4 right-4 bg-red text-white text-sm font-black px-3 py-1 rounded-lg tracking-wider animate-pulse">
              {discount}% OFF
            </span>
          )}
        </div>

        {/* Specs Panel */}
        <div className="p-6">
          <Paragraph mainblack bold sm className="uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
            Document Specifications
          </Paragraph>
          <div className="grid grid-cols-2 gap-4 text-xs font-medium text-gray">
            <div className="flex flex-col gap-1">
              <Paragraph gray xs bold className="uppercase tracking-wider">File Format</Paragraph>
              <Paragraph mainblack sm bold className="flex items-center gap-1">
                <FileText size={12} className="text-orange" /> High-Quality PDF
              </Paragraph>
            </div>
            <div className="flex flex-col gap-1">
              <Paragraph gray xs bold className="uppercase tracking-wider">Year/Session</Paragraph>
              <Paragraph mainblack sm bold>{year}</Paragraph>
            </div>
            <div className="flex flex-col gap-1">
              <Paragraph gray xs bold className="uppercase tracking-wider">Language</Paragraph>
              <Paragraph mainblack sm bold>English Medium</Paragraph>
            </div>
            <div className="flex flex-col gap-1">
              <Paragraph gray xs bold className="uppercase tracking-wider">Quality Status</Paragraph>
              <Paragraph xs green bold className="bg-emerald-500/10 px-2.5 py-0.5 rounded-lg w-fit border border-emerald-500/20 flex items-center gap-1 mt-0.5">
                <CheckCircle2 size={10} /> Verified Solution
              </Paragraph>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Guarantees Box */}
      <Card border className="flex flex-col gap-4 text-xs font-semibold text-gray ">
        <div className="flex gap-3 items-start text-left">
          <div className="w-8 h-8 rounded-xl bg-orange/10 text-orange flex items-center justify-center shrink-0">
            <ShieldCheck size={16} />
          </div>
          <div>
            <Paragraph mainblack bold sm>
              100% Score Oriented Answers
            </Paragraph>
            <Paragraph gray xs className="mt-0.5 leading-relaxed">
              Drafted by IGNOU subject specialists for top marks.
            </Paragraph>
          </div>
        </div>

        <div className="flex gap-3 items-start text-left">
          <div className="w-8 h-8 rounded-xl bg-orange/10 text-orange flex items-center justify-center shrink-0">
            <Clock size={16} />
          </div>
          <div>
            <Paragraph mainblack bold sm>
              Instant Download Access
            </Paragraph>
            <Paragraph gray xs className="mt-0.5 leading-relaxed">
              PDF link is delivered immediately after checkout.
            </Paragraph>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProductSpecs;
