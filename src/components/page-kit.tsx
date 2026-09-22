"use client";

import React, { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavBar from "@/components/common/NavBar";
import Footer from "@/components/common/Footer";

export function PageIntro({
  eyebrow,
  title,
  accent,
  text,
  children,
}: {
  eyebrow: string;
  title: string;
  accent?: string;
  text: string;
  children?: ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-8 pt-10 sm:pt-16">
      <div className="relative overflow-hidden rounded-lg bg-glass p-7 ring-1 ring-glass-edge backdrop-blur-2xl sm:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-azure-soft/35 blur-3xl"
        />
        <div className="relative max-w-3xl">
          <span className="inline-flex rounded-lg bg-surface-strong px-3 py-1 text-xs font-semibold text-azure-deep ring-1 ring-border">
            {eyebrow}
          </span>
          <h1 className="mt-5 text-balance text-4xl font-semibold leading-tight sm:text-6xl text-foreground">
            {title}{" "}
            {accent && <span className="font-display italic text-rose-deep">{accent}</span>}
          </h1>
          <p className="mt-4 max-w-[58ch] text-pretty text-base leading-relaxed text-ink/65 sm:text-lg">
            {text}
          </p>
          {children}
        </div>
      </div>
    </section>
  );
}

export function SupportBand({
  title = "Not sure which course code you need?",
  text = "Our support team will help confirm your programme, session and the exact assignment set.",
  buttonText = "Contact support",
  buttonLink = "/contact",
}: {
  title?: string;
  text?: string;
  buttonText?: string;
  buttonLink?: string;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="rounded-lg bg-linear-to-r from-rose via-[#9333ea] to-azure p-7 text-white sm:p-9  ring-1 ring-white/20">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-white">{title}</h2>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/90">{text}</p>
          </div>
          <Button
            asChild
            variant="glass"
            className="rounded-lg bg-white/20 hover:bg-white/30 text-white border-white/20 px-5 py-2.5 backdrop-blur-md transition-transform "
          >
            <Link href={buttonLink} className="flex items-center gap-2 font-medium">
              <span>{buttonText}</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function PolicyPage({
  title,
  description,
  sections,
}: {
  title: string;
  description: string;
  sections: { heading: string; body: string }[];
}) {
  return (
    <div className="pb-12">
      <PageIntro eyebrow="IGNOU Power" title={title} text={description} />
      <section className="mx-auto max-w-7xl px-4 py-6">
        <div className="rounded-xl bg-glass p-6 ring-1 ring-glass-edge backdrop-blur-xl sm:p-10">
          <div className="space-y-8">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-lg font-semibold text-foreground">{section.heading}</h2>
                <p className="mt-2 text-sm leading-7 text-ink/65">{section.body}</p>
              </section>
            ))}
          </div>
        </div>
      </section>
      <SupportBand />
    </div>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-paper text-ink antialiased selection:bg-rose-soft selection:text-rose-deep overflow-x-clip max-w-full">
      {/* Background Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 overflow-clip"
      >
        <div className="absolute -left-32 -top-40 h-130 w-130 rounded-full bg-rose-soft/35 blur-3xl" />
        <div className="absolute -right-24 top-1/3 h-140 w-140 rounded-full bg-azure-soft/35 blur-3xl" />
      </div>

      {/* Modern NavBar with Cart, Login, Phone, Links */}
      <NavBar />

      {/* Main Content */}
      <main className="relative z-20 overflow-x-clip max-w-full">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
