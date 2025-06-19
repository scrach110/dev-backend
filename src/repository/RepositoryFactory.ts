import process from 'process';
import { StaticPersonaRepository } from './Static/StaticPersonaRepository';
import { IAutoRepository } from './IAutoRepository';
import { StaticAutoRepository } from './Static/StaticAutoRepository';
import { MongoPersonaRepository } from './Mongo/MongoPersonaRepository';
import { MongoAutoRepository } from './Mongo/MongoAutoRepository';
import { FireBasePersonaRepository } from './FireBase/FireBasePersonaRepository';
import { FireBaseAutoRepository } from './FireBase/FireBaseAutoRepository';
import { IPersonaRepository } from './IPersonaRepository';

export abstract class RepositoryFactory {
    private static personaRepositorySingleton: IPersonaRepository | undefined;
    private static autoRepositorySingleton: IAutoRepository | undefined;

    public static personaRepository(): IPersonaRepository {
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

    private static getPersonaRepository(): IPersonaRepository {
        if (process.env.REPOSITORY === 'static') {
            return new StaticPersonaRepository();
        } else if (process.env.REPOSITORY === 'mongodb') {
            return new MongoPersonaRepository();
        } else if (process.env.REPOSITORY === 'firebase') {
            return new FireBasePersonaRepository();
        }

        return new StaticPersonaRepository();
    }

    private static getAutoRepository(): IAutoRepository {
        if (process.env.REPOSITORY === 'static') {
            return new StaticAutoRepository();
        } else if (process.env.REPOSITORY === 'mongodb') {
            return new MongoAutoRepository();
        } else if (process.env.REPOSITORY === 'firebase') {
            return new FireBaseAutoRepository();
        }

        return new StaticAutoRepository();
    }
}
