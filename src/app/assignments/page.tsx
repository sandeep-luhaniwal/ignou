import { Suspense } from "react";
import type { Metadata } from "next";
import { PageIntro, SupportBand } from "@/components/page-kit";
import { AssignmentsListView } from "@/components/assignments/AssignmentsListView";

export const metadata: Metadata = {
  title: "Solved IGNOU Assignments — IGNOU Power",
  description:
    "Search solved IGNOU assignments by course code, programme or subject.",
  openGraph: {
    title: "Solved IGNOU Assignments — IGNOU Power",
    description: "Find accurate, copy-ready IGNOU assignment solutions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Solved IGNOU Assignments — IGNOU Power",
    description: "Find accurate, copy-ready IGNOU assignment solutions.",
  },
};

export default function AssignmentsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-12">
      <PageIntro
        eyebrow="Solved Assignments 2025-26"
        title="Find the right answer,"
        accent="without the guesswork."
        text="Double-checked solutions formatted to official IGNOU guidelines. Filter by programme, subject, or course code."
      />

      <Suspense
        fallback={
          <div className="py-24 text-center text-sm text-ink/50">
            Loading solved assignments...
          </div>
        }
      >
        <AssignmentsListView />
      </Suspense>

      <SupportBand
        title="Can't find your subject or code?"
        text="Contact our academic helpline and our team will provide the exact solved paper directly."
      />
    </main>
  );
}
