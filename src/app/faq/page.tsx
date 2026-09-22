import type { Metadata } from "next";
import { FaqPageView } from "@/components/faq/FaqPageView";

export const metadata: Metadata = {
  title: "Frequently Asked Questions — IGNOU Power",
  description:
    "Answers about solved assignments, PDFs, handwritten delivery and project help.",
  openGraph: {
    title: "IGNOU Power FAQs",
    description:
      "Answers to common student questions about IGNOU Power services.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IGNOU Power FAQs",
    description:
      "Answers to common student questions about IGNOU Power services.",
  },
};

export default function FaqPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-12">
      <FaqPageView />
    </main>
  );
}
