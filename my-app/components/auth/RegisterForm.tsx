"use client";

import { registerUser } from "@/services/auth.services";
import Image from "next/image";
import { useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async () => {
    try {
      setLoading(true);
      setError(null);

      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match");
        return;
      }

      await registerUser({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      alert("Register success");

      router.push("/login");
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        setError(err?.response?.data?.error || "Something went wrong");
      } else {
        setError("Unexpected error");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="grid grid-cols-2 h-screen">
        <div className="relative">
          <Image src="/racket.jpg" alt="bg" fill className="object-cover" />
        </div>

        <div className="flex flex-col justify-center px-20">
          <h2 className="text-xl font-bold mb-4">Register</h2>

          {error && <p className="text-red-500 mb-2">{error}</p>}

          <div className="flex flex-col gap-3">
            <Input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
            />
            <Input
              name="email"
              type="email"
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
            <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>
          <Button onClick={handleRegister}>
            {loading ? "Loading.." : "Register"}
          </Button>
          <Link href="/login" className="cursor-pointer mt-5">
            Already have a SmashLab account yet?
          </Link>
          <Link href="/">SmashLab</Link>
        </div>
      </div>
    </div>
  );
}
