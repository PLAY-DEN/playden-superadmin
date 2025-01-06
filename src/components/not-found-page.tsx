import React from "react";

interface NotFoundPageProps {
  errorMessage?: string;
}

const NotFoundPage: React.FC<NotFoundPageProps> = ({ errorMessage }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 rounded-xl">
      <h1 className="text-4xl font-bold mb-4">Not Found</h1>
      <p className="text-lg mb-2">
        Sorry, the result you are trying to fetch not exist.
      </p>
      <p className="text-sm text-gray-500 italic">{errorMessage || ""}</p>
    </div>
  );
};

export default NotFoundPage;
