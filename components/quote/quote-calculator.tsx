"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { DoorOpen, Home as HomeIcon, RectangleHorizontal } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { WindowsForm } from "./windows-form";
import { DoorsForm } from "./doors-form";
import { ConservatoriesForm } from "./conservatories-form";
import { QuoteSummary } from "./quote-summary";
import {
  windowSpecLines,
  doorSpecLines,
  conservatorySpecLines,
} from "./spec-lines";
import {
  defaultConservatory,
  defaultDoor,
  defaultWindow,
  type ConservatoryFormValues,
  type DoorFormValues,
  type TabKey,
  type WindowFormValues,
} from "@/lib/quote-schema";
import { decodeQuoteParams, encodeQuoteParams } from "@/lib/quote-url";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import {
  quoteConservatory,
  quoteDoors,
  quoteWindows,
  type QuoteResult,
} from "@/lib/pricing-engine";

export function QuoteCalculator() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const initial = useMemo(
    () =>
      decodeQuoteParams(new URLSearchParams(searchParams.toString()), {
        windows: defaultWindow,
        doors: defaultDoor,
        conservatories: defaultConservatory,
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const [tab, setTab] = useState<TabKey>(initial.tab);
  const [windows, setWindows] = useState<WindowFormValues>(initial.windows);
  const [doors, setDoors] = useState<DoorFormValues>(initial.doors);
  const [conservatories, setConservatories] =
    useState<ConservatoryFormValues>(initial.conservatories);
  const [validity, setValidity] = useState({
    windows: true,
    doors: true,
    conservatories: true,
  });

  const debouncedWindows = useDebouncedValue(windows, 200);
  const debouncedDoors = useDebouncedValue(doors, 200);
  const debouncedCons = useDebouncedValue(conservatories, 200);

  const quote: QuoteResult | null = useMemo(() => {
    try {
      if (tab === "windows" && validity.windows) return quoteWindows(debouncedWindows);
      if (tab === "doors" && validity.doors) return quoteDoors(debouncedDoors);
      if (tab === "conservatories" && validity.conservatories)
        return quoteConservatory(debouncedCons);
    } catch {
      return null;
    }
    return null;
  }, [tab, debouncedWindows, debouncedDoors, debouncedCons, validity]);

  // Sync state back to the URL (debounced to avoid noisy history)
  useEffect(() => {
    const params = encodeQuoteParams({
      tab,
      windows: debouncedWindows,
      doors: debouncedDoors,
      conservatories: debouncedCons,
    });
    router.replace(`?${params.toString()}`, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, debouncedWindows, debouncedDoors, debouncedCons]);

  const shareHref =
    typeof window !== "undefined"
      ? `${window.location.origin}/quote?${encodeQuoteParams({
          tab,
          windows,
          doors,
          conservatories,
        }).toString()}`
      : "";

  const product =
    tab === "windows" ? "Windows" : tab === "doors" ? "Doors" : "Conservatories";
  const specLines =
    tab === "windows"
      ? windowSpecLines(windows)
      : tab === "doors"
        ? doorSpecLines(doors)
        : conservatorySpecLines(conservatories);

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
      <Card className="border-navy-100">
        <CardContent className="p-4 sm:p-6">
          <Tabs value={tab} onValueChange={(v) => setTab(v as TabKey)}>
            <TabsList>
              <TabsTrigger value="windows">
                <RectangleHorizontal className="h-4 w-4 mr-2" /> Windows
              </TabsTrigger>
              <TabsTrigger value="doors">
                <DoorOpen className="h-4 w-4 mr-2" /> Doors
              </TabsTrigger>
              <TabsTrigger value="conservatories">
                <HomeIcon className="h-4 w-4 mr-2" /> Conservatories
              </TabsTrigger>
            </TabsList>

            <TabsContent value="windows">
              <WindowsForm
                initial={initial.windows}
                onChange={(v, valid) => {
                  setWindows(v);
                  setValidity((s) => ({ ...s, windows: valid }));
                }}
              />
            </TabsContent>
            <TabsContent value="doors">
              <DoorsForm
                initial={initial.doors}
                onChange={(v, valid) => {
                  setDoors(v);
                  setValidity((s) => ({ ...s, doors: valid }));
                }}
              />
            </TabsContent>
            <TabsContent value="conservatories">
              <ConservatoriesForm
                initial={initial.conservatories}
                onChange={(v, valid) => {
                  setConservatories(v);
                  setValidity((s) => ({ ...s, conservatories: valid }));
                }}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div>
        <QuoteSummary
          product={product}
          specLines={specLines}
          quote={quote}
          shareHref={shareHref}
        />
      </div>
    </div>
  );
}
