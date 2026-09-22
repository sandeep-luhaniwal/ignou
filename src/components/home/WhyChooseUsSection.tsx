import {
  BookOpenCheck,
  Check,
  Download,
  Headphones,
  PenLine,
  ShieldCheck,
} from "lucide-react";

const benefits = [
  {
    icon: BookOpenCheck,
    title: "Double-checked solutions",
    text: "Every answer is reviewed by subject experts before release.",
  },
  {
    icon: PenLine,
    title: "Copy-ready format",
    text: "Clear headings, sections and margins built around IGNOU guidelines.",
  },
  {
    icon: Download,
    title: "Instant PDF downloads",
    text: "Get your solved assignment immediately after your order.",
  },
  {
    icon: Check,
    title: "Handwritten delivery",
    text: "Neatly written assignments, safely packed and sent to your door.",
  },
  {
    icon: ShieldCheck,
    title: "IGNOU compliant",
    text: "Answers follow the required structure, word limits and syllabus.",
  },
  {
    icon: Headphones,
    title: "Student support",
    text: "Get help with assignments, projects, admission and course details.",
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="rounded-lg bg-glass p-6 ring-1 ring-glass-edge backdrop-blur-xl sm:p-8">
        <h2 className="text-2xl font-semibold">Why students choose IGNOU Power</h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div
              key={title}
              className="rounded-lg bg-surface-strong p-4 ring-1 ring-border"
            >
              <Icon className="size-5 text-azure-deep" />
              <h3 className="mt-2 text-sm font-semibold">{title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-ink/55">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
