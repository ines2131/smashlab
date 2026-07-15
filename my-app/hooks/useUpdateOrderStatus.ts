import { updateOrderStatus } from "@/services/orderService";
import { useMutation } from "@tanstack/react-query";

export function useUpdateOrderStatus() {
  return useMutation({
    mutationFn: ({
      orderNumber,
      status,
    }: {
      orderNumber: string;
      status: "paid" | "failed";
    }) => updateOrderStatus(orderNumber, status),
  });
}
