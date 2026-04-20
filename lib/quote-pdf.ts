import { jsPDF } from "jspdf";
import type { QuoteResult } from "./pricing-engine";
import { formatGBP } from "./utils";

export function downloadQuotePdf(args: {
  product: "Windows" | "Doors" | "Conservatories";
  specLines: string[];
  quote: QuoteResult;
}) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const marginX = 48;
  let y = 56;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.setTextColor(26, 41, 66); // navy-800
  doc.text("Clearview Glazing", marginX, y);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(90);
  y += 16;
  doc.text("Indicative Quote Summary — price guide only", marginX, y);

  y += 28;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(26, 41, 66);
  doc.text(`${args.product} Quote`, marginX, y);

  y += 18;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60);
  for (const line of args.specLines) {
    doc.text(line, marginX, y);
    y += 14;
  }

  y += 10;
  doc.setDrawColor(200);
  doc.line(marginX, y, 595 - marginX, y);
  y += 18;

  doc.setFont("helvetica", "bold");
  doc.text("Breakdown", marginX, y);
  y += 14;

  doc.setFont("helvetica", "normal");
  for (const line of args.quote.lines) {
    doc.text(line.label, marginX, y);
    doc.text(formatGBP(line.amount), 595 - marginX, y, { align: "right" });
    y += 14;
  }

  y += 10;
  doc.line(marginX, y, 595 - marginX, y);
  y += 18;

  doc.text("Subtotal", marginX, y);
  doc.text(formatGBP(args.quote.subtotal), 595 - marginX, y, { align: "right" });
  y += 14;
  doc.text("VAT (20%)", marginX, y);
  doc.text(formatGBP(args.quote.vat), 595 - marginX, y, { align: "right" });
  y += 16;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Total (inc. VAT)", marginX, y);
  doc.text(formatGBP(args.quote.total), 595 - marginX, y, { align: "right" });

  y += 36;
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(120);
  const disclaimer =
    "This is a price guide only, based on the configuration provided. " +
    "A formal quotation will be prepared following a site survey. " +
    "Prices include VAT at 20%.";
  doc.text(doc.splitTextToSize(disclaimer, 595 - marginX * 2), marginX, y);

  doc.save(`clearview-${args.product.toLowerCase()}-quote.pdf`);
}
