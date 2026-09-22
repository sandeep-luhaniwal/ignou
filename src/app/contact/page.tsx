import type { Metadata } from "next";
import { ContactPageView } from "@/components/contact/ContactPageView";

export const metadata: Metadata = {
  title: "Contact Student Support — IGNOU Power",
  description:
    "Contact IGNOU Power for assignment, project and admission support.",
  openGraph: {
    title: "Contact IGNOU Power",
    description: "Talk to the IGNOU Power student support desk.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact IGNOU Power",
    description: "Talk to the IGNOU Power student support desk.",
  },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground pb-12">
      <ContactPageView />
    </main>
  );
}
