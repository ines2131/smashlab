import Link from "next/link";
import { ShoppingCart, Mail, User } from "lucide-react";
export default function Navbar() {
  const categories = ["rackets", "apparel", "footwear", "gear"];

  return (
    <div className="flex justify-between items-center px-6 py-4 border-b">
      <Link
        href="/"
        className="font-bold flex gap-2 text-lg items-center cursor-pointer"
      >
        <img src="/logo.svg" alt="logo" className="w-[20px] h-[20px]" />
        SmashLab{" "}
      </Link>
      <div className="flex gap-10 text-md">
        {categories.map((category) => (
          <Link
            key={category}
            href={`/products/${category}`}
            className="cursor-pointer capitalize"
          >
            {category}
          </Link>
        ))}
      </div>

      <div className="flex gap-4">
        <Link href="/contact-us" className="cursor-pointer">
          <Mail />
        </Link>
        <Link href="/cart" className="cursor-pointer">
          <ShoppingCart />
        </Link>
        <Link href="/login" className="cursor-pointer">
          <User />
        </Link>
      </div>
    </div>
  );
}
