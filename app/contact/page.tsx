import { Suspense } from "react";
import { ContactForm } from "@/components/contact-form";

export const metadata = {
  title: "Contact Us",
  description: "Talk to our team — call, email, or book a free site survey.",
};

export default function ContactPage() {
  return (
    <section className="container py-10 md:py-16">
      <div className="max-w-2xl mb-8">
        <p className="text-sm font-medium text-accent uppercase tracking-wider">
          Get in touch
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mt-2">
          Request your formal quotation
        </h1>
        <p className="text-navy-700 mt-3">
          Send us your details and we'll arrange a free, no-obligation site
          survey within 48 hours.
        </p>
      </div>
      <Suspense fallback={null}>
        <ContactForm />
      </Suspense>
    </section>
  );
}
