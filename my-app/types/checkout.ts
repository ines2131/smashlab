export type CheckoutFormData = {
  name: string;
  address: string;
  phone: string;
  email: string;
  paymentMethod: "card" | "bank" | "";
};
