import type {
  ConservatoryFormValues,
  DoorFormValues,
  TabKey,
  WindowFormValues,
} from "./quote-schema";

/**
 * Flat-param encoding keeps URLs readable and easy to share.
 *   /quote?tab=windows&w.width=1200&w.height=1000&...
 * Booleans are serialised as "1"/"0".
 */

type AnyRecord = Record<string, unknown>;

const PREFIX: Record<TabKey, string> = {
  windows: "w",
  doors: "d",
  conservatories: "c",
};

function encode(obj: AnyRecord, prefix: string): [string, string][] {
  return Object.entries(obj)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => {
      const value = typeof v === "boolean" ? (v ? "1" : "0") : String(v);
      return [`${prefix}.${k}`, value];
    });
}

export function encodeQuoteParams(args: {
  tab: TabKey;
  windows: WindowFormValues;
  doors: DoorFormValues;
  conservatories: ConservatoryFormValues;
}): URLSearchParams {
  const params = new URLSearchParams();
  params.set("tab", args.tab);
  encode(args.windows, PREFIX.windows).forEach(([k, v]) => params.set(k, v));
  encode(args.doors, PREFIX.doors).forEach(([k, v]) => params.set(k, v));
  encode(args.conservatories, PREFIX.conservatories).forEach(([k, v]) =>
    params.set(k, v),
  );
  return params;
}

function decodeSection<T extends AnyRecord>(
  sp: URLSearchParams,
  prefix: string,
  defaults: T,
): T {
  const out: AnyRecord = { ...defaults };
  for (const key of Object.keys(defaults)) {
    const raw = sp.get(`${prefix}.${key}`);
    if (raw === null) continue;
    const def = defaults[key];
    if (typeof def === "boolean") out[key] = raw === "1";
    else if (typeof def === "number") {
      const n = Number(raw);
      if (!Number.isNaN(n)) out[key] = n;
    } else {
      out[key] = raw;
    }
  }
  return out as T;
}

export function decodeQuoteParams(
  sp: URLSearchParams,
  defaults: {
    windows: WindowFormValues;
    doors: DoorFormValues;
    conservatories: ConservatoryFormValues;
  },
): {
  tab: TabKey;
  windows: WindowFormValues;
  doors: DoorFormValues;
  conservatories: ConservatoryFormValues;
} {
  const rawTab = sp.get("tab");
  const tab: TabKey =
    rawTab === "doors" || rawTab === "conservatories" ? rawTab : "windows";
  return {
    tab,
    windows: decodeSection(sp, PREFIX.windows, defaults.windows),
    doors: decodeSection(sp, PREFIX.doors, defaults.doors),
    conservatories: decodeSection(
      sp,
      PREFIX.conservatories,
      defaults.conservatories,
    ),
  };
}
