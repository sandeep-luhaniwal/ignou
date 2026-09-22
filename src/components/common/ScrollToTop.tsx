"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Smooth scroll on route or query change
  useEffect(() => {
    const smoothScroll = () => {
      try {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      } catch {
        window.scrollTo(0, 0);
      }
    };

    smoothScroll();
    const timer = setTimeout(smoothScroll, 50);

    return () => clearTimeout(timer);
  }, [pathname, searchParams]);

  // 2. Proactive smooth scroll on internal link click
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (
        href &&
        href.startsWith("/") &&
        !href.startsWith("/#") &&
        !href.startsWith("#") &&
        !target.hasAttribute("target") &&
        !target.hasAttribute("download")
      ) {
        if (window.scrollY > 0) {
          try {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            });
          } catch {
            window.scrollTo(0, 0);
          }
        }
      }
    };

    document.addEventListener("click", handleLinkClick, { passive: true });
    return () => document.removeEventListener("click", handleLinkClick);
  }, []);

  return null;
}

export default ScrollToTop;

