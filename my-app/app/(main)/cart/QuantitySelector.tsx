"use client";

import { useState } from "react";

export default function QuantitySelector() {
  const [qty, setQty] = useState(1);
  return (
    <input
      type="number"
      value={qty}
      onChange={(e) => setQty(Number(e.target.value))}
      className="border w-16 px-2 py-1"
    />
  );
}
