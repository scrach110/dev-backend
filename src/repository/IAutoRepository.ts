import Auto from "../interfaces/Auto";
import { IRepository } from "./IRepository";

export interface IAutoRepository extends IRepository<Auto> {
    findAll(): Auto[] ;
    findById(id: string): Auto[] | undefined;
    findByIdAuto(id: string) : Auto | undefined;
    save(entity: Auto): Auto | null;
    saveAutoInPersona(auto: Auto, idPersona: string) : boolean;
    update(id: string, entity: Partial<Auto>): Auto | null;
    delete(id: string): boolean;
}