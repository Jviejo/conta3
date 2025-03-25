'use server';

import { revalidatePath } from 'next/cache';
import clientPromise from '../mongodb';
import { ObjectId } from 'mongodb';

export async function deleteCompany(formData: FormData) {
  const id = formData.get('id');
  
  try {
    const client = await clientPromise;
    const db = client.db("contabilidad");
    const collection = db.collection("empresas");
    
    await collection.deleteOne({ _id: new ObjectId(id as string) });
    revalidatePath('/dashboard');
  } catch (error) {
    console.error('Error deleting company:', error);
    throw new Error('Failed to delete company');
  }
}

export async function createCompany(formData: FormData) {
  const nif = formData.get('nif') as string;
  const nombre = formData.get('nombre') as string;
  
  try {
    const client = await clientPromise;
    const db = client.db("contabilidad");
    const collection = db.collection("empresas");
    
    const result = await collection.insertOne({
      nif,
      nombre,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    revalidatePath('/dashboard');
    return JSON.parse(JSON.stringify(result.insertedId));
  } catch (error) {
    console.error('Error creating company:', error);
    throw new Error('Failed to create company');
  }
}

export async function updateCompany(formData: FormData) {
  const id = formData.get('id');
  const nif = formData.get('nif') as string;
  const nombre = formData.get('nombre') as string;
  
  try {
    const client = await clientPromise;
    const db = client.db("contabilidad");
    const collection = db.collection("empresas");
    
    await collection.updateOne(
      { _id: new ObjectId(id as string) },
      {
        $set: {
          nif,
          nombre,
          updatedAt: new Date(),
        },
      }
    );
    
    revalidatePath('/dashboard');
  } catch (error) {
    console.error('Error updating company:', error);
    throw new Error('Failed to update company');
  }
}

export async function getCompany(id: string) {
  try {
    const client = await clientPromise;
    const db = client.db("contabilidad");
    const collection = db.collection("empresas");
    
    const company = await collection.findOne({ _id: new ObjectId(id) });
    if (!company) {
      throw new Error('Company not found');
    }
    
    return {
      id: company._id.toString(),
      nif: company.nif,
      nombre: company.nombre,
    };
  } catch (error) {
    console.error('Error getting company:', error);
    throw new Error('Failed to get company');
  }
}

export async function getCompanies() {
  try {
    const client = await clientPromise;
    const db = client.db("contabilidad");
    const collection = db.collection("empresas");
    
    const companies = await collection.find({}).toArray();
    return companies.map(company => ({
      id: company._id.toString(),
      nif: company.nif,
      nombre: company.nombre,
    }));
  } catch (error) {
    console.error('Error getting companies:', error);
    throw new Error('Failed to get companies');
  }
} 