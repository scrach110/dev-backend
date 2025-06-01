import { MongoConection } from '../../mongo/MongoConection';
import Auto from '../../interfaces/Auto';
import Persona from '../../interfaces/Persona';
import { IAutoRepository } from '../IAutoRepository';
import AppError from '../../middlewares/AppError';

export class MongoAutoRepository implements IAutoRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findById(id: string): Promise<Auto> {
        throw new Error('Method not implemented.');
    }
    async findByIdPersona(idPersona: string): Promise<Auto[]> {
        const db = await MongoConection();
        const persona = await db.collection<Persona>('personas').findOne({ _id: idPersona });
        return persona?.autos as Auto[];
    }

    async findByIdAuto(idAuto: string): Promise<Auto | undefined> {
        const db = await MongoConection();
        const persona = await db.collection<Persona>('personas').findOne({ 'autos._id': idAuto });

        return persona?.autos.find((a) => a._id === idAuto);
    }

    async findAll(): Promise<Auto[]> {
        const db = await MongoConection();
        const personas = await db.collection<Persona>('personas').find().toArray();

        const autos = personas.flatMap((p) => p.autos || []);
        return autos;
    }

    async save(auto: Auto): Promise<Auto> {
        const db = await MongoConection();
        const result = await db
            .collection<Persona>('personas')
            .updateOne({ _id: auto.idPersona }, { $push: { autos: auto } });
        if (result.modifiedCount !== 1) {
            throw new AppError('No se pudo guardar el auto', 404);
        }
        return auto;
    }

    async update(idAuto: string, cambios: Partial<Auto>): Promise<Auto | null> {
        const db = await MongoConection();
        const persona = await db.collection<Persona>('personas').findOne({ 'autos._id': idAuto });

        if (!persona) {
            throw new AppError('La persona no existe', 404);
        }

        const autoIndex = persona.autos.findIndex((a) => a._id === idAuto);
        if (autoIndex === -1) {
            throw new AppError('El auto no existe', 404);
        }

        const autoActual = persona.autos[autoIndex];
        const autoEditado: Auto = {
            ...autoActual,
            marca: cambios.marca ?? autoActual.marca,
            modelo: cambios.modelo ?? autoActual.modelo,
            año: cambios.año ?? autoActual.año,
            patente: cambios.patente ?? autoActual.patente,
            color: cambios.color ?? autoActual.color,
            numeroDeChasis: cambios.numeroDeChasis ?? autoActual.numeroDeChasis,
            motor: cambios.motor ?? autoActual.motor
        };

        const updateKey = `autos.${autoIndex}`;
        const result = await db
            .collection<Persona>('personas')
            .updateOne({ _id: persona._id }, { $set: { [updateKey]: autoEditado } });

        return result.modifiedCount === 1 ? autoEditado : null;
    }

    async delete(idAuto: string): Promise<boolean> {
        const db = await MongoConection();
        const result = await db
            .collection<Persona>('personas')
            .updateOne({ 'autos._id': idAuto }, { $pull: { autos: { _id: idAuto } } });

        return result.modifiedCount === 1;
    }
}
