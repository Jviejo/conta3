

export type ExerciseDashboardPageProps = Promise<{ id: string, year: string }>;
export default async function ExerciseDashboardPage(props: { params: ExerciseDashboardPageProps }) {
  const params = await props.params;
  const id = params.id;
  const exerciseYear = params.year;

  return (
    <div>
      {/* <h1 className="text-3xl font-bold mb-8">
        {company.nombre} - Ejercicio {exercise.year}
      </h1> */}
    </div>
  );
} 