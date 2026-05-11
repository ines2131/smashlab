import { api } from "@/lib/axios";
import { RegisterPayload } from "@/types/auth";

export const registerUser = async (payload: RegisterPayload) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};
