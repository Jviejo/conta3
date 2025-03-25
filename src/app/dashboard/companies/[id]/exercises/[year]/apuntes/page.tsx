"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EditApunteDialog } from "@/components/apunte/edit-apunte-dialog";
import { DeleteApunteDialog } from "@/components/apunte/delete-apunte-dialog";
import { NewApunteDialog } from "@/components/apunte/new-apunte-dialog";
import { Apunte, getApuntes } from "@/lib/actions/apunte";



export default function ApuntesPage({
  params,
}: {  
  params: any;
}) {
  const [apuntes, setApuntes] = useState<Apunte[]>([]);
  const [editingApunte, setEditingApunte] = useState<Apunte | null>(null);
  const [deletingApunteId, setDeletingApunteId] = useState<string | null>(null);

  useEffect(() => {
    async function loadApuntes() {
      const apuntesData = await getApuntes(params.id, params.year);
      setApuntes(apuntesData);
    }
    loadApuntes();
  }, [params.id, params.year]);

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Asientos Contables</h1>
        <NewApunteDialog companyId={params.id} exerciseYear={params.year} />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asient1o</TableHead>
              <TableHead>Apunte</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Concepto</TableHead>
              <TableHead>Cuenta Debe</TableHead>
              <TableHead>Cuenta Haber</TableHead>
              <TableHead>Importe</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {apuntes.map((apunte) => (
              <TableRow key={apunte._id?.toString()}>
                <TableCell>{apunte.asiento}</TableCell>
                <TableCell>{apunte.apunte}</TableCell>
                <TableCell>{apunte.fecha}</TableCell>
                <TableCell>{apunte.concepto}</TableCell>
                <TableCell>{apunte.cuentaDebe}</TableCell>
                <TableCell>{apunte.cuentaHaber}</TableCell>
                <TableCell>{apunte.importe}</TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingApunte(apunte)}
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeletingApunteId(apunte._id?.toString() || null)}
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {editingApunte && (
        <EditApunteDialog
          isOpen={!!editingApunte}
          onClose={() => setEditingApunte(null)}
          apunte={editingApunte}
        />
      )}

      {deletingApunteId && (
        <DeleteApunteDialog
          isOpen={!!deletingApunteId}
          onClose={() => setDeletingApunteId(null)}
          apunteId={deletingApunteId}
        />
      )}
    </div>
  );
} 