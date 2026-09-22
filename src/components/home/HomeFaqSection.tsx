import Link from "next/link";
import { Button } from "@/components/ui/button";
import { faqs } from "@/lib/site-data";

export function HomeFaqSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-8">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-deep">
          Common questions
        </span>
        <h2 className="mt-3 text-3xl font-semibold">Everything students ask first</h2>
      </div>
      <div className="mt-6 space-y-3">
        {faqs.slice(0, 4).map((item) => (
          <details
            key={item.q}
            className="group rounded-lg bg-glass p-5 ring-1 ring-glass-edge transition-all"
          >
            <summary className="cursor-pointer list-none font-semibold text-foreground">
              {item.q}
            </summary>
            <p className="mt-3 text-sm leading-7 text-ink/65">{item.a}</p>
          </details>
        ))}
      </div>
      <div className="mt-6 text-center">
        <Button asChild variant="glass">
          <Link href="/faq">View all FAQs</Link>
        </Button>
      </div>
    </section>
  );
}
