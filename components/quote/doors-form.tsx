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
import { doorSchema, type DoorFormValues } from "@/lib/quote-schema";

type Props = {
  initial: DoorFormValues;
  onChange: (values: DoorFormValues, valid: boolean) => void;
};

export function DoorsForm({ initial, onChange }: Props) {
  const form = useForm<DoorFormValues>({
    resolver: zodResolver(doorSchema),
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
  const isBifold = values.type === "bifold";

  useEffect(() => {
    onChange(values as DoorFormValues, isValid);
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
          name="type"
          render={({ field }) => (
            <Field label="Door type" error={errors.type?.message}>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(labels.doorType).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />

        {isBifold ? (
          <Controller
            control={control}
            name="bifoldPanels"
            render={({ field }) => (
              <Field
                label="Bi-fold panels"
                error={errors.bifoldPanels?.message}
                hint="2 minimum, 7 maximum"
              >
                <Select
                  value={String(field.value ?? 3)}
                  onValueChange={(v) => field.onChange(Number(v))}
                >
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {[2, 3, 4, 5, 6, 7].map((n) => (
                      <SelectItem key={n} value={String(n)}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>
            )}
          />
        ) : (
          <Field label="Quantity" error={errors.quantity?.message}>
            <Input type="number" min={1} max={99} {...register("quantity", { valueAsNumber: true })} />
          </Field>
        )}
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
          name="hardware"
          render={({ field }) => (
            <Field label="Hardware finish" error={errors.hardware?.message}>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(labels.hardwareFinish).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />
        <Controller
          control={control}
          name="security"
          render={({ field }) => (
            <Field label="Security level" error={errors.security?.message}>
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {Object.entries(labels.securityLevel).map(([k, v]) => (
                    <SelectItem key={k} value={k}>{v}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          )}
        />
      </div>

      {isBifold && (
        <Field label="Quantity" error={errors.quantity?.message}>
          <Input type="number" min={1} max={99} {...register("quantity", { valueAsNumber: true })} />
        </Field>
      )}

      <div className="grid sm:grid-cols-3 gap-4">
        <Controller
          control={control}
          name="letterbox"
          render={({ field }) => (
            <SwitchRow label="Letterbox">
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </SwitchRow>
          )}
        />
        <Controller
          control={control}
          name="spyhole"
          render={({ field }) => (
            <SwitchRow label="Spyhole">
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </SwitchRow>
          )}
        />
        <Controller
          control={control}
          name="knocker"
          render={({ field }) => (
            <SwitchRow label="Knocker">
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            </SwitchRow>
          )}
        />
      </div>
    </form>
  );
}
