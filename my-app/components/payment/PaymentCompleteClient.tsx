"use client";
import { useOrder } from "@/hooks/useOrder";
import { trackOrderPurchase } from "@/lib/tracking/orderTracking";
import { trackPurchaseApi } from "@/services/orderService";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Spinner from "../common/Spinner";

type Props = {
  orderNumber: string;
};
export default function PaymentCompleteClient({ orderNumber }: Props) {
  const { data: order } = useOrder(orderNumber, { forceFresh: true });
  const hasAttemptedTracking = useRef(false);

  useEffect(() => {
    if (!order || order.status !== "paid") {
      return;
    }
    if (hasAttemptedTracking.current) return;

    hasAttemptedTracking.current = true;

    trackPurchaseApi(orderNumber)
      .then((result) => {
        if (!result.tracked || !result.order) return;
        trackOrderPurchase(result.order);
      })
      .catch((error) => {
        console.error("purchase tracking failed:", error);
      });
  }, [order, orderNumber]);

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-6 bg-gray-50">
      <div className="bg-white shadow-lg rounded-xl p-10 w-full max-w-lg">
        {/* ✅ 성공 아이콘 */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl">
            ✅
          </div>
        </div>

        {/* ✅ 제목 */}
        <h1 className="text-2xl font-bold text-center mb-2">
          Payment Successful
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Your order has been successfully placed.
        </p>

        {/* ✅ 주문 정보 */}
        <div className="border rounded-lg p-5 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Order ID</span>
            <span id="orrder_number" className="font-medium">
              {order.orderNumber}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Order Date</span>
            <span className="font-medium">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Name</span>
            <span className="font-medium">{order.customer.name}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Phone</span>
            <span id="payment_complete_phone" className="font-medium">
              {order.customer.phone}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-gray-500">Email</span>
            <span id="payment_complete_email" className="font-medium">
              {order.customer.email}
            </span>
          </div>

          <hr />

          <div className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span id="payment_complete_total_price">${order.totalAmount}</span>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <Link
            href="/"
            className="flex-1 text-center bg-primary text-white py-2 rounded-md"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
