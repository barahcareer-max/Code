import { Suspense } from "react";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ImagePlaceholder } from "@/components/image-placeholder";

export const metadata = {
  title: "Contact Us",
  description:
    "Call, email or request a free site survey. Unit 4, Glasswright Park, Maidstone, Kent.",
};

export default function ContactPage() {
  return (
    <section className="container py-10 md:py-16">
      <div className="max-w-2xl mb-8">
        <Badge variant="accent" className="mb-3">Contact</Badge>
        <h1 className="text-3xl md:text-4xl font-bold text-navy-900">
          Request your formal quotation
        </h1>
        <p className="mt-3 text-navy-700">
          Send us your details and we&rsquo;ll arrange a free, no-obligation site
          survey within 48 hours.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]">
        <Suspense fallback={<div className="h-96 rounded-lg bg-muted animate-pulse" />}>
          <ContactForm />
        </Suspense>

        <aside className="space-y-6">
          <Card className="border-navy-100">
            <CardContent className="p-6 space-y-4 text-sm text-navy-800">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-navy-900">Phone</p>
                  <a href="tel:08001234567" className="hover:text-primary">0800 123 4567</a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-navy-900">Email</p>
                  <a href="mailto:hello@clearview.example" className="hover:text-primary">
                    hello@clearview.example
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-navy-900">Showroom &amp; Workshop</p>
                  <p>Unit 4, Glasswright Park<br />Maidstone, Kent ME16 0AA</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-navy-900">Opening hours</p>
                  <p>Mon–Fri 8:30–17:30<br />Sat 9:00–13:00 · Sun closed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div>
            <p className="text-sm font-semibold text-navy-900 mb-2">Find us</p>
            <ImagePlaceholder
              src="/placeholder-map.jpg"
              alt="Map showing Clearview Glazing showroom in Maidstone"
              label="Map placeholder"
              aspect="square"
            />
          </div>
        </aside>
      </div>
    </section>
  );
}
