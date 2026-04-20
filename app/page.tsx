import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <section className="container py-24 text-center">
      <h1 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
        Clearview Glazing
      </h1>
      <p className="text-lg text-navy-700 max-w-2xl mx-auto mb-8">
        Scaffolding complete. Quote calculator and marketing pages arrive in the next phases.
      </p>
      <Button asChild variant="accent" size="lg">
        <Link href="/quote">Open Quote Calculator</Link>
      </Button>
    </section>
  );
}
