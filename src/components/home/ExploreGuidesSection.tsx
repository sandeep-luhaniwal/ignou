import Link from "next/link";
import { ArrowRight, GraduationCap, PenLine } from "lucide-react";

export function ExploreGuidesSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="grid gap-4 md:grid-cols-2">
        <Link
          href="/project-help"
          className="group rounded-lg bg-glass p-7 ring-1 ring-glass-edge backdrop-blur-xl transition-all hover:shadow-md"
        >
          <PenLine className="size-6 text-rose-deep" />
          <h2 className="mt-5 text-2xl font-semibold">Project & synopsis help</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/60">
            Structured guidance for BCA, MCA, MBA and other professional programmes.
          </p>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-azure-deep">
            Explore project help{" "}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
        <Link
          href="/admission-2026"
          className="group rounded-lg bg-glass p-7 ring-1 ring-glass-edge backdrop-blur-xl transition-all hover:shadow-md"
        >
          <GraduationCap className="size-6 text-azure-deep" />
          <h2 className="mt-5 text-2xl font-semibold">Admission 2026 guidance</h2>
          <p className="mt-2 text-sm leading-relaxed text-ink/60">
            Understand programme selection, document preparation and application steps.
          </p>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-rose-deep">
            View admission guide{" "}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </div>
    </section>
  );
}
