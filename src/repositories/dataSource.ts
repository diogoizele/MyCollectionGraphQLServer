export interface DataSource<T> {
  getAll(): T[];
  getById(id: string): T | undefined;
  create(item: T): T;
  update(id: string, updated: T): T | null;
  delete(id: string): boolean;
}
