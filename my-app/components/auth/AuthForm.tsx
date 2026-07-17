"use client";

import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import axios from "axios";
import { AuthFormData } from "@/types/auth";
import Image from "next/image";
import Link from "next/link";
import { AlertCircle } from "lucide-react";

type Props = {
  type: "login" | "register";
  onSubmit: (data: AuthFormData) => Promise<void>;
};

export default function AuthForm({ type, onSubmit }: Props) {
  const [formData, setFormData] = useState<AuthFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isLogin = type === "login";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError("");

      if (!isLogin) {
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match");
          return;
        }
      }

      await onSubmit(formData);
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err?.response?.data?.error || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 min-h-screen">
      {/* Image side: hidden on mobile */}
      <div className="relative hidden md:block">
        <Image
          src={isLogin ? "/login.webp" : "/racket.jpg"}
          alt={isLogin ? "login-bg" : "register-bg"}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex flex-col justify-center px-6 sm:px-10 md:px-16 lg:px-20 py-12">
        <div className="w-full max-w-md mx-auto md:mx-0">
          <h2 className="text-xl font-bold mb-3">
            {isLogin ? "Log In" : "Create an Account"}
          </h2>

          <div className="w-full flex flex-col gap-4">
            {!isLogin && (
              <Input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
              />
            )}

            <Input
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
            />

            {!isLogin && (
              <Input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            )}

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2 text-sm">
                <AlertCircle size={16} className="shrink-0" />
                <p>{error}</p>
              </div>
            )}

            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? "Loading..." : isLogin ? "Log In" : "Register"}
            </Button>

            <p className="text-sm text-gray-500 text-center mt-2">
              {isLogin ? (
                <>
                  Don&apos;t have a SmashLab account?{" "}
                  <Link
                    href="/register"
                    className="text-[rgb(var(--color-primary))] font-medium hover:underline"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <>
                  Already have a SmashLab account?{" "}
                  <Link
                    href="/login"
                    className="text-[rgb(var(--color-primary))] font-medium hover:underline"
                  >
                    Log in
                  </Link>
                </>
              )}
            </p>
          </div>
        </div>
        <div className="w-full flex justify-center mt-10">
          <Link
            href="/"
            className="font-bold text-lg text-[rgb(var(--color-primary))]"
          >
            <img
              src="/logo-orange.svg"
              alt="logo"
              className="w-[140px] h-[35px] md:w-[200px] md:h-[50px]"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
