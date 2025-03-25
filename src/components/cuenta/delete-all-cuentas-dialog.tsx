"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteAllCuentas } from "@/lib/actions/cuenta";
import { useRouter } from "next/navigation";
import { DialogClose } from "@/components/ui/dialog";

interface DeleteAllCuentasDialogProps {
  companyId: string;
  exerciseYear: string;
}

export function DeleteAllCuentasDialog({ companyId, exerciseYear }: DeleteAllCuentasDialogProps) {
  const router = useRouter();

  async function handleDelete() {
    await deleteAllCuentas(companyId, exerciseYear);
    router.refresh();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Borrar Todas las Cuentas</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Borrar todas las cuentas?</DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. Se eliminarán todas las cuentas de este ejercicio.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Borrar Todas
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 