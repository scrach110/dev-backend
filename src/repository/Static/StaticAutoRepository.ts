import Auto from '../../interfaces/Auto';
import { listaPersonas } from './listaPersonas';
import { IAutoRepository } from '../IAutoRepository';
import AppError from '../../middlewares/AppError';

export class StaticAutoRepository implements IAutoRepository {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    findById(id: string): Promise<Auto> {
        throw new Error('Method not implemented.');
    }
    async findAll(): Promise<Auto[]> {
        return listaPersonas.flatMap((p) => p.autos);
    }
    async findByIdPersona(id: string): Promise<Auto[]> {
        const persona = listaPersonas.find((p) => p._id === id);

        if (!persona) {
            throw new AppError('La persona no existe', 404);
        }

        return persona.autos;
    }

    async findByIdAuto(id: string): Promise<Auto> {
        const personaAuto = listaPersonas.find((persona) => persona.autos.some((auto) => auto._id === id));
        const auto = personaAuto?.autos.find((auto) => auto._id === id);
        return auto as Auto;
    }

    async save(auto: Auto): Promise<Auto> {
        const persona = listaPersonas.find((p) => p._id === auto.idPersona);
        if (!persona) {
            throw new AppError('La persona no existe', 404);
        }
        persona.autos.push(auto);

        return auto;
    }

    async update(id: string, cambios: Partial<Auto>): Promise<Auto> {
        const persona = listaPersonas.find((p) => p.autos.find((a) => a._id === id));
        if (!persona) {
            throw new AppError('La persona no existe', 404);
        }
        const auto = persona.autos.find((a) => a._id === id);
        if (!auto) {
            throw new AppError('El auto no existe', 404);
        }

        const autoEdit: Partial<Auto> = cambios;

        auto.marca = autoEdit.marca ?? auto.marca;
        auto.modelo = autoEdit.modelo ?? auto.modelo;
        auto.año = autoEdit.año ?? auto.año;
        auto.patente = autoEdit.patente ?? auto.patente;
        auto.color = autoEdit.color ?? auto.color;
        auto.numeroDeChasis = autoEdit.numeroDeChasis ?? auto.numeroDeChasis;
        auto.motor = autoEdit.motor ?? auto.motor;
        return auto;
    }

    async delete(id: string): Promise<boolean> {
        const persona = listaPersonas.find((p) => p.autos.find((a) => a._id === id));
        if (!persona) {
            return false;
        }
        const eliminadoIndex = persona.autos.findIndex((a) => a._id === id);
        persona.autos.splice(eliminadoIndex, 1);
        return true;
    }
}
