"use client";

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
import { deleteCuenta, getCuentas, Cuenta } from "@/lib/actions/cuenta";
import { useState, useEffect } from "react";

interface CuentaListProps {
  companyId: string;
  exerciseYear: string;
}

export function CuentaList({ companyId, exerciseYear }: CuentaListProps) {
  const [cuentas, setCuentas] = useState<Cuenta[]>([]);

  useEffect(() => {
    const fetchCuentas = async () => {
      const cuentasData = await getCuentas(companyId, exerciseYear);
      setCuentas(cuentasData);
    };
    fetchCuentas();
  }, [companyId, exerciseYear]);

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
          {cuentas.map((cuenta: Cuenta) => (
            <TableRow key={cuenta._id?.toString()}>
              <TableCell>{cuenta.codigo}</TableCell>
              <TableCell>{cuenta.nombre}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <form action={deleteCuenta}>
                    <input
                      type="hidden"
                      name="id"
                      value={cuenta._id?.toString()}
                    />
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
