/**
 * ============================================================================
 *  PRICING DATA — single source of truth for the quote calculator
 * ============================================================================
 *
 *  Edit the numbers in this file to update what the calculator quotes.
 *  You should NOT need to change any other file unless you are adding a new
 *  product option (e.g. a brand new frame style or door type) — see README.md
 *  for instructions on adding new options.
 *
 *  Unit conventions used throughout:
 *    £/m²            -> currency per square metre of product area
 *    multiplier (x)  -> dimensionless number applied to running total
 *    flat £          -> a fixed currency amount added to the total
 *    %               -> percentage of the running total (0.08 = 8 %)
 *
 *  All prices are in GBP and exclusive of VAT. VAT is added at the end via
 *  `vatRate` (currently 20 %).
 * ============================================================================
 */

export type WindowStyleKey =
  | "casement"
  | "sash"
  | "tiltAndTurn"
  | "bay"
  | "bow"
  | "fixed";

export type FrameMaterialKey = "upvc" | "aluminium" | "timber";

export type FrameColourKey =
  | "white"
  | "anthracite"
  | "black"
  | "rosewood"
  | "cream"
  | "custom";

export type GlazingKey = "double" | "triple" | "acoustic" | "selfCleaning";

export type DoorTypeKey =
  | "composite"
  | "upvc"
  | "bifold"
  | "french"
  | "patio"
  | "stable";

export type HardwareFinishKey = "chrome" | "brass" | "black" | "satin";

export type SecurityLevelKey = "standard" | "enhanced" | "securedByDesign";

export type ConservatoryStyleKey =
  | "victorian"
  | "edwardian"
  | "leanTo"
  | "pShaped"
  | "tShaped"
  | "orangery"
  | "gable";

export type RoofTypeKey = "glass" | "polycarbonate" | "solid" | "hybrid";

export const pricing = {
  /* --------------------------------------------------------------------- */
  /*  WINDOWS                                                              */
  /* --------------------------------------------------------------------- */
  windows: {
    /** £/m² — the base rate per square metre of glass area */
    baseRatePerSqm: {
      upvc: 350,       // £/m²
      aluminium: 520,  // £/m²
      timber: 680,     // £/m²
    } as Record<FrameMaterialKey, number>,

    /** multiplier — applied after the base rate */
    styleMultiplier: {
      casement: 1.0,
      sash: 1.4,
      tiltAndTurn: 1.25,
      bay: 1.6,
      bow: 1.7,
      fixed: 0.85,
    } as Record<WindowStyleKey, number>,

    /** £/m² — flat uplift added per m² for the chosen glazing */
    glazingUpliftPerSqm: {
      double: 0,        // £/m² — included as standard
      triple: 85,       // £/m²
      acoustic: 120,    // £/m²
      selfCleaning: 65, // £/m²
    } as Record<GlazingKey, number>,

    /** % — percentage uplift on the running total for the chosen colour */
    colourUpliftPercent: {
      white: 0,           // 0%  — standard
      anthracite: 0.08,   // 8%
      black: 0.08,        // 8%
      rosewood: 0.12,     // 12%
      cream: 0.05,        // 5%
      custom: 0.18,       // 18%
    } as Record<FrameColourKey, number>,

    /** flat £ — added per unit of the chosen feature */
    addOns: {
      georgianBars: 45,  // £ per window
      trickleVent: 25,   // £ per window
      openingPane: 65,   // £ per opening pane
    },
  },

  /* --------------------------------------------------------------------- */
  /*  DOORS                                                                */
  /* --------------------------------------------------------------------- */
  doors: {
    /** £/m² — base rate per m² of door leaf area */
    baseRatePerSqm: {
      composite: 780,   // £/m²
      upvc: 520,        // £/m²
      bifold: 1150,     // £/m² (aluminium bi-fold)
      french: 690,      // £/m²
      patio: 740,       // £/m² (sliding)
      stable: 870,      // £/m²
    } as Record<DoorTypeKey, number>,

    /** £/m² — extra per panel for bi-fold doors beyond the 2-panel default */
    bifoldExtraPanelPerSqm: 60, // £/m² per panel above 2

    /** £/m² — flat uplift added per m² for the chosen glazing */
    glazingUpliftPerSqm: {
      double: 0,
      triple: 95,
      acoustic: 130,
      selfCleaning: 70,
    } as Record<GlazingKey, number>,

    /** % — percentage uplift on the running total for the chosen colour */
    colourUpliftPercent: {
      white: 0,
      anthracite: 0.09,
      black: 0.09,
      rosewood: 0.13,
      cream: 0.06,
      custom: 0.20,
    } as Record<FrameColourKey, number>,

    /** flat £ — hardware finish charge per door */
    hardwareFinish: {
      chrome: 0,    // included
      brass: 45,    // £
      black: 35,    // £
      satin: 55,    // £
    } as Record<HardwareFinishKey, number>,

    /** flat £ — security upgrade per door */
    securityLevel: {
      standard: 0,            // included
      enhanced: 95,           // PAS 24
      securedByDesign: 180,   // SBD certified
    } as Record<SecurityLevelKey, number>,

    /** flat £ — optional door fittings */
    addOns: {
      letterbox: 35, // £
      spyhole: 18,   // £
      knocker: 22,   // £
    },
  },

  /* --------------------------------------------------------------------- */
  /*  CONSERVATORIES                                                       */
  /* --------------------------------------------------------------------- */
  conservatories: {
    /** £/m² — base rate per m² of FOOTPRINT (width × projection in metres) */
    baseRatePerSqm: 1850, // £/m²

    /** multiplier — applied after the base rate */
    styleMultiplier: {
      victorian: 1.15,
      edwardian: 1.0,    // simplest geometry, treat as the "1.0"
      leanTo: 0.85,
      pShaped: 1.35,
      tShaped: 1.40,
      orangery: 1.55,    // brick piers + lantern roof
      gable: 1.20,
    } as Record<ConservatoryStyleKey, number>,

    /** £/m² — uplift on footprint for the chosen roof type */
    roofUpliftPerSqm: {
      glass: 180,          // £/m² — self-cleaning sealed units
      polycarbonate: 0,    // standard / cheapest
      solid: 320,          // £/m² — tiled warm roof
      hybrid: 250,         // £/m² — solid + glass panels
    } as Record<RoofTypeKey, number>,

    /** £/m² — base rate per m² of frame area for the surrounding frames */
    frameMaterialPerSqm: {
      upvc: 0,         // included in base rate
      aluminium: 95,   // £/m² uplift on footprint
      timber: 145,     // £/m² uplift on footprint
    } as Record<FrameMaterialKey, number>,

    /** % — percentage uplift on the running total for the chosen colour */
    colourUpliftPercent: {
      white: 0,
      anthracite: 0.07,
      black: 0.07,
      rosewood: 0.11,
      cream: 0.04,
      custom: 0.16,
    } as Record<FrameColourKey, number>,

    /** flat £ — add-on items */
    addOns: {
      dwarfWall: 1450,         // £ — masonry dwarf wall
      frenchDoors: 980,        // £ — built-in French doors
      underfloorHeating: 95,   // £/m² (we'll multiply by footprint)
      buildingRegs: 1200,      // £ — building regs handling fee
    },
  },

  /* --------------------------------------------------------------------- */
  /*  GLOBAL                                                               */
  /* --------------------------------------------------------------------- */
  /** VAT rate applied to the final subtotal */
  vatRate: 0.20, // 20%
} as const;

