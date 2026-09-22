import React from "react";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, ClipboardCheck, GraduationCap } from "lucide-react";
import admissionImage from "@/assets/admission-guidance.jpg";
import { Button } from "@/components/ui/button";
import { PageIntro, SupportBand } from "@/components/page-kit";

const STEPS = [
  {
    icon: GraduationCap,
    title: "Choose your programme",
    text: "Review eligibility, duration, medium and learning goals.",
  },
  {
    icon: ClipboardCheck,
    title: "Prepare documents",
    text: "Keep your academic records, photo, ID and required certificates ready.",
  },
  {
    icon: CheckCircle2,
    title: "Review before submitting",
    text: "Verify personal, academic and programme details on the official portal.",
  },
];

export function AdmissionGuideView() {
  return (
    <>
      <PageIntro
        eyebrow="Admission 2026"
        title="Start your IGNOU journey with"
        accent="better clarity."
        text="Independent guidance to help you compare programmes, prepare documents and understand the online application process."
      >
        <Button asChild variant="rose" size="lg" className="mt-4 font-semibold">
          <Link href="/contact">Ask an admission question</Link>
        </Button>
      </PageIntro>

      {/* Three steps & guidance image */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-10 md:grid-cols-2">
        <div>
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-azure-deep">
            Step-by-Step Guide
          </span>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
            Three steps to prepare
          </h2>

          <div className="mt-6 space-y-4">
            {STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="flex items-start gap-4 rounded-lg bg-glass p-5 ring-1 ring-glass-edge backdrop-blur-sm transition-all duration-200 hover:ring-azure-deep/30 hover:"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-azure-soft/25 text-azure-deep ring-1 ring-azure-deep/20">
                    <Icon className="size-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink/70">
                      {step.text}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="relative overflow-hidden rounded-lg ring-1 ring-glass-edge shadow-md">
          <Image
            src={admissionImage}
            alt="Student preparing for university admission"
            width={1200}
            height={912}
            priority
            className="aspect-4/3 w-full rounded-lg object-cover transition-transform duration-500 "
          />
        </div>
      </section>

      {/* Important Advisory */}
      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="relative overflow-hidden rounded-lg bg-linear-to-r from-rose-soft/20 via-glass to-glass p-7 ring-1 ring-glass-edge  sm:p-8">
          <div className="inline-flex items-center gap-1.5 rounded-md bg-rose-soft/40 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider text-rose-deep ring-1 ring-rose-deep/20">
            Important Notice
          </div>
          <h2 className="mt-3 text-xl font-bold text-foreground sm:text-2xl">
            Always complete admission on the official IGNOU portal
          </h2>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-ink/75 sm:text-base">
            IGNOU Power offers independent guidance only. Confirm dates, fees, eligibility and application status directly through official IGNOU notices before making decisions.
          </p>
        </div>
      </section>

      <SupportBand
        title="Need help understanding a programme?"
        text="Have questions regarding subject codes, eligibility, or documentation? Our team is here to guide you."
      />
    </>
  );
}
