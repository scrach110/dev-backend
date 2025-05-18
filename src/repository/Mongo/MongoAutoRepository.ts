import Auto from '../../interfaces/Auto';
import { IAutoRepository } from '../IAutoRepository';
import { MongoConection } from '../../mongo/MongoConection';
import Persona from '../../interfaces/Persona';

export class MongoAutoRepository implements IAutoRepository {
    async findById(id: string): Promise<Auto[] | undefined> {
        const conection = await MongoConection();

        const autos = await conection.collection<Auto>('autos').find({ idPersona: id }).toArray();

        return autos;
    }
    async findByIdAuto(id: string): Promise<Auto | undefined> {
        const conection = await MongoConection();
        try {
            const auto = conection.collection<Auto>('autos').findOne({ _id: id }) as Promise<Auto>;
            return auto;
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }

    async findAll(): Promise<Auto[]> {
        const conection = await MongoConection();
        const autos = conection.collection<Auto>('autos').find().toArray() as Promise<Auto[]>;
        return autos;
    }
    async save(auto: Auto): Promise<Auto | null> {
        const conection = await MongoConection();
        await conection.collection<Persona>('personas').updateOne({ _id: auto.idPersona }, { $push: { autos: auto } });

        return auto;
    }
    async update(id: string, cambios: Partial<Auto>): Promise<Auto | null> {
        const conection = await MongoConection();
        const auto = await conection.collection<Auto>('autos').findOne({ _id: id });

        if (!auto) {
            return null;
        }

        if (
            (cambios.año && typeof cambios.año !== 'number') ||
            (cambios.color && typeof cambios.color !== 'string') ||
            (cambios.marca && typeof cambios.marca !== 'string') ||
            (cambios.modelo && typeof cambios.modelo !== 'string') ||
            (cambios.motor && typeof cambios.motor !== 'string') ||
            (cambios.numeroDeChasis && typeof cambios.numeroDeChasis !== 'string') ||
            (cambios.patente && typeof cambios.patente !== 'string')
        ) {
            return null;
        }

        const autoEdit: Auto = {
            ...auto,
            año: cambios.año ?? auto.año,
            color: cambios.color ?? auto.color,
            marca: cambios.marca ?? auto.marca,
            modelo: cambios.modelo ?? auto.modelo,
            motor: cambios.motor ?? auto.motor,
            numeroDeChasis: cambios.numeroDeChasis ?? auto.numeroDeChasis,
            patente: cambios.patente ?? auto.patente
        };

        await conection.collection<Auto>('autos').updateOne({ _id: id }, { $set: autoEdit });

        return autoEdit;
    }
    async delete(id: string): Promise<boolean> {
        const conection = await MongoConection();
        const result = await conection.collection<Auto>('autos').deleteOne({ _id: id });

        return result.deletedCount === 1;
    }
}
