"use client";
// ... existing imports ...

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Apunte } from "@/lib/actions/apunte";
import { ApunteForm } from "./apunte-form";

interface EditApunteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  apunte: Apunte;
  onEdit?: () => void;
}

export function EditApunteDialog({
  isOpen,
  onClose,
  apunte,
  onEdit,
}: EditApunteDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Editar Asiento</DialogTitle>
        </DialogHeader>
        <ApunteForm
          companyId={apunte.companyId}
          exerciseYear={apunte.exerciseYear}
          initialData={apunte}
          onSuccess={() => {
            onEdit?.();
            onClose();
          }}
        />
      </DialogContent>
    </Dialog>
  );
} 