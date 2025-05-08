export interface IRepository<T> {
    findAll(): T[];
    findById(id: string): T | undefined;
    save(entity: T): T | null;
    update(id: string, entity: Partial<T>): T | null;
    delete(id: string): boolean;
}
