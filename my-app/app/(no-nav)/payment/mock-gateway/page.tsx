"use client";

import Button from "@/components/common/Button";
import { useOrder } from "@/hooks/useOrder";
import { useUpdateOrderStatus } from "@/hooks/useUpdateOrderStatus";
import { useRouter, useSearchParams } from "next/navigation";

export default function MockGatewayPage() {
  const router = useRouter();

  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId") || "";

  const { data: order } = useOrder(orderId);

  const { mutate, isPending } = useUpdateOrderStatus();

  if (!order) {
    return <div>No order found</div>;
  }

  const handleSuccess = () => {
    mutate(
      {
        orderId,
        status: "paid",
      },
      {
        onSuccess: () => {
          router.push(`/payemnt-complete?orderId=${orderId}`);
        },
      },
    );
  };

  const handleFailed = () => {
    mutate(
      {
        orderId,
        status: "failed",
      },
      {
        onSuccess: () => {
          `payment-failed?orderId=${orderId}`;
        },
      },
    );
  };

  return (
    <>
      <div className="rounded-lg border p-6">
        <p>Order ID:{order._id}</p>
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
