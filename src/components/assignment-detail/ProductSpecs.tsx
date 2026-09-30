"use client";

import React, { useState, useEffect } from "react";
import {
  FileText,
  CheckCircle2,
  ShieldCheck,
  Clock,
  Download,
  Maximize2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  X,
  ExternalLink,
  Eye,
  Loader2,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import Card from "@/components/ui/Card";
import Paragraph from "@/components/ui/Paragraph";

interface ProductSpecsProps {
  image: string;
  title: string;
  category: string;
  year: string;
  discount: number;
  questionPageUrl?: string;
  fileUrl?: string;
  language?: string;
  code?: string;
}

// Helper to convert Cloudinary PDF URL to high-resolution JPG image for rendering in <img>
export const getPreviewImageUrl = (url?: string): string => {
  if (!url) return "";
  if (url.includes("cloudinary.com") && url.toLowerCase().endsWith(".pdf")) {
    return url.replace(/\.pdf(\?.*)?$/i, ".jpg$1");
  }
  return url;
};

export const ProductSpecs: React.FC<ProductSpecsProps> = ({
  image,
  title,
  category,
  year,
  discount,
  questionPageUrl,
  fileUrl,
  language = "English Medium",
  code,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);

  // Effective download PDF URL
  const effectivePdfUrl =
    questionPageUrl ||
    (image && image.toLowerCase().endsWith(".pdf") ? image : "") ||
    fileUrl ||
    "";

  // Effective display image URL
  const effectiveImageUrl =
    getPreviewImageUrl(image) ||
    getPreviewImageUrl(questionPageUrl) ||
    "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop";

  // High-res preview image for modal
  const modalImageUrl = getPreviewImageUrl(questionPageUrl || image || effectiveImageUrl);

  // Zoom controls
  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.25, 0.5));
  const handleResetZoom = () => setZoom(1);

  // Keyboard navigation for modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsModalOpen(false);
      } else if (e.key === "+" || e.key === "=") {
        handleZoomIn();
      } else if (e.key === "-") {
        handleZoomOut();
      } else if (e.key === "0") {
        handleResetZoom();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isModalOpen]);

  // Download question paper PDF handler
  const handleDownloadPdf = async (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!effectivePdfUrl) {
      toast.error("Question paper PDF is not currently attached to this assignment.");
      return;
    }

    setIsDownloading(true);
    const sanitizedCode = (code || "IGNOU").replace(/[^a-zA-Z0-9_-]/g, "");
    const fileName = `${sanitizedCode}_Question_Paper.pdf`;

    try {
      // Attempt direct blob download
      const res = await fetch(effectivePdfUrl);
      if (!res.ok) throw new Error("Direct download failed");
      const blob = await res.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
      toast.success("Question paper PDF downloaded!");
    } catch {
      // Fallback: trigger standard browser download / new window
      const link = document.createElement("a");
      link.href = effectivePdfUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Opening question paper PDF...");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Product Image & Specs Card */}
      <Card border className="p-0! overflow-hidden shadow-md group">
        {/* Clickable Image Container */}
        <div
          onClick={() => {
            setZoom(1);
            setIsModalOpen(true);
          }}
          className="relative aspect-4/3 sm:aspect-video w-full overflow-hidden bg-slate-900 border-b border-gray-100 cursor-pointer select-none group/img"
          title="Click to view full image in popup"
        >
          <img
            src={effectiveImageUrl}
            alt={title}
            className="w-full h-full object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop";
            }}
          />

          {/* Category Badge */}
          <span className="absolute top-4 left-4 bg-main-black/90 backdrop-blur-md text-white text-xs sm:text-sm font-black px-3 py-1 rounded-lg tracking-wider shadow-sm z-10">
            {category}
          </span>

          {/* Discount Badge */}
          {discount > 0 && (
            <span className="absolute top-4 right-4 bg-red text-white text-xs sm:text-sm font-black px-3 py-1 rounded-lg tracking-wider animate-pulse shadow-sm z-10">
              {discount}% OFF
            </span>
          )}

          {/* Hover Overlay with Preview & Zoom CTA */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 z-10">
            <div className="flex justify-end">
              <span className="inline-flex items-center gap-1 bg-white/20 hover:bg-white/30 backdrop-blur-md text-white text-xs font-semibold px-2.5 py-1 rounded-lg transition-colors">
                <Maximize2 size={13} /> Full View
              </span>
            </div>

            <div className="flex items-center justify-center">
              <div className="flex items-center gap-2 bg-white text-main-black font-bold text-xs sm:text-sm px-4 py-2 rounded-xl shadow-xl transform translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                <Eye size={16} className="text-orange" />
                <span>Click to View Full Question Paper</span>
              </div>
            </div>

            <div className="text-center">
              <span className="text-[11px] text-white/80 font-medium">
                Tap anywhere to zoom & inspect questions
              </span>
            </div>
          </div>
        </div>

        {/* Specs Panel */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-4 border-b border-gray-100 pb-2.5">
            <Paragraph
              mainblack
              bold
              sm
              className="uppercase tracking-wider flex items-center gap-1.5"
            >
              <Sparkles size={14} className="text-orange" />
              Document Specifications
            </Paragraph>

            <button
              type="button"
              onClick={() => {
                setZoom(1);
                setIsModalOpen(true);
              }}
              className="text-xs font-bold text-orange hover:text-orange/80 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <Maximize2 size={12} /> Full Preview
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs font-medium text-gray mb-5">
            <div className="flex flex-col gap-1">
              <Paragraph gray xs bold className="uppercase tracking-wider">
                File Format
              </Paragraph>
              <Paragraph mainblack sm bold className="flex items-center gap-1.5">
                <FileText size={14} className="text-orange shrink-0" />
                <span>High-Quality PDF</span>
              </Paragraph>
            </div>

            <div className="flex flex-col gap-1">
              <Paragraph gray xs bold className="uppercase tracking-wider">
                Year/Session
              </Paragraph>
              <Paragraph mainblack sm bold>
                {year}
              </Paragraph>
            </div>

            <div className="flex flex-col gap-1">
              <Paragraph gray xs bold className="uppercase tracking-wider">
                Language
              </Paragraph>
              <Paragraph mainblack sm bold>
                {language}
              </Paragraph>
            </div>

            <div className="flex flex-col gap-1">
              <Paragraph gray xs bold className="uppercase tracking-wider">
                Quality Status
              </Paragraph>
              <Paragraph
                xs
                green
                bold
                className="bg-emerald-500/10 text-emerald-600 px-2.5 py-0.5 rounded-lg w-fit border border-emerald-500/20 flex items-center gap-1 mt-0.5"
              >
                <CheckCircle2 size={11} /> Verified Solution
              </Paragraph>
            </div>
          </div>

          {/* Prominent Question Paper Download Button */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="w-full py-3.5 px-5 bg-gradient-to-r from-[#FF6A00] via-[#FF4500] to-[#E11D48] hover:from-[#FF7B1A] hover:via-[#FF551A] hover:to-[#F43F5E] text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-orange-500/25 hover:shadow-xl hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed group"
            >
              {isDownloading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Downloading Question Paper...</span>
                </>
              ) : (
                <>
                  <Download
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-y-0.5"
                  />
                  <span>Download Question Paper (PDF)</span>
                </>
              )}
            </button>
          </div>
        </div>
      </Card>

      {/* Quick Guarantees Box */}
      <Card border className="flex flex-col gap-4 text-xs font-semibold text-gray">
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

      {/* Full Image Popup Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 md:p-6 transition-all duration-300 animate-in fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl max-h-[92vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-gray-200 text-left"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="px-4 py-3 sm:px-6 sm:py-4 bg-white border-b border-gray-100 flex items-center justify-between gap-2 shrink-0">
              <div className="flex items-center gap-2 overflow-hidden">
                <span className="bg-orange/10 text-orange text-xs font-black px-2.5 py-1 rounded-lg border border-orange/20 uppercase tracking-wider shrink-0">
                  {code || category || "IGNOU"}
                </span>
                <h3 className="text-sm sm:text-base font-bold text-main-black truncate">
                  {title} - Question Paper Preview
                </h3>
              </div>

              {/* Header Action Controls */}
              <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
                {/* Zoom Controls */}
                <div className="hidden sm:flex items-center bg-gray-100 rounded-lg p-0.5 border border-gray-200 text-main-black">
                  <button
                    type="button"
                    onClick={handleZoomOut}
                    title="Zoom Out (-)"
                    className="p-1.5 hover:bg-white rounded-md transition-colors text-gray-700 hover:text-black cursor-pointer"
                  >
                    <ZoomOut size={15} />
                  </button>
                  <span className="px-2 text-xs font-bold text-gray-700 select-none min-w-[42px] text-center">
                    {Math.round(zoom * 100)}%
                  </span>
                  <button
                    type="button"
                    onClick={handleZoomIn}
                    title="Zoom In (+)"
                    className="p-1.5 hover:bg-white rounded-md transition-colors text-gray-700 hover:text-black cursor-pointer"
                  >
                    <ZoomIn size={15} />
                  </button>
                  <button
                    type="button"
                    onClick={handleResetZoom}
                    title="Reset Zoom (100%)"
                    className="p-1.5 hover:bg-white rounded-md transition-colors text-gray-500 hover:text-black border-l border-gray-200 ml-0.5 cursor-pointer"
                  >
                    <RotateCcw size={13} />
                  </button>
                </div>

                {/* Download PDF Button */}
                {effectivePdfUrl && (
                  <button
                    type="button"
                    onClick={handleDownloadPdf}
                    disabled={isDownloading}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-[#FF6A00] to-[#E11D48] hover:from-[#FF7B1A] hover:to-[#F43F5E] text-white rounded-lg text-xs font-bold shadow-sm shadow-orange-500/20 hover:shadow-md hover:shadow-orange-500/35 active:scale-95 transition-all duration-200 cursor-pointer disabled:opacity-60 group/btn"
                    title="Download Question Paper PDF"
                  >
                    {isDownloading ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : (
                      <Download size={14} className="transition-transform group-hover/btn:translate-y-0.5" />
                    )}
                    <span className="hidden md:inline">Download PDF</span>
                  </button>
                )}

                {/* Open in New Window */}
                {effectivePdfUrl && (
                  <a
                    href={effectivePdfUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Open PDF in new tab"
                    className="p-2 text-gray-500 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ExternalLink size={16} />
                  </a>
                )}

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  title="Close (Esc)"
                  className="p-2 text-gray-500 hover:text-red hover:bg-red/10 rounded-lg transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Modal Body - Zoomable & Scrollable View */}
            <div className="relative flex-1 overflow-auto bg-slate-950 p-4 sm:p-8 flex items-center justify-center min-h-[300px] sm:min-h-[500px]">
              <div
                className="transition-transform duration-200 ease-out origin-top flex items-center justify-center max-w-full"
                style={{
                  transform: `scale(${zoom})`,
                  cursor: zoom > 1 ? "zoom-out" : "zoom-in",
                }}
                onClick={() => {
                  if (zoom === 1) setZoom(1.5);
                  else setZoom(1);
                }}
                title={zoom === 1 ? "Click to zoom in" : "Click to zoom out"}
              >
                <img
                  src={modalImageUrl}
                  alt={title}
                  className="max-w-full max-h-[75vh] object-contain object-top rounded-lg shadow-2xl select-none"
                  draggable={false}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop";
                  }}
                />
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                <span>
                  Official IGNOU Question Booklet • Verified by Subject Specialists
                </span>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isDownloading}
                  className="flex-1 sm:flex-initial py-2.5 px-5 bg-gradient-to-r from-[#FF6A00] via-[#FF4500] to-[#E11D48] hover:from-[#FF7B1A] hover:via-[#FF551A] hover:to-[#F43F5E] text-white rounded-xl text-xs sm:text-sm font-extrabold shadow-md shadow-orange-500/25 hover:shadow-lg hover:shadow-orange-500/35 hover:-translate-y-0.5 active:translate-y-0 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 group/fbtn"
                >
                  {isDownloading ? (
                    <Loader2 size={15} className="animate-spin" />
                  ) : (
                    <Download size={15} className="transition-transform group-hover/fbtn:translate-y-0.5" />
                  )}
                  <span>Download Question PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="py-2.5 px-4 border border-gray-300 hover:bg-gray-100 text-gray-700 rounded-xl text-xs sm:text-sm font-bold transition-colors cursor-pointer"
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

export default ProductSpecs;

