"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DialogClose } from "@/components/ui/dialog";

const searchSchema = z.object({
  fechaDesde: z.string().optional(),
  fechaHasta: z.string().optional(),
  concepto: z.string().optional(),
  importeDesde: z.string().optional(),
  importeHasta: z.string().optional(),
  numero: z.string().optional(),
});

interface SearchFacturaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSearch: () => void;
}

export function SearchFacturaDialog({
  open,
  onOpenChange,
  onSearch,
}: SearchFacturaDialogProps) {
  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      fechaDesde: "",
      fechaHasta: "",
      concepto: "",
      importeDesde: "",
      importeHasta: "",
      numero: "",
    },
  });

  function onSubmit(values: z.infer<typeof searchSchema>) {
    // Aquí implementaremos la lógica de búsqueda
    onSearch();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Buscar Facturas</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fechaDesde"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha desde</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="fechaHasta"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha hasta</FormLabel>
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="numero"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Número</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="importeDesde"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Importe desde</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="importeHasta"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Importe hasta</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-2">
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit">Buscar</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 