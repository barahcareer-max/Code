import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImagePlaceholder } from "@/components/image-placeholder";
import { Badge } from "@/components/ui/badge";

export const metadata = {
  title: "Conservatories",
  description:
    "Victorian, Edwardian, Lean-to, P-shaped and Orangery conservatories. Glass, polycarbonate, solid or hybrid roofs.",
};

const STYLES = [
  {
    title: "Victorian",
    body: "Three- or five-facet bay with an ornate ridge — ideal for period homes.",
    image: "/placeholder-conservatory-victorian.jpg",
  },
  {
    title: "Edwardian",
    body: "Rectangular footprint and maximum internal space. The all-rounder.",
    image: "/placeholder-conservatory-edwardian.jpg",
  },
  {
    title: "Lean-to",
    body: "Contemporary mono-pitched roof. Great for bungalows and terraces.",
    image: "/placeholder-conservatory-leanto.jpg",
  },
  {
    title: "P-shaped",
    body: "Combination lean-to and Victorian — two distinct zones in one build.",
    image: "/placeholder-conservatory-pshaped.jpg",
  },
  {
    title: "T-shaped",
    body: "A central projection creates a garden room and walk-through space.",
    image: "/placeholder-conservatory-tshaped.jpg",
  },
  {
    title: "Orangery",
    body: "Brick piers, lantern roof — the most thermally efficient style.",
    image: "/placeholder-conservatory-orangery.jpg",
  },
];

const ROOFS = [
  { title: "Glass", body: "Self-cleaning, solar-control — bright all year round." },
  { title: "Polycarbonate", body: "Light and affordable entry point." },
  { title: "Solid (Tiled)", body: "Fully insulated warm roof with plaster interior." },
  { title: "Hybrid", body: "Solid sections with central glass panels for light." },
];

const INCLUSIONS = [
  "Free site survey and CAD drawings",
  "Building regs submission handled for you",
  "Steel-reinforced uPVC or thermally broken aluminium",
  "Plastered interior available on solid-roof builds",
  "Underfloor heating, French doors, dwarf walls optional",
];

export default function ConservatoriesPage() {
  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="container py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Badge variant="accent" className="mb-4">Conservatories</Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              Add a room you&rsquo;ll actually use
            </h1>
            <p className="mt-4 text-navy-100 text-lg max-w-xl">
              Designed, manufactured and fitted by a single accountable team.
              Warm in winter, cool in summer — usable every day of the year.
            </p>
            <Button asChild size="lg" variant="accent" className="mt-6">
              <Link href="/quote?tab=conservatories">Price my conservatory</Link>
            </Button>
          </div>
          <ImagePlaceholder
            src="/placeholder-conservatory-hero.jpg"
            alt="Edwardian conservatory at dusk"
            label="Conservatories"
            aspect="photo"
          />
        </div>
      </section>

      <section className="container py-16">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-medium text-accent uppercase tracking-wider">Styles</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
            Find the shape that fits your home
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STYLES.map((s) => (
            <Card key={s.title} className="overflow-hidden border-navy-100">
              <ImagePlaceholder src={s.image} alt={`${s.title} conservatory`} label={s.title} />
              <CardHeader>
                <CardTitle>{s.title}</CardTitle>
                <CardDescription>{s.body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="container">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium text-accent uppercase tracking-wider">Roof options</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
              Four ways to roof a conservatory
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ROOFS.map((r) => (
              <Card key={r.title} className="border-navy-100">
                <CardHeader>
                  <CardTitle className="text-lg">{r.title}</CardTitle>
                  <CardDescription>{r.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <p className="text-sm font-medium text-accent uppercase tracking-wider">What&rsquo;s included</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
            Every build, handled end-to-end
          </h2>
          <ul className="mt-5 space-y-2 text-navy-800">
            {INCLUSIONS.map((i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
        <ImagePlaceholder
          src="/placeholder-conservatory-interior.jpg"
          alt="Interior of a finished orangery"
          aspect="photo"
        />
      </section>

      <section className="bg-primary text-primary-foreground py-16 text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold">Price your conservatory</h2>
          <p className="mt-3 text-navy-100 max-w-xl mx-auto">
            Enter your width and projection in metres, pick a style, and see a
            transparent, itemised estimate.
          </p>
          <Button asChild size="lg" variant="accent" className="mt-6">
            <Link href="/quote?tab=conservatories">Open calculator</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
