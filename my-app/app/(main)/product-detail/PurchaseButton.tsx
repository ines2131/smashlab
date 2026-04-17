"use client";

import Button from "@/components/common/Button";

export default function PurchaseButton() {
  const handlePurchase = () => {
    console.log("Purchase");
  };
  return <Button onClick={handlePurchase}>Purchase</Button>;
}
