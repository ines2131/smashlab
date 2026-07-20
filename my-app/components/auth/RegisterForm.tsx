"use client";

import { registerUser } from "@/services/authService";
import { AuthFormData } from "@/types/auth";
import { useRouter } from "next/navigation";
import AuthForm from "./AuthForm";
import { toast } from "sonner";

export default function RegisterForm() {
  const router = useRouter();

  const handleRegister = async (data: AuthFormData) => {
    await registerUser({
      name: data.name!,
      email: data.email,
      password: data.password,
    });

    toast.success("Register successful");
    router.push("/login");
  };

  return <AuthForm type="register" onSubmit={handleRegister} />;
}
