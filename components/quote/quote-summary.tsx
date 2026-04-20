"use client";

import Link from "next/link";
import { Download, FileText, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { downloadQuotePdf } from "@/lib/quote-pdf";
import type { QuoteResult } from "@/lib/pricing-engine";
import { formatGBP } from "@/lib/utils";

type Props = {
  product: "Windows" | "Doors" | "Conservatories";
  specLines: string[];
  quote: QuoteResult | null;
  shareHref: string;
};

export function QuoteSummary({ product, specLines, quote, shareHref }: Props) {
  const { toast } = useToast();

  const handleEmail = () => {
    toast({
      title: "We'll email you the quote",
      description:
        "This is a stub — wire up an email service (e.g. Resend, Postmark) to enable.",
    });
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareHref);
      toast({ title: "Link copied", description: "Share this URL to recall your quote." });
    } catch {
      toast({ title: "Couldn't copy", description: shareHref, variant: "destructive" });
    }
  };

  return (
    <Card className="lg:sticky lg:top-20 shadow-md border-navy-100">
      <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
        <CardTitle className="text-white">Your {product} Quote</CardTitle>
        <CardDescription className="text-navy-100">
          Live estimate — updates as you change options
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6">
        {quote && quote.lines.length > 0 ? (
          <>
            <ul className="space-y-2 text-sm" aria-label="Price breakdown">
              {quote.lines.map((line, i) => (
                <li key={i} className="flex justify-between gap-4">
                  <span className="text-navy-700">{line.label}</span>
                  <span className="tabular-nums text-navy-900">
                    {line.amount === 0 ? "—" : formatGBP(line.amount)}
                  </span>
                </li>
              ))}
            </ul>

            <Separator className="my-4" />

            <dl className="space-y-1.5 text-sm">
              <div className="flex justify-between">
                <dt className="text-navy-700">Subtotal</dt>
                <dd className="tabular-nums text-navy-900">
                  {formatGBP(quote.subtotal)}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-navy-700">VAT (20%)</dt>
                <dd className="tabular-nums text-navy-900">
                  {formatGBP(quote.vat)}
                </dd>
              </div>
            </dl>

            <div
              className="mt-4 rounded-md bg-navy-900 text-white p-4 flex items-baseline justify-between"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="text-sm uppercase tracking-wide text-navy-200">
                Total inc. VAT
              </span>
              <span className="text-2xl font-bold tabular-nums">
                {formatGBP(quote.total)}
              </span>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted-foreground">
            Fix the highlighted fields to see your price.
          </p>
        )}

        <p className="mt-4 text-xs italic text-muted-foreground">
          Price guide only — a formal quotation follows a free site survey. Prices
          include VAT.
        </p>
      </CardContent>

      <CardFooter className="flex flex-col gap-2">
        {quote ? (
          <Button asChild variant="accent" className="w-full">
            <Link
              href={`/contact?${new URLSearchParams({
                product,
                spec: specLines.join(" | "),
                total: String(quote.total),
              }).toString()}`}
            >
              <FileText className="h-4 w-4 mr-2" /> Request Formal Quote
            </Link>
          </Button>
        ) : (
          <Button variant="accent" className="w-full" disabled>
            <FileText className="h-4 w-4 mr-2" /> Request Formal Quote
          </Button>
        )}
        <div className="grid grid-cols-2 gap-2 w-full">
          <Button
            type="button"
            variant="outline"
            onClick={() => quote && downloadQuotePdf({ product, specLines, quote })}
            disabled={!quote}
          >
            <Download className="h-4 w-4 mr-2" /> PDF
          </Button>
          <Button type="button" variant="outline" onClick={handleEmail}>
            <Mail className="h-4 w-4 mr-2" /> Email me
          </Button>
        </div>
        <button
          type="button"
          onClick={handleCopyLink}
          className="text-xs text-navy-600 underline underline-offset-2 mt-1 hover:text-primary"
        >
          Copy shareable link
        </button>
      </CardFooter>
    </Card>
  );
}
