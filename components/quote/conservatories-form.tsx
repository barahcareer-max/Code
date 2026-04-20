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
  conservatorySchema,
  type ConservatoryFormValues,
} from "@/lib/quote-schema";

type Props = {
  initial: ConservatoryFormValues;
  onChange: (values: ConservatoryFormValues, valid: boolean) => void;
};

export function ConservatoriesForm({ initial, onChange }: Props) {
  const form = useForm<ConservatoryFormValues>({
    resolver: zodResolver(conservatorySchema),
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
    onChange(values as ConservatoryFormValues, isValid);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(values), isValid]);

  return (
    <form className="grid gap-5" onSubmit={(e) => e.preventDefault()}>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Width (m)" error={errors.widthM?.message} hint="External width">
          <Input type="number" step={0.1} min={1} max={15} {...register("widthM", { valueAsNumber: true })} />
        </Field>
        <Field label="Projection (m)" error={errors.projectionM?.message} hint="Depth from the house">
          <Input type="number" step={0.1} min={1} max={15} {...register("projectionM", { valueAsNumber: true })} />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="style"
          render={({ field }) => (
            <Field label="Style" error={errors.style?.message}>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(labels.conservatoryStyle).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />
        <Controller
          control={control}
          name="roof"
          render={({ field }) => (
            <Field label="Roof type" error={errors.roof?.message}>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(labels.roofType).map(([k, v]) => (
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
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="dwarfWall"
          render={({ field }) => (
            <SwitchRow label="Dwarf wall" description="Masonry half-wall base">
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </SwitchRow>
          )}
        />
        <Controller
          control={control}
          name="frenchDoors"
          render={({ field }) => (
            <SwitchRow label="French doors" description="Built-in garden doors">
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </SwitchRow>
          )}
        />
        <Controller
          control={control}
          name="underfloorHeating"
          render={({ field }) => (
            <SwitchRow label="Underfloor heating" description="Electric mat system">
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </SwitchRow>
          )}
        />
        <Controller
          control={control}
          name="buildingRegs"
          render={({ field }) => (
            <SwitchRow
              label="Building regs handling"
              description="We'll manage LABC submission"
            >
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </SwitchRow>
          )}
        />
      </div>
    </form>
  );
}
