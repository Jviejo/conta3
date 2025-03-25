import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CuentaForm } from "./cuenta-form";

interface NewCuentaDialogProps {
  companyId: string;
  exerciseYear: string;
}

export function NewCuentaDialog({ companyId, exerciseYear }: NewCuentaDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Nueva Cuenta</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Nueva Cuenta</DialogTitle>
        </DialogHeader>
        <CuentaForm companyId={companyId} exerciseYear={exerciseYear} />
      </DialogContent>
    </Dialog>
  );
} 