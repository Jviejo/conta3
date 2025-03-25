"use client";
// ... existing imports ...

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Factura } from "@/lib/actions/factura";
import { FacturaForm } from "./factura-form";

interface EditFacturaDialogProps {
  isOpen: boolean;
  onClose: () => void;
  factura: Factura;
  onEdit?: () => void;
}

export function EditFacturaDialog({
  open,
  onOpenChange,
  companyId,
  exerciseYear,
  initialData,
  onEdit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyId: string;
  exerciseYear: string;
  initialData?: Factura;
  onEdit?: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Editar Factura" : "Nueva Factura"}
          </DialogTitle>
        </DialogHeader>
        <FacturaForm
          companyId={companyId}
          exerciseYear={exerciseYear}
          initialData={initialData}
          onSuccess={() => {
            onEdit?.();
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}