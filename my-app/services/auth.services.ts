import { api } from "@/lib/axios";
import { LoginPayload, RegisterPayload } from "@/types/auth";

export const registerUser = async (payload: RegisterPayload) => {
  const response = await api.post("/auth/register", payload);
  return response.data;
};

export const login = async (payload: LoginPayload) => {
  const response = await api.post("/auth/login", payload);
  return response.data;
};
