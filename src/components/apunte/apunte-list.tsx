"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { PencilIcon, TrashIcon, SearchIcon } from "lucide-react";
import { getApuntes, getCuentaNombre, Apunte } from "@/lib/actions/apunte";
import { EditApunteDialog } from "./edit-apunte-dialog";
import { DeleteApunteDialog } from "./delete-apunte-dialog";
import { SearchApunteDialog } from "./search-apunte-dialog";

interface ApunteListProps {
  companyId: string;
  exerciseYear: number;
}

export function ApunteList({ companyId, exerciseYear }: ApunteListProps) {
  const [apuntes, setApuntes] = useState<Apunte[]>([]);
  const [editingApunte, setEditingApunte] = useState<Apunte | null>(null);
  const [deletingApunteId, setDeletingApunteId] = useState<string | null>(null);
  const [cuentaNombres, setCuentaNombres] = useState<Record<string, string>>({});
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchFilters, setSearchFilters] = useState<Record<string, string>>({});

  async function loadApuntes() {
    const apuntesData = await getApuntes(companyId, exerciseYear.toString());
    setApuntes(apuntesData);
    
    // Cargar nombres de cuentas
    const nombres: Record<string, string> = {};
    for (const apunte of apuntesData) {
      if (apunte.cuentaDebe) {
        nombres[apunte.cuentaDebe] = await getCuentaNombre(apunte.cuentaDebe);
      }
      if (apunte.cuentaHaber) {
        nombres[apunte.cuentaHaber] = await getCuentaNombre(apunte.cuentaHaber);
      }
    }
    setCuentaNombres(nombres);
  }

  useEffect(() => {
    loadApuntes();
  }, [companyId, exerciseYear]);

  function handleSearch(filters: Record<string, string>) {
    setSearchFilters(filters);
    // Aquí implementaremos la lógica de filtrado cuando tengamos la API
    loadApuntes();
  }

  const filteredApuntes = apuntes.filter((apunte) => {
    if (searchFilters.fechaDesde && new Date(apunte.fecha) < new Date(searchFilters.fechaDesde)) {
      return false;
    }
    if (searchFilters.fechaHasta && new Date(apunte.fecha) > new Date(searchFilters.fechaHasta)) {
      return false;
    }
    if (searchFilters.concepto && !apunte.concepto
      .toLowerCase().includes(searchFilters.concepto.toLowerCase())) {
      return false;
    }
    if (searchFilters.importeDesde && apunte.importe < parseFloat(searchFilters.importeDesde)) {
      return false;
    }
    if (searchFilters.importeHasta && apunte.importe > parseFloat(searchFilters.importeHasta)) {
      return false;
    }
    if (searchFilters.cuenta && apunte.cuentaDebe !== searchFilters.cuenta 
      && apunte.cuentaHaber !== searchFilters.cuenta) {
      return false;
    }
    if (searchFilters.asiento && apunte.asiento.toString() !== searchFilters.asiento) {
      return false;
    }
    if (searchFilters.apunte && apunte.apunte.toString() !== searchFilters.apunte) {
      return false;
    }
    return true;
  });

  return (
    <>
      <div className="mb-4 flex flex-col gap-4">
        <div className="flex justify-end">
          <Button onClick={() => setIsSearchOpen(true)}>
            <SearchIcon className="mr-2 h-4 w-4" />
            Buscar
          </Button>
        </div>

        {Object.keys(searchFilters).length > 0 && (
          <div className="rounded-md border p-4">
            <div className="mb-2 text-sm font-medium">Filtros activos:</div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(searchFilters).map(([key, value]) => {
                if (!value) {
                  return null;
                }
                
                let label = "";
                switch (key) {
                  case "fechaDesde":
                    label = "Fecha desde";
                    break;
                  case "fechaHasta":
                    label = "Fecha hasta";
                    break;
                  case "concepto":
                    label = "Concepto";
                    break;
                  case "importeDesde":
                    label = "Importe desde";
                    break;
                  case "importeHasta":
                    label = "Importe hasta";
                    break;
                  case "cuenta":
                    label = "Cuenta";
                    break;
                  case "asiento":
                    label = "Asiento";
                    break;
                  case "apunte":
                    label = "Apunte";
                    break;
                }

                let displayValue = value;
                if (key === "fechaDesde" || key === "fechaHasta") {
                  displayValue = new Date(value).toLocaleDateString();
                } else if (key === "importeDesde" || key === "importeHasta") {
                  displayValue = parseFloat(value).toLocaleString("es-ES", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  });
                }

                return (
                  <div
                    key={key}
                    className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm"
                  >
                    <span className="font-medium">{label}:</span>
                    <span>{displayValue}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-4 w-4 p-0"
                      onClick={() => {
                        const newFilters = { ...searchFilters };
                        delete newFilters[key];
                        setSearchFilters(newFilters);
                      }}
                    >
                      ×
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Asiento</TableHead>
              <TableHead>Fecha</TableHead>
              <TableHead>Concepto</TableHead>
              <TableHead>Cuenta Debe</TableHead>
              <TableHead>Cuenta Haber</TableHead>
              <TableHead className="text-right">Importe</TableHead>
              <TableHead>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredApuntes.map((apunte: Apunte) => (
              <TableRow key={apunte._id?.toString()}>
                <TableCell className="font-mono">{apunte.asiento}:{apunte.apunte}</TableCell>
                <TableCell>{new Date(apunte.fecha).toLocaleDateString()}</TableCell>
                <TableCell>{apunte.concepto}</TableCell>
                <TableCell>
                  {apunte.cuentaDebe && (
                    <div>
                      <div className="font-mono">{apunte.cuentaDebe}</div>
                      <div className="text-sm text-muted-foreground">
                        {cuentaNombres[apunte.cuentaDebe]}
                      </div>
                    </div>
                  )}
                </TableCell>
                <TableCell>
                  {apunte.cuentaHaber && (
                    <div>
                      <div className="font-mono">{apunte.cuentaHaber}</div>
                      <div className="text-sm text-muted-foreground">
                        {cuentaNombres[apunte.cuentaHaber]}
                      </div>
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {apunte.importe.toLocaleString("es-ES", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </TableCell>
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
          onEdit={loadApuntes}
        />
      )}

      {deletingApunteId && (
        <DeleteApunteDialog
          isOpen={!!deletingApunteId}
          onClose={() => setDeletingApunteId(null)}
          apunteId={deletingApunteId}
          onDelete={loadApuntes}
        />
      )}

      <SearchApunteDialog
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSearch={handleSearch}
      />
    </>
  );
} 