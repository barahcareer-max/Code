import { Suspense } from "react";
import type { Metadata } from "next";
import { QuoteCalculator } from "@/components/quote/quote-calculator";

export const metadata: Metadata = {
  title: "Quote Calculator",
  description:
    "Instant online quote for windows, doors and conservatories. Configure size, materials, glazing and features.",
};

export default function QuotePage() {
  return (
    <section className="container py-10 md:py-16">
      <div className="max-w-3xl mb-8">
        <p className="text-sm font-medium text-accent uppercase tracking-wider">
          Instant Quote
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
          Configure your price in under a minute
        </h1>
        <p className="text-navy-700 mt-3">
          Choose a product tab, set your sizes and options, and watch the price
          update live. Your configuration is saved in the URL, so you can share
          or bookmark this quote.
        </p>
      </div>

      <Suspense fallback={<div className="h-96 rounded-lg bg-muted animate-pulse" />}>
        <QuoteCalculator />
      </Suspense>
    </section>
  );
}
