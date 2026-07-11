type FieldProps = {
  label: string;
  required?: boolean;
  children: React.ReactNode;
};

export default function Field({ label, required, children }: FieldProps) {
  return (
    <div>
      <label className="mb-1.5 text-sm font-medium text-gray-700">
        {label}
        {required && <span className="ml-0.5 text-red-500">*</span>}
      </label>
      {children}
    </div>
  );
}
