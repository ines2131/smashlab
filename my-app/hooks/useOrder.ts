import { getOrderById } from "@/services/orderService";
import { useQuery } from "@tanstack/react-query";

export function useOrder(orderId: string) {
  return useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderById(orderId),
    enabled: !!orderId,
  });
}
