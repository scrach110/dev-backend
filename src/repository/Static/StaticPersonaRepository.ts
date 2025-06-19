import Persona from '../../interfaces/Persona';
import { listaPersonas } from './listaPersonas';
import { IPersonaRepository } from '../IPersonaRepository';
import AppError from '../../middlewares/AppError';

export class StaticPersonaRepository implements IPersonaRepository {
    async findAll(): Promise<Persona[]> {
        return await listaPersonas;
    }

    async findById(id: string): Promise<Persona> {
        const persona = listaPersonas.find((p) => p._id === id);
        if (!persona) {
            throw new AppError('persona no encontrada', 404);
        }
        return persona;
    }
    async save(persona: Persona): Promise<Persona> {
        listaPersonas.push(persona);
        return persona;
    }

    async update(id: string, cambios: Partial<Persona>): Promise<Persona> {
        const persona = listaPersonas.find((p) => p._id === id);
        if (!persona) {
            throw new AppError('La persona no existe', 404);
        }

        persona.nombre = cambios.nombre ?? persona.nombre;
        persona.apellido = cambios.apellido ?? persona.apellido;
        persona.dni = cambios.dni ?? persona.dni;
        persona.fechaDeNacimiento = cambios.fechaDeNacimiento
            ? new Date(cambios.fechaDeNacimiento)
            : persona.fechaDeNacimiento;
        persona.genero = cambios.genero ?? persona.genero;
        persona.donanteOrganos = cambios.donanteOrganos ?? persona.donanteOrganos;
        persona.autos = cambios.autos ?? persona.autos;

        return persona;
    }

    async delete(id: string): Promise<boolean> {
        const indexPersona = listaPersonas.findIndex((p) => p._id === id);
        if (indexPersona === -1) {
            return false;
        }

        listaPersonas.splice(indexPersona, 1);
        return true;
    }
}
