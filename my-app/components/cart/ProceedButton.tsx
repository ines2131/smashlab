"use client";

import Button from "@/components/common/Button";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProceedButton() {
  const router = useRouter();
  const { data: user } = useCurrentUser();

  const handleProceed = () => {
    if (!user) {
      toast.error("Please log in to continue to checkout");
      router.push("/login?redirect=/checkout");
      return;
    }
    router.push("/checkout");
  };

  return <Button onClick={handleProceed}>Proceed to Checkout</Button>;
}
