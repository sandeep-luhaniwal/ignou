"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Download,
  BookOpen,
  Loader2,
  FileText,
  Calendar,
  ShieldCheck,
  Sparkles,
  Package,
  Truck,
  PenTool,
  X,
  CheckCircle2,
  Clock,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { toast } from "react-hot-toast";

interface PurchasedAssignment {
  id: string;
  itemId?: string;
  orderId?: string;
  code: string;
  title: string;
  purchaseDate: string;
  purchaseTime?: string;
  price?: number;
  fileUrl?: string;
  paymentStatus?: string;
  deliveryType?: string;
  orderStatus?: string;
  shippingAddress?: string;
  trackingNumber?: string;
}

interface DownloadCenterProps {
  purchasedAssignments: PurchasedAssignment[];
}

export const DownloadCenter: React.FC<DownloadCenterProps> = ({ purchasedAssignments }) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [selectedHandwritten, setSelectedHandwritten] = useState<PurchasedAssignment | null>(null);

  const handleDownload = async (assignment: PurchasedAssignment) => {
    // 1. Direct URL if already available
    if (assignment.fileUrl) {
      window.open(assignment.fileUrl, "_blank");
      return;
    }

    if (!assignment.orderId || !assignment.itemId) {
      toast.error("Download details unavailable for this assignment.");
      return;
    }

    setDownloadingId(assignment.id);

    try {
      toast.loading(`Fetching secure download link for ${assignment.code}...`, {
        id: "download-pdf",
      });

      const res = await api.orders.downloadItem(assignment.orderId, assignment.itemId);
      toast.dismiss("download-pdf");

      const downloadUrl = res?.fileUrl || res?.downloadUrl || res?.url;

      if (downloadUrl) {
        toast.success(`Opening ${assignment.code} PDF...`);
        window.open(downloadUrl, "_blank");
      } else {
        toast.error(res?.message || "PDF download link could not be generated.");
      }
    } catch (err: any) {
      toast.dismiss("download-pdf");
      toast.error(err.message || "Failed to download PDF. Please ensure payment is completed.");
      console.error("Secure download error:", err);
    } finally {
      setDownloadingId(null);
    }
  };

  return (
    <div className="rounded-xl bg-glass p-5 sm:p-6 ring-1 ring-glass-edge  backdrop-blur-xl text-left transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 mb-5 pb-4 border-b border-border/70">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-lg bg-linear-to-br from-azure/20 to-rose/20 text-azure-deep flex items-center justify-center shrink-0 ring-1 ring-azure/30">
            <Download className="size-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-base sm:text-lg text-foreground tracking-tight">
                Download & Delivery Center
              </h3>
              <span className="flex items-center gap-1 text-[11px] font-bold text-azure-deep bg-azure-soft/40 px-2 py-0.5 rounded-md ring-1 ring-azure/20">
                <ShieldCheck className="size-3" /> 100% Verified
              </span>
            </div>
            <p className="text-xs text-ink/60 font-medium">
              Access your digital PDFs or track physical handwritten hardcopy orders.
            </p>
          </div>
        </div>

        <span className="bg-surface-strong text-foreground text-xs font-bold px-3 py-1.5 rounded-lg ring-1 ring-border/80 w-fit self-start sm:self-auto shadow-2xs">
          {purchasedAssignments.length} Assignments purchased
        </span>
      </div>

      {/* Assignment List */}
      {purchasedAssignments.length > 0 ? (
        <div className="flex flex-col gap-3.5">
          {purchasedAssignments.map((assignment) => {
            const isDownloading = downloadingId === assignment.id;
            const isHex = (str?: string) => Boolean(str && /^[0-9a-fA-F]{24}$/i.test(str.trim()));
            const cleanCode = assignment.code && !isHex(assignment.code) ? assignment.code : "";
            const cleanTitle =
              assignment.title && !isHex(assignment.title)
                ? assignment.title
                : cleanCode
                  ? `${cleanCode} Solved Assignment`
                  : "Solved Assignment";

            const paymentStatus = (assignment.paymentStatus || "paid").toLowerCase();
            const isPaid = paymentStatus === "paid";
            const isPending = paymentStatus === "pending";
            const isFailed = paymentStatus === "failed";

            const isHandwritten =
              assignment.deliveryType?.toLowerCase().includes("handwritten") ||
              assignment.deliveryType?.toLowerCase().includes("hardcopy");

            return (
              <div
                key={assignment.id}
                className="group relative p-4 sm:p-5 rounded-xl bg-surface-strong/90 ring-1 ring-border/80 hover:ring-azure/50 hover:bg-glass flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all duration-200 shadow-2xs hover:shadow-md"
              >
                {/* Left Side: Icon & Details */}
                <div className="flex items-start gap-3.5 flex-1 min-w-0">
                  <div
                    className={`size-10 rounded-lg flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-105 transition-transform ${isHandwritten
                        ? "bg-rose-soft/30 text-rose-deep ring-1 ring-rose/25"
                        : "bg-azure-soft/30 text-azure-deep ring-1 ring-azure/20"
                      }`}
                  >
                    {isHandwritten ? <PenTool className="size-5" /> : <FileText className="size-5" />}
                  </div>

                  <div className="flex flex-col text-left gap-1.5 min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {cleanCode && (
                        <span className="text-[11px] font-mono font-bold bg-azure-soft/40 text-azure-deep px-2 py-0.5 rounded-md ring-1 ring-azure/25">
                          {cleanCode}
                        </span>
                      )}
                      <h4 className="font-bold text-sm sm:text-base text-foreground leading-snug truncate">
                        {cleanTitle}
                      </h4>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-ink/65 font-medium">
                      {/* Delivery Mode Badge */}
                      {isHandwritten ? (
                        <span className="bg-amber-500/10 text-amber-800 dark:text-amber-300 font-bold px-2 py-0.5 rounded-md ring-1 ring-amber-500/25 text-[11px] flex items-center gap-1">
                          <Package className="size-3 text-amber-600" />
                          Handwritten Hardcopy
                        </span>
                      ) : (
                        <span className="bg-azure-soft/30 text-azure-deep font-bold px-2 py-0.5 rounded-md ring-1 ring-azure/25 text-[11px] flex items-center gap-1">
                          <FileText className="size-3" />
                          Instant PDF
                        </span>
                      )}

                      <span className="flex items-center gap-1 text-ink/60">
                        <Calendar className="size-3 text-ink/45" />
                        {assignment.purchaseDate}
                        {assignment.purchaseTime ? ` (${assignment.purchaseTime})` : ""}
                      </span>

                      {assignment.price !== undefined && assignment.price !== null && (
                        <span className="bg-rose-soft/25 text-rose-deep font-bold px-2 py-0.5 rounded-md ring-1 ring-rose/25 text-[11px]">
                          ₹{assignment.price}
                        </span>
                      )}

                      {isPaid && (
                        <span className="bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 font-bold px-2 py-0.5 rounded-md ring-1 ring-emerald-500/25 text-[11px] flex items-center gap-1">
                          <span className="size-1.5 rounded-full bg-emerald-500" />
                          Paid
                        </span>
                      )}

                      {isPending && (
                        <span className="bg-amber-500/10 text-amber-700 dark:text-amber-400 font-bold px-2 py-0.5 rounded-md ring-1 ring-amber-500/25 text-[11px] flex items-center gap-1">
                          <span className="size-1.5 rounded-full bg-amber-500 animate-pulse" />
                          Pending
                        </span>
                      )}

                      {isFailed && (
                        <span className="bg-rose-500/10 text-rose-deep font-bold px-2 py-0.5 rounded-md ring-1 ring-rose-500/25 text-[11px]">
                          Failed
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right Side: PDF Download Button vs Handwritten Summary Button */}
                <div className="w-full sm:w-auto shrink-0 sm:pl-2">
                  {isFailed ? (
                    <span className="text-xs font-bold text-rose-deep bg-rose-soft/20 ring-1 ring-rose/20 px-3 py-2 rounded-lg block text-center">
                      Payment Failed
                    </span>
                  ) : isHandwritten ? (
                    /* Handwritten Hardcopy Delivery Summary */
                    <button
                      type="button"
                      onClick={() => setSelectedHandwritten(assignment)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-9.5 px-4 rounded-lg bg-surface-strong hover:bg-glass text-foreground ring-1 ring-border text-xs sm:text-sm font-bold shadow-xs hover:ring-azure/40 hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer"
                    >
                      <Truck className="size-4 text-azure-deep" />
                      <span>Delivery Summary</span>
                    </button>
                  ) : (
                    /* Instant PDF Download */
                    <button
                      type="button"
                      disabled={isDownloading}
                      onClick={() => handleDownload(assignment)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 h-9.5 px-4 rounded-lg bg-linear-to-r from-rose to-azure text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md hover:shadow-azure/20 hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isDownloading ? (
                        <>
                          <Loader2 className="size-4 animate-spin" />
                          <span>Fetching PDF...</span>
                        </>
                      ) : (
                        <>
                          <Download className="size-4 group-hover:-translate-y-0.5 transition-transform" />
                          <span>Download PDF</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 flex flex-col items-center justify-center text-center">
          <div className="size-14 bg-azure-soft/25 text-azure-deep rounded-2xl flex items-center justify-center mb-4 ring-1 ring-azure/25 shadow-inner">
            <BookOpen className="size-7" />
          </div>
          <h4 className="font-bold text-base text-foreground mb-1">
            No Solved Assignments Yet
          </h4>
          <p className="text-xs text-ink/60 max-w-xs leading-relaxed mb-6">
            You haven't purchased or downloaded any solved assignments yet. Find accurate solved assignments for your course!
          </p>
          <Button asChild variant="default" size="default" className="font-bold rounded-lg bg-linear-to-r from-rose to-azure text-white shadow-md hover:scale-[1.02] active:scale-95 transition-all">
            <Link href="/assignments" className="flex items-center gap-1.5">
              <Sparkles className="size-4" />
              <span>Browse Solved Assignments</span>
            </Link>
          </Button>
        </div>
      )}

      {/* Handwritten Hardcopy Delivery Summary Modal */}
      {selectedHandwritten && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg rounded-2xl bg-paper p-6 text-foreground shadow-2xl ring-1 ring-border flex flex-col gap-5 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-300 ring-1 ring-amber-500/30 flex items-center justify-center shrink-0">
                  <Package className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base sm:text-lg tracking-tight">
                    Handwritten Hardcopy Summary
                  </h3>
                  <p className="text-xs text-ink/60">
                    Physical delivery details & dispatch progress
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedHandwritten(null)}
                className="size-8 rounded-lg bg-surface-strong hover:bg-glass ring-1 ring-border flex items-center justify-center text-ink/70 hover:text-foreground transition-all cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Assignment Info Card */}
            <div className="p-4 rounded-xl bg-surface-strong ring-1 ring-border/70 flex flex-col gap-2">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-mono font-bold bg-azure-soft/40 text-azure-deep px-2 py-0.5 rounded-md ring-1 ring-azure/25">
                  {selectedHandwritten.code || "Assignment"}
                </span>
                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md ring-1 ring-emerald-500/20 flex items-center gap-1">
                  <CheckCircle2 className="size-3" /> Paid Order
                </span>
              </div>
              <h4 className="font-bold text-sm text-foreground">
                {selectedHandwritten.title}
              </h4>
              <div className="text-xs text-ink/60 flex items-center gap-2 pt-1 border-t border-border/50">
                <span>Ordered: {selectedHandwritten.purchaseDate}</span>
                {selectedHandwritten.price && <span>• ₹{selectedHandwritten.price}</span>}
              </div>
            </div>

            {/* Preparation & Delivery Timeline */}
            <div className="flex flex-col gap-3">
              <h5 className="text-xs font-bold uppercase tracking-wider text-ink/50 flex items-center gap-1.5">
                <Clock className="size-3.5 text-azure-deep" />
                Dispatch & Delivery Timeline
              </h5>

              <div className="flex flex-col gap-2.5 text-xs">
                {/* Step 1 */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-emerald-500/5 ring-1 ring-emerald-500/20">
                  <div className="size-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    ✓
                  </div>
                  <div className="flex flex-col">
                    <strong className="text-emerald-800 dark:text-emerald-300 font-bold">1. Order Placed & Verified</strong>
                    <span className="text-ink/60 text-[11px]">Assignment questions and subject guidelines checked</span>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-amber-500/10 ring-1 ring-amber-500/25">
                  <div className="size-5 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px] animate-pulse">
                    2
                  </div>
                  <div className="flex flex-col">
                    <strong className="text-amber-800 dark:text-amber-300 font-bold">2. Neat Expert Handwriting (In Progress)</strong>
                    <span className="text-ink/60 text-[11px]">Handwritten on official IGNOU format A4 ruled sheets with title cover</span>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-strong ring-1 ring-border/60">
                  <div className="size-5 rounded-full bg-paper ring-1 ring-border text-ink/60 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    3
                  </div>
                  <div className="flex flex-col">
                    <strong className="text-foreground font-bold">3. Quality Check & Spiral Binding</strong>
                    <span className="text-ink/60 text-[11px]">Front page, question paper attached & water-proof packed</span>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-3 p-3 rounded-lg bg-surface-strong ring-1 ring-border/60">
                  <div className="size-5 rounded-full bg-paper ring-1 ring-border text-ink/60 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                    4
                  </div>
                  <div className="flex flex-col">
                    <strong className="text-foreground font-bold">4. Courier / Speed Post Dispatch</strong>
                    <span className="text-ink/60 text-[11px]">Delivered to your address within 4 - 6 business days</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Note & WhatsApp Track Action */}
            <div className="flex flex-col gap-3 pt-2">
              <div className="p-3 rounded-lg bg-azure-soft/20 ring-1 ring-azure/20 text-xs text-azure-deep flex items-start gap-2">
                <MapPin className="size-4 shrink-0 mt-0.5" />
                <span>
                  Physical delivery assignment. Tracking tracking updates or address changes can be confirmed via WhatsApp.
                </span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    `Hi IGNOU Power Team, I would like to track my handwritten hardcopy order for: ${selectedHandwritten.code} (${selectedHandwritten.title}).`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 h-10 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md hover:scale-[1.01] active:scale-95 transition-all cursor-pointer"
                >
                  <MessageCircle className="size-4" />
                  <span>Track on WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedHandwritten(null)}
                  className="px-4 h-10 rounded-xl bg-surface-strong hover:bg-glass ring-1 ring-border text-xs font-bold text-ink/80 transition-all cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadCenter;

