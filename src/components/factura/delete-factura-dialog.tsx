"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { deleteFactura } from "@/lib/actions/factura";
import { useRouter } from "next/navigation";

interface DeleteFacturaDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  facturaId: string;
  onDelete?: () => void;
}

export function DeleteFacturaDialog({
  open,
  onOpenChange,
  facturaId,
  onDelete,
}: DeleteFacturaDialogProps) {
  const router = useRouter();

  async function handleDelete() {
    try {
      await deleteFactura(facturaId);
      router.refresh();
      onDelete?.();
      onOpenChange(false);
    } catch (error) {
      console.error("Error deleting factura:", error);
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente la factura.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Eliminar</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
} 