"use client";

import { useSearchParams } from "next/navigation";

export default function MockGatewayClient() {
  const searchParams = useSearchParams();

  const orderId = searchParams.get("orderId");

  return <div>{orderId}</div>;
}
