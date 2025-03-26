"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createApunte, updateApunte, Apunte } from "@/lib/actions/apunte";
import { useRouter } from "next/navigation";
import { DialogClose } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { getCuentas, Cuenta } from "@/lib/actions/cuenta";

const formSchema = z.object({
  asiento: z.string().min(1, "El número de asiento es requerido"),
  apunte: z.string().min(1, "El número de apunte es requerido"),
  fecha: z.string().min(1, "La fecha es requerida"),
  concepto: z.string().min(1, "El concepto es requerido"),
  cuentaDebe: z.string().optional(),
  cuentaHaber: z.string().optional(),
  importe: z.string().min(1, "El importe es requerido"),
}).refine((data) => {
  // Al menos una cuenta debe estar rellenada
  return data.cuentaDebe || data.cuentaHaber;
}, {
  message: "Debe rellenar al menos una cuenta (debe o haber)",
  path: ["cuentaDebe"],
});

interface ApunteFormProps {
  companyId: string;
  exerciseYear: string;
  initialData?: Apunte;
  onSuccess?: () => void;
}

export function ApunteForm({ companyId, exerciseYear, initialData, onSuccess }: ApunteFormProps) {
  const router = useRouter();
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadCuentas() {
      setIsLoading(true);
      try {
        const cuentasData = await getCuentas(companyId, exerciseYear);
        setCuentas(cuentasData);
      } catch (error) {
        console.error("Error loading cuentas:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadCuentas();
  }, [companyId, exerciseYear]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      asiento: initialData?.asiento.toString() || "",
      apunte: initialData?.apunte.toString() || "",
      fecha: initialData?.fecha || new Date().toISOString().split("T")[0],
      concepto: initialData?.concepto || "",
      cuentaDebe: initialData?.cuentaDebe || "",
      cuentaHaber: initialData?.cuentaHaber || "",
      importe: initialData?.importe.toString() || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const apunteData = {
        asiento: parseInt(values.asiento),
        apunte: parseInt(values.apunte),
        fecha: values.fecha,
        concepto: values.concepto,
        cuentaDebe: values.cuentaDebe || "",
        cuentaHaber: values.cuentaHaber || "",
        importe: parseFloat(values.importe),
        companyId,
        exerciseYear,
      };

      if (initialData?._id) {
        await updateApunte(initialData._id.toString(), apunteData);
      } else {
        await createApunte(apunteData);
      }

      router.refresh();
      onSuccess?.();
    } catch (error) {
      console.error("Error saving apunte:", error);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="asiento"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Asiento</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Número de asiento" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="apunte"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Apunte</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Número de apunte" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="fecha"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Fecha</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="concepto"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Concepto</FormLabel>
              <FormControl>
                <Textarea placeholder="Concepto del asiento" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="cuentaDebe"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cuenta Debe (opcional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una cuenta" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">Sin cuenta</SelectItem>
                    {cuentas.map((cuenta) => (
                      <SelectItem key={cuenta.codigo} value={cuenta.codigo}>
                        {cuenta.codigo} - {cuenta.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cuentaHaber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cuenta Haber (opcional)</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una cuenta" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="none">Sin cuenta</SelectItem>
                    {cuentas.map((cuenta) => (
                      <SelectItem key={cuenta.codigo} value={cuenta.codigo}>
                        {cuenta.codigo} - {cuenta.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="importe"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Importe</FormLabel>
              <FormControl>
                <Input type="number" step="0.01" placeholder="Importe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit">
            {initialData ? "Actualizar Asiento" : "Crear Asiento"}
          </Button>
        </div>
      </form>
    </Form>
  );
} 