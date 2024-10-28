"use client"
import { Input as RizzInput } from 'rizzui';

type InputProps = {
  type?: "number" | "search" | "text" | "email" | "tel" | "url" | "time" | "date" | "week" | "month" | "datetime-local" | undefined;
  placeholder: string;
  className?: string;
  error?: string;
  [key: string]: unknown;
};

const Input: React.FC<InputProps> = ({ type = "text", placeholder, className, error = "", ...props }) => (
  <div className="flex flex-col my-1">
    <RizzInput
      type={type}
      placeholder={placeholder}
      className={``}
      inputClassName={`px-5 py8 ring-0 border--400 bg-[#F9F9F9] rounded-[60px] max-md:px-5 max-md:max-w-full border-0 ${className}`}
      aria-label={placeholder}
      {...props}
    />
    {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
  </div>
);


export default Input;