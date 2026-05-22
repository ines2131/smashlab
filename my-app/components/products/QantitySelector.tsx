type Props = {
  quantity: number;

  setQuantity: React.Dispatch<React.SetStateAction<number>>;
};

export default function QuantitySelector({ quantity, setQuantity }: Props) {
  return (
    <div>
      <p className="text-sm mb-1">Quantity</p>

      <div className="flex items-center gap-3">
        <button
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          className="w-10 h-10 border rounded-md"
        >
          -
        </button>

        <input
          type="number"
          min={1}
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-20 border rounded-md px-3 py-2 text-center"
        />

        <button
          onClick={() => setQuantity((prev) => prev + 1)}
          className="w-10 h-10 border rounded-md"
        >
          +
        </button>
      </div>
    </div>
  );
}
