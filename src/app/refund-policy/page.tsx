import type { Metadata } from "next";
import { PolicyPage } from "@/components/page-kit";

export const metadata: Metadata = {
  title: "Refund Policy — IGNOU Power",
  description:
    "Refund and issue-resolution information for IGNOU Power orders.",
  openGraph: {
    title: "Refund Policy — IGNOU Power",
    description:
      "How to report and resolve issues with IGNOU Power orders.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Refund Policy — IGNOU Power",
    description:
      "How to report and resolve issues with IGNOU Power orders.",
  },
};

const sections = [
  {
    heading: "Digital materials",
    body: "Because downloadable materials can be accessed immediately, eligibility for a refund depends on the nature of the issue. Report an incorrect or inaccessible file promptly with your order details.",
  },
  {
    heading: "Handwritten orders",
    body: "Contact support immediately if an order arrives damaged, incomplete or different from the confirmed course details. Keep packaging and order evidence until the issue is reviewed.",
  },
  {
    heading: "Incorrect course selection",
    body: "Students are responsible for verifying programme, course code and session before ordering. Contact support as soon as possible if you notice a selection mistake.",
  },
  {
    heading: "Requesting help",
    body: "Email support@ignouhelping.com or call +91 98765 43210 with your order details so the team can review the request.",
  },
];

export default function RefundPolicyPage() {
  return (
    <PolicyPage
      title="Refund Policy"
      description="How order issues and refund requests are reviewed."
      sections={sections}
    />
  );
}
