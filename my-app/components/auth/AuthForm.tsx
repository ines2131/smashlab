"use client";

import { useState } from "react";
import Input from "../common/Input";
import Button from "../common/Button";
import axios from "axios";
import { AuthFormData } from "@/types/auth";
import Image from "next/image";
import Link from "next/link";

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
    <div className="grid grid-cols-2 h-screen">
      <div className="relative">
        <Image
          src={isLogin ? "/login.webp" : "/racket.jpg"}
          alt={isLogin ? "login-bg" : "register-bg"}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col justify-center px-20">
        <h2 className="text-xl font-bold mb-4">
          {" "}
          {isLogin ? "Log In" : "Register"}
        </h2>

        <div className="w-full flex flex-col gap-3">
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
          {error && <p className="text-red-500">{error}</p>}

          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Loading..." : isLogin ? "login" : "register"}
          </Button>

          {isLogin ? (
            <Link href="/register" className="cursor-pointer mt-5">
              Don't have a SmashLab account yet?
            </Link>
          ) : (
            <Link href="/login" className="cursor-pointer mt-5">
              Already have a SmashLab account?
            </Link>
          )}
          <Link href="/">SmashLab</Link>
        </div>
      </div>
    </div>
  );
}
