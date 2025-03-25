import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BulkNivelForm } from "./bulk-nivel-form";

interface BulkNivelDialogProps {
  companyId: string;
  exerciseYear: string;
}

export function BulkNivelDialog({ companyId, exerciseYear }: BulkNivelDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Añadir Múltiples Niveles</Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Añadir Múltiples Niveles</DialogTitle>
        </DialogHeader>
        <BulkNivelForm companyId={companyId} exerciseYear={exerciseYear} />
      </DialogContent>
    </Dialog>
  );
} 