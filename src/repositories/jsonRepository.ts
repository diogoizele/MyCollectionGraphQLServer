import { generateId } from "../utils/generateId";
import { readJSON, writeJSON } from "../utils/jsonHandler";

import type { DataSource } from "./dataSource";

export class JsonRepository<T extends { id: string }> implements DataSource<T> {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  private read(): T[] {
    return readJSON<T[]>(this.filePath) || [];
  }

  private write(data: T[]): void {
    writeJSON(this.filePath, data);
  }

  getAll(): T[] {
    return this.read();
  }

  getById(id: string): T | undefined {
    return this.read().find((item) => item.id === id);
  }

  create(item: Omit<T, "id">): T {
    const items = this.read();
    const newItem: T = { ...item, id: generateId() } as T;

    items.push(newItem);

    this.write(items);

    return newItem;
  }

  update(id: string, updated: Partial<Omit<T, "id">>): T | null {
    const items = this.read();
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      return null;
    }

    items[index] = { ...items[index], ...updated } as T;

    this.write(items);

    return items[index];
  }

  delete(id: string): boolean {
    const items = this.read();
    const index = items.findIndex((item) => item.id === id);

    if (index === -1) {
      return false;
    }

    items.splice(index, 1);
    this.write(items);

    return true;
  }
}
