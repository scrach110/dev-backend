import Persona from '../interfaces/Persona';
/*
import Auto from '../interfaces/Auto';
import { listaPersonas } from '../repository/listaPersonas';
import Genero from '../interfaces/Genero';
import { randomUUID } from 'crypto';
*/
import { RepositoryFactory } from '../repository/RepositoryFactory';

const PersonaService = () => {
    const repository = RepositoryFactory.personaRepository();

    const obtenerPersonas = (): { id: string; nombre: string; apellido: string; DNI: string }[] => {
        const personas = repository.findAll();
        return personas.map((p) => ({
            id: p.id,
            nombre: p.nombre,
            apellido: p.apellido,
            DNI: p.dni
        }));
    };

    const entidadCompleta = (id: string): Persona | Persona[] | undefined => {
        const persona = repository.findById(id);
        return persona;
    };

    const actualizarPersona = (id: string, cambios: Partial<Persona>): Persona | null => {
        const personaActualizada = repository.update(id, cambios);

        return personaActualizada;
    };

    const agregarPersona = (persona: Persona): Persona | null => {
        const personaCreada = repository.save(persona);

        return personaCreada;
    };

    const eliminarPersona = (id: string): boolean => {
        return repository.delete(id);
    };

    return {
        obtenerPersonas,
        entidadCompleta,
        actualizarPersona,
        eliminarPersona,
        agregarPersona
    };

    /* const obtenerPersonas = (): { id: string; nombre: string; apellido: string; DNI: string }[] => {
        return listaPersonas.map((p) => ({
            id: p.id,
            nombre: p.nombre,
            apellido: p.apellido,
            DNI: p.dni
        }));
    };

    const entidadCompleta = (id: string): Persona | undefined => {
        const persona = listaPersonas.find((p) => p.id === id);
        return persona;
    };

    const actualizarPersona = (id: string, cambios: Partial<Persona>): Persona | null => {
        const persona = listaPersonas.find((p) => p.id === id);
        if (!persona) {
            return null;
        }

        if (
            (cambios.nombre !== undefined && typeof cambios.nombre !== 'string') ||
            (cambios.apellido !== undefined && typeof cambios.apellido !== 'string') ||
            (cambios.dni !== undefined && typeof cambios.dni !== 'string') ||
            (cambios.fechaDeNacimiento !== undefined && typeof cambios.fechaDeNacimiento !== 'string') ||
            (cambios.genero !== undefined && typeof cambios.genero !== 'string') ||
            (cambios.donanteOrganos !== undefined && typeof cambios.donanteOrganos !== 'boolean') ||
            (cambios.autos !== undefined && !Array.isArray(cambios.autos))
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
    };

    const agregarPersona = (
        nombre: string,
        apellido: string,
        dni: string,
        fechaDeNacimiento: string,
        genero: string,
        donanteOrganos: boolean,
        autos: Auto[]
    ): Persona | null => {
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
    };

    const eliminarPersona = (id: string): boolean => {
        const indexPersona = listaPersonas.findIndex((p) => p.id === id);
        if (indexPersona === -1) {
            return false;
        }

        listaPersonas.splice(indexPersona, 1);
        return true;
    };

    return {
        obtenerPersonas,
        entidadCompleta,
        actualizarPersona,
        eliminarPersona,
        agregarPersona
    };
};
*/
};
export default PersonaService;
