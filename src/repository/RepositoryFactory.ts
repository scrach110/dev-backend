import process from 'process';
import Auto from '../interfaces/Auto';
import Persona from '../interfaces/Persona';
import { IRepository } from './IRepository';
import { StaticPersonaRepository } from './StaticPersonaRepository';
import { IAutoRepository } from './IAutoRepository';
import { StaticAutoRepository } from './StaticAutoRepository';

export abstract class RepositoryFactory {
    private static personaRepositorySingleton: IRepository<Persona> | undefined;
    private static autoRepositorySingleton: IAutoRepository | undefined;

    public static personaRepository(): IRepository<Persona> {
        if (RepositoryFactory.personaRepositorySingleton === undefined) {
            RepositoryFactory.personaRepositorySingleton = RepositoryFactory.getPersonaRepository();
        }
        return RepositoryFactory.personaRepositorySingleton;
    }

    public static autoRepository(): IAutoRepository {
        if (RepositoryFactory.autoRepositorySingleton === undefined) {
            RepositoryFactory.autoRepositorySingleton = RepositoryFactory.getAutoRepository();
        }
        return RepositoryFactory.autoRepositorySingleton;
    }

    private static getPersonaRepository(): IRepository<Persona> {
        if (process.env.REPOSITORY === 'static') {
            return new StaticPersonaRepository();
        }

        return new StaticPersonaRepository();
    }

    private static getAutoRepository(): IAutoRepository {
        if (process.env.REPOSITORY === 'static') {
            return new StaticAutoRepository();
        }

        return new StaticAutoRepository();
    }

}
