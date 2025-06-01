import Persona from '../../interfaces/Persona';
import { IRepository } from '../IRepository';
import { MongoConection } from '../../mongo/MongoConection';

export class MongoPersonaRepository implements IRepository<Persona> {
    async findAll(): Promise<Persona[]> {
        const collection = await MongoConection();
        return collection.collection<Persona>('personas').find().toArray() as Promise<Persona[]>;
    }
    async findById(id: string): Promise<Persona> {
        const collection = await MongoConection();
        const persona = await collection.collection<Persona>('personas').findOne({ _id: id });

        return persona as Persona;
    }
    async save(persona: Persona): Promise<Persona> {
        const collection = await MongoConection();
        collection.collection<Persona>('personas').insertOne(persona);
        return persona;
    }

    async update(id: string, cambios: Partial<Persona>): Promise<Persona | null> {
        const collection = await MongoConection();
        await collection.collection<Persona>('personas').updateOne({ _id: id }, { $set: cambios });
        //temporal
        return (await this.findById(id)) as Persona;
    }

    async delete(id: string): Promise<boolean> {
        const collection = await MongoConection();
        const result = await collection.collection<Persona>('personas').deleteOne({ _id: id });
        return result.deletedCount === 1;
    }
}
