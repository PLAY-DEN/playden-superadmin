
import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

type PasswordProps = {
    name: string;
    placeholder?: string;
    className?: string;
    error?: string; 
};

const Password: React.FC<PasswordProps> = ({ name, placeholder, className, error }) => {
    const [isPasswordVisible, setPasswordVisibility] = useState(false);

    const togglePasswordVisibility = () => {
        setPasswordVisibility(!isPasswordVisible);
    };

    return (
        <div className="flex flex-col my-1">
            <div className="relative">
                <input
                    type={isPasswordVisible ? 'text' : 'password'}
                    name={name}
                    placeholder={placeholder}
                    className={`w-80 px-4 py-2 border border-gray-500 rounded-lg  ${className}`}
                />
                <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    aria-label={isPasswordVisible ? 'Hide password' : 'Show password'}
                >
                    {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
                </button>
            </div>
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>} 
        </div>
    );
};

export default Password;
