import type { Metadata } from "next";
import { ProjectHelpPageView } from "@/components/projects/ProjectHelpPageView";

export const metadata: Metadata = {
  title: "IGNOU Project & Synopsis Help — IGNOU Power",
  description:
    "Structured help for IGNOU project synopsis, reports, formatting and review.",
  openGraph: {
    title: "IGNOU Project & Synopsis Help",
    description:
      "Get structured project guidance for selected IGNOU programmes.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IGNOU Project & Synopsis Help",
    description:
      "Get structured project guidance for selected IGNOU programmes.",
  },
};

export default function ProjectHelpPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-12">
      <ProjectHelpPageView />
    </main>
  );
}
