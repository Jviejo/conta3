import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { NivelForm } from "./nivel-form";

interface NewNivelDialogProps {
  companyId: string;
  exerciseYear: string;
}

export function NewNivelDialog({ companyId, exerciseYear }: NewNivelDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Nuevo Nivel</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Crear Nuevo Nivel</DialogTitle>
        </DialogHeader>
        <NivelForm companyId={companyId} exerciseYear={exerciseYear} />
      </DialogContent>
    </Dialog>
  );
} 