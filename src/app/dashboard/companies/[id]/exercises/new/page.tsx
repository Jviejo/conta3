import { ExerciseForm } from "@/components/exercise/exercise-form";

export type NewExercisePageProps = Promise<{ id: string }>;
export default async function NewExercisePage(props: { params: NewExercisePageProps }) {
  const params = await props.params;
  const id = params.id;
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Nuevo Ejercicio {id}</h1>
      <div className="max-w-2xl">
        <ExerciseForm companyId={params.id} />
      </div>
    </div>
  );
} 