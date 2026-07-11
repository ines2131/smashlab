import { CartItem } from "@/types/cart";
import Image from "next/image";

interface Props {
  item: CartItem;
}

export default function OrderSummaryItem({ item }: Props) {
  const subtotal = item.product.price * item.quantity;

  return (
    <li className="flex items-center gap-3">
      {item.product.image && (
        <Image
          src={item.product.image}
          alt={item.product.name}
          width={48}
          height={48}
          className="rounded-md border object-cover"
        />
      )}
      <div className="flex-1">
        <p className="text-sm font-medium">{item.product.name}</p>
        <p className="text-xs text-gray-500">Quantity: {item.quantity}</p>
      </div>
      <p className="text-sm font-semibold">${subtotal.toFixed(2)}</p>
    </li>
  );
}
