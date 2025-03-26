'use server';
import { ObjectId } from "mongodb";
import clientPromise from "../mongodb";

export interface Cuenta {
  _id?: ObjectId;
  companyId: string;
  exerciseYear: string;
  codigo: string;
  nombre: string;
}

export async function createCuenta(cuenta: Omit<Cuenta, "_id">) {
  const client = await clientPromise;
  const db = client.db("contabilidad");
  const result = await db.collection("cuentas").insertOne(cuenta);
  return result;
}

export async function getCuentas(companyId: string, exerciseYear: string): Promise<Cuenta[]> {
  const client = await clientPromise;
  const db = client.db("contabilidad");
  const cuentas = await db
    .collection("cuentas")
    .find({ companyId, exerciseYear: parseInt(exerciseYear) })
    .toArray();
  return JSON.parse(JSON.stringify(cuentas)) as Cuenta[];
}

export async function deleteCuenta(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) {
    return;
  }

  const client = await clientPromise;
  const db = client.db("contabilidad");
  await db.collection("cuentas").deleteOne({ _id: new ObjectId(id) });
}

export async function deleteAllCuentas(companyId: string, exerciseYear: string) {
  const client = await clientPromise;
  const db = client.db("contabilidad");
  await db.collection("cuentas").deleteMany({ companyId, exerciseYear });
} 