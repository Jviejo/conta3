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
import { createNivel } from "@/lib/actions/nivel";
import { useRouter } from "next/navigation";
import { DialogClose } from "@/components/ui/dialog";

const formSchema = z.object({
  niveles: z.string().min(1, "Debes introducir al menos un nivel"),
});

interface BulkNivelFormProps {
  companyId: string;
  exerciseYear: string;
}

export function BulkNivelForm({ companyId, exerciseYear }: BulkNivelFormProps) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      niveles: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const lineas = values.niveles.split("\n").filter(line => line.trim());
    
    for (const linea of lineas) {
      const [codigo, ...nombreParts] = linea.split(" ");
      const nombre = nombreParts.join(" ");
      
      if (codigo && nombre) {
        await createNivel({
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
          name="niveles"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Niveles (código nombre)</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Introduce un nivel por línea en formato: código nombre&#10;Ejemplo:&#10;1 Activo&#10;2 Pasivo" 
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
          <Button type="submit">Crear Niveles</Button>
        </div>
      </form>
    </Form>
  );
} 