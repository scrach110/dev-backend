import { randomUUID } from 'crypto';
import Auto from '../interfaces/Auto';
import { RepositoryFactory } from '../repository/RepositoryFactory';
import AppError from '../middlewares/AppError';

const AutoService = () => {
    const repository = RepositoryFactory.autoRepository();

    const obtenerTodosLosAutos = async (): Promise<
        { _id: string; marca: string; modelo: string; año: number; patente: string; idPersona: string }[]
    > => {
        const autos = await repository.findAll();

        return autos.map((a) => ({
            _id: a._id,
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
        const autos = await repository.findByIdPersona(id);

        if (!autos) {
            throw new AppError('La persona no existe', 404);
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
        console.log(auto);

        return auto;
    };

    const editarAuto = async (id: string, cambios: Partial<Auto>): Promise<Auto | null> => {
        if (
            (cambios.año && typeof cambios.año !== 'number') ||
            (cambios.color && typeof cambios.color !== 'string') ||
            (cambios.marca && typeof cambios.marca !== 'string') ||
            (cambios.modelo && typeof cambios.modelo !== 'string') ||
            (cambios.motor && typeof cambios.motor !== 'string') ||
            (cambios.numeroDeChasis && typeof cambios.numeroDeChasis !== 'string') ||
            (cambios.patente && typeof cambios.patente !== 'string')
        ) {
            throw new AppError('Datos incorrectos', 400);
        }
        const autoEditado = await repository.update(id, cambios);

        return autoEditado;
    };

    const crearAuto = async (auto: Auto): Promise<Auto> => {
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
            throw new AppError('Datos incorrectos', 400);
        }
        const autoCrear: Auto = {
            _id: randomUUID(),
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
    };

    const agregarAutoPersona = async (auto: Auto): Promise<Auto> => {
        const resultado = await repository.save(auto);

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
