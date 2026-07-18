type Props = {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
  max?: number;
};

export default function QuantitySelector({
  quantity,
  setQuantity,

  max,
}: Props) {
  const canDecrease = quantity > 1;
  const canIncrease = max === undefined || quantity < max;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (value === "") {
      setQuantity(1);
      return;
    }

    const num = Number(value);

    if (Number.isNaN(num)) return;

    const clamped = max !== undefined ? Math.min(num, max) : num;

    setQuantity(Math.max(1, clamped));
  };

  return (
    <div>
      <div className="inline-flex items-center rounded-lg border border-gray-300 overflow-hidden">
        <button
          type="button"
          onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          disabled={!canDecrease}
          aria-label="Decrease quantity"
          className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors"
        >
          −
        </button>

        <input
          type="number"
          min={1}
          max={max}
          value={quantity}
          onChange={handleChange}
          aria-label="Quantity"
          className="w-10 sm:w-12 h-9 sm:h-10 border-x border-gray-300 text-center text-sm font-medium focus:outline-none focus:bg-gray-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <button
          type="button"
          onClick={() =>
            setQuantity((prev) =>
              max !== undefined ? Math.min(max, prev + 1) : prev + 1,
            )
          }
          disabled={!canIncrease}
          aria-label="Increase quantity"
          className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-lg text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:text-gray-300 disabled:hover:bg-transparent transition-colors"
        >
          +
        </button>
      </div>
    </div>
  );
}
