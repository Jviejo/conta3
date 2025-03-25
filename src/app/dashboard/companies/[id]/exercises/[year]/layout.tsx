"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { getExercise } from "@/lib/actions/exercise";
import { getCompany } from "@/lib/actions/company";
import { useParams } from "next/navigation";
interface ExerciseLayoutProps {
  children: React.ReactNode;
  params: {
    id: string;
    year: string;
  };
}

export default function ExerciseLayout({ children}: {children: React.ReactNode}) {
  const params = useParams();
  const id = params.id as string;
  const year = params.year as string;
  const links = [
    { href: "niveles", label: "Niveles" },
    { href: "cuentas", label: "Cuentas" },
    { href: "asientos", label: "Asientos" },
    { href: "facturas", label: "Facturas" },
  ];
 
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-col gap-8">
        <nav className="flex gap-4">
          {links.map((link) => (
            <Link
              key={link.href}
              href={`/dashboard/companies/${params.id}/exercises/${params.year}/${link.href}`}
            >
              <Button variant="outline">{link.label}</Button>
            </Link>

          ))}
        </nav>
        {children}
      </div>
    </div>
  );
} 