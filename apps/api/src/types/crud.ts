export type CrudEntity = {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type ListOptions<T> = {
  filter?: Partial<Record<keyof T, unknown>>;
  search?: string;
  searchFields?: Array<keyof T>;
};
