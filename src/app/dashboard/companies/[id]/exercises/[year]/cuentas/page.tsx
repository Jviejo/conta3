"use client";
import { getCompany } from "@/lib/actions/company";
import { getExercise } from "@/lib/actions/exercise";
import { NewCuentaDialog } from "@/components/cuenta/new-cuenta-dialog";
import { BulkCuentaDialog } from "@/components/cuenta/bulk-cuenta-dialog";
import { DeleteAllCuentasDialog } from "@/components/cuenta/delete-all-cuentas-dialog";
import { CuentaList } from "@/components/cuenta/cuenta-list";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function CuentasPage() {
  const params = useParams();
  const id = params.id as string;
  const year = params.year as string;

  const [company, setCompany] = useState<any | null>(null);
  const [exercise, setExercise] = useState<any | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const [company, exercise] = await Promise.all([
        getCompany(id),
        getExercise(id, year),
      ]);
      console.log(company, exercise);
      setCompany(company);
      setExercise(exercise);
    };
    fetchData();
  }, []);

  if (!company || !exercise) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Cuentas - {company.nombre} - Ejercicio {exercise.year}
        </h1>
        <div className="flex gap-2">
          <DeleteAllCuentasDialog
            companyId={company.id}
            exerciseYear={exercise.year}
          />
          <BulkCuentaDialog companyId={company.id} exerciseYear={exercise.year} />
          <NewCuentaDialog companyId={company.id} exerciseYear={exercise.year} />
        </div>
      </div>
      <CuentaList companyId={company.id} exerciseYear={exercise.year} />
    </div>
  );
}
