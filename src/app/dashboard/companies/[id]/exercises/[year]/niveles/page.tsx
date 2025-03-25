import { getCompany } from "@/lib/actions/company";
import { getExercise } from "@/lib/actions/exercise";
import { NewNivelDialog } from "@/components/nivel/new-nivel-dialog";
import { BulkNivelDialog } from "@/components/nivel/bulk-nivel-dialog";
import { DeleteAllNivelesDialog } from "@/components/nivel/delete-all-niveles-dialog";
import { NivelList } from "@/components/nivel/nivel-list";


export type NivelesPageProps = Promise<{ id: string, year: string }>;
export default async function NivelesPage(props: { params: NivelesPageProps }) {
  const params = await props.params;
  const id = params.id;
  const exerciseYear = params.year;


  const [company, exercise] = await Promise.all([
    getCompany(id),
    getExercise(id, exerciseYear),
  ]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">
          Niveles - {company.nombre} - Ejercicio {exercise.year}
        </h1>
        <div className="flex gap-2">
          <DeleteAllNivelesDialog companyId={params.id} exerciseYear={params.year} />
          <BulkNivelDialog companyId={params.id} exerciseYear={params.year} />
          <NewNivelDialog companyId={params.id} exerciseYear={params.year} />
        </div>
      </div>
      <NivelList companyId={params.id} exerciseYear={params.year} />
    </div>
  );
} 