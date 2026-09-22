import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import handwrittenImage from "@/assets/handwritten-assignment.jpg";

export function HandwrittenSection() {
  return (
    <section id="handwritten" className="mx-auto max-w-7xl px-4 py-8">
      <div className="relative overflow-hidden rounded-lg bg-glass p-6 ring-1 ring-glass-edge backdrop-blur-2xl sm:p-10">
        <div className="relative grid items-center gap-8 md:grid-cols-2">
          <div>
            <span className="inline-flex rounded-full bg-rose/10 px-3 py-1 text-xs font-semibold text-rose-deep">
              Handwritten Delivery
            </span>
            <h2 className="mt-4 font-display text-3xl font-semibold">
              Real handwriting, delivered to your door.
            </h2>
            <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-ink/60">
              We write your assignment neatly, double-check it and courier it safely to your address.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {["Choose course", "Select handwritten", "Doorstep delivery"].map(
                (step, i) => (
                  <span
                    key={step}
                    className="rounded-full bg-surface-strong px-3 py-1 text-xs font-medium text-ink/70 ring-1 ring-border"
                  >
                    {i + 1}. {step}
                  </span>
                )
              )}
            </div>
            <Button asChild variant="rose" className="mt-6 font-semibold rounded-lg">
              <Link href="/contact">Order handwritten copy</Link>
            </Button>
          </div>
          <div className="relative">
            <div className="absolute -inset-2 rounded-lg bg-glass ring-1 ring-glass-edge backdrop-blur-xl" />
            <Image
              src={handwrittenImage}
              alt="Neatly handwritten university assignment with stationery"
              width={1024}
              height={768}
              className="relative aspect-4/3 w-full rounded-lg object-cover ring-1 ring-border "
            />
          </div>
        </div>
      </div>
    </section>
  );
}
