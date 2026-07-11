export type CheckoutFormData = {
  name: string;
  address: string;
  phone: string;
  email: string;
  paymentMethod: PaymentMethod;
};

export type PaymentMethod = "" | "card" | "bank";
