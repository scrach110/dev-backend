import { randomUUID } from 'crypto';
import Auto from '../interfaces/Auto';
import { listaPersonas } from '../repository/listaPersonas';
//import { RepositoryFactory } from '../repository/RepositoryFactory';

const AutoService = () => {
    /*
    const repository = RepositoryFactory.autoRepository();

    const obtenerTodosLosAutos = () => {
        const autos = repository.findAll();

        return autos.map((a) => ({
            id: a.id,
            marca: a.marca,
            modelo: a.modelo,
            año: a.año,
            patente: a.patente,
            idPersona: a.idPersona
        }));
    };

    const autosPorId = (id: string) => {
        const autos = repository.findById(id);

        if (!autos) {
            return null;
        } else {
            return autos.map((a) => ({
                marca: a.marca,
                modelo: a.modelo,
                año: a.año,
                patente: a.patente
            }));
        }
    };
    */

    const obtenerTodosLosAutos = () => {
        return listaPersonas.flatMap((p) =>
            p.autos.map((a) => ({
                id: a.id,
                marca: a.marca,
                modelo: a.modelo,
                año: a.año,
                patente: a.patente,
                idPersona: a.idPersona
            }))
        );
    };

    const autosPorId = (id: string) => {
        try {
            const persona = listaPersonas.find((p) => p.id === id);
            const autos = persona?.autos.map((a) => ({
                marca: a.marca,
                modelo: a.modelo,
                año: a.año,
                patente: a.patente
            }));
            return autos;
        } catch {
            return null;
        }
    };

    const autoPorIdAuto = (id: string): Auto | undefined => {
        const personaAuto = listaPersonas.find((persona) => persona.autos.some((auto) => auto.id === id));
        const auto = personaAuto?.autos.find((auto) => auto.id === id);
        return auto;
    };

    const editarAuto = (id: string, cambios: Partial<Auto>): Auto | null => {
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
    };

    const crearAuto = (
        marca: string,
        modelo: string,
        año: number,
        patente: string,
        color: string,
        numeroDeChasis: string,
        motor: string,
        idPersona: string
    ): Auto | null => {
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
    };

    const agregarAutoPersona = (auto: Auto, idPersona: string): boolean => {
        const persona = listaPersonas.find((p) => p.id === idPersona);
        if (!persona) {
            return false;
        }
        persona.autos.push(auto);

        return true;
    };

    const eliminarAuto = (id: string): boolean => {
        const persona = listaPersonas.find((p) => p.autos.find((a) => a.id === id));
        if (!persona) {
            return false;
        }
        const eliminadoIndex = persona.autos.findIndex((a) => a.id === id);
        persona.autos.splice(eliminadoIndex, 1);
        return true;
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
