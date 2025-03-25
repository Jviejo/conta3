"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ExerciseForm } from "./exercise-form";
import { Plus } from "lucide-react";

interface NewExerciseDialogProps {
  companyId: string;
}

export function NewExerciseDialog({ companyId }: NewExerciseDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nuevo Ejercicio
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Nuevo Ejercicio</DialogTitle>
        </DialogHeader>
        <ExerciseForm companyId={companyId} />
      </DialogContent>
    </Dialog>
  );
} 