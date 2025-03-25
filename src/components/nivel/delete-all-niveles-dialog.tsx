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
import { deleteAllNiveles } from "@/lib/actions/nivel";
import { useRouter } from "next/navigation";
import { DialogClose } from "@/components/ui/dialog";

interface DeleteAllNivelesDialogProps {
  companyId: string;
  exerciseYear: string;
}

export function DeleteAllNivelesDialog({ companyId, exerciseYear }: DeleteAllNivelesDialogProps) {
  const router = useRouter();

  async function handleDelete() {
    await deleteAllNiveles(companyId, exerciseYear);
    router.refresh();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive">Borrar Todos los Niveles</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>¿Borrar todos los niveles?</DialogTitle>
          <DialogDescription>
            Esta acción no se puede deshacer. Se eliminarán todos los niveles de este ejercicio.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </DialogClose>
          <Button type="button" variant="destructive" onClick={handleDelete}>
            Borrar Todos
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 