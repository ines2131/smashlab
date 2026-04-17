"use client";

import Input from "@/components/common/Input";
import { useState } from "react";

export default function CheckoutForm() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    phone: "",
    email: "",
  });

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Billing Details</h2>
      <div className="flex flex-col gap-3">
        <Input
          placeholder="Name"
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
          }}
        />
        <Input
          placeholder="Address"
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
          }}
        />
        <Input
          placeholder="Phone"
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
          }}
        />

        <Input
          placeholder="Email"
          onChange={(e) => {
            setForm({ ...form, name: e.target.value });
          }}
        />
      </div>
    </div>
  );
}
