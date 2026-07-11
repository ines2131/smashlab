"use client";

import Input from "@/components/common/Input";

import { CheckoutFormData, PaymentMethod } from "@/types/checkout";
import { CreditCard, Landmark } from "lucide-react";
import Field from "../common/Field";

type Props = {
  form: CheckoutFormData;
  setForm: React.Dispatch<React.SetStateAction<CheckoutFormData>>;
};

const PAYMENT_METHODS: {
  value: PaymentMethod;
  label: string;
  icon: typeof CreditCard;
}[] = [
  { value: "card", label: "Card", icon: CreditCard },
  { value: "bank", label: "Bank Transfer", icon: Landmark },
];

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
        <Field label="Name" required>
          <Input
            value={form.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </Field>

        <Field label="Address" required>
          <Input
            value={form.address}
            onChange={(e) => handleChange("address", e.target.value)}
          />
        </Field>

        <Field label="Phone Number">
          <Input
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </Field>

        <Field label="Email" required>
          <Input
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </Field>

        <Field label="Payment Method" required>
          <div className="grid grid-cols-2 gap-3">
            {PAYMENT_METHODS.map(({ value, label, icon: Icon }) => {
              const selected = form.paymentMethod === value;
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => handleChange("paymentMethod", value)}
                  className={`flex flex-col items-center gap-2 rounded-lg border px-4 py-3 text-sm transition ${
                    selected
                      ? "border-black bg-black text-white"
                      : "border-gray-200 text-gray-700 hover:border-gray-400"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  {label}
                </button>
              );
            })}
          </div>
        </Field>
      </div>
    </div>
  );
}
