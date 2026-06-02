import type { ChangeEvent } from 'react';

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  error?: string;
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
  error,
}) => {
  const labelClass =
    "absolute left-4 top-0 -translate-y-1/2 bg-white px-1 text-xs font-semibold text-violet-600";

  const inputClass =
    "w-full rounded-md border border-gray-400 p-3 text-sm outline-none focus:border-violet-500";

  return (
    <div className="relative">
      <label className={labelClass}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`${inputClass} ${error ? "border-red-500" : ""}`}
      />

      {error && (
        <p className="mt-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default FormInput;