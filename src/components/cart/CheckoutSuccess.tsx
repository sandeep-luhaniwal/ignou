"use client";

import React from "react";
import { Check, Download, FileText, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    <div className="max-w-lg mx-auto p-6 md:p-8 text-center  my-6 rounded-lg bg-glass ring-1 ring-glass-edge backdrop-blur-xl">
      <div className="w-16 h-16 bg-azure-soft/30 text-azure-deep rounded-full flex items-center justify-center mx-auto mb-5 ring-1 ring-azure-deep/20 shadow-xs">
        <Check className="size-8 stroke-[2.5]" />
      </div>

      <span className="text-xs uppercase tracking-wider font-bold bg-azure-soft/30 text-azure-deep px-3 py-1 rounded-full inline-block mb-3 ring-1 ring-azure-deep/20">
        Payment Verified
      </span>

      <h2 className="text-xl md:text-2xl font-bold text-foreground mb-2">
        Order Placed Successfully!
      </h2>

      <p className="text-sm text-ink/70 mb-6 leading-relaxed">
        {deliveryType === "Handwritten"
          ? "Thank you for your order. We have received your delivery details and our team will dispatch your handwritten assignment soon."
          : "Thank you for your purchase! Your solved reference PDFs are ready for instant download below and also saved to your account."}
      </p>

      {/* Verified Download Links (PDF Delivery) */}
      {deliveryType === "PDF" && downloads.length > 0 && (
        <div className="mb-6 flex flex-col gap-3 text-left">
          <p className="text-xs font-bold text-foreground uppercase tracking-wider">
            Your Downloadable Files ({downloads.length})
          </p>
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
                  className="p-3.5 rounded-lg bg-surface-strong ring-1 ring-border flex items-center justify-between gap-3 hover:ring-azure-deep/40 transition-all shadow-xs"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <div className="w-9 h-9 rounded-lg bg-azure-soft/30 text-azure-deep flex items-center justify-center shrink-0">
                      <FileText className="size-4.5" />
                    </div>
                    <div className="truncate">
                      <p className="text-xs font-bold text-foreground truncate">
                        {safeCode ? `${safeCode} - ` : ""}
                        {safeTitle}
                      </p>
                      <span className="text-xs text-ink/50 font-medium">Verified & Ready</span>
                    </div>
                  </div>

                  {item.fileUrl && (
                    <a
                      href={item.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-linear-to-r from-rose to-azure hover:opacity-95 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0 shadow-xs hover:shadow-md  active:scale-95 transition-all duration-200"
                    >
                      <Download className="size-3.5" />
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
        <Button asChild variant="gradient" className="flex-1 font-bold rounded-lg shadow-md  transition-all duration-300 hover:scale-[1.02] active:scale-95">
          <Link href="/dashboard" className="flex items-center justify-center gap-2">
            <span>Go to Download Center</span>
            <ArrowRight className="size-4" />
          </Link>
        </Button>
        <Button asChild variant="glass" className="flex-1 font-bold rounded-lg hover:bg-surface-strong transition-all">
          <Link href="/assignments">Continue Browsing</Link>
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSuccess;


