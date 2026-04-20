import Link from "next/link";
import { Award, Heart, Users, Wrench } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ImagePlaceholder } from "@/components/image-placeholder";

export const metadata = {
  title: "About Us",
  description:
    "Clearview Glazing — a family-run, FENSA-registered installer serving the South East since 1998.",
};

const VALUES = [
  { icon: Heart, title: "Family-run", body: "Three generations of Clearview installers — accountability matters." },
  { icon: Wrench, title: "Directly employed", body: "No subcontractors. Our own surveyors, fabricators and fitters." },
  { icon: Users, title: "Customer-first", body: "We take as long as you need at survey. We'd rather lose the job than mis-sell." },
  { icon: Award, title: "Accredited", body: "FENSA, CHAS, TrustMark and GGF registered for total peace of mind." },
];

const STATS = [
  { figure: "25+", label: "Years installing" },
  { figure: "12,000", label: "Homes improved" },
  { figure: "4.9 / 5", label: "Average review" },
  { figure: "48 hr", label: "Survey response" },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-navy-900 text-white">
        <div className="container py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <Badge variant="accent" className="mb-4">About us</Badge>
            <h1 className="text-4xl md:text-5xl font-bold">
              A South-East family business you can actually reach on the phone
            </h1>
            <p className="mt-4 text-navy-100 text-lg max-w-xl">
              We opened our workshop in Maidstone in 1998 with a simple promise:
              fit beautiful glazing, treat customers' homes like our own, and stand
              behind every product we install.
            </p>
          </div>
          <ImagePlaceholder
            src="/placeholder-about-team.jpg"
            alt="The Clearview team outside their workshop"
            label="Our team"
            aspect="photo"
          />
        </div>
      </section>

      <section className="container py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STATS.map((s) => (
            <div key={s.label} className="text-center p-6 rounded-lg bg-secondary">
              <p className="text-4xl font-bold text-primary">{s.figure}</p>
              <p className="mt-1 text-sm text-navy-700 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary py-16">
        <div className="container">
          <div className="max-w-2xl mb-10">
            <p className="text-sm font-medium text-accent uppercase tracking-wider">What we stand for</p>
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
              Four values that haven&rsquo;t changed in 25 years
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <Card key={v.title} className="border-navy-100">
                <CardHeader>
                  <div className="h-10 w-10 rounded-md bg-primary/10 text-primary grid place-items-center mb-2">
                    <v.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{v.title}</CardTitle>
                  <CardDescription>{v.body}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16 grid md:grid-cols-2 gap-10 items-center">
        <ImagePlaceholder
          src="/placeholder-about-workshop.jpg"
          alt="Inside the Clearview fabrication workshop"
          aspect="photo"
        />
        <div>
          <p className="text-sm font-medium text-accent uppercase tracking-wider">The workshop</p>
          <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
            We make what we fit
          </h2>
          <p className="mt-3 text-navy-700">
            Our 20,000 sq ft facility in Maidstone fabricates uPVC and aluminium
            windows and doors to order, which keeps lead times short and quality
            consistent. Timber products are produced by our joinery partner in
            Kent, with whom we&rsquo;ve worked since 2004.
          </p>
          <Button asChild variant="accent" className="mt-5">
            <Link href="/contact">Visit the showroom</Link>
          </Button>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-16 text-center">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold">Let&rsquo;s start with a free survey</h2>
          <p className="mt-3 text-navy-100 max-w-xl mx-auto">
            Price it online first, then let us come and measure up for a formal
            quotation — always no-obligation.
          </p>
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            <Button asChild size="lg" variant="accent">
              <Link href="/quote">Get instant quote</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent text-white border-white/40 hover:bg-white/10 hover:text-white"
            >
              <Link href="/contact">Book a survey</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
