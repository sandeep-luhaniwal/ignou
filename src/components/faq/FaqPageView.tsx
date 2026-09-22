import React from "react";
import { PageIntro, SupportBand } from "@/components/page-kit";
import { faqs } from "@/lib/site-data";

export function FaqPageView() {
  return (
    <>
      <PageIntro
        eyebrow="Help Centre"
        title="Quick answers for"
        accent="busy students."
        text="Find answers about assignment formats, downloads, handwritten delivery, project support and our independent status."
      />

      <section className="mx-auto max-w-7xl space-y-4 px-4 py-6">
        {faqs.map((item, index) => (
          <details
            key={item.q}
            open={index === 0}
            className="group rounded-xl bg-glass p-6 ring-1 ring-glass-edge shadow-xs transition-all duration-200 open:ring-azure-deep/30"
          >
            <summary className="flex cursor-pointer list-none items-center justify-between text-base font-semibold text-foreground">
              <span>{item.q}</span>
              <span className="ml-4 text-xl font-light text-ink/40 transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3 text-sm leading-7 text-ink/70 sm:text-base">
              {item.a}
            </p>
          </details>
        ))}
      </section>

      <SupportBand
        title="Still have a question?"
        text="Our student advisory team is here to assist you with any custom queries."
      />
    </>
  );
}
