'use server';
import { ObjectId } from "mongodb";
import clientPromise from "../mongodb";

export interface Nivel {
  _id?: ObjectId;
  companyId: string;
  exerciseYear: string;
  codigo: string;
  nombre: string;
}

export async function createNivel(nivel: Omit<Nivel, "_id">) {
  const client = await clientPromise;
  const db = client.db("contabilidad");
  const result = await db.collection("niveles").insertOne(nivel);
  return JSON.parse(JSON.stringify(result.insertedId));
}

export async function getNiveles(companyId: string, exerciseYear: string) {
  const client = await clientPromise;
  const db = client.db("contabilidad");
  const niveles = await db
    .collection("niveles")
    .find({ companyId, exerciseYear })
    .toArray();
  return niveles;
}

export async function deleteNivel(formData: FormData) {
  const id = formData.get("id") as string;
  if (!id) {
    return;
  }

  const client = await clientPromise;
  const db = client.db("contabilidad");
  await db.collection("niveles").deleteOne({ _id: new ObjectId(id) });
}

export async function deleteAllNiveles(companyId: string, exerciseYear: string) {
  const client = await clientPromise;
  const db = client.db("contabilidad");
  await db.collection("niveles").deleteMany({ companyId, exerciseYear });
} 