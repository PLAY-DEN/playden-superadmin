import React from "react";
import { Loader } from "rizzui";

const LoadingPage: React.FC = () => {
  return (
    <div className="flex justify-center">
      <Loader />
    </div>
  );
};

export default LoadingPage;
