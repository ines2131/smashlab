"use client";

import { login } from "@/services/authService";
import { AuthFormData } from "@/types/auth";
import AuthForm from "./AuthForm";
import { useRouter } from "next/navigation";
import { syncGuestCart } from "@/services/cartService";

export default function LoginForm() {
  const router = useRouter();
  const handleLogin = async (data: AuthFormData) => {
    await login({
      email: data.email,
      password: data.password,
    });

    const guestCart = JSON.parse(localStorage.getItem("guest-cart") || "[]");

    if (guestCart.length > 0) {
      await syncGuestCart(guestCart);
      localStorage.removeItem("guest-cart");
    }
    router.push("/");
  };
  return <AuthForm type="login" onSubmit={handleLogin} />;
}
