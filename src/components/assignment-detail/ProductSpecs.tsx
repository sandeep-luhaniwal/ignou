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
    document.body.style.overflow = "auto";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
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
                <Eye size={16} className="text-blue-600" />
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
              <Sparkles size={14} className="text-blue-600" />
              Document Specifications
            </Paragraph>

            <button
              type="button"
              onClick={() => {
                setZoom(1);
                setIsModalOpen(true);
              }}
              className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-colors cursor-pointer"
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
                <FileText size={14} className="text-blue-600 shrink-0" />
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
              className="w-full py-3.5 px-5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:via-indigo-700 hover:to-blue-800 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed group"
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
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
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
          <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
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
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6 transition-all duration-300 animate-in fade-in"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Top Right Close Button */}
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            title="Close (Esc)"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2.5 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all duration-200 cursor-pointer shadow-lg z-50 group active:scale-95"
          >
            <X size={22} className="transition-transform group-hover:scale-110" />
          </button>

          {/* Modal Body - Image Only */}
          <div
            className="relative flex-1 w-full flex items-center justify-center overflow-auto select-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="transition-transform duration-200 ease-out origin-center flex items-center justify-center max-w-full max-h-full p-2"
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
                className="max-w-[90vw] max-h-[80vh] object-contain rounded-xl shadow-2xl select-none"
                draggable={false}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop";
                }}
              />
            </div>
          </div>

          {/* Bottom Zoom Controls */}
          <div
            className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/75 backdrop-blur-xl border border-white/20 px-4 py-2 rounded-full shadow-2xl text-white z-50"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={handleZoomOut}
              title="Zoom Out (-)"
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white cursor-pointer active:scale-90"
            >
              <ZoomOut size={18} />
            </button>
            <span className="px-2 text-xs font-bold text-white select-none min-w-[48px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              onClick={handleZoomIn}
              title="Zoom In (+)"
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors text-white/80 hover:text-white cursor-pointer active:scale-90"
            >
              <ZoomIn size={18} />
            </button>
            <div className="w-[1px] h-4 bg-white/20 mx-0.5" />
            <button
              type="button"
              onClick={handleResetZoom}
              title="Reset Zoom (100%)"
              className="p-1.5 hover:bg-white/20 rounded-full transition-colors text-white/70 hover:text-white cursor-pointer active:scale-90"
            >
              <RotateCcw size={15} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSpecs;

