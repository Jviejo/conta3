"use client";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createExercise } from "@/lib/actions/exercise";
import { useRouter } from "next/navigation";
import { DialogClose } from "@/components/ui/dialog";

const formSchema = z.object({
  year: z.string().min(1, "El año es requerido"),
  ultimo_asiento: z.string().min(1, "El último asiento es requerido"),
  ultima_factura_emitida: z.string().min(1, "La última factura emitida es requerida"),
  ultima_factura_recibida: z.string().min(1, "La última factura recibida es requerida"),
  suma_debe: z.string().min(1, "La suma debe es requerida"),
  suma_haber: z.string().min(1, "La suma haber es requerida"),
});

type ExerciseFormValues = z.infer<typeof formSchema>;

interface ExerciseFormProps {
  companyId: string;
}

export function ExerciseForm({ companyId }: ExerciseFormProps) {
  const router = useRouter();
  const form = useForm<ExerciseFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      year: new Date().getFullYear().toString(),
      ultimo_asiento: "0",
      ultima_factura_emitida: "0",
      ultima_factura_recibida: "0",
      suma_debe: "0",
      suma_haber: "0",
    },
  });

  async function onSubmit(values: ExerciseFormValues) {
    const formData = new FormData();
    formData.append("companyId", companyId);
    formData.append("year", values.year);
    formData.append("ultimo_asiento", values.ultimo_asiento);
    formData.append("ultima_factura_emitida", values.ultima_factura_emitida);
    formData.append("ultima_factura_recibida", values.ultima_factura_recibida);
    formData.append("suma_debe", values.suma_debe);
    formData.append("suma_haber", values.suma_haber);
    
    await createExercise(formData);
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="year"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Año</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ultimo_asiento"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Último Asiento</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ultima_factura_emitida"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Última Factura Emitida</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ultima_factura_recibida"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Última Factura Recibida</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="suma_debe"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Suma Debe</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="suma_haber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Suma Haber</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit">
            Crear Ejercicio
          </Button>
        </div>
      </form>
    </Form>
  );
} 