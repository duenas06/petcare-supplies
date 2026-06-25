export type ProductCategory =
  | "food"
  | "treats"
  | "litter"
  | "toys"
  | "grooming"
  | "beds"
  | "health";

export type Product = {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  compareAtPrice?: number;
  rating: number;
  stock: number;
  badge?: string;
  color: string;
  createdAt: string;
  updatedAt: string;
};

export type PaymentMethod = "gcash" | "bank-transfer";

export type CartLine = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export type CustomerDetails = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  deliveryDate: string;
};

export type OrderStatus = "pending-payment" | "paid" | "packing" | "out-for-delivery" | "completed";

export type Order = {
  id: string;
  items: CartLine[];
  customer: CustomerDetails;
  paymentMethod: PaymentMethod;
  paymentReference?: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: OrderStatus;
  createdAt: string;
  updatedAt: string;
};

export type PaymentOption = {
  id: PaymentMethod;
  label: string;
  accountName: string;
  accountNumber: string;
  instructions: string;
};
