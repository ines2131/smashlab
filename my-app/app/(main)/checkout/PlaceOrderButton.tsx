"use client";

import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

export default function PlaceOrderButton() {
  const router = useRouter();

  const handleSubmit = () => {
    router.push("/payment-complete");
  };
  return (
    <div>
      <Button onClick={handleSubmit}>Place Order</Button>
    </div>
  );
}
