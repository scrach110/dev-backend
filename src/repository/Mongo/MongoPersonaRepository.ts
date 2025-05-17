import Persona from '../../interfaces/Persona';
import { IRepository } from '../IRepository';
import { MongoConection } from '../../mongo/MongoConection';

export class MongoPersonaRepository implements IRepository<Persona> {
    async findAll(): Promise<Persona[]> {
        const collection = await MongoConection('personas');
        return collection.find().toArray() as Promise<Persona[]>;
    }
    async findById(id: string): Promise<Persona | Persona[] | undefined> {
        const collection = await MongoConection('personas');
        const persona = await collection.findOne({ id });

        return persona as Persona;
    }
    save(persona: Persona): Promise<Persona | null> {
        throw new Error('Method not implemented.');
    }
    update(id: string, cambios: Partial<Persona>): Promise<Persona | null> {
        throw new Error('Method not implemented.');
    }
    async delete(id: string): Promise<boolean> {
        const collection = await MongoConection('personas');
        return (await collection.deleteOne({ id })).acknowledged;
    }
}
