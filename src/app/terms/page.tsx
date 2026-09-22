import type { Metadata } from "next";
import { PolicyPage } from "@/components/page-kit";

export const metadata: Metadata = {
  title: "Terms & Conditions — IGNOU Power",
  description:
    "Terms governing the use of IGNOU Power academic support services.",
  openGraph: {
    title: "Terms & Conditions — IGNOU Power",
    description: "Terms for using IGNOU Power services.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Terms & Conditions — IGNOU Power",
    description: "Terms for using IGNOU Power services.",
  },
};

const sections = [
  {
    heading: "Independent service",
    body: "IGNOU Power is an independent academic-support platform and is not affiliated with or endorsed by Indira Gandhi National Open University.",
  },
  {
    heading: "Educational use",
    body: "Materials and guidance are provided as study references. Students remain responsible for checking their course requirements and following their institution's academic-integrity rules.",
  },
  {
    heading: "Orders and availability",
    body: "Prices, formats and availability may vary by course and session. Confirm the course code, session, format and delivery details before placing an order.",
  },
  {
    heading: "Contact",
    body: "Questions about these terms can be sent to support@ignouhelping.com.",
  },
];

export default function TermsPage() {
  return (
    <PolicyPage
      title="Terms & Conditions"
      description="Please read these terms before using our academic-support services."
      sections={sections}
    />
  );
}
