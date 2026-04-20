import Link from "next/link";
import {
  Award,
  CheckCircle2,
  Clock,
  DoorOpen,
  Home as HomeIcon,
  Phone,
  RectangleHorizontal,
  Shield,
  Star,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ImagePlaceholder } from "@/components/image-placeholder";

const USPS = [
  {
    icon: Shield,
    title: "10-Year Guarantee",
    body: "Full parts and labour cover on every installation, backed by GGF.",
  },
  {
    icon: Award,
    title: "A++ Energy Rated",
    body: "Warm-edge spacer bars and argon-filled units as standard.",
  },
  {
    icon: Clock,
    title: "Fast Turnaround",
    body: "Survey within 48 hours, fitted in 2–3 weeks from order.",
  },
  {
    icon: CheckCircle2,
    title: "FENSA Registered",
    body: "Self-certified installations with automatic building compliance.",
  },
];

const PRODUCTS = [
  {
    href: "/windows",
    title: "Windows",
    icon: RectangleHorizontal,
    body: "Casement, sash, bay, bow, tilt & turn in uPVC, aluminium or timber.",
    image: "/placeholder-windows-hero.jpg",
  },
  {
    href: "/doors",
    title: "Doors",
    icon: DoorOpen,
    body: "Composite, uPVC, bi-fold, French and patio — secure as standard.",
    image: "/placeholder-doors-hero.jpg",
  },
  {
    href: "/conservatories",
    title: "Conservatories",
    icon: HomeIcon,
    body: "Victorian, Edwardian, Orangery and more — designed around you.",
    image: "/placeholder-conservatory-hero.jpg",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "The team replaced every window in our Victorian semi in four days. Quality is superb, and the house is noticeably warmer.",
    name: "Hannah & Marcus",
    location: "Tunbridge Wells",
  },
  {
    quote:
      "From the surveyor to the fitters — polite, on-time, tidy. Got three quotes; Clearview were in the middle on price but streets ahead on service.",
    name: "David Okonkwo",
    location: "Maidstone",
  },
  {
    quote:
      "Love our new orangery. They handled the building regs submission and kept us updated the whole way through.",
    name: "Priya & Alex",
    location: "Sevenoaks",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-900 text-white">
        <div className="absolute inset-0 image-placeholder opacity-60" aria-hidden />
        <div className="relative container py-20 md:py-28 grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in">
            <Badge variant="accent" className="mb-4">Family-run since 1998</Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Beautiful glazing, built to last a lifetime.
            </h1>
            <p className="mt-5 text-lg text-navy-100 max-w-xl">
              Energy-efficient windows, doors and conservatories tailored to your
              home. Free survey, transparent pricing, and a 10-year guarantee.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="accent">
                <Link href="/quote">Get an Instant Quote</Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-white/5 text-white border-white/30 hover:bg-white/10 hover:text-white"
              >
                <a href="tel:08001234567"><Phone className="h-4 w-4 mr-2" /> 0800 123 4567</a>
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-navy-100">
              <div className="flex text-accent">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span>4.9 / 5 from 1,200+ Trustpilot reviews</span>
            </div>
          </div>
          <div className="hidden md:block">
            <ImagePlaceholder
              src="/placeholder-home-hero.jpg"
              alt="A newly fitted bay window on a Victorian terraced home"
              label="Hero image"
              aspect="photo"
              className="shadow-2xl"
            />
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {USPS.map((usp) => (
            <Card key={usp.title} className="border-navy-100">
              <CardHeader className="pb-2">
                <div className="h-10 w-10 rounded-md bg-primary/10 text-primary grid place-items-center mb-2">
                  <usp.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{usp.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-navy-700">{usp.body}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container py-10 md:py-16">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-medium text-accent uppercase tracking-wider">
            What we install
          </p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
            Three core products, made to measure
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {PRODUCTS.map((p) => (
            <Card key={p.href} className="overflow-hidden border-navy-100 flex flex-col">
              <ImagePlaceholder src={p.image} alt={`${p.title} showcase`} label={p.title} />
              <CardHeader>
                <div className="flex items-center gap-2">
                  <p.icon className="h-5 w-5 text-primary" />
                  <CardTitle>{p.title}</CardTitle>
                </div>
                <CardDescription>{p.body}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto">
                <Button asChild variant="outline" className="w-full">
                  <Link href={p.href}>Explore {p.title} →</Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="container">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium text-accent uppercase tracking-wider">
              Customer stories
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
              Twenty-five years of happy homes
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <Card key={t.name} className="border-navy-100">
                <CardContent className="p-6">
                  <div className="flex text-accent mb-3">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <blockquote className="text-navy-800 italic">&ldquo;{t.quote}&rdquo;</blockquote>
                  <footer className="mt-4 text-sm text-navy-600">
                    <strong className="text-navy-900">{t.name}</strong> · {t.location}
                  </footer>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-navy-900">
          Ready to see your price?
        </h2>
        <p className="mt-3 text-navy-700 max-w-xl mx-auto">
          Our online calculator gives an honest indicative quote in under a minute.
          No email required — share or bookmark your configuration.
        </p>
        <Button asChild size="lg" variant="accent" className="mt-6">
          <Link href="/quote">Open Quote Calculator</Link>
        </Button>
      </section>
    </>
  );
}
