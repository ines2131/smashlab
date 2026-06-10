"use client";

import Button from "@/components/common/Button";
import { useOrder } from "@/hooks/useOrder";
import { useUpdateOrderStatus } from "@/hooks/useUpdateOrderStatus";
import { useParams, useRouter } from "next/navigation";

export default function MockGatewayPage() {
  const router = useRouter();

  const params = useParams();

  const orderId = params.id as string;

  const { data: order } = useOrder(orderId);

  const { mutate, isPending } = useUpdateOrderStatus();

  if (!order) {
    return <div>Loading..</div>;
  }

  const handleSuccess = () => {
    mutate(
      {
        orderId,
        status: "paid",
      },
      {
        onSuccess: () => {
          router.push(`/payment-complete/${orderId}`);
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
          router.push(`/payment-failed/${orderId}`);
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
