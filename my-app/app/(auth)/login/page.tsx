import Button from "@/components/common/Button";
import Input from "@/components/common/Input";
import Image from "next/image";
import Link from "next/link";

export default function Login() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="relative">
        <Image src="/login.webp" alt="bg" fill className="object-cover" />
      </div>
      <div className="flex flex-col justify-center px-20">
        <h2 className="text-xl font-bold mb-4">Log In</h2>

        <div className="w-full flex flex-col gap-3">
          <Input placeholder="Email" />
          <Input placeholder="Password" type="password" />
        </div>

        <Button>Log In</Button>
        <Link href="/register" className="cursor-pointer mt-5">
          Don't have a SmashLab account yet?
        </Link>
        <Link href="/">SmashLab</Link>
      </div>
    </div>
  );
}
