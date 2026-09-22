import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Check, FileSearch, Lightbulb, NotebookPen } from "lucide-react";
import projectImage from "@/assets/project-help.jpg";
import { Button } from "@/components/ui/button";
import { PageIntro, SupportBand } from "@/components/page-kit";

const steps = [
  {
    icon: Lightbulb,
    title: "Topic direction",
    text: "Shortlist a practical topic aligned with your programme guidelines.",
  },
  {
    icon: NotebookPen,
    title: "Synopsis structure",
    text: "Organise objectives, methodology, references and expected outcomes.",
  },
  {
    icon: FileSearch,
    title: "Report review",
    text: "Check flow, formatting, sections and presentation before submission.",
  },
];

const capabilities = [
  "BCA and MCA project reports",
  "MBA and management projects",
  "Synopsis formatting and structure",
  "Final report presentation review",
];

export function ProjectHelpPageView() {
  return (
    <>
      <PageIntro
        eyebrow="Project Help"
        title="Turn your project idea into a"
        accent="clear academic plan."
        text="Practical support for project selection, synopsis structure, report formatting and final review for selected programmes."
      >
        <Button asChild variant="rose" size="lg" className="mt-4 font-semibold">
          <Link href="/contact">Discuss your project</Link>
        </Button>
      </PageIntro>

      {/* Steps and Image */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-8 md:grid-cols-2">
        <div className="relative overflow-hidden rounded-lg ring-1 ring-glass-edge shadow-md">
          <Image
            src={projectImage}
            alt="Student reviewing an academic project report"
            width={1200}
            height={912}
            priority
            className="aspect-4/3 w-full rounded-lg object-cover transition-transform duration-500 "
          />
        </div>

        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-rose-deep">
            How we help
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Guidance at every key stage
          </h2>

          <div className="mt-6 space-y-4">
            {steps.map(({ icon: Icon, title, text }) => (
              <div
                key={title}
                className="flex items-start gap-4 rounded-lg bg-glass p-5 ring-1 ring-glass-edge shadow-xs backdrop-blur-sm transition-all duration-200 hover:ring-azure-deep/30"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-azure-soft/25 text-azure-deep ring-1 ring-azure-deep/20">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/70">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Support available for */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="rounded-lg bg-glass p-7 ring-1 ring-glass-edge shadow-xs backdrop-blur-xl sm:p-9">
          <h2 className="text-2xl font-bold text-foreground">
            Support available for
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {capabilities.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-lg bg-surface-strong p-4 text-sm font-medium text-foreground ring-1 ring-border shadow-xs"
              >
                <Check className="size-4 shrink-0 text-rose-deep" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SupportBand
        title="Ready to discuss your project?"
        text="Get direct assistance with synopsis approval, guide selection, and final dissertation writing."
      />
    </>
  );
}
