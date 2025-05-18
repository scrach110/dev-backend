import Persona from '../../interfaces/Persona';
import { IRepository } from '../IRepository';
import { MongoConection } from '../../mongo/MongoConection';
import { randomUUID } from 'crypto';
import Genero from '../../interfaces/Genero';

export class MongoPersonaRepository implements IRepository<Persona> {
    async findAll(): Promise<Persona[]> {
        const collection = await MongoConection();
        return collection.collection<Persona>('personas').find().toArray() as Promise<Persona[]>;
    }
    async findById(id: string): Promise<Persona | Persona[] | undefined> {
        const collection = await MongoConection();
        const persona = await collection.collection<Persona>('personas').findOne({ _id: id });

        return persona as Persona;
    }
    async save(persona: Persona): Promise<Persona | null> {
        const { nombre, apellido, dni, fechaDeNacimiento, genero, donanteOrganos, autos } = persona;
        const generosDisponibles = ['masculino', 'femenino', 'no-binario'];

        if (
            typeof nombre !== 'string' ||
            typeof apellido !== 'string' ||
            typeof dni !== 'string' ||
            !generosDisponibles.includes(genero) ||
            !Array.isArray(autos)
        ) {
            return null;
        }
        const fechaNacimientoPersona = new Date(fechaDeNacimiento);
        if (isNaN(fechaNacimientoPersona.getTime())) {
            return null;
        }
        try {
            const personaCrear: Persona = {
                _id: randomUUID(),
                nombre,
                apellido,
                dni,
                fechaDeNacimiento: fechaNacimientoPersona,
                genero: genero as Genero,
                donanteOrganos,
                autos
            };

            const collection = await MongoConection();
            collection.collection<Persona>('personas').insertOne(personaCrear);
            return personaCrear;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async update(id: string, cambios: Partial<Persona>): Promise<Persona | null> {
        const collection = await MongoConection();
        const persona = await collection.collection<Persona>('personas').findOne({ _id: id });

        if (!persona) {
            return null;
        }
        if (
            (cambios.nombre && typeof cambios.nombre !== 'string') ||
            (cambios.apellido && typeof cambios.apellido !== 'string') ||
            (cambios.dni && typeof cambios.dni !== 'string') ||
            (cambios.genero && typeof cambios.genero !== 'string') ||
            (cambios.fechaDeNacimiento && typeof cambios.fechaDeNacimiento !== 'string') ||
            (cambios.donanteOrganos !== undefined && typeof cambios.donanteOrganos !== 'boolean') ||
            (cambios.autos && !Array.isArray(cambios.autos))
        ) {
            return null;
        }

        const personaActualizada: Persona = {
            ...persona,
            nombre: cambios.nombre ?? persona.nombre,
            apellido: cambios.apellido ?? persona.apellido,
            dni: cambios.dni ?? persona.dni,
            genero: cambios.genero ?? persona.genero,
            fechaDeNacimiento: cambios.fechaDeNacimiento
                ? new Date(cambios.fechaDeNacimiento)
                : new Date(persona.fechaDeNacimiento),
            donanteOrganos: cambios.donanteOrganos ?? persona.donanteOrganos,
            autos: cambios.autos ?? persona.autos
        };

        await collection.collection<Persona>('personas').updateOne({ _id: id }, { $set: personaActualizada });
        return personaActualizada;
    }

    async delete(id: string): Promise<boolean> {
        const collection = await MongoConection();
        const result = await collection.collection<Persona>('personas').deleteOne({ _id: id });
        return result.deletedCount === 1;
    }
}
