import type { PaymentOption } from "./types.js";

export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: "gcash",
    label: "GCash",
    accountName: "Jibs Petcare Supplies & Delivery",
    accountNumber: "0917 555 2847",
    instructions: "Send the exact total via GCash, then enter the reference number before placing your order."
  },
  {
    id: "bank-transfer",
    label: "Bank Transfer",
    accountName: "Jibs Petcare Supplies & Delivery",
    accountNumber: "BPI 3089-1023-44",
    instructions: "Transfer the exact total and keep your receipt. Orders move to packing after payment is confirmed."
  }
];
