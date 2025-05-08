import Persona from '../interfaces/Persona';
import Genero from '../interfaces/Genero';
import { IRepository } from './IRepository';
import { listaPersonas } from './listaPersonas';
import { randomUUID } from 'crypto';

export class StaticPersonaRepository implements IRepository<Persona> {
    findAll(): Persona[] {
        return listaPersonas;
    }

    findById(id: string): Persona | undefined {
        return listaPersonas.find((p) => p.id === id);
    }
    save(persona: Persona): Persona | null {
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

        const personaCrear: Persona = {
            id: randomUUID(),
            nombre,
            apellido,
            dni,
            fechaDeNacimiento: fechaNacimientoPersona,
            genero: genero as Genero,
            donanteOrganos,
            autos
        };

        listaPersonas.push(personaCrear);
        return personaCrear;
    }

    update(id: string, cambios: Partial<Persona>): Persona | null {
        const persona = listaPersonas.find((p) => p.id === id);
        if (!persona) return null;

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

    delete(id: string): boolean {
        const indexPersona = listaPersonas.findIndex((p) => p.id === id);
        if (indexPersona === -1) {
            return false;
        }

        listaPersonas.splice(indexPersona, 1);
        return true;
    }
}
