import type { Metadata } from "next";
import { PolicyPage } from "@/components/page-kit";

export const metadata: Metadata = {
  title: "Privacy Policy — IGNOU Power",
  description:
    "How IGNOU Power handles information shared through its public website.",
  openGraph: {
    title: "Privacy Policy — IGNOU Power",
    description: "Information handling practices at IGNOU Power.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy — IGNOU Power",
    description: "Information handling practices at IGNOU Power.",
  },
};

const sections = [
  {
    heading: "Information you share",
    body: "We may receive your name, contact details, programme, course codes and delivery information when you contact us or place an order through the main shop.",
  },
  {
    heading: "How information is used",
    body: "Information is used to answer questions, identify the requested service, process orders and provide relevant support.",
  },
  {
    heading: "Sharing and retention",
    body: "Information should only be shared when necessary to provide the requested service or meet legal obligations. Records should be retained only for appropriate operational and compliance needs.",
  },
  {
    heading: "Your questions",
    body: "For privacy questions, email support@ignouhelping.com.",
  },
];

export default function PrivacyPolicyPage() {
  return (
    <PolicyPage
      title="Privacy Policy"
      description="A plain-language overview of information used to answer enquiries and fulfil services."
      sections={sections}
    />
  );
}
