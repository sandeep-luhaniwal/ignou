"use client";

import React from "react";
import ContactHero from "@/components/contact/ContactHero";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-dark-white flex flex-col">
      {/* Light Theme Hero */}
      <ContactHero />

      {/* Grid Content Section */}
      <section className="py-12 md:py-14 lg:py-16 px-6 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left: Contact Info Info Cards */}
          <div className="lg:col-span-5 w-full">
            <ContactInfo />
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 w-full">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
