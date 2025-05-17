import Auto from '../interfaces/Auto';
import { IRepository } from './IRepository';

export interface IAutoRepository extends IRepository<Auto> {
    findByIdAuto(id: string): Promise<Auto | undefined>;
    saveAutoInPersona(auto: Auto, idPersona: string): Promise<boolean>;
}
