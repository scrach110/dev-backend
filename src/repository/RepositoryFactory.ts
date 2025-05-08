import process from 'process';
import Auto from '../interfaces/Auto';
import Persona from '../interfaces/Persona';
import { IRepository } from './IRepository';
import { StaticPersonaRepository } from './StaticPersonaRepository';
//import { StaticAutoRepository } from './StaticAutoRepository';

export abstract class RepositoryFactory {
    private static personaRepositorySingleton: IRepository<Persona> | undefined;
    private static autoRepositorySingleton: IRepository<Auto> | undefined;

    public static personaRepository(): IRepository<Persona> {
        if (RepositoryFactory.personaRepositorySingleton === undefined) {
            RepositoryFactory.personaRepositorySingleton = RepositoryFactory.getPersonaRepository();
        }
        return RepositoryFactory.personaRepositorySingleton;
    }
    /*
    public static autoRepository(): IRepository<Auto> {
        if (RepositoryFactory.autoRepositorySingleton === undefined) {
            RepositoryFactory.autoRepositorySingleton = RepositoryFactory.getAutoRepository();
        }
    }
*/
    private static getPersonaRepository(): IRepository<Persona> {
        if (process.env.REPOSITORY === 'static') {
            return new StaticPersonaRepository();
        }

        return new StaticPersonaRepository();
    }
    /*
    private static getAutoRepository(): IRepository<Auto> {
        if (process.env.REPOSITORY === 'static') {
            return new StaticAutoRepository();
        }

        return new StaticAutoRepository();
    }
        */
}
