'use server';
import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";

export interface Apunte {
  _id?: ObjectId;
  companyId: string;
  exerciseYear: string;
  asiento: number;
  apunte: number;
  fecha: string;
  concepto: string;
  cuentaDebe: string;
  cuentaHaber: string;
  importe: number;
}

export async function getApuntes(companyId: string, exerciseYear: string): Promise<Apunte[]> {
    const client = await clientPromise;
  const db = client.db("contabilidad");
  const apuntes = await db
    .collection("apuntes")
    .find({ companyId, exerciseYear })
    .sort({ asiento: 1, apunte: 1 })
    .toArray();
  return JSON.parse(JSON.stringify(apuntes)) as Apunte[];
}

export async function createApunte(apunte: Omit<Apunte, "_id">): Promise<Apunte> {
  const client = await clientPromise;
  const db = client.db("contabilidad");
  // Convertir el concepto a mayúsculas
  apunte.concepto = apunte.concepto.toUpperCase();
  const result = await db.collection("apuntes").insertOne(apunte);
  return JSON.parse(JSON.stringify({ ...apunte, _id: result.insertedId }));
}

export async function deleteApunte(id: string): Promise<void> {
  const client = await clientPromise;
  const db = client.db("contabilidad");
  await db.collection("apuntes").deleteOne({ _id: new ObjectId(id) });
}

export async function updateApunte(id: string, apunte: Omit<Apunte, "_id">): Promise<Apunte> {
  const client = await clientPromise;
  const db = client.db("contabilidad");
  // Convertir el concepto a mayúsculas
  apunte.concepto = apunte.concepto.toUpperCase();
  await db.collection("apuntes").updateOne(
    { _id: new ObjectId(id) },
    { $set: apunte }
  );
  return JSON.parse(JSON.stringify({ ...apunte, _id: new ObjectId(id) }));
}

export async function getCuentaNombre(codigo: string) {
  const client = await clientPromise;
  const db = client.db("contabilidad");
  const cuenta = await db.collection("cuentas").findOne({ codigo });
  return cuenta?.nombre || codigo;
} 