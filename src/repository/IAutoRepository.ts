import Auto from '../interfaces/Auto';
import { IRepository } from './IRepository';

export interface IAutoRepository extends IRepository<Auto> {
    findByIdPersona(id: string): Promise<Auto[]>;
    findByIdAuto(id: string): Promise<Auto | undefined>;
}
