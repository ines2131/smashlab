"use client";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center px-6 py-4 border-b">
      <div
        className="font-bold text-lg cursor-pointer"
        onClick={() => router.push("/")}
      >
        SmashLab
      </div>
      <div className="flex gap-10 text-md">
        <span className="cursor-pointer">Tennis</span>
        <span className="cursor-pointer">Padel</span>
        <span className="cursor-pointer">Pickleball</span>
        <span className="cursor-pointer">Contact</span>
      </div>
      <div className="flex gap-4">
        <span className="cursor-pointer">👤</span>
        <span className="cursor-pointer">🔍</span>
        <span className="cursor-pointer">🛒</span>
      </div>
    </div>
  );
}
