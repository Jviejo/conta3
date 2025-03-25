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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { SearchIcon } from "lucide-react";

const searchSchema = z.object({
  fechaDesde: z.string().optional(),
  fechaHasta: z.string().optional(),
  concepto: z.string().optional(),
  importeDesde: z.string().optional(),
  importeHasta: z.string().optional(),
  cuenta: z.string().optional(),
  asiento: z.string().optional(),
  apunte: z.string().optional(),
});

type SearchFormValues = z.infer<typeof searchSchema>;

interface SearchApunteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSearch: (filters: SearchFormValues) => void;
}

export function SearchApunteDialog({
  isOpen,
  onClose,
  onSearch,
}: SearchApunteDialogProps) {
  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      fechaDesde: "",
      fechaHasta: "",
      concepto: "",
      importeDesde: "",
      importeHasta: "",
      cuenta: "",
      asiento: "",
      apunte: "",
    },
  });

  function onSubmit(values: SearchFormValues) {
    onSearch(values);
    onClose();
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Buscar Asientos</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="fechaDesde"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha Desde</FormLabel>
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
                    <FormLabel>Fecha Hasta</FormLabel>
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
                name="cuenta"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cuenta</FormLabel>
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
                    <FormLabel>Importe Desde</FormLabel>
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
                    <FormLabel>Importe Hasta</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="asiento"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Asiento</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                <SearchIcon className="mr-2 h-4 w-4" />
                Buscar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
} 