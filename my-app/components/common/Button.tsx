type Props = {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
};

export default function Button({
  children,
  onClick,
  variant = "primary",
}: Props) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-md text-sm mt-5 ${
        variant === "primary"
          ? "bg-primary text-white"
          : "bg-secondary text-white"
      }`}
    >
      {children}
    </button>
  );
}
