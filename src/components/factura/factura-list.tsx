"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getFacturas, Factura } from "@/lib/actions/factura";
import { Plus, Search } from "lucide-react";
import { EditFacturaDialog } from "./edit-factura-dialog";
import { SearchFacturaDialog } from "./search-factura-dialog";
import { DeleteFacturaDialog } from "./delete-factura-dialog";

interface FacturaListProps {
  companyId: string;
  exerciseYear: string;
}

export function FacturaList({ companyId, exerciseYear }: FacturaListProps) {
  const [facturas, setFacturas] = useState<Factura[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedFactura, setSelectedFactura] = useState<Factura | null>(null);

  const loadFacturas = async () => {
    const data = await getFacturas(companyId, exerciseYear);
    setFacturas(data);
  };

  useEffect(() => {
    loadFacturas();
  }, [companyId, exerciseYear]);

  const   handleEdit = (factura: Factura) => {
    setSelectedFactura(factura);
    setIsEditOpen(true);
  };

  const handleDelete = (factura: Factura) => {
    setSelectedFactura(factura);
    setIsDeleteOpen(true);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Facturas</h2>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setIsSearchOpen(true)}>
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </Button>
          <Button onClick={() => setIsEditOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Nueva Factura
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Número</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Concepto</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {facturas.map((factura) => (
              <TableRow key={factura._id?.toString()}>
                <TableCell>{factura.numero}</TableCell>
                <TableCell>{new Date(factura.fecha).toLocaleDateString()}</TableCell>
                <TableCell>{factura.concepto}</TableCell>
                
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(factura)}
                    >
                      Editar
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(factura)}
                    >
                      Eliminar
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <SearchFacturaDialog
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        onSearch={loadFacturas}
      />

      <EditFacturaDialog

        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        companyId={companyId}
        exerciseYear={exerciseYear}
        initialData={selectedFactura || undefined}
        onEdit={loadFacturas}
      />

        <DeleteFacturaDialog
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        facturaId={selectedFactura?._id?.toString() || ""}
        onDelete={loadFacturas}
      />
    </div>
  );
}