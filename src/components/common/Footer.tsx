import React from "react";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative z-0 border-t border-glass-edge bg-glass/80 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 pt-10 pb-6 md:pt-12">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* Col 1 */}
          <div className="max-w-sm">
            <Image
              src="/images/svg/main-logo.svg"
              alt="IGNOU Power Logo"
              width={140}
              height={48}
              className="h-9.5 w-auto object-contain transition-transform group-hover:scale-[1.02]"
              priority
            />
          </div>

          {/* Col 2 */}
          <div>
            <p className="text-sm font-semibold text-foreground">Quick links</p>
            <div className="mt-3.5 grid gap-2.5 text-sm text-ink/60">
              <Link href="/assignments" className="hover:text-azure-deep transition-colors">
                Solved assignments
              </Link>
              <Link href="/project-help" className="hover:text-azure-deep transition-colors">
                Project help
              </Link>
              <Link href="/admission-2026" className="hover:text-azure-deep transition-colors">
                Admission 2026
              </Link>
              <Link href="/faq" className="hover:text-azure-deep transition-colors">
                FAQs
              </Link>
            </div>
          </div>

          {/* Col 3 */}
          <div>
            <p className="text-sm font-semibold text-foreground">Contact</p>
            <div className="mt-3.5 grid gap-2 text-sm text-ink/60">
              <a href="tel:+919876543210" className="hover:text-azure-deep transition-colors">
                +91 98765 43210
              </a>
              <a href="mailto:support@ignouhelping.com" className="hover:text-azure-deep transition-colors">
                support@ignouhelping.com
              </a>
              <span className="text-xs text-ink/45">Mon–Sat · 10 AM–6 PM</span>
            </div>
          </div>
        </div>

        {/* Subfooter */}
        <div className="mt-10 flex flex-col gap-3 border-t border-border pt-6 text-xs text-ink/45 sm:flex-row sm:items-center sm:justify-between">
          <span className="order-2 md:order-1">© 2026 IGNOU Power · All Copywrite.</span>
          <div className="flex gap-4 font-medium order-1 md:order-2">
            <Link href="/terms" className="hover:text-azure-deep transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="hover:text-azure-deep transition-colors">
              Privacy
            </Link>
            <Link href="/refund-policy" className="hover:text-azure-deep transition-colors">
              Refunds
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
