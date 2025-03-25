import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { Trash2, Plus } from "lucide-react";
import { deleteExercise, getExercises } from "@/lib/actions/exercise";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@radix-ui/react-dialog";
import { NewExerciseDialog } from "./new-exercise-dialog";
import { DialogHeader } from "../ui/dialog";

interface ExerciseListProps {
  companyId: string;
}

export async function ExerciseList({ companyId }: ExerciseListProps) {
  const exercises = await getExercises(companyId);

  return (
    <div className="rounded-md border">
     
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Año</TableHead>
            <TableHead>Último Asiento</TableHead>
            <TableHead>Última Factura Emitida</TableHead>
            <TableHead>Última Factura Recibida</TableHead>
            <TableHead>Suma Debe</TableHead>
            <TableHead>Suma Haber</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exercises.map((exercise) => (
            <TableRow key={exercise.year}>
              <TableCell>
                <Link 
                  href={`/dashboard/companies/${companyId}/exercises/${exercise.year}`}
                  className="text-blue-600 hover:underline"
                >
                  {exercise.year}
                </Link>
              </TableCell>
              <TableCell>{exercise.ultimo_asiento}</TableCell>
              <TableCell>{exercise.ultima_factura_emitida}</TableCell>
              <TableCell>{exercise.ultima_factura_recibida}</TableCell>
              <TableCell>{exercise.suma_debe}</TableCell>
              <TableCell>{exercise.suma_haber}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <form action={deleteExercise}>
                    <input type="hidden" name="companyId" value={companyId} />
                    <input type="hidden" name="year" value={exercise.year} />
                    <Button variant="ghost" size="icon" type="submit">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
} 