/* --------------------------------------------------------------------- */
/*  Human-friendly labels for option keys (used in the UI)               */
/* --------------------------------------------------------------------- */

export const labels = {
  windowStyle: {
    casement: "Casement",
    sash: "Sash",
    tiltAndTurn: "Tilt & Turn",
    bay: "Bay",
    bow: "Bow",
    fixed: "Fixed",
  } satisfies Record<WindowStyleKey, string>,

  frameMaterial: {
    upvc: "uPVC",
    aluminium: "Aluminium",
    timber: "Timber",
  } satisfies Record<FrameMaterialKey, string>,

  frameColour: {
    white: "White",
    anthracite: "Anthracite Grey",
    black: "Black",
    rosewood: "Rosewood",
    cream: "Cream",
    custom: "Custom (RAL)",
  } satisfies Record<FrameColourKey, string>,

  glazing: {
    double: "Double Glazed",
    triple: "Triple Glazed",
    acoustic: "Acoustic",
    selfCleaning: "Self-cleaning",
  } satisfies Record<GlazingKey, string>,

  doorType: {
    composite: "Composite",
    upvc: "uPVC",
    bifold: "Aluminium Bi-fold",
    french: "French",
    patio: "Patio (Sliding)",
    stable: "Stable",
  } satisfies Record<DoorTypeKey, string>,

  hardwareFinish: {
    chrome: "Chrome",
    brass: "Brass",
    black: "Matte Black",
    satin: "Satin",
  } satisfies Record<HardwareFinishKey, string>,

  securityLevel: {
    standard: "Standard",
    enhanced: "Enhanced (PAS 24)",
    securedByDesign: "Secured by Design",
  } satisfies Record<SecurityLevelKey, string>,

  conservatoryStyle: {
    victorian: "Victorian",
    edwardian: "Edwardian",
    leanTo: "Lean-to",
    pShaped: "P-shaped",
    tShaped: "T-shaped",
    orangery: "Orangery",
    gable: "Gable",
  } satisfies Record<ConservatoryStyleKey, string>,

  roofType: {
    glass: "Glass",
    polycarbonate: "Polycarbonate",
    solid: "Solid (Tiled)",
    hybrid: "Hybrid",
  } satisfies Record<RoofTypeKey, string>,
} as const;
