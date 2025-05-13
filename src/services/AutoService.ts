import Auto from '../interfaces/Auto';
import { RepositoryFactory } from '../repository/RepositoryFactory';

const AutoService = () => {
    const repository = RepositoryFactory.autoRepository();

    const obtenerTodosLosAutos = async (): Promise<
        { id: string; marca: string; modelo: string; año: number; patente: string; idPersona: string }[]
    > => {
        const autos = await repository.findAll();

        return autos.map((a) => ({
            id: a.id,
            marca: a.marca,
            modelo: a.modelo,
            año: a.año,
            patente: a.patente,
            idPersona: a.idPersona
        }));
    };

    const autosPorId = async (
        id: string
    ): Promise<{ marca: string; modelo: string; año: number; patente: string }[] | null> => {
        const autos = await repository.findById(id);

        if (!autos) {
            return null;
        }

        return autos.map((a) => ({
            marca: a.marca,
            modelo: a.modelo,
            año: a.año,
            patente: a.patente
        }));
    };

    const autoPorIdAuto = async (id: string): Promise<Auto | undefined> => {
        const auto = await repository.findByIdAuto(id);

        return auto;
    };

    const editarAuto = async (id: string, cambios: Partial<Auto>): Promise<Auto | null> => {
        const autoEditado = await repository.update(id, cambios);

        return autoEditado;
    };

    const crearAuto = async (auto: Auto): Promise<Auto | null> => {
        const autoCreado = await repository.save(auto);

        return autoCreado;
    };

    const agregarAutoPersona = async (auto: Auto, idPersona: string): Promise<boolean> => {
        const resultado = await repository.saveAutoInPersona(auto, idPersona);

        return resultado;
    };

    const eliminarAuto = async (idAuto: string): Promise<boolean> => {
        const resultado = await repository.delete(idAuto);

        return resultado;
    };

    return {
        obtenerTodosLosAutos,
        autosPorId,
        autoPorIdAuto,
        editarAuto,
        crearAuto,
        agregarAutoPersona,
        eliminarAuto
    };
};
export default AutoService;
