import Auto from '../interfaces/Auto';
import { IRepository } from './IRepository';

export interface IAutoRepository extends IRepository<Auto> {
    findAll(): Promise<Auto[]>;
    findById(id: string): Promise<Auto[] | undefined>;
    findByIdAuto(id: string): Promise<Auto | undefined>;
    save(entity: Auto): Promise<Auto | null>;
    saveAutoInPersona(auto: Auto, idPersona: string): Promise<boolean>;
    update(id: string, entity: Partial<Auto>): Promise<Auto | null>;
    delete(id: string): Promise<boolean>;
}
