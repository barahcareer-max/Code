import {
  pricing,
  type ConservatoryStyleKey,
  type DoorTypeKey,
  type FrameColourKey,
  type FrameMaterialKey,
  type GlazingKey,
  type HardwareFinishKey,
  type RoofTypeKey,
  type SecurityLevelKey,
  type WindowStyleKey,
} from "./pricing-data";

export type LineItem = {
  label: string;
  amount: number; // in £
};

export type QuoteResult = {
  lines: LineItem[];
  subtotal: number;
  vat: number;
  total: number;
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}

function withVat(subtotal: number): { vat: number; total: number } {
  const vat = round2(subtotal * pricing.vatRate);
  return { vat, total: round2(subtotal + vat) };
}

/* ------------------------------------------------------------------ */
/*  WINDOWS                                                           */
/* ------------------------------------------------------------------ */

export type WindowQuoteInput = {
  widthMm: number;
  heightMm: number;
  style: WindowStyleKey;
  material: FrameMaterialKey;
  colour: FrameColourKey;
  glazing: GlazingKey;
  openingPanes: 0 | 1 | 2 | 3 | 4;
  georgianBars: boolean;
  trickleVents: boolean;
  quantity: number;
};

export function quoteWindows(input: WindowQuoteInput): QuoteResult {
  const w = pricing.windows;
  const areaSqm = (input.widthMm / 1000) * (input.heightMm / 1000);

  const baseRate = w.baseRatePerSqm[input.material];
  const styleMult = w.styleMultiplier[input.style];
  const glazingUplift = w.glazingUpliftPerSqm[input.glazing];
  const colourPct = w.colourUpliftPercent[input.colour];

  const baseUnit = round2(areaSqm * baseRate);
  const styleUnit = round2(baseUnit * (styleMult - 1));
  const glazingUnit = round2(areaSqm * glazingUplift);

  const runningBeforeColour = baseUnit + styleUnit + glazingUnit;
  const colourUnit = round2(runningBeforeColour * colourPct);

  const georgianUnit = input.georgianBars ? w.addOns.georgianBars : 0;
  const ventUnit = input.trickleVents ? w.addOns.trickleVent : 0;
  const openingUnit = input.openingPanes * w.addOns.openingPane;

  const perWindow =
    runningBeforeColour + colourUnit + georgianUnit + ventUnit + openingUnit;

  const qty = Math.max(1, input.quantity);

  const lines: LineItem[] = [
    { label: `Base — ${input.material} (${areaSqm.toFixed(2)} m²)`, amount: round2(baseUnit * qty) },
  ];
  if (styleUnit !== 0) {
    lines.push({
      label: `Style uplift — ${input.style} (×${styleMult})`,
      amount: round2(styleUnit * qty),
    });
  }
  if (glazingUnit !== 0) {
    lines.push({
      label: `Glazing — ${input.glazing}`,
      amount: round2(glazingUnit * qty),
    });
  }
  if (colourUnit !== 0) {
    lines.push({
      label: `Colour finish — ${input.colour} (+${(colourPct * 100).toFixed(0)}%)`,
      amount: round2(colourUnit * qty),
    });
  }
  if (input.openingPanes > 0) {
    lines.push({
      label: `Opening panes × ${input.openingPanes}`,
      amount: round2(openingUnit * qty),
    });
  }
  if (input.georgianBars) {
    lines.push({ label: "Georgian bars", amount: round2(georgianUnit * qty) });
  }
  if (input.trickleVents) {
    lines.push({ label: "Trickle vents", amount: round2(ventUnit * qty) });
  }
  if (qty > 1) {
    lines.push({ label: `Quantity × ${qty}`, amount: 0 });
  }

  const subtotal = round2(perWindow * qty);
  const { vat, total } = withVat(subtotal);
  return { lines, subtotal, vat, total };
}

/* ------------------------------------------------------------------ */
/*  DOORS                                                             */
/* ------------------------------------------------------------------ */

export type DoorQuoteInput = {
  widthMm: number;
  heightMm: number;
  type: DoorTypeKey;
  bifoldPanels?: number; // only used when type === "bifold"
  colour: FrameColourKey;
  glazing: GlazingKey;
  hardware: HardwareFinishKey;
  security: SecurityLevelKey;
  letterbox: boolean;
  spyhole: boolean;
  knocker: boolean;
  quantity: number;
};

