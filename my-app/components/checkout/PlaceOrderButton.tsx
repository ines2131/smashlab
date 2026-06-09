"use client";

import Button from "@/components/common/Button";
import { useCreateOrder } from "@/hooks/useCreateOrder";
import { CheckoutFormData } from "@/types/checkout";

type Props = { form: CheckoutFormData };

export default function PlaceOrderButton({ form }: Props) {
  const { mutate, isPending } = useCreateOrder();

  return (
    <Button disabled={isPending} onClick={() => mutate(form)}>
      {isPending ? "Creating Order..." : "Place Order"}
    </Button>
  );
}
