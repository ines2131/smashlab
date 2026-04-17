import Link from "next/link";

export default function Navbar() {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b">
      <Link href="/" className="font-bold text-lg cursor-pointer">
        SmashLab
      </Link>
      <div className="flex gap-10 text-md">
        <span className="cursor-pointer">Tennis</span>
        <span className="cursor-pointer">Padel</span>
        <span className="cursor-pointer">Pickleball</span>
        <span className="cursor-pointer">Contact</span>
      </div>
      <div className="flex gap-4">
        <Link href="/login" className="cursor-pointer">
          👤
        </Link>
        <span className="cursor-pointer">🔍</span>
        <Link href="/cart" className="cursor-pointer">
          🛒
        </Link>
      </div>
    </div>
  );
}
