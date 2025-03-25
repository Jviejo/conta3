"use client";
import { NewApunteDialog } from "@/components/apunte/new-apunte-dialog";
import { ApunteList } from "@/components/apunte/apunte-list";
import { useParams } from "next/navigation";

interface AsientosPageProps {
  params: {
    id: string;
    year: string;
  };
}

export default function AsientosPage() {
  const params = useParams();
  const id = params.id as string;
  const exerciseYear = params.year as string;
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Asientos 
        </h1>
        <NewApunteDialog companyId={id} exerciseYear={exerciseYear} />
      </div>
      <ApunteList companyId={id} exerciseYear={parseInt(exerciseYear)} />
    </div>
  );
} 