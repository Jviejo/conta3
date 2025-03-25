"use server";
import { ObjectId } from "mongodb";
import { getCollection } from "@/lib/mongodb";

export interface Factura {
  _id?: ObjectId;
  numero: string;
  fecha: string;
  esEmitida: boolean;
  concepto: string;
  tablaCuentas?: { cuentaDebe: string; cuentaHaber: string; importe: number }[];
  tablaIva?: { tipo: string; baseImponible: number; iva: number; importe: number }[];
  companyId: string;
  exerciseYear: string;
}

export async function createFactura(factura: Omit<Factura, "_id">): Promise<Factura> {
  const collection = await getCollection("facturas");
  const result = await collection.insertOne(factura);
  return JSON.parse(JSON.stringify({ ...factura, _id: result.insertedId })) as Factura;
}

export async function updateFactura(id: string, factura: Omit<Factura, "_id">): Promise<Factura> {
  const collection = await getCollection("facturas");
  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: factura }
  );
  return JSON.parse(JSON.stringify({ ...factura, _id: new ObjectId(id) })) as Factura;
}

export async function deleteFactura(id: string): Promise<void> {
  const collection = await getCollection("facturas");
  await collection.deleteOne({ _id: new ObjectId(id) });
}

export async function getFacturas(companyId: string, exerciseYear: string): Promise<Factura[]> {
  const collection = await getCollection("facturas");
  const facturas = await collection.find({ companyId, exerciseYear }).toArray()
  return JSON.parse(JSON.stringify(facturas)) as Factura[];
}

export async function getFactura(id: string): Promise<Factura | null> {
  const collection = await getCollection("facturas");
  const factura = await collection.findOne({ _id: new ObjectId(id) });
  return factura ? JSON.parse(JSON.stringify(factura)) as Factura : null;
} 