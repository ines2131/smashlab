import { CheckoutFormData } from "@/types/checkout";
import axios from "axios";

export async function createOrder(data: CheckoutFormData) {
  const response = await axios.post("/api/orders", data);
  return response.data;
}

export async function getOrderById(orderId: string) {
  const response = await axios.get(`/api/orders/${orderId}`);
  console.log(response, "order");
  return response.data;
}

export async function updateOrderStatus(
  orderId: string,
  status: "paid" | "failed",
) {
  const response = await axios.patch(`/api/orders/${orderId}`, { status });
  return response.data;
}
