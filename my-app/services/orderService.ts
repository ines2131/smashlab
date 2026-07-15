import { CheckoutFormData } from "@/types/checkout";
import axios from "axios";

export async function createOrder(data: CheckoutFormData) {
  const response = await axios.post("/api/orders", data);
  return response.data;
}

export async function getOrderByOrderNumber(orderNumber: string) {
  const response = await axios.get(`/api/orders/${orderNumber}`);
  return response.data;
}

export async function updateOrderStatus(
  orderNumber: string,
  status: "paid" | "failed",
) {
  const response = await axios.patch(`/api/orders/${orderNumber}`, { status });
  return response.data;
}

export async function trackPurchaseApi(orderNumber: string) {
  const response = await axios.post(`/api/orders/${orderNumber}/track`);
  return response.data as { tracked: boolean; order?: any };
}
