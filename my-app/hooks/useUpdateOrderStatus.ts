import { updateOrderStatus } from "@/services/orderService";
import { useMutation } from "@tanstack/react-query";

export function useUpdateOrderStatus() {
  return useMutation({
    mutationFn: ({
      orderId,
      status,
    }: {
      orderId: string;
      status: "paid" | "failed";
    }) => updateOrderStatus(orderId, status),
  });
}
