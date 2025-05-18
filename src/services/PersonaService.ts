import Persona from '../interfaces/Persona';
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
        return persona;
    };

    const actualizarPersona = async (id: string, cambios: Partial<Persona>): Promise<Persona | null> => {
        const personaActualizada = await repository.update(id, cambios);

        return personaActualizada;
    };

    const agregarPersona = async (persona: Persona): Promise<Persona | null> => {
        const personaCreada = await repository.save(persona);

        return personaCreada;
    };

    const eliminarPersona = async (id: string): Promise<boolean> => {
        return await repository.delete(id);
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
