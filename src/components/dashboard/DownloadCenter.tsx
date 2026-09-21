"use client";

import React, { useState } from "react";
import { Download, BookOpen, Loader2 } from "lucide-react";
import Card from "@/components/ui/Card";
import MainButton from "@/components/ui/MainButton";
import Paragraph from "@/components/ui/Paragraph";
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
}

interface DownloadCenterProps {
  purchasedAssignments: PurchasedAssignment[];
}

export const DownloadCenter: React.FC<DownloadCenterProps> = ({ purchasedAssignments }) => {
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

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
    <Card
      border
      className="border-gray-200! shadow-xs text-left transition-all duration-300"
    >
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-orange/10 text-orange flex items-center justify-center shrink-0">
            <Download size={16} />
          </div>
          <div>
            <Paragraph mainblack bold xl className="tracking-tight">
              Download Center
            </Paragraph>
            <Paragraph gray xs medium>
              Access your purchased solved assignments anytime.
            </Paragraph>
          </div>
        </div>

        <span className="bg-gray-100 text-main-black text-sm font-black px-3 py-1.5 rounded-xl border border-gray-200">
          {purchasedAssignments.length} Assignments purchased
        </span>
      </div>

      {purchasedAssignments.length > 0 ? (
        <div className="flex flex-col gap-4">
          {purchasedAssignments.map((assignment) => {
            const isDownloading = downloadingId === assignment.id;
            const isHex = (str?: string) => Boolean(str && /^[0-9a-fA-F]{24}$/i.test(str.trim()));
            const cleanCode = assignment.code && !isHex(assignment.code) ? assignment.code : "";
            const cleanTitle =
              assignment.title && !isHex(assignment.title)
                ? assignment.title
                : cleanCode
                  ? `${cleanCode} Solved Assignment`
                  : "Solved Assignment PDF";

            return (
              <div
                key={assignment.id}
                className="p-5 border border-gray-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-gray-300 hover:shadow-sm transition-all duration-300 bg-white"
              >
                {/* Left side: Heading on top, Date/Time and Amount below */}
                <div className="flex flex-col text-left gap-2 flex-1 min-w-0">
                  {/* Top Heading */}
                  <Paragraph mainblack bold sm className="leading-snug text-sm sm:text-base">
                    {cleanTitle}
                  </Paragraph>

                  {/* Bottom Meta Details: Code, Date & Time, Purchase Amount, Payment Status */}
                  <div className="flex flex-wrap items-center gap-2 text-sm text-gray font-medium">
                    {cleanCode && (
                      <span className="text-sm bg-gray-100 text-main-black font-black px-2 py-0.5 rounded-md border border-gray-200">
                        {cleanCode}
                      </span>
                    )}

                    <span className="text-gray-500 font-semibold">
                      Purchased on {assignment.purchaseDate}
                      {assignment.purchaseTime ? `, ${assignment.purchaseTime}` : ""}
                    </span>

                    {assignment.price !== undefined && assignment.price !== null && (
                      <span className="bg-orange/10 text-orange font-bold px-2 py-0.5 rounded-md border border-orange/15">
                        Amount: ₹{assignment.price}
                      </span>
                    )}

                    {assignment.paymentStatus && assignment.paymentStatus.toLowerCase() === "failed" ? (
                      <span className="bg-red/10 text-red font-bold px-2 py-0.5 rounded-md border border-red/20">
                        Payment Failed
                      </span>
                    ) : assignment.paymentStatus && assignment.paymentStatus.toLowerCase() === "pending" ? (
                      <span className="bg-amber-50 text-amber-700 font-bold px-2 py-0.5 rounded-md border border-amber-200">
                        Payment Pending
                      </span>
                    ) : (
                      <span className="bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-md border border-emerald-200">
                        Paid
                      </span>
                    )}
                  </div>
                </div>

                {assignment.paymentStatus && assignment.paymentStatus.toLowerCase() === "failed" ? (
                  <span className="text-xs font-bold text-red bg-red/5 border border-red/20 px-4 py-2.5 rounded-xl">
                    Payment Failed
                  </span>
                ) : (
                  <button
                    type="button"
                    disabled={isDownloading}
                    onClick={() => handleDownload(assignment)}
                    className="bg-custom-orange-gradient hover:opacity-95 text-white px-5 py-3.5 rounded-xl text-xs font-black flex items-center gap-1.5 shrink-0 shadow-md shadow-orange/10 active:scale-95 transition-transform hover:-translate-y-0.5 duration-200 w-full sm:w-auto justify-center cursor-pointer disabled:opacity-60"
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 size={13} className="animate-spin" />
                        <span>Fetching...</span>
                      </>
                    ) : (
                      <>
                        <Download size={13} />
                        <span>Download PDF</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 bg-gray-50 text-gray-400 rounded-full flex items-center justify-center mb-4">
            <BookOpen size={24} />
          </div>
          <Paragraph mainblack bold base className="mb-1">
            No Solved Assignments
          </Paragraph>
          <Paragraph gray xs className="max-w-xs leading-relaxed mb-6">
            You haven't purchased or downloaded any solved assignments yet. Let's find some study materials!
          </Paragraph>
          <MainButton url="/assignments">Browse Solved Assignments</MainButton>
        </div>
      )}
    </Card>
  );
};

export default DownloadCenter;

