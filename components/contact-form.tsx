"use client";

import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Field } from "@/components/quote/form-field";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(7, "Please enter a phone number"),
  postcode: z.string().min(3, "Enter your postcode"),
  product: z.string().optional(),
  spec: z.string().optional(),
  total: z.string().optional(),
  message: z.string().optional(),
});
type Values = z.infer<typeof schema>;

export function ContactForm() {
  const sp = useSearchParams();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    defaultValues: {
      product: sp.get("product") ?? "",
      spec: sp.get("spec") ?? "",
      total: sp.get("total") ?? "",
    },
  });

  const onSubmit = async (values: Values) => {
    // TODO: connect to a form service (Resend, Formspree, Postmark, etc.)
    // For v1 we just log the payload and surface a confirmation toast.
    // eslint-disable-next-line no-console
    console.log("[contact] submission", values);
    toast({
      title: "Thanks — we'll be in touch",
      description: "A consultant will call within one business day.",
    });
    reset({ ...values, name: "", email: "", phone: "", postcode: "", message: "" });
  };

  return (
    <Card className="max-w-3xl border-navy-100">
      <CardContent className="p-6">
        <form className="grid gap-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full name" error={errors.name?.message}>
              <Input autoComplete="name" {...register("name")} />
            </Field>
            <Field label="Email" error={errors.email?.message}>
              <Input type="email" autoComplete="email" {...register("email")} />
            </Field>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Phone" error={errors.phone?.message}>
              <Input type="tel" autoComplete="tel" {...register("phone")} />
            </Field>
            <Field label="Postcode" error={errors.postcode?.message}>
              <Input autoComplete="postal-code" {...register("postcode")} />
            </Field>
          </div>

          {sp.get("spec") && (
            <div className="rounded-md bg-secondary p-4 text-sm text-navy-800">
              <p className="font-semibold mb-1">
                {sp.get("product")} configuration attached
              </p>
              <p className="text-navy-700">{sp.get("spec")}</p>
              {sp.get("total") && (
                <p className="mt-2">
                  Indicative total: <span className="font-semibold">£{sp.get("total")}</span>
                </p>
              )}
              <input type="hidden" {...register("product")} />
              <input type="hidden" {...register("spec")} />
              <input type="hidden" {...register("total")} />
            </div>
          )}

          <Field label="Anything else we should know? (optional)">
            <Input {...register("message")} />
          </Field>

          <div className="flex gap-3">
            <Button type="submit" variant="accent" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Send enquiry"}
            </Button>
            <p className="text-xs text-muted-foreground self-center">
              We reply within one business day.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
