import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8">Sistema Contable</h1>
      <p className="text-lg mb-8 text-center max-w-2xl">
        Bienvenido al sistema de contabilidad. 
        Gestiona tus empresas y ejercicios contables de manera eficiente.
      </p>
      <Link href="/dashboard">
        <Button size="lg">
          Ir al Dashboard
        </Button>
      </Link>
    </div>
  );
}
