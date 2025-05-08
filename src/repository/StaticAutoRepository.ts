import { randomUUID } from 'crypto';
import Auto from '../interfaces/Auto';
import { IRepository } from './IRepository';
import { listaPersonas } from './listaPersonas';
import { IAutoRepository } from './IAutoRepository';

export class StaticAutoRepository implements IAutoRepository {
    findAll(): Auto[] {
        return listaPersonas.flatMap((p) => p.autos);
    }
    findById(id: string): Auto[] | undefined {
        try {
            const persona = listaPersonas.find((p) => p.id === id);
            const autos = persona?.autos;
            return autos;
        } catch {
            return undefined;
        }
    }

    findByIdAuto(id: string): Auto | undefined {
        const personaAuto = listaPersonas.find((persona) => persona.autos.some((auto) => auto.id === id));
        const auto = personaAuto?.autos.find((auto) => auto.id === id);
        return auto;
    }

    save(auto: Auto): Auto | null {
        const { marca, modelo, año, patente, color, numeroDeChasis, motor, idPersona } = auto;

        if (
            typeof marca !== 'string' ||
            typeof modelo !== 'string' ||
            typeof año !== 'number' ||
            typeof patente !== 'string' ||
            typeof color !== 'string' ||
            typeof numeroDeChasis !== 'string' ||
            typeof motor !== 'string' ||
            typeof idPersona !== 'string'
        ) {
            return null;
        }
        const autoCrear: Auto = {
            id: randomUUID(),
            marca: marca,
            modelo: modelo,
            año: año,
            patente: patente,
            color: color,
            numeroDeChasis: numeroDeChasis,
            motor: motor,
            idPersona: idPersona
        };
        return autoCrear;
    }

    saveAutoInPersona(auto: Auto, idPersona: string): boolean {
        const persona = listaPersonas.find((p) => p.id === idPersona);
        if (!persona) {
            return false;
        }
        persona.autos.push(auto);

        return true;
    }

    update(id: string, cambios: Partial<Auto>): Auto | null {
        const persona = listaPersonas.find((p) => p.autos.find((a) => a.id === id));
        if (!persona) {
            return null;
        }
        const auto = persona.autos.find((a) => a.id === id);
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

    delete(id: string): boolean {
        const persona = listaPersonas.find((p) => p.autos.find((a) => a.id === id));
        if (!persona) {
            return false;
        }
        const eliminadoIndex = persona.autos.findIndex((a) => a.id === id);
        persona.autos.splice(eliminadoIndex, 1);
        return true;
    }
}

