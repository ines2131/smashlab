import Link from "next/link";
import { ShoppingCart, Mail, User } from "lucide-react";
export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b">
      <Link href="/" className="font-bold text-lg cursor-pointer">
        SmashLab
      </Link>
      <div className="flex gap-10 text-md">
        <span className="cursor-pointer">Rackets</span>
        <span className="cursor-pointer">Apparel</span>
        <span className="cursor-pointer">Footwear</span>
        <span className="cursor-pointer">Gear</span>
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
