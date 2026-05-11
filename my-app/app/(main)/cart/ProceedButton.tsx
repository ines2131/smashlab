"use client";

import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";

export default function ProceedButton() {
  const router = useRouter();

  const handleProceed = () => {
    router.push("/checkout");
  };

  return <Button onClick={handleProceed}>Proceed to Checkout</Button>;
}
