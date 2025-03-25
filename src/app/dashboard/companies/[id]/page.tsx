import { CompanyForm } from "@/components/company/company-form";
import { ExerciseList } from "@/components/exercise/exercise-list";
import { DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { NewExerciseDialog } from "@/components/exercise/new-exercise-dialog";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { getCompany } from "@/lib/actions/company";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

export type CompanyPageProps = Promise<{ id: string }>;
export default async function CompanyPage(props: { params: CompanyPageProps }) {
  const params = await props.params;
  const id = params.id;
  const company = await getCompany(id);

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Empresa: {company.nombre}</h1>
        <NewExerciseDialog companyId={company.id} />
      </div>
      
      <div className="grid grid-cols-1 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Detalles</h2>

          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-gray-500">NIF</h3>
                <p className="text-lg font-medium">{company.nif}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500">Nombre</h3>
                <p className="text-lg font-medium">{company.nombre}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div>
              <div className="flex justify-end">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Pencil className="mr-2 h-4 w-4" />
                      Editar Empresa
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Editar Empresa</DialogTitle>
                    </DialogHeader>
                    <CompanyForm initialData={{
                      id: company.id,
                      nif: company.nif,
                      nombre: company.nombre,
                    }} />
                  </DialogContent>
                </Dialog>
              </div>
              </div>
            </div>
          </div>
          
         
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4">Ejercicios</h2>
          <ExerciseList companyId={company.id} />
        </div>
      </div>
    </div>
  );
} 