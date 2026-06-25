import { Router } from "express";
import type { BaseCrudService } from "../services/baseCrudService.js";
import type { CrudEntity } from "../types/crud.js";

type CrudRouterOptions<T extends CrudEntity> = {
  searchFields?: Array<keyof T>;
  filterFields?: Array<keyof T>;
};

export const createCrudRouter = <T extends CrudEntity>(
  service: BaseCrudService<T>,
  options: CrudRouterOptions<T> = {}
) => {
  const router = Router();

  router.get("/", (req, res) => {
    const filter = Object.fromEntries(
      (options.filterFields ?? [])
        .map((field) => [field, req.query[field as string]])
        .filter(([, value]) => value !== undefined)
    ) as Partial<Record<keyof T, unknown>>;

    res.json({
      data: service.list({
        filter,
        search: typeof req.query.search === "string" ? req.query.search : undefined,
        searchFields: options.searchFields
      })
    });
  });

  router.get("/:id", (req, res) => {
    const record = service.getById(req.params.id);

    if (!record) {
      res.status(404).json({ message: "Record not found" });
      return;
    }

    res.json({ data: record });
  });

  router.post("/", (req, res) => {
    const record = service.create(req.body);
    res.status(201).json({ data: record });
  });

  router.patch("/:id", (req, res) => {
    const record = service.update(req.params.id, req.body);

    if (!record) {
      res.status(404).json({ message: "Record not found" });
      return;
    }

    res.json({ data: record });
  });

  router.delete("/:id", (req, res) => {
    const record = service.remove(req.params.id);

    if (!record) {
      res.status(404).json({ message: "Record not found" });
      return;
    }

    res.json({ data: record });
  });

  return router;
};
