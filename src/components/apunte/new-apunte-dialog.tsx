import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ApunteForm } from "./apunte-form";

interface NewApunteDialogProps {
  companyId: string;
  exerciseYear: string;
}

export function NewApunteDialog({ companyId, exerciseYear }: NewApunteDialogProps) {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button>Nuevo Asiento</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl" >
        <DialogHeader>
          <DialogTitle>Crear Nuevo Asiento</DialogTitle>
        </DialogHeader>
        <ApunteForm companyId={companyId} exerciseYear={exerciseYear} />
      </DialogContent>
    </Dialog>
  );
} 