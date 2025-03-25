import { cookies } from "next/headers";

export async function getCompanyId(): Promise<string> {
  const cookieStore = await cookies();
  const companyId = cookieStore.get("companyId")?.value;

  if (!companyId) {
    throw new Error("No company ID found");
  }

  return companyId;
} 