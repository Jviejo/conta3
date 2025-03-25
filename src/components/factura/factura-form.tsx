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
import { createFactura, updateFactura, Factura } from "@/lib/actions/factura";
import { useRouter } from "next/navigation";
import { DialogClose } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CuentaFormData {
  cuentaDebe: string;
  cuentaHaber: string;
  importe: string;
}

interface IvaFormData {
  tipo: string;
  baseImponible: string;
  iva: string;
  importe: string;
}

interface CuentaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: CuentaFormData) => void;
  initialData?: CuentaFormData;
}

interface IvaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (values: IvaFormData) => void;
  initialData?: IvaFormData;
}

const cuentaSchema = z.object({
  cuentaDebe: z.string().min(1, "La cuenta debe es requerida"),
  cuentaHaber: z.string().min(1, "La cuenta haber es requerida"),
  importe: z.string().min(1, "El importe es requerido"),
});

const ivaSchema = z.object({
  tipo: z.string().min(1, "El tipo es requerido"),
  baseImponible: z.string().min(1, "La base imponible es requerida"),
  iva: z.string().min(1, "El IVA es requerido"),
  importe: z.string().min(1, "El importe es requerido"),
});

const formSchema = z.object({
  numero: z.string().min(1, "El número de factura es requerido"),
  fecha: z.string().min(1, "La fecha es requerida"),
  esEmitida: z.boolean(),
  concepto: z.string().min(1, "El concepto es requerido"),
  tablaCuentas: cuentaSchema.array(),
  tablaIva: ivaSchema.array(),
});

type FormData = z.infer<typeof formSchema>;

