import { PRODUCTS, type Order, type Product } from "@jibs/shared";
import { BaseCrudService } from "../services/baseCrudService.js";

export const productService = new BaseCrudService<Product>(PRODUCTS);
export const orderService = new BaseCrudService<Order>([]);