export function quoteDoors(input: DoorQuoteInput): QuoteResult {
  const d = pricing.doors;
  const areaSqm = (input.widthMm / 1000) * (input.heightMm / 1000);

  const baseRate = d.baseRatePerSqm[input.type];
  const baseUnit = round2(areaSqm * baseRate);

  let bifoldUnit = 0;
  if (input.type === "bifold" && input.bifoldPanels && input.bifoldPanels > 2) {
    bifoldUnit = round2(
      areaSqm * d.bifoldExtraPanelPerSqm * (input.bifoldPanels - 2),
    );
  }

  const glazingUplift = d.glazingUpliftPerSqm[input.glazing];
  const glazingUnit = round2(areaSqm * glazingUplift);

  const colourPct = d.colourUpliftPercent[input.colour];
  const runningBeforeColour = baseUnit + bifoldUnit + glazingUnit;
  const colourUnit = round2(runningBeforeColour * colourPct);

  const hardwareUnit = d.hardwareFinish[input.hardware];
  const securityUnit = d.securityLevel[input.security];
  const letterboxUnit = input.letterbox ? d.addOns.letterbox : 0;
  const spyholeUnit = input.spyhole ? d.addOns.spyhole : 0;
  const knockerUnit = input.knocker ? d.addOns.knocker : 0;

  const perDoor =
    runningBeforeColour +
    colourUnit +
    hardwareUnit +
    securityUnit +
    letterboxUnit +
    spyholeUnit +
    knockerUnit;

  const qty = Math.max(1, input.quantity);

  const lines: LineItem[] = [
    { label: `Base — ${input.type} (${areaSqm.toFixed(2)} m²)`, amount: round2(baseUnit * qty) },
  ];
  if (bifoldUnit > 0) {
    lines.push({
      label: `Bi-fold extra panels × ${(input.bifoldPanels ?? 2) - 2}`,
      amount: round2(bifoldUnit * qty),
    });
  }
  if (glazingUnit !== 0) {
    lines.push({ label: `Glazing — ${input.glazing}`, amount: round2(glazingUnit * qty) });
  }
  if (colourUnit !== 0) {
    lines.push({
      label: `Colour finish — ${input.colour} (+${(colourPct * 100).toFixed(0)}%)`,
      amount: round2(colourUnit * qty),
    });
  }
  if (hardwareUnit > 0) {
    lines.push({ label: `Hardware — ${input.hardware}`, amount: round2(hardwareUnit * qty) });
  }
  if (securityUnit > 0) {
    lines.push({ label: `Security — ${input.security}`, amount: round2(securityUnit * qty) });
  }
  if (letterboxUnit > 0) lines.push({ label: "Letterbox", amount: round2(letterboxUnit * qty) });
  if (spyholeUnit > 0) lines.push({ label: "Spyhole", amount: round2(spyholeUnit * qty) });
  if (knockerUnit > 0) lines.push({ label: "Knocker", amount: round2(knockerUnit * qty) });
  if (qty > 1) lines.push({ label: `Quantity × ${qty}`, amount: 0 });

  const subtotal = round2(perDoor * qty);
  const { vat, total } = withVat(subtotal);
  return { lines, subtotal, vat, total };
}

/* ------------------------------------------------------------------ */
/*  CONSERVATORIES                                                    */
/* ------------------------------------------------------------------ */

export type ConservatoryQuoteInput = {
  widthM: number;
  projectionM: number;
  style: ConservatoryStyleKey;
  roof: RoofTypeKey;
  material: FrameMaterialKey;
  colour: FrameColourKey;
  dwarfWall: boolean;
  frenchDoors: boolean;
  underfloorHeating: boolean;
  buildingRegs: boolean;
};

export function quoteConservatory(input: ConservatoryQuoteInput): QuoteResult {
  const c = pricing.conservatories;
  const footprint = input.widthM * input.projectionM;

  const baseRate = c.baseRatePerSqm;
  const styleMult = c.styleMultiplier[input.style];

  const baseUnit = round2(footprint * baseRate);
  const styleUnit = round2(baseUnit * (styleMult - 1));

  const roofUnit = round2(footprint * c.roofUpliftPerSqm[input.roof]);
  const materialUnit = round2(footprint * c.frameMaterialPerSqm[input.material]);

  const runningBeforeColour = baseUnit + styleUnit + roofUnit + materialUnit;
  const colourPct = c.colourUpliftPercent[input.colour];
  const colourUnit = round2(runningBeforeColour * colourPct);

  const dwarfUnit = input.dwarfWall ? c.addOns.dwarfWall : 0;
  const frenchUnit = input.frenchDoors ? c.addOns.frenchDoors : 0;
  const ufhUnit = input.underfloorHeating
    ? round2(footprint * c.addOns.underfloorHeating)
    : 0;
  const regsUnit = input.buildingRegs ? c.addOns.buildingRegs : 0;

  const subtotal = round2(
    runningBeforeColour +
      colourUnit +
      dwarfUnit +
      frenchUnit +
      ufhUnit +
      regsUnit,
  );

  const lines: LineItem[] = [
    { label: `Base — footprint ${footprint.toFixed(2)} m²`, amount: baseUnit },
  ];
  if (styleUnit !== 0) {
    lines.push({
      label: `Style uplift — ${input.style} (×${styleMult})`,
      amount: styleUnit,
    });
  }
  if (roofUnit !== 0) {
    lines.push({ label: `Roof — ${input.roof}`, amount: roofUnit });
  }
  if (materialUnit !== 0) {
    lines.push({ label: `Frame material — ${input.material}`, amount: materialUnit });
  }
  if (colourUnit !== 0) {
    lines.push({
      label: `Colour finish — ${input.colour} (+${(colourPct * 100).toFixed(0)}%)`,
      amount: colourUnit,
    });
  }
  if (dwarfUnit > 0) lines.push({ label: "Dwarf wall", amount: dwarfUnit });
  if (frenchUnit > 0) lines.push({ label: "French doors", amount: frenchUnit });
  if (ufhUnit > 0) lines.push({ label: "Underfloor heating", amount: ufhUnit });
  if (regsUnit > 0) lines.push({ label: "Building regulations handling", amount: regsUnit });

  const { vat, total } = withVat(subtotal);
  return { lines, subtotal, vat, total };
}
