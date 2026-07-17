"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Mail, User, Menu, X } from "lucide-react";

export default function Navbar() {
  const categories = ["rackets", "apparel", "footwear", "gear"];
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b relative">
      <div className="flex justify-between items-center px-4 md:px-6 py-4">
        {/* burger button : only visible for mobile */}
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="open menu"
        >
          {isOpen ? <X /> : <Menu />}
        </button>

        {/* logo */}
        <Link
          href="/"
          className="font-bold flex gap-2 text-lg items-center cursor-pointer"
        >
          <img
            src="/logo-orange.svg"
            alt="logo"
            className="w-[140px] h-[35px] md:w-[200px] md:h-[50px]"
          />
        </Link>

        {/* category: only visible for desktop */}
        <div className="hidden md:flex gap-10 text-md">
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

        {/* desktop: All icons / 모바일: only cart icon */}
        <div className="flex gap-4 items-center">
          <Link href="/contact-us" className="hidden md:block cursor-pointer">
            <Mail />
          </Link>
          <Link href="/login" className="hidden md:block cursor-pointer">
            <User />
          </Link>
          <Link href="/cart" className="cursor-pointer">
            <ShoppingCart />
          </Link>
        </div>
      </div>

      {/* mobile drop-dopwn: category + Contact Us + Login */}
      {isOpen && (
        <div className="md:hidden flex flex-col px-4 pb-4 gap-1 border-t pt-4">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products/${category}`}
              className="cursor-pointer capitalize py-2"
              onClick={() => setIsOpen(false)}
            >
              {category}
            </Link>
          ))}

          <div className="border-t mt-2 pt-3 flex flex-col gap-1">
            <Link
              href="/contact-us"
              className="cursor-pointer py-2 flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <Mail size={18} />
              Contact Us
            </Link>
            <Link
              href="/login"
              className="cursor-pointer py-2 flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <User size={18} />
              Login / Register
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
