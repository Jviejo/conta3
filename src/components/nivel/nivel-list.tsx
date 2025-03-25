import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2 } from "lucide-react";
import { deleteNivel, getNiveles } from "@/lib/actions/nivel";

interface NivelListProps {
  companyId: string;
  exerciseYear: string;
}

export async function NivelList({ companyId, exerciseYear }: NivelListProps) {
  const niveles = await getNiveles(companyId, exerciseYear);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Código</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead className="text-right">Acciones</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {niveles.map((nivel) => (
            <TableRow key={nivel._id?.toString()}>
              <TableCell>{nivel.codigo}</TableCell>
              <TableCell>{nivel.nombre}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <form action={deleteNivel}>
                    <input type="hidden" name="id" value={nivel._id?.toString()} />
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