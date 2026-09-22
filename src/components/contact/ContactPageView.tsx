"use client";

import { useState, type FormEvent } from "react";
import { Mail, MapPin, Phone, Send, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageIntro } from "@/components/page-kit";

const contactCards = [
  {
    icon: Phone,
    title: "Student helpline",
    text: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: Mail,
    title: "Email desk",
    text: "support@ignouhelping.com",
    href: "mailto:support@ignouhelping.com",
  },
  {
    icon: MapPin,
    title: "Support hub",
    text: "Plot No. 45, Near IGNOU Road, Saket, New Delhi",
    href: "",
  },
];

export function ContactPageView() {
  const [sent, setSent] = useState(false);

  function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <PageIntro
        eyebrow="Student Support"
        title="How can we"
        accent="help you today?"
        text="Tell us your programme, course code and session so our team can understand your question quickly."
      />

      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-6 lg:grid-cols-[0.8fr_1.2fr]">
        {/* Contact Info Cards */}
        <div className="space-y-4">
          {contactCards.map(({ icon: Icon, title, text, href }) => {
            const body = (
              <>
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-azure-soft/25 text-azure-deep ring-1 ring-azure-deep/20">
                  <Icon className="size-5" />
                </div>
                <div>
                  <h2 className="font-semibold text-foreground">{title}</h2>
                  <p className="mt-1 text-sm leading-relaxed text-ink/65">{text}</p>
                </div>
              </>
            );

            return href ? (
              <a
                key={title}
                href={href}
                className="flex items-start gap-4 rounded-lg bg-glass p-5 ring-1 ring-glass-edge shadow-xs backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md hover:ring-azure-deep/30"
              >
                {body}
              </a>
            ) : (
              <div
                key={title}
                className="flex items-start gap-4 rounded-lg bg-glass p-5 ring-1 ring-glass-edge shadow-xs backdrop-blur-md"
              >
                {body}
              </div>
            );
          })}
        </div>

        {/* Enquiry Form */}
        <form
          onSubmit={submit}
          className="relative rounded-lg bg-glass p-6 ring-1 ring-glass-edge shadow-xs backdrop-blur-xl sm:p-8"
        >
          <div className="flex items-center gap-2 text-rose-deep">
            <Sparkles className="size-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">
              Fast Response
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            Send an enquiry
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-foreground">
              Your name *
              <input
                required
                placeholder="Enter your full name"
                className="mt-2 w-full rounded-lg bg-surface-strong px-4 py-3 font-normal outline-none ring-1 ring-border focus:ring-2 focus:ring-azure-deep/50"
              />
            </label>

            <label className="text-sm font-medium text-foreground">
              Phone or email *
              <input
                required
                placeholder="e.g. 9876543210 or email"
                className="mt-2 w-full rounded-lg bg-surface-strong px-4 py-3 font-normal outline-none ring-1 ring-border focus:ring-2 focus:ring-azure-deep/50"
              />
            </label>

            <label className="text-sm font-medium text-foreground sm:col-span-2">
              Programme / course code
              <input
                placeholder="e.g. BCA / MCS-011, MBA / MS-08"
                className="mt-2 w-full rounded-lg bg-surface-strong px-4 py-3 font-normal outline-none ring-1 ring-border focus:ring-2 focus:ring-azure-deep/50"
              />
            </label>

            <label className="text-sm font-medium text-foreground sm:col-span-2">
              How can we help? *
              <textarea
                required
                rows={5}
                placeholder="Write your query or requirement here..."
                className="mt-2 w-full resize-none rounded-lg bg-surface-strong px-4 py-3 font-normal outline-none ring-1 ring-border focus:ring-2 focus:ring-azure-deep/50"
              />
            </label>
          </div>

          <Button type="submit" variant="rose" size="lg" className="mt-6 gap-2 font-semibold rounded-lg">
            <Send className="size-4" />
            <span>Send enquiry</span>
          </Button>

          {sent && (
            <p
              role="status"
              className="mt-5 rounded-lg bg-azure-soft/30 p-4 text-sm font-medium text-azure-deep ring-1 ring-azure-deep/30"
            >
              ✓ Thank you! Your enquiry has been received. You can also call or
              WhatsApp us for an instant response.
            </p>
          )}
        </form>
      </section>
    </>
  );
}
