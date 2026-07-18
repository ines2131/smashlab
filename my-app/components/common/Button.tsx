type Props = {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  id?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  disabled?: boolean;
};

export default function Button({
  children,
  onClick,
  id,
  type = "button",
  variant = "primary",
  disabled = false,
}: Props) {
  return (
    <button
      id={id}
      onClick={onClick}
      type={type}
      disabled={disabled}
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
