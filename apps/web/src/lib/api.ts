import type { CustomerDetails, PaymentOption, Product, CartLine, PaymentMethod, Order } from "@jibs/shared";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api";

type ApiListResponse<T> = {
  data: T[];
};

type CheckoutPayload = {
  items: CartLine[];
  customer: CustomerDetails;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
};

type CheckoutResponse = {
  data: Order;
  payment: PaymentOption;
  message: string;
};

export const fetchProducts = async () => {
  const response = await fetch(`${API_URL}/products`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Unable to load products");
  }

  return (await response.json()) as ApiListResponse<Product>;
};

export const fetchPaymentOptions = async () => {
  const response = await fetch(`${API_URL}/payments`, { cache: "no-store" });

  if (!response.ok) {
    throw new Error("Unable to load payment methods");
  }

  return (await response.json()) as ApiListResponse<PaymentOption>;
};

export const submitCheckout = async (payload: CheckoutPayload) => {
  const response = await fetch(`${API_URL}/orders/checkout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(payload)
  });

  const body = await response.json();

  if (!response.ok) {
    throw new Error(body.message ?? "Checkout failed");
  }

  return body as CheckoutResponse;
};
