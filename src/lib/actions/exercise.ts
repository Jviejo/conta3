'use server';
import { revalidatePath } from 'next/cache';
import clientPromise from '../mongodb';
import { ObjectId } from 'mongodb';

export async function deleteExercise(formData: FormData) {
  const companyId = formData.get('companyId');
  const year = formData.get('year');
  
  try {
    const client = await clientPromise;
    const db = client.db("contabilidad");
    const collection = db.collection("ejercicios");
    
    await collection.deleteOne({
      id_empresa: new ObjectId(companyId as string),
      year: parseInt(year as string),
    });
    
    revalidatePath(`/dashboard/companies/${companyId}`);
  } catch (error) {
    
    throw new Error('Failed to delete exercise');
  }
}

export async function createExercise(formData: FormData) {
  const companyId = formData.get('companyId');
  const year = formData.get('year');
  const ultimo_asiento = parseInt(formData.get('ultimo_asiento') as string);
  const ultima_factura_emitida = parseInt(formData.get('ultima_factura_emitida') as string);
  const ultima_factura_recibida = parseInt(formData.get('ultima_factura_recibida') as string);
  const suma_debe = parseInt(formData.get('suma_debe') as string);
  const suma_haber = parseInt(formData.get('suma_haber') as string);
  
  try {
    const client = await clientPromise;
    const db = client.db("contabilidad");
    const collection = db.collection("ejercicios");
    
    const result = await collection.insertOne({
      id_empresa: new ObjectId(companyId as string),
      year: parseInt(year as string),
      ultimo_asiento,
      ultima_factura_emitida,
      ultima_factura_recibida,
      suma_debe,
      suma_haber,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    
    revalidatePath(`/dashboard/companies/${companyId}`);
    return JSON.parse(JSON.stringify(result.insertedId));
  } catch (error) {
    console.error('Error creating exercise:', error);
    throw new Error('Failed to create exercise');
  }
}

export async function updateExercise(formData: FormData) {
  const companyId = formData.get('companyId');
  const year = formData.get('year');
  const ultimo_asiento = parseInt(formData.get('ultimo_asiento') as string);
  const ultima_factura_emitida = parseInt(formData.get('ultima_factura_emitida') as string);
  const ultima_factura_recibida = parseInt(formData.get('ultima_factura_recibida') as string);
  const suma_debe = parseInt(formData.get('suma_debe') as string);
  const suma_haber = parseInt(formData.get('suma_haber') as string);
  
  try {
    const client = await clientPromise;
    const db = client.db("contabilidad");
    const collection = db.collection("ejercicios");
    
    await collection.updateOne(
      {
        id_empresa: new ObjectId(companyId as string),
        year: parseInt(year as string),
      },
      {
        $set: {
          ultimo_asiento,
          ultima_factura_emitida,
          ultima_factura_recibida,
          suma_debe,
          suma_haber,
          updatedAt: new Date(),
        },
      }
    );
    
    revalidatePath(`/dashboard/companies/${companyId}`);
  } catch (error) {
    console.error('Error updating exercise:', error);
    throw new Error('Failed to update exercise');
  }
}

export async function getExercise(companyId: string, year: string) {
  try {
    const client = await clientPromise;
    const db = client.db("contabilidad");
    const collection = db.collection("ejercicios");
    
    const exercise = await collection.findOne({
      id_empresa: new ObjectId(companyId),
      year: parseInt(year),
    });
    
    if (!exercise) {
      throw new Error('Exercise not found');
    }
    
    return {
      year: exercise.year,
      ultimo_asiento: exercise.ultimo_asiento,
      ultima_factura_emitida: exercise.ultima_factura_emitida,
      ultima_factura_recibida: exercise.ultima_factura_recibida,
      suma_debe: exercise.suma_debe,
      suma_haber: exercise.suma_haber,
    };
  } catch (error) {
    console.error('Error getting exercise:', error);
    throw new Error('Failed to get exercise');
  }
}

export async function getExercises(companyId: string) {
  try {
    const client = await clientPromise;
    const db = client.db("contabilidad");
    const collection = db.collection("ejercicios");
    
    const exercises = await collection.find({
      id_empresa: new ObjectId(companyId),
    }).toArray();
    
    return exercises.map(exercise => ({
      year: exercise.year,
      ultimo_asiento: exercise.ultimo_asiento,
      ultima_factura_emitida: exercise.ultima_factura_emitida,
      ultima_factura_recibida: exercise.ultima_factura_recibida,
      suma_debe: exercise.suma_debe,
      suma_haber: exercise.suma_haber,
    }));
  } catch (error) {
    console.error('Error getting exercises:', error);
    throw new Error('Failed to get exercises');
  }
} 