type Props = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: "w-4 h-4 border-2",
  md: "w-8 h-8 border-2",
  lg: "w-12 h-12 border-[3px]",
};

export default function Spinner({ size = "md", className = "" }: Props) {
  return (
    <div
      role="status"
      aria-label="Loading"
      className={`inline-block ${sizeMap[size]} border-gray-200 border-t-gray-800 rounded-full animate-spin ${className}`}
    />
  );
}
