import { Router } from "express";
import { z } from "zod";
import { PAYMENT_OPTIONS, type Order } from "@jibs/shared";
import { orderService, productService } from "../data/services.js";
import { createCrudRouter } from "./createCrudRouter.js";

const checkoutSchema = z.object({
  items: z
    .array(
      z.object({
        productId: z.string(),
        name: z.string(),
        price: z.number().positive(),
        quantity: z.number().int().positive()
      })
    )
    .min(1),
  customer: z.object({
    fullName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(7),
    address: z.string().min(8),
    city: z.string().min(2),
    deliveryDate: z.string().min(6)
  }),
  paymentMethod: z.enum(["gcash", "bank-transfer"]),
  paymentReference: z.string().optional()
});

export const orderRouter = Router();

orderRouter.post("/checkout", (req, res) => {
  const parsed = checkoutSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(422).json({ message: "Invalid checkout details", issues: parsed.error.flatten() });
    return;
  }

  const verifiedItems = parsed.data.items.map((item) => {
    const product = productService.getById(item.productId);

    if (!product) {
      throw new Error(`Product ${item.productId} no longer exists`);
    }

    return {
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: item.quantity
    };
  });

  const subtotal = verifiedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = subtotal >= 1500 ? 0 : 120;
  const total = subtotal + deliveryFee;

  const order = orderService.create({
    items: verifiedItems,
    customer: parsed.data.customer,
    paymentMethod: parsed.data.paymentMethod,
    paymentReference: parsed.data.paymentReference,
    subtotal,
    deliveryFee,
    total,
    status: "pending-payment"
  });

  const payment = PAYMENT_OPTIONS.find((option) => option.id === order.paymentMethod);

  res.status(201).json({
    data: order,
    payment,
    message: "Order received. Payment confirmation is pending."
  });
});

orderRouter.use("/", createCrudRouter<Order>(orderService, { filterFields: ["status"] }));
