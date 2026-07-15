"use client";

import Button from "@/components/common/Button";
import { useOrder } from "@/hooks/useOrder";
import { useUpdateOrderStatus } from "@/hooks/useUpdateOrderStatus";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";

export default function MockGatewayPage() {
  const router = useRouter();

  const params = useParams();

  const orderNumber = params.orderNumber as string;

  const { data: order } = useOrder(orderNumber);

  const { mutate, isPending } = useUpdateOrderStatus();

  const queryClient = useQueryClient();

  if (!order) {
    return <div>Loading..</div>;
  }

  const handleSuccess = () => {
    mutate(
      {
        orderNumber,
        status: "paid",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["order", orderNumber] });
          router.push(`/payment-complete/${orderNumber}`);
        },
      },
    );
  };

  const handleFailed = () => {
    mutate(
      {
        orderNumber,
        status: "failed",
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["order", orderNumber] });
          router.push(`/payment-failed/${orderNumber}`);
        },
      },
    );
  };

  return (
    <>
      <div className="rounded-lg border p-6">
        <p>Order ID:{order.orderNumber}</p>
        <p>Total : ${order.totalAmount.toFixed(2)}</p>
        <p>Payment Method: {order.paymentMethod}</p>
        <p> Status: {order.status} </p>
      </div>

      <div className="mt-6 flex gap-4">
        <Button disabled={isPending} onClick={handleSuccess}>
          Pay Success
        </Button>
        <Button disabled={isPending} onClick={handleFailed}>
          Pay Failed
        </Button>
      </div>
    </>
  );
}
