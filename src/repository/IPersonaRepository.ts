import Persona from '../interfaces/Persona';
import { IRepository } from './IRepository';

export interface IPersonaRepository extends IRepository<Persona> {
    findById(id: string): Promise<Persona>;
}
