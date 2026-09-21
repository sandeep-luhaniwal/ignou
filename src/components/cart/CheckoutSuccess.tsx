"use client";

import React from "react";
import Heading from "@/components/ui/Heading";
import Paragraph from "@/components/ui/Paragraph";
import MainButton from "@/components/ui/MainButton";
import { Check, Download, FileText, ArrowRight } from "lucide-react";
import Card from "@/components/ui/Card";
import Link from "next/link";

export interface VerifiedDownload {
  productId?: string;
  code?: string;
  title?: string;
  fileUrl?: string;
}

interface CheckoutSuccessProps {
  downloads?: VerifiedDownload[];
  deliveryType?: "PDF" | "Handwritten";
}

export const CheckoutSuccess: React.FC<CheckoutSuccessProps> = ({
  downloads = [],
  deliveryType = "PDF",
}) => {
  return (
    <Card border className="max-w-lg mx-auto p-6 md:p-8 text-center shadow-xl my-6 bg-white border-gray-150">
      <div className="w-16 h-16 bg-green/10 text-green rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xs">
        <Check size={32} className="stroke-[2.5]" />
      </div>

      <span className="text-sm uppercase tracking-wider font-extrabold bg-green/10 text-green px-3 py-1 rounded-full inline-block mb-3">
        Payment Verified
      </span>

      <Heading mainblack bold center className="mb-2 text-xl md:text-2xl">
        Order Placed Successfully!
      </Heading>

      <Paragraph gray sm center className="mb-6 leading-relaxed">
        {deliveryType === "Handwritten"
          ? "Thank you for your order. We have received your delivery details and our team will dispatch your handwritten assignment soon."
          : "Thank you for your purchase! Your solved reference PDFs are ready for instant download below and also saved to your account."}
      </Paragraph>

      {/* Verified Download Links (PDF Delivery) */}
      {deliveryType === "PDF" && downloads.length > 0 && (
        <div className="mb-6 flex flex-col gap-3 text-left">
          <Paragraph mainblack bold xs className="uppercase tracking-wider">
            Your Downloadable Files ({downloads.length})
          </Paragraph>
          <div className="flex flex-col gap-2.5">
            {downloads.map((item, idx) => {
              const isHex = (str?: string) => Boolean(str && /^[0-9a-fA-F]{24}$/i.test(str.trim()));
              const safeCode = item.code && !isHex(item.code) ? item.code : "";
              const safeTitle =
                item.title && !isHex(item.title)
                  ? item.title
                  : safeCode
                    ? `${safeCode} Solved Assignment PDF`
                    : "Solved Assignment PDF";

              return (
                <div
                  key={item.productId || idx}
                  className="p-3.5 rounded-xl border border-gray-150 bg-dark-white/50 flex items-center justify-between gap-3 hover:border-orange/30 transition-all"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-lg bg-orange/10 text-orange flex items-center justify-center shrink-0">
                      <FileText size={18} />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-main-black truncate">
                        {safeCode ? `${safeCode} - ` : ""}
                        {safeTitle}
                      </p>
                      <span className="text-sm text-gray">Verified & Ready</span>
                    </div>
                  </div>

                  {item.fileUrl && (
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-orange hover:bg-orange/90 text-white px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-xs active:scale-95 transition-all"
                    >
                      <Download size={13} />
                      <span>Download</span>
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 mt-4">
        <Link
          href="/dashboard"
          className="flex-1 bg-main-black hover:bg-black text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
        >
          <span>Go to Download Center</span>
          <ArrowRight size={14} />
        </Link>
        <MainButton url="/" gray className="flex-1 justify-center text-xs">
          Continue Browsing
        </MainButton>
      </div>
    </Card>
  );
};

export default CheckoutSuccess;

