import { getOrderByOrderNumber } from "@/services/orderService";
import { useQuery } from "@tanstack/react-query";

export function useOrder(
  orderNumber: string,
  options?: { forceFresh?: boolean },
) {
  return useQuery({
    queryKey: ["order", orderNumber],
    queryFn: async () => getOrderByOrderNumber(orderNumber),
    enabled: !!orderNumber,
    ...(options?.forceFresh && {
      staleTime: 0,
      refetchOnMount: "always",
    }),
  });
}
