import process from 'process';
import Persona from '../interfaces/Persona';
import { IRepository } from './IRepository';
import { StaticPersonaRepository } from './Static/StaticPersonaRepository';
import { IAutoRepository } from './IAutoRepository';
import { StaticAutoRepository } from './Static/StaticAutoRepository';
import { MongoPersonaRepository } from './Mongo/MongoPersonaRepository';

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
        } else if (process.env.REPOSITORY === 'mongodb') {
            return new MongoPersonaRepository();
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
