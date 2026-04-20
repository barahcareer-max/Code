"use client";

import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Field, SwitchRow } from "./form-field";
import { labels } from "@/lib/pricing-data";
import {
  windowSchema,
  type WindowFormValues,
} from "@/lib/quote-schema";

type Props = {
  initial: WindowFormValues;
  onChange: (values: WindowFormValues, valid: boolean) => void;
};

export function WindowsForm({ initial, onChange }: Props) {
  const form = useForm<WindowFormValues>({
    resolver: zodResolver(windowSchema),
    defaultValues: initial,
    mode: "onChange",
  });
  const {
    register,
    control,
    watch,
    formState: { errors, isValid },
  } = form;

  const values = watch();
  useEffect(() => {
    onChange(values as WindowFormValues, isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(values), isValid]);

  return (
    <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Width (mm)" error={errors.widthMm?.message}>
          <Input type="number" min={300} max={3000} {...register("widthMm", { valueAsNumber: true })} />
        </Field>
        <Field label="Height (mm)" error={errors.heightMm?.message}>
          <Input type="number" min={300} max={3000} {...register("heightMm", { valueAsNumber: true })} />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="style"
          render={({ field }) => (
            <Field label="Window style" error={errors.style?.message}>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(labels.windowStyle).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          control={control}
          name="material"
          render={({ field }) => (
            <Field label="Frame material" error={errors.material?.message}>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(labels.frameMaterial).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="colour"
          render={({ field }) => (
            <Field label="Frame colour" error={errors.colour?.message}>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(labels.frameColour).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Controller
          control={control}
          name="glazing"
          render={({ field }) => (
            <Field label="Glazing" error={errors.glazing?.message}>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(labels.glazing).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="openingPanes"
          render={({ field }) => (
            <Field label="Opening panes" error={errors.openingPanes?.message}>
              <Select
                value={String(field.value)}
                onValueChange={(v) => field.onChange(Number(v))}
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4].map((n) => (
                    <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        <Field label="Quantity" error={errors.quantity?.message}>
          <Input type="number" min={1} max={99} {...register("quantity", { valueAsNumber: true })} />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="georgianBars"
          render={({ field }) => (
            <SwitchRow
              label="Georgian bars"
              description="Cross-bar detailing between panes"
            >
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </SwitchRow>
          )}
        />
        <Controller
          control={control}
          name="trickleVents"
          render={({ field }) => (
            <SwitchRow
              label="Trickle vents"
              description="Ventilation channel in the frame"
            >
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </SwitchRow>
          )}
        />
      </div>
    </form>
  );
}
