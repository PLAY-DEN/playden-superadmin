"use client"
import { Textarea as RizzTextarea } from 'rizzui';

type InputProps = {
    placeholder: string;
    className?: string;
};

const Textarea: React.FC<InputProps> = ({ placeholder, className }) => (
    <RizzTextarea
      placeholder={placeholder}
      textareaClassName={`px-11 py-8 ring-0 border--400 bg-[#F9F9F9] rounded-[60px] max-md:px-5 max-md:max-w-full border-0 ${className}`}
      aria-label={placeholder}
    />
  );

export default Textarea;
