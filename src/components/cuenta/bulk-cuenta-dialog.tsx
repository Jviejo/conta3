import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BulkCuentaForm } from "./bulk-cuenta-form";

interface BulkCuentaDialogProps {
  companyId: string;
  exerciseYear: string;
}

export function BulkCuentaDialog({ companyId, exerciseYear }: BulkCuentaDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Añadir Múltiples Cuentas</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Añadir Múltiples Cuentas</DialogTitle>
        </DialogHeader>
        <BulkCuentaForm companyId={companyId} exerciseYear={exerciseYear} />
      </DialogContent>
    </Dialog>
  );
} 