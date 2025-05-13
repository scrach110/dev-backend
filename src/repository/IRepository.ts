export interface IRepository<T> {
    findAll(): Promise<T[]>;
    findById(id: string): Promise<T | T[] | undefined>;
    save(entity: T): Promise<T | null>;
    update(id: string, entity: Partial<T>): Promise<T | null>;
    delete(id: string): Promise<boolean>;
}
