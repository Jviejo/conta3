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
import { createCompany, updateCompany } from "@/lib/actions/company";
import { useRouter } from "next/navigation";
import { DialogClose } from "@/components/ui/dialog";

const formSchema = z.object({
  nif: z.string().min(1, "El NIF es requerido"),
  nombre: z.string().min(1, "El nombre es requerido"),
});

type CompanyFormValues = z.infer<typeof formSchema>;

interface CompanyFormProps {
  initialData?: {
    id: string;
    nif: string;
    nombre: string;
  };
}

export function CompanyForm({ initialData }: CompanyFormProps) {
  const router = useRouter();
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      nif: "",
      nombre: "",
    },
  });

  async function onSubmit(values: CompanyFormValues) {
    if (initialData) {
      const formData = new FormData();
      formData.append("id", initialData.id.toString());
      formData.append("nif", values.nif);
      formData.append("nombre", values.nombre);
      await updateCompany(formData);
    } else {
      const formData = new FormData();
      formData.append("nif", values.nif);
      formData.append("nombre", values.nombre);
      await createCompany(formData);
    }
    router.refresh();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nif"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NIF</FormLabel>
              <FormControl>
                <Input placeholder="B12345678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nombre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de la empresa" {...field} />
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
            {initialData ? "Actualizar" : "Crear"} Empresa
          </Button>
        </div>
      </form>
    </Form>
  );
}
