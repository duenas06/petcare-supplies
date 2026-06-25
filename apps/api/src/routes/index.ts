import { Router } from "express";
import { PAYMENT_OPTIONS } from "@jibs/shared";
import { productService } from "../data/services.js";
import { createCrudRouter } from "./createCrudRouter.js";
import { orderRouter } from "./orders.js";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({ ok: true, service: "jibs-api" });
});

apiRouter.get("/payments", (_req, res) => {
  res.json({ data: PAYMENT_OPTIONS });
});

apiRouter.use(
  "/products",
  createCrudRouter(productService, {
    searchFields: ["name", "description"],
    filterFields: ["category"]
  })
);
apiRouter.use("/orders", orderRouter);
