import { z } from "zod";

const mm = z.coerce
  .number({ invalid_type_error: "Required" })
  .int("Must be a whole number")
  .min(300, "Min 300 mm")
  .max(3000, "Max 3000 mm");

const metres = z.coerce
  .number({ invalid_type_error: "Required" })
  .min(1, "Min 1 m")
  .max(15, "Max 15 m");

const qty = z.coerce
  .number({ invalid_type_error: "Required" })
  .int()
  .min(1, "Min 1")
  .max(99, "Max 99");

export const windowSchema = z.object({
  widthMm: mm,
  heightMm: mm,
  style: z.enum(["casement", "sash", "tiltAndTurn", "bay", "bow", "fixed"]),
  material: z.enum(["upvc", "aluminium", "timber"]),
  colour: z.enum(["white", "anthracite", "black", "rosewood", "cream", "custom"]),
  glazing: z.enum(["double", "triple", "acoustic", "selfCleaning"]),
  openingPanes: z.coerce.number().int().min(0).max(4),
  georgianBars: z.boolean(),
  trickleVents: z.boolean(),
  quantity: qty,
});
export type WindowFormValues = z.infer<typeof windowSchema>;

export const doorSchema = z
  .object({
    widthMm: mm,
    heightMm: mm,
    type: z.enum(["composite", "upvc", "bifold", "french", "patio", "stable"]),
    bifoldPanels: z.coerce.number().int().min(2).max(7).optional(),
    colour: z.enum(["white", "anthracite", "black", "rosewood", "cream", "custom"]),
    glazing: z.enum(["double", "triple", "acoustic", "selfCleaning"]),
    hardware: z.enum(["chrome", "brass", "black", "satin"]),
    security: z.enum(["standard", "enhanced", "securedByDesign"]),
    letterbox: z.boolean(),
    spyhole: z.boolean(),
    knocker: z.boolean(),
    quantity: qty,
  })
  .superRefine((v, ctx) => {
    if (v.type === "bifold" && (!v.bifoldPanels || v.bifoldPanels < 2)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["bifoldPanels"],
        message: "Choose 2–7 panels",
      });
    }
  });
export type DoorFormValues = z.infer<typeof doorSchema>;

export const conservatorySchema = z.object({
  widthM: metres,
  projectionM: metres,
  style: z.enum([
    "victorian",
    "edwardian",
    "leanTo",
    "pShaped",
    "tShaped",
    "orangery",
    "gable",
  ]),
  roof: z.enum(["glass", "polycarbonate", "solid", "hybrid"]),
  material: z.enum(["upvc", "aluminium", "timber"]),
  colour: z.enum(["white", "anthracite", "black", "rosewood", "cream", "custom"]),
  dwarfWall: z.boolean(),
  frenchDoors: z.boolean(),
  underfloorHeating: z.boolean(),
  buildingRegs: z.boolean(),
});
export type ConservatoryFormValues = z.infer<typeof conservatorySchema>;

export const defaultWindow: WindowFormValues = {
  widthMm: 1200,
  heightMm: 1000,
  style: "casement",
  material: "upvc",
  colour: "white",
  glazing: "double",
  openingPanes: 1,
  georgianBars: false,
  trickleVents: true,
  quantity: 1,
};

export const defaultDoor: DoorFormValues = {
  widthMm: 900,
  heightMm: 2100,
  type: "composite",
  bifoldPanels: 3,
  colour: "anthracite",
  glazing: "double",
  hardware: "chrome",
  security: "enhanced",
  letterbox: true,
  spyhole: false,
  knocker: false,
  quantity: 1,
};

export const defaultConservatory: ConservatoryFormValues = {
  widthM: 4,
  projectionM: 3,
  style: "edwardian",
  roof: "glass",
  material: "upvc",
  colour: "white",
  dwarfWall: true,
  frenchDoors: true,
  underfloorHeating: false,
  buildingRegs: true,
};

export type TabKey = "windows" | "doors" | "conservatories";
