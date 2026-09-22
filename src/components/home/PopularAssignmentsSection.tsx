"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, ShoppingCart, Zap, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { api } from "@/lib/api";

interface AssignmentData {
  id: string;
  code: string;
  title: string;
  price: number;
  programme: string;
  subject: string;
  session: string;
}

function formatCleanTitle(code: string, rawTitle: string) {
  if (!rawTitle) return code;
  let clean = rawTitle.trim();
  const escapedCode = code.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const regex = new RegExp(`^${escapedCode}[:\\s\\-—]+`, "i");
  if (regex.test(clean)) {
    clean = clean.replace(regex, "").trim();
  }
  return clean ? `${code} — ${clean}` : code;
}

function formatBadgeText(programme: string, subject: string) {
  const capProg = (programme || "IGNOU")
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

  const cleanSub = (subject || "Assignment")
    .replace(/^Sem\s+/i, "")
    .trim();

  const capSub = cleanSub
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");

  return `${capProg} · ${capSub}`;
}

export function PopularAssignmentsSection() {
  const { addToCart, cartItems } = useCart();
  const router = useRouter();
  const [items, setItems] = useState<AssignmentData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPopular() {
      try {
        setLoading(true);
        const res = await api.assignments.list({ limit: 6 });
        const list = Array.isArray(res?.data) ? res.data : Array.isArray(res) ? res : [];
        const formatted: AssignmentData[] = list.map((item: any) => ({
          id: item._id || item.id || item.code,
          code: item.code || item.title?.split(/[:\s]/)[0] || "IGNOU",
          title: item.title || "",
          price: Number(item.price) || 49,
          programme: typeof item.category === "string" ? item.category : item.category?.name || item.program || "IGNOU",
          subject: item.semester ? `${item.semester} Semester` : item.productType || "Assignment",
          session: item.year || item.session || "2025-26",
        }));
        setItems(formatted);
      } catch (err) {
        console.error("Failed to load popular assignments from API", err);
      } finally {
        setLoading(false);
      }
    }
    loadPopular();
  }, []);

  const handleAddToCart = (item: AssignmentData) => {
    addToCart({
      id: item.id,
      code: item.code,
      title: item.title,
      price: item.price,
      session: item.session,
    });
  };

  const handleBuyNow = (item: AssignmentData) => {
    addToCart({
      id: item.id,
      code: item.code,
      title: item.title,
      price: item.price,
      session: item.session,
    });
    router.push("/cart");
  };

  if (!loading && items.length === 0) {
    return null;
  }

  return (
    <section id="assignments" className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold">Popular assignments</h2>
          <p className="mt-1 text-sm text-ink/55">
            Solved, double-checked and formatted to IGNOU standards.
          </p>
        </div>
        <Link
          href="/assignments"
          className="hidden items-center gap-1 text-sm font-semibold text-azure-deep hover:text-azure sm:flex"
        >
          Browse all <ArrowRight className="size-4" />
        </Link>
      </div>

      {loading ? (
        <div className="py-12 flex flex-col items-center justify-center gap-2">
          <Loader2 className="size-6 animate-spin text-azure-deep" />
          <p className="text-xs font-medium text-ink/50">Loading assignments...</p>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {items.slice(0, 6).map((item, index) => {
            const isInCart = cartItems.some(
              (x) => x.id === item.id || x.code === item.code
            );

            return (
              <article
                key={item.id}
                className="flex flex-col justify-between rounded-lg bg-glass p-5 ring-1 ring-glass-edge backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:ring-azure-deep/30"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className={
                        index % 2 === 1
                          ? "rounded-md bg-rose-soft/30 px-2.5 py-1 text-xs font-bold text-rose-deep ring-1 ring-rose-deep/20"
                          : "rounded-md bg-azure-soft/30 px-2.5 py-1 text-xs font-bold text-azure-deep ring-1 ring-azure-deep/20"
                      }
                    >
                      {formatBadgeText(item.programme, item.subject)}
                    </span>
                    <span className="text-sm font-bold text-rose-deep">
                      ₹{item.price}
                    </span>
                  </div>
                  <h3 className="mt-3.5 text-base font-bold leading-snug text-foreground line-clamp-2">
                    <Link
                      href={`/assignments/${item.id}`}
                      className="hover:text-azure-deep transition-colors"
                    >
                      {formatCleanTitle(item.code, item.title)}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">
                    Latest session solution with clear headings, margins and copy-ready answers.
                  </p>
                </div>

                <div className="mt-6 border-t border-border/80 pt-4">
                  <div className="mb-3 text-xs text-ink/55 flex items-center justify-between font-medium">
                    <span>⚡ Instant PDF</span>
                    <span>✍️ Handwritten option</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleAddToCart(item)}
                      className="w-full rounded-lg font-bold border-azure-deep/30 hover:bg-azure-soft/20 text-azure-deep gap-1.5 text-xs py-2 shadow-xs transition-all cursor-pointer active:scale-95"
                    >
                      {isInCart ? (
                        <>
                          <Check className="size-3.5 text-green" />
                          <span>Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="size-3.5" />
                          <span>Add to Cart</span>
                        </>
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="gradient"
                      size="sm"
                      onClick={() => handleBuyNow(item)}
                      className="w-full rounded-lg font-bold shadow-md gap-1.5 text-xs py-2 transition-all duration-300 hover:scale-[1.02] hover:opacity-95 cursor-pointer active:scale-95"
                    >
                      <Zap className="size-3.5 fill-current" />
                      <span>Buy Now</span>
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