function CuentaForm({ open, onOpenChange, onSubmit, initialData }: CuentaDialogProps) {
  const form = useForm<z.infer<typeof cuentaSchema>>({
    resolver: zodResolver(cuentaSchema),
    defaultValues: initialData || {
      cuentaDebe: "",
      cuentaHaber: "",
      importe: "",
    },
  });

  function handleSubmit(values: z.infer<typeof cuentaSchema>) {
    onSubmit(values);
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar Cuenta" : "Nueva Cuenta"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cuentaDebe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuenta Debe</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cuentaHaber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cuenta Haber</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="importe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Importe</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {initialData ? "Actualizar" : "Agregar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function IvaForm({ open, onOpenChange, onSubmit, initialData }: IvaDialogProps) {
  const form = useForm<z.infer<typeof ivaSchema>>({
    resolver: zodResolver(ivaSchema),
    defaultValues: initialData || {
      tipo: "",
      baseImponible: "",
      iva: "",
      importe: "",
    },
  });

  function handleSubmit(values: z.infer<typeof ivaSchema>) {
    onSubmit(values);
    form.reset();
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar IVA" : "Nuevo IVA"}
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="tipo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="baseImponible"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Base Imponible</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="iva"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>IVA (%)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="importe"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Importe</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
              <Button type="submit">
                {initialData ? "Actualizar" : "Agregar"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

interface FacturaFormProps {
  companyId: string;
  exerciseYear: string;
  initialData?: Factura;
  onSuccess?: () => void;
}

export function FacturaForm({
  companyId,
  exerciseYear,
  initialData,
  onSuccess,
}: FacturaFormProps) {
  const router = useRouter();
  const [isCuentaDialogOpen, setIsCuentaDialogOpen] = useState(false);
  const [editingCuentaIndex, setEditingCuentaIndex] = useState<number | null>(null);
  const [isIvaDialogOpen, setIsIvaDialogOpen] = useState(false);
  const [editingIvaIndex, setEditingIvaIndex] = useState<number | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      numero: initialData?.numero || "",
      fecha: initialData?.fecha || new Date().toISOString().split("T")[0],
      esEmitida: initialData?.esEmitida ?? true,
      concepto: initialData?.concepto || "",
      tablaCuentas: initialData?.tablaCuentas?.map(cuenta => ({
        cuentaDebe: cuenta.cuentaDebe,
        cuentaHaber: cuenta.cuentaHaber,
        importe: cuenta.importe.toString(),
      })) || [],
      tablaIva: initialData?.tablaIva?.map(iva => ({
        tipo: iva.tipo,
        baseImponible: iva.baseImponible.toString(),
        iva: iva.iva.toString(),
        importe: iva.importe.toString(),
      })) || [],
    },
  });

  const tablaCuentas = form.watch("tablaCuentas");
  const tablaIva = form.watch("tablaIva");

  function handleAddCuenta(values: z.infer<typeof cuentaSchema>) {
    const currentCuentas = form.getValues("tablaCuentas");
    form.setValue("tablaCuentas", [...currentCuentas, values]);
  }

  function handleEditCuenta(values: z.infer<typeof cuentaSchema>) {
    if (editingCuentaIndex === null) {
      return;
    }
    const currentCuentas = form.getValues("tablaCuentas");
    const newCuentas = [...currentCuentas];
    newCuentas[editingCuentaIndex] = values;
    form.setValue("tablaCuentas", newCuentas);
  }

  function handleRemoveCuenta(index: number) {
    const currentCuentas = form.getValues("tablaCuentas");
    form.setValue(
      "tablaCuentas",
      currentCuentas.filter((_, i) => i !== index)
    );
  }

  function handleAddIva(values: z.infer<typeof ivaSchema>) {
    const currentIva = form.getValues("tablaIva");
    form.setValue("tablaIva", [...currentIva, values]);
  }

  function handleEditIva(values: z.infer<typeof ivaSchema>) {
    if (editingIvaIndex === null) {
      return;
    }
    const currentIva = form.getValues("tablaIva");
    const newIva = [...currentIva];
    newIva[editingIvaIndex] = values;
    form.setValue("tablaIva", newIva);
  }

  function handleRemoveIva(index: number) {
    const currentIva = form.getValues("tablaIva");
    form.setValue(
      "tablaIva",
      currentIva.filter((_, i) => i !== index)
    );
  }

  async function onSubmit(values: FormData) {
    try {
      const facturaData: Omit<Factura, "_id"> = {
        numero: values.numero,
        fecha: values.fecha,
        esEmitida: values.esEmitida,
        concepto: values.concepto,
        tablaCuentas: values.tablaCuentas.map(cuenta => ({
          cuentaDebe: cuenta.cuentaDebe,
          cuentaHaber: cuenta.cuentaHaber,
          importe: parseFloat(cuenta.importe),
        })),
        tablaIva: values.tablaIva.map(iva => ({
          tipo: iva.tipo,
          baseImponible: parseFloat(iva.baseImponible),
          iva: parseFloat(iva.iva),
          importe: parseFloat(iva.importe),
        })),
        companyId,
        exerciseYear,
      };

      if (initialData?._id) {
        await updateFactura(initialData._id.toString(), facturaData);
      } else {
        await createFactura(facturaData);
      }

      router.refresh();
      onSuccess?.();
    } catch (error) {
      console.error("Error saving factura:", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="esEmitida"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
              <div className="space-y-0.5">
                <FormLabel className="text-base">Tipo de Factura</FormLabel>
                <div className="text-sm text-muted-foreground">
                  {field.value ? "Factura Emitida" : "Factura Recibida"}
                </div>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
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
        </div>

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

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Cuentas</h3>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditingCuentaIndex(null);
                setIsCuentaDialogOpen(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar Cuenta
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Cuenta Debe</TableHead>
                  <TableHead>Cuenta Haber</TableHead>
                  <TableHead className="text-right">Importe</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tablaCuentas.map((cuenta, index) => (
                  <TableRow key={index}>
                    <TableCell>{cuenta.cuentaDebe}</TableCell>
                    <TableCell>{cuenta.cuentaHaber}</TableCell>
                    <TableCell className="text-right">
                      {parseFloat(cuenta.importe).toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingCuentaIndex(index);
                            setIsCuentaDialogOpen(true);
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveCuenta(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">IVA</h3>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setEditingIvaIndex(null);
                setIsIvaDialogOpen(true);
              }}
            >
              <Plus className="w-4 h-4 mr-2" />
              Agregar IVA
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Base Imponible</TableHead>
                  <TableHead>IVA (%)</TableHead>
                  <TableHead className="text-right">Importe</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tablaIva.map((iva, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {parseFloat(iva.baseImponible).toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </TableCell>
                    <TableCell>{iva.iva}%</TableCell>
                    <TableCell className="text-right">
                      {parseFloat(iva.importe).toLocaleString("es-ES", {
                        style: "currency",
                        currency: "EUR",
                      })}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setEditingIvaIndex(index);
                            setIsIvaDialogOpen(true);
                          }}
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveIva(index)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="submit">
            {initialData ? "Actualizar" : "Crear"} Factura
          </Button>
        </div>
      </form>

      <CuentaForm
        open={isCuentaDialogOpen}
        onOpenChange={(open) => {
          setIsCuentaDialogOpen(open);
          if (!open && editingCuentaIndex !== null) {
            setEditingCuentaIndex(null);
          }
        }}
        onSubmit={(values) => {
          if (editingCuentaIndex === null) {
            handleAddCuenta(values);
          } else {
            handleEditCuenta(values);
          }
          setEditingCuentaIndex(null);
        }}
        initialData={
          editingCuentaIndex !== null
            ? tablaCuentas[editingCuentaIndex]
            : undefined
        }
      />

      <IvaForm
        open={isIvaDialogOpen}
        onOpenChange={(open) => {
          setIsIvaDialogOpen(open);
          if (!open && editingIvaIndex !== null) {
            setEditingIvaIndex(null);
          }
        }}
        onSubmit={(values) => {
          if (editingIvaIndex === null) {
            handleAddIva(values);
          } else {
            handleEditIva(values);
          }
          setEditingIvaIndex(null);
        }}
        initialData={
          editingIvaIndex !== null
            ? tablaIva[editingIvaIndex]
            : undefined
        }
      />
    </Form>
  );
}
