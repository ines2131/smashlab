"use client";

import Input from "@/components/common/Input";

import { CheckoutFormData } from "@/types/checkout";

type Props = {
  form: CheckoutFormData;

  setForm: React.Dispatch<React.SetStateAction<CheckoutFormData>>;
};

export default function CheckoutForm({ form, setForm }: Props) {
  const handleChange = (field: keyof CheckoutFormData, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div>
      <div className="space-y-4">
        <Input
          placeholder="John Doe"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
        />

        <Input
          placeholder="123 Main Street"
          value={form.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />

        <Input
          placeholder="+852 1234 5678"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
        />

        <Input
          placeholder="john@example.com"
          type="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <select
          value={form.paymentMethod}
          onChange={(e) => handleChange("paymentMethod", e.target.value)}
          className="w-full rounded-md border px-3 py-2"
        >
          <option value="">Select Payment Method</option>

          <option value="card">Credit Card</option>

          <option value="bank">Bank Transfer</option>
        </select>
      </div>
    </div>
  );
}
