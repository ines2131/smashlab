import { CartItem } from "@/types/cart";
import OrderSummaryItem from "./OrderSummaryItem";

interface Props {
  cart: CartItem[];
  totalAmount: number;
}

export default function OrderSummary({ cart, totalAmount }: Props) {
  return (
    <div>
      <ul className="space-y-4">
        {cart.map((item) => (
          <OrderSummaryItem key={item._id} item={item} />
        ))}
      </ul>

      <hr className="my-4" />

      <div className="mt-2 flex justify-between text-lg font-bold">
        <span>Total Amount</span>
        <span>${totalAmount.toFixed(2)}</span>
      </div>
    </div>
  );
}
