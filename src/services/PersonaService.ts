import Persona from '../interfaces/Persona';
import AppError from '../middlewares/AppError';
import { RepositoryFactory } from '../repository/RepositoryFactory';

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
        const personaActualizada = await repository.update(id, cambios);
        if (!personaActualizada) {
            throw new AppError('Datos incorrectos', 400);
        }
        return personaActualizada;
    };

    const agregarPersona = async (persona: Persona): Promise<Persona | null> => {
        const personaCreada = await repository.save(persona);
        if (!personaCreada) {
            throw new AppError('Datos incorrectos', 400);
        }
        return personaCreada;
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
