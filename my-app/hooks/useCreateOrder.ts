"use client";

import { createOrder } from "@/services/orderService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export function useCreateOrder() {
  const router = useRouter();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: (order) => {
      router.push(`/payment/mock-gateway/${order._id}`);
    },
  });
}
