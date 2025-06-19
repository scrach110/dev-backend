import { randomUUID } from 'crypto';
import Persona from '../interfaces/Persona';
import AppError from '../middlewares/AppError';
import { RepositoryFactory } from '../repository/RepositoryFactory';
import Genero from '../interfaces/Genero';

const PersonaService = () => {
    const repository = RepositoryFactory.personaRepository();

    const obtenerPersonas = async (): Promise<{ id: string; nombre: string; apellido: string; DNI: string }[]> => {
        const personas = await repository.findAll();
        return personas.map((p) => ({
            id: p._id,
            nombre: p.nombre,
            apellido: p.apellido,
            DNI: p.dni
        }));
    };

    const entidadCompleta = async (id: string): Promise<Persona | Persona[] | undefined> => {
        const persona = await repository.findById(id);
        if (!persona) {
            throw new AppError('Persona no encontrada', 404);
        }
        return persona;
    };

    const actualizarPersona = async (id: string, cambios: Partial<Persona>): Promise<Persona | null> => {
        const persona = await repository.findById(id);
        if (!persona) {
            throw new AppError('La persona no existe', 404);
        }
        if (
            (cambios.nombre && typeof cambios.nombre !== 'string') ||
            (cambios.apellido && typeof cambios.apellido !== 'string') ||
            (cambios.dni && typeof cambios.dni !== 'string') ||
            (cambios.genero && typeof cambios.genero !== 'string') ||
            (cambios.fechaDeNacimiento && typeof cambios.fechaDeNacimiento !== 'string') ||
            (cambios.donanteOrganos !== undefined && typeof cambios.donanteOrganos !== 'boolean') ||
            (cambios.autos && !Array.isArray(cambios.autos))
        ) {
            throw new AppError('Datos incorrectos', 400);
        }
        try {
            const personaActualizada: Persona = {
                ...persona,
                nombre: cambios.nombre ?? persona.nombre,
                apellido: cambios.apellido ?? persona.apellido,
                dni: cambios.dni ?? persona.dni,
                genero: cambios.genero ?? persona.genero,
                fechaDeNacimiento: cambios.fechaDeNacimiento
                    ? new Date(cambios.fechaDeNacimiento)
                    : persona.fechaDeNacimiento,
                donanteOrganos: cambios.donanteOrganos ?? persona.donanteOrganos,
                autos: cambios.autos ?? persona.autos
            };
            return await repository.update(id, personaActualizada);
        } catch {
            throw new AppError('Error en la base de datos', 500);
        }
    };

    const agregarPersona = async (persona: Persona): Promise<Persona | null> => {
        const { nombre, apellido, dni, fechaDeNacimiento, genero, donanteOrganos, autos } = persona;
        const generosDisponibles = ['masculino', 'femenino', 'no-binario'];
        const fechaNacimientoPersona = new Date(fechaDeNacimiento);

        if (
            typeof nombre !== 'string' ||
            typeof apellido !== 'string' ||
            typeof dni !== 'string' ||
            !generosDisponibles.includes(genero) ||
            isNaN(fechaNacimientoPersona.getTime()) ||
            !Array.isArray(autos)
        ) {
            throw new AppError('Datos incorrectos', 400);
        }

        try {
            const personaCrear: Persona = {
                _id: randomUUID(),
                nombre,
                apellido,
                dni,
                fechaDeNacimiento: fechaNacimientoPersona,
                genero: genero as Genero,
                donanteOrganos,
                autos: []
            };

            return await repository.save(personaCrear);
        } catch {
            throw new AppError('La base de datos falló', 500);
        }
    };

    const eliminarPersona = async (id: string): Promise<boolean> => {
        const respuesta = await repository.delete(id);
        if (!respuesta) {
            throw new AppError('La persona no existe', 404);
        }
        return respuesta;
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
