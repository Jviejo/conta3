import { CompanyList } from "@/components/company/company-list";
import { NewCompanyDialog } from "@/components/company/new-company-dialog";

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <NewCompanyDialog />
      </div>
      <CompanyList />
    </div>
  );
} 