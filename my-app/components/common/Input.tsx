type Props = {
  placeholder: string;
  type?: string;
};

export default function Input({ placeholder, type = "text" }: Props) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="w-full border p-2 rounded-md text-sm"
    />
  );
}
