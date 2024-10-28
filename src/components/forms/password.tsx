"use client"
import { Password as RizzPassword } from 'rizzui';

type PasswordProps = {
    placeholder: string;
    className?: string;
    error?: string;
    [key: string]: unknown;
};

const Password: React.FC<PasswordProps> = ({ placeholder, className, error = "", ...props }) => (
    <div className="flex flex-col my-1">
        <RizzPassword
            placeholder={placeholder}
            className={``}
            inputClassName={`px-5 py-8 ring-0 border--400 bg-[#F9F9F9] rounded-[60px] max-md:px-5 max-md:max-w-full border-0 ${className}`}
            aria-label={placeholder}
            {...props}
        />
        {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
);


export default Password;