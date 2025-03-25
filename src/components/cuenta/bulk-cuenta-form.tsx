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
import { Textarea } from "@/components/ui/textarea";
import { createCuenta } from "@/lib/actions/cuenta";
import { useRouter } from "next/navigation";
import { DialogClose } from "@/components/ui/dialog";

const formSchema = z.object({
  cuentas: z.string().min(1, "Debes introducir al menos una cuenta"),
});

interface BulkCuentaFormProps {
  companyId: string;
  exerciseYear: string;
}

export function BulkCuentaForm({ companyId, exerciseYear }: BulkCuentaFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuentas: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const lineas = values.cuentas.split("\n").filter(line => line.trim());
    
    for (const linea of lineas) {
      const [codigo, ...nombreParts] = linea.split(" ");
      const nombre = nombreParts.join(" ");
      
      if (codigo && nombre) {
        await createCuenta({
          codigo,
          nombre,
          companyId,
          exerciseYear,
        });
      }
    }
    
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="cuentas"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cuentas (código nombre)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Introduce una cuenta por línea en formato: código nombre&#10;Ejemplo:&#10;100 Caja&#10;430 Clientes" 
                  className="min-h-[200px]"
                  {...field} 
                />
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
          <Button type="submit">Crear Cuentas</Button>
        </div>
      </form>
    </Form>
  );
} 