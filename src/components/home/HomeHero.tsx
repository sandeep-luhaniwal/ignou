"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HomeHero() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function searchAssignments(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (query.trim()) {
      router.push(`/assignments?search=${encodeURIComponent(query.trim())}`);
    } else {
      router.push("/assignments");
    }
  }

  return (
    <section className="mx-auto max-w-7xl px-4 pb-6 pt-10 sm:pt-16">
      <div className="relative overflow-hidden rounded-lg bg-glass p-6 ring-1 ring-glass-edge backdrop-blur-2xl sm:p-9">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-azure-soft/40 blur-3xl"
        />
        <div className="relative max-w-3xl">
          <span className="rise inline-flex items-center gap-2 rounded-lg bg-surface-strong px-3 py-1 text-xs font-semibold text-azure-deep ring-1 ring-glass-edge">
            <span className="size-1.5 rounded-full bg-rose" />
            100% Accurate IGNOU Solved Assignments
          </span>
          <h1 className="rise mt-5 text-balance text-4xl font-semibold leading-tight sm:text-6xl [animation-delay:50ms]">
            Find your assignment
            <br />
            <span className="font-display italic text-rose-deep">
              in one clean search.
            </span>
          </h1>
          <p className="rise mt-4 max-w-[52ch] text-pretty text-base leading-relaxed text-ink/65 sm:text-lg [animation-delay:100ms]">
            Double-checked solutions, copy-ready formatting and IGNOU-compliant
            work — plus handwritten delivery to your door and instant PDF
            downloads.
          </p>

          <form
            onSubmit={searchAssignments}
            className="rise mt-7 rounded-lg bg-surface-strong p-2 ring-1 ring-glass-edge backdrop-blur-xl sm:p-2.5 [animation-delay:150ms]"
          >
            <div className="flex flex-col gap-2 sm:flex-row">
              <label className="flex flex-1 items-center gap-3 rounded-lg border bg-card px-4 py-3 ring-1 ring-border">
                <Search className="size-4 text-ink/35" />
                <span className="sr-only">Search assignments</span>
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  className="w-full bg-transparent text-sm outline-none placeholder:text-ink/40"
                  placeholder="Search by course code or subject — e.g. MCS-011"
                />
              </label>
              <Button
                type="submit"
                variant="gradient"
                size="lg"
                className="rounded-lg font-bold shadow-md hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer"
              >
                Find assignments
              </Button>
            </div>
            <div className="flex flex-wrap items-center gap-2 px-1 pt-2">
              <span className="text-xs font-medium text-ink/45">Popular:</span>
              {["MCS-011", "BCS-012", "MPA-005"].map((code) => (
                <Button
                  key={code}
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuery(code)}
                  className="h-7 rounded-lg bg-paper px-3 text-xs text-ink/70 hover:bg-surface-strong"
                >
                  {code}
                </Button>
              ))}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
