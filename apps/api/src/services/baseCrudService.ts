import type { CrudEntity, ListOptions } from "../types/crud.js";

const now = () => new Date().toISOString();

export class BaseCrudService<T extends CrudEntity> {
  private records: T[];

  constructor(initialRecords: T[] = []) {
    this.records = [...initialRecords];
  }

  list(options: ListOptions<T> = {}) {
    const normalizedSearch = options.search?.trim().toLowerCase();

    return this.records.filter((record) => {
      const matchesFilters = Object.entries(options.filter ?? {}).every(([key, value]) => {
        if (value === undefined || value === null || value === "") {
          return true;
        }

        return record[key as keyof T] === value;
      });

      const matchesSearch =
        !normalizedSearch ||
        (options.searchFields ?? []).some((field) => {
          const value = record[field];
          return typeof value === "string" && value.toLowerCase().includes(normalizedSearch);
        });

      return matchesFilters && matchesSearch;
    });
  }

  getById(id: string) {
    return this.records.find((record) => record.id === id) ?? null;
  }

  create(input: Omit<T, "id" | "createdAt" | "updatedAt"> & { id?: string }) {
    const timestamp = now();
    const record = {
      ...input,
      id: input.id ?? crypto.randomUUID(),
      createdAt: timestamp,
      updatedAt: timestamp
    } as T;

    this.records.unshift(record);
    return record;
  }

  update(id: string, patch: Partial<Omit<T, "id" | "createdAt">>) {
    const index = this.records.findIndex((record) => record.id === id);

    if (index === -1) {
      return null;
    }

    const next = {
      ...this.records[index],
      ...patch,
      id,
      updatedAt: now()
    };

    this.records[index] = next;
    return next;
  }

  remove(id: string) {
    const record = this.getById(id);

    if (!record) {
      return null;
    }

    this.records = this.records.filter((item) => item.id !== id);
    return record;
  }
}
