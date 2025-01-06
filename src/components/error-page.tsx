import React from 'react';

interface ErrorPageProps {
    errorMessage: string;
}

const ErrorPage: React.FC<ErrorPageProps> = ({ errorMessage }) => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 rounded-xl">
            <h1 className="text-4xl font-bold mb-4">Oops!</h1>
            <p className="text-lg mb-2">Sorry, an unexpected error has occurred.</p>
            <p className="text-sm text-gray-500 italic">{errorMessage}</p>
        </div>
    );
};

export default ErrorPage;
