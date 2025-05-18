import Auto from '../../interfaces/Auto';
import { listaPersonas } from './listaPersonas';
import { IAutoRepository } from '../IAutoRepository';

export class StaticAutoRepository implements IAutoRepository {
    async findAll(): Promise<Auto[]> {
        return listaPersonas.flatMap((p) => p.autos);
    }
    async findById(id: string): Promise<Auto[] | undefined> {
        try {
            const persona = listaPersonas.find((p) => p._id === id);
            const autos = persona?.autos;
            return autos;
        } catch {
            return undefined;
        }
    }

    async findByIdAuto(id: string): Promise<Auto | undefined> {
        const personaAuto = listaPersonas.find((persona) => persona.autos.some((auto) => auto._id === id));
        const auto = personaAuto?.autos.find((auto) => auto._id === id);
        return auto;
    }

    async save(auto: Auto): Promise<Auto | null> {
        const persona = listaPersonas.find((p) => p._id === auto.idPersona);
        if (!persona) {
            return null;
        }
        persona.autos.push(auto);

        return auto;
    }

    async update(id: string, cambios: Partial<Auto>): Promise<Auto | null> {
        const persona = listaPersonas.find((p) => p.autos.find((a) => a._id === id));
        if (!persona) {
            return null;
        }
        const auto = persona.autos.find((a) => a._id === id);
        if (!auto) {
            return null;
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
