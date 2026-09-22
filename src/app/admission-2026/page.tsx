import type { Metadata } from "next";
import { AdmissionGuideView } from "@/components/admission/AdmissionGuideView";

export const metadata: Metadata = {
  title: "IGNOU Admission 2026 Guidance — IGNOU Power",
  description:
    "Understand IGNOU 2026 programme selection, application steps and document preparation.",
  openGraph: {
    title: "IGNOU Admission 2026 Guidance",
    description: "Clear independent guidance for your IGNOU admission journey.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IGNOU Admission 2026 Guidance",
    description: "Clear independent guidance for your IGNOU admission journey.",
  },
};

export default function Admission2026Page() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-12">
      <AdmissionGuideView />
    </main>
  );
}
