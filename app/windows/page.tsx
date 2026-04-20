import Link from "next/link";
import {
  CheckCircle2,
  Palette,
  Shield,
  Thermometer,
  VolumeX,
} from "lucide-react";
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
  title: "Windows",
  description:
    "Casement, sash, bay, bow, tilt & turn windows in uPVC, aluminium and timber. A++ energy rated with a 10-year guarantee.",
};

const STYLES = [
  {
    title: "Casement",
    body: "The most popular style in the UK. Side- or top-hung, clean lines, low maintenance.",
    image: "/placeholder-window-casement.jpg",
  },
  {
    title: "Sash",
    body: "Vertically sliding windows with heritage charm. Perfect for period properties.",
    image: "/placeholder-window-sash.jpg",
  },
  {
    title: "Tilt & Turn",
    body: "Dual-action opening — tilt inward for ventilation, turn for easy cleaning.",
    image: "/placeholder-window-tilt-turn.jpg",
  },
  {
    title: "Bay",
    body: "Angled projection that adds space and light — typically 3 or 5 facets.",
    image: "/placeholder-window-bay.jpg",
  },
  {
    title: "Bow",
    body: "Curved projection with 4–5 panels for a softer, rounded silhouette.",
    image: "/placeholder-window-bow.jpg",
  },
  {
    title: "Fixed",
    body: "Non-opening picture windows that maximise light and views.",
    image: "/placeholder-window-fixed.jpg",
  },
];

const MATERIALS = [
  {
    title: "uPVC",
    body: "Best value. Low maintenance, excellent insulation, 20+ year lifespan.",
  },
  {
    title: "Aluminium",
    body: "Slim sight-lines and a contemporary finish — ideal for modern extensions.",
  },
  {
    title: "Timber",
    body: "Traditional warmth and character. Engineered for durability and paintable.",
  },
];

const GLAZING = [
  { icon: Thermometer, title: "Double glazed", body: "Argon-filled, Low-E coated, A-rated as standard." },
  { icon: Shield, title: "Triple glazed", body: "Two sealed cavities for next-level warmth." },
  { icon: VolumeX, title: "Acoustic", body: "Laminated panes that cut traffic and aircraft noise." },
  { icon: Palette, title: "Self-cleaning", body: "UV-active coating breaks down dirt in daylight." },
];

export default function WindowsPage() {
  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="container py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Badge variant="accent" className="mb-4">Windows</Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              Windows designed around your home
            </h1>
            <p className="mt-4 text-navy-100 text-lg max-w-xl">
              From traditional sash to the slimmest aluminium — every window is
              made to measure, fitted by our own teams, and guaranteed for a
              decade.
            </p>
            <Button asChild size="lg" variant="accent" className="mt-6">
              <Link href="/quote?tab=windows">Price my windows</Link>
            </Button>
          </div>
          <ImagePlaceholder
            src="/placeholder-windows-hero.jpg"
            alt="Range of Clearview windows"
            label="Windows"
            aspect="photo"
          />
        </div>
      </section>

      <section className="container py-16">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-medium text-accent uppercase tracking-wider">Our range</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
            Six core styles, endless configurations
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STYLES.map((s) => (
            <Card key={s.title} className="overflow-hidden border-navy-100">
              <ImagePlaceholder src={s.image} alt={`${s.title} window`} label={s.title} />
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
            <p className="text-sm font-medium text-accent uppercase tracking-wider">Frame materials</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
              Three materials, all A-rated
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {MATERIALS.map((m) => (
              <Card key={m.title} className="border-navy-100">
                <CardHeader>
                  <CardTitle>{m.title}</CardTitle>
                  <CardDescription>{m.body}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-1.5 text-sm text-navy-700">
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> A-rated WER</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> PAS 24 security</p>
                  <p className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-primary" /> 10-year guarantee</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-medium text-accent uppercase tracking-wider">Glazing options</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
            Match the glass to the room
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {GLAZING.map((g) => (
            <Card key={g.title} className="border-navy-100">
              <CardHeader>
                <div className="h-10 w-10 rounded-md bg-primary/10 text-primary grid place-items-center mb-2">
                  <g.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{g.title}</CardTitle>
                <CardDescription>{g.body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-16 text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold">Get a window price in 60 seconds</h2>
          <p className="mt-3 text-navy-100 max-w-xl mx-auto">
            Instant online calculator — no phone number required.
          </p>
          <Button asChild size="lg" variant="accent" className="mt-6">
            <Link href="/quote?tab=windows">Open calculator</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
