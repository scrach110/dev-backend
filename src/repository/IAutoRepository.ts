import Auto from '../interfaces/Auto';
import { IRepository } from './IRepository';

export interface IAutoRepository extends IRepository<Auto> {
    findById(id: string): Promise<Auto[] | undefined>;
    findByIdAuto(id: string): Promise<Auto | undefined>;
}
