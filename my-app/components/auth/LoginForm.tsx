"use client";

import { login } from "@/services/authService";
import { AuthFormData } from "@/types/auth";
import AuthForm from "./AuthForm";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const handleLogin = async (data: AuthFormData) => {
    await login({
      email: data.email,
      password: data.password,
    });
    router.push("/");
  };
  return <AuthForm type="login" onSubmit={handleLogin} />;
}
