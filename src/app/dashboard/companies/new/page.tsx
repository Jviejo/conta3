
import { CompanyForm } from "@/components/company/company-form";

export type NewCompanyPageProps = Promise<{ id: string }>;
export default async function NewCompanyPage(props: { params: NewCompanyPageProps }) {
  const params = await props.params;
  const id = params.id;
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Nueva Empresa</h1>
      <div className="max-w-2xl">
        {/* <CompanyForm  /> */}
      </div>
    </div>
  );
} 