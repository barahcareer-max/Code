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
  title: "Doors",
  description:
    "Composite, uPVC, aluminium bi-fold, French and patio doors. PAS 24 secure, thermally broken, custom colours.",
};

const TYPES = [
  {
    title: "Composite",
    body: "Solid timber core wrapped in GRP — warmest and most secure front door.",
    image: "/placeholder-door-composite.jpg",
  },
  {
    title: "uPVC",
    body: "Reliable, affordable and available in 24 colours and 6 glazing patterns.",
    image: "/placeholder-door-upvc.jpg",
  },
  {
    title: "Aluminium Bi-fold",
    body: "Two to seven panels that concertina away — seamless indoor/outdoor living.",
    image: "/placeholder-door-bifold.jpg",
  },
  {
    title: "French",
    body: "Classic double-leaf doors in uPVC, aluminium or timber.",
    image: "/placeholder-door-french.jpg",
  },
  {
    title: "Patio (Sliding)",
    body: "Low-threshold sliders up to 6 m wide with sub-50 mm sight-lines.",
    image: "/placeholder-door-patio.jpg",
  },
  {
    title: "Stable",
    body: "Half-and-half composite doors — a country favourite for kitchens.",
    image: "/placeholder-door-stable.jpg",
  },
];

const SECURITY = [
  "Multi-point locking systems",
  "Anti-snap, anti-bump, anti-pick cylinders",
  "Laminated security glazing",
  "Reinforced hinges and frames",
  "Optional PAS 24 / Secured by Design upgrade",
];

export default function DoorsPage() {
  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="container py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Badge variant="accent" className="mb-4">Doors</Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              Doors that welcome, secure and inspire
            </h1>
            <p className="mt-4 text-navy-100 text-lg max-w-xl">
              From a statement composite front door to a six-panel aluminium
              bi-fold across your garden — precision engineered and expertly fitted.
            </p>
            <Button asChild size="lg" variant="accent" className="mt-6">
              <Link href="/quote?tab=doors">Price my door</Link>
            </Button>
          </div>
          <ImagePlaceholder
            src="/placeholder-doors-hero.jpg"
            alt="Range of Clearview doors"
            label="Doors"
            aspect="photo"
          />
        </div>
      </section>

      <section className="container py-16">
        <div className="max-w-2xl mb-10">
          <p className="text-sm font-medium text-accent uppercase tracking-wider">Our range</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
            Six door types, one standard: excellent
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TYPES.map((t) => (
            <Card key={t.title} className="overflow-hidden border-navy-100">
              <ImagePlaceholder src={t.image} alt={`${t.title} door`} label={t.title} />
              <CardHeader>
                <CardTitle>{t.title}</CardTitle>
                <CardDescription>{t.body}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="container grid md:grid-cols-2 gap-10 items-center">
          <ImagePlaceholder
            src="/placeholder-door-security.jpg"
            alt="Secure door cylinder close-up"
            label="Security"
            aspect="photo"
          />
          <div>
            <p className="text-sm font-medium text-accent uppercase tracking-wider">Security</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
              Built-in peace of mind
            </h2>
            <p className="mt-3 text-navy-700">
              Every door leaves our workshop with high-security hardware as
              standard. Upgrade to PAS 24 or Secured by Design certification at
              the click of a toggle in our calculator.
            </p>
            <ul className="mt-5 space-y-2 text-navy-800">
              {SECURITY.map((s) => (
                <li key={s} className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-16 text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold">See what it would cost</h2>
          <p className="mt-3 text-navy-100 max-w-xl mx-auto">
            Configure size, glazing, hardware and security in seconds.
          </p>
          <Button asChild size="lg" variant="accent" className="mt-6">
            <Link href="/quote?tab=doors">Price my door</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
