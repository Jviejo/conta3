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
import { deleteApunte } from "@/lib/actions/apunte";
import { useRouter } from "next/navigation";

interface DeleteApunteDialogProps {
  isOpen: boolean;
  onClose: () => void;
  apunteId: string;
  onDelete?: () => void;
}

export function DeleteApunteDialog({
  isOpen,
  onClose,
  apunteId,
  onDelete,
}: DeleteApunteDialogProps) {
  const router = useRouter();

  async function handleDelete() {
    await deleteApunte(apunteId);
    router.refresh();
    onDelete?.();
    onClose();
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Se eliminará permanentemente el asiento.
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