import { labels } from "@/lib/pricing-data";
import type {
  ConservatoryFormValues,
  DoorFormValues,
  WindowFormValues,
} from "@/lib/quote-schema";

export function windowSpecLines(v: WindowFormValues): string[] {
  return [
    `Size: ${v.widthMm}mm × ${v.heightMm}mm`,
    `Style: ${labels.windowStyle[v.style]}`,
    `Material: ${labels.frameMaterial[v.material]}`,
    `Colour: ${labels.frameColour[v.colour]}`,
    `Glazing: ${labels.glazing[v.glazing]}`,
    `Opening panes: ${v.openingPanes}`,
    `Georgian bars: ${v.georgianBars ? "Yes" : "No"}`,
    `Trickle vents: ${v.trickleVents ? "Yes" : "No"}`,
    `Quantity: ${v.quantity}`,
  ];
}

export function doorSpecLines(v: DoorFormValues): string[] {
  const lines = [
    `Size: ${v.widthMm}mm × ${v.heightMm}mm`,
    `Type: ${labels.doorType[v.type]}`,
  ];
  if (v.type === "bifold") lines.push(`Bi-fold panels: ${v.bifoldPanels ?? 2}`);
  lines.push(
    `Colour: ${labels.frameColour[v.colour]}`,
    `Glazing: ${labels.glazing[v.glazing]}`,
    `Hardware: ${labels.hardwareFinish[v.hardware]}`,
    `Security: ${labels.securityLevel[v.security]}`,
    `Letterbox/Spyhole/Knocker: ${[
      v.letterbox ? "Letterbox" : null,
      v.spyhole ? "Spyhole" : null,
      v.knocker ? "Knocker" : null,
    ].filter(Boolean).join(", ") || "None"}`,
    `Quantity: ${v.quantity}`,
  );
  return lines;
}

export function conservatorySpecLines(v: ConservatoryFormValues): string[] {
  return [
    `Footprint: ${v.widthM}m × ${v.projectionM}m`,
    `Style: ${labels.conservatoryStyle[v.style]}`,
    `Roof: ${labels.roofType[v.roof]}`,
    `Frame: ${labels.frameMaterial[v.material]} in ${labels.frameColour[v.colour]}`,
    `Dwarf wall: ${v.dwarfWall ? "Yes" : "No"}`,
    `French doors: ${v.frenchDoors ? "Yes" : "No"}`,
    `Underfloor heating: ${v.underfloorHeating ? "Yes" : "No"}`,
    `Building regs handling: ${v.buildingRegs ? "Yes" : "No"}`,
  ];
}
