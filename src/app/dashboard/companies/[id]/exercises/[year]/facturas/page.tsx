import { FacturaList } from "@/components/factura/factura-list";
import { getCompanyId } from "@/lib/auth";


export type FacturasPageProps = Promise<{ id: string, year: string }>;
export default async function FacturasPage(props: { params: FacturasPageProps }) {
  const params = await props.params;
  const id = params.id;
  const exerciseYear = params.year;
  return (
    <div className="container mx-auto py-6">
      <FacturaList companyId={id} exerciseYear={exerciseYear} />
    </div>
  );
} 