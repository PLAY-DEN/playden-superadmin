import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useField } from 'formik';

type PasswordProps = {
  name: string;
  placeholder?: string;
  className?: string;
};

const Password: React.FC<PasswordProps> = ({ name, placeholder, className }) => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  // Use Formik's useField hook to get field and meta information
  const [field, meta] = useField(name);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
  };

  // Retrieve error message based on Formik's meta object
  const errorMessage = meta.touched && meta.error ? meta.error : undefined;

  return (
    <div className="flex flex-col my-1">
      <div className="relative">
        <input
          {...field}  // Spread Formik's field props
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder={placeholder}
          className={`w-80 px-4 py-2 border border-gray-500 rounded-lg ${className}`}
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
      {/* Display error message if there is one */}
      {errorMessage && (
        <div className="text-red-500 text-sm mt-1">{errorMessage}</div>
      )}
    </div>
  );
};

export default Password;
