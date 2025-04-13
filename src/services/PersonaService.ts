import Persona from '../interfaces/Persona';
import Auto from '../interfaces/Auto';
import { listaPersonas } from '../variables/listaPersonas';
import Genero from '../interfaces/Genero';

const PersonaService = () => {
    const obtenerPersonas = (): { nombre: string; apellido: string; DNI: string }[] => {
        return listaPersonas.map((p) => ({
            nombre: p.nombre,
            apellido: p.apellido,
            DNI: p.dni
        }));
    };

    const entidadCompleta = (id: number): Persona | undefined => {
        const persona = listaPersonas.find((p) => p.id === id);
        return persona;
    };

    const actualizarPersona = (id: number, cambios: Partial<Persona>): Persona | null => {
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
            (cambios.autos !== undefined && !Array.isArray(cambios.autos))
        ) {
            return null;
        }

        // FALTA LA VALIDACION DE TIPOS, QUE ES UN TYPEOF DE SI ES DISTINTO DE UNDEFINED Y DEL TIPO DEL CAMPO: EJ STRING

        persona.nombre = cambios.nombre ?? persona.nombre;
        persona.apellido = cambios.apellido ?? persona.apellido;
        persona.dni = cambios.dni ?? persona.dni;
        persona.fechaDeNacimiento = cambios.fechaDeNacimiento
            ? new Date(cambios.fechaDeNacimiento)
            : persona.fechaDeNacimiento;
        persona.genero = cambios.genero ?? persona.genero;
        persona.autos = cambios.autos ?? persona.autos;

        return persona;
    };

    const agregarPersona = (
        id: number,
        nombre: string,
        apellido: string,
        dni: string,
        fechaDeNacimiento: string,
        genero: string,
        autos: Auto[]
    ): Persona | null => {
        const generosDisponibles = ['masculino', 'femenino', 'no-binario'];

        if (
            typeof id !== 'number' ||
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
            id,
            nombre,
            apellido,
            dni,
            fechaDeNacimiento: fechaNacimientoPersona,
            genero: genero as Genero,
            autos
        };

        listaPersonas.push(personaCrear);
        return personaCrear;
    };

    const eliminarPersona = (id: number): boolean => {
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

export default PersonaService;
