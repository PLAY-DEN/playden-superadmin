"use client"
import { Select as RizzSelect } from 'rizzui';

type InputProps = {
  className?: string;
  options: Array<{ label: string; value: string }>;
  value: string;
  setValue: (value: string) => void;
  label?: string;
  error?: string;
  [key: string]: unknown;
};

const Select: React.FC<InputProps> = ({ options, className, value, setValue, label, error = "" }) => (
  <div className="flex flex-col my-1">
    <RizzSelect
      label={label}
      options={options}
      value={value}
      onChange={setValue}
      selectClassName={`px-11 py-8 ring-0 border--400 bg-[#F9F9F9] rounded-[60px] max-md:px-5 max-md:max-w-full border-0 ${className}`}
    />
    {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
  </div>
);


export default Select;