import React from 'react';
import {Button} from '@nextui-org/button';
import {useNavigate} from "react-router-dom";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
      <div className="flex flex-col justify-center items-center h-screen bg-red-100">
        <h2 className="text-red-600 font-bold mb-4">
          Oops! Something went wrong.
        </h2>
        <p className="text-gray-600 mb-8">
          We encountered an error. Please try again later.
        </p>
        <Button color="danger" onClick={() => navigate(-1)}>
          Try Again
        </Button>
      </div>
  );
};

export default ErrorPage;
