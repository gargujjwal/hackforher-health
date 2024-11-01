import React from "react";
import { Button } from "@nextui-org/button";
import { useNavigate } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const ErrorPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center h-screen z-[2000] bg-red-100">
      <h2 className="text-red-600 font-bold mb-4 md:text-lg xl:text-xl">
        Oops! Something went wrong.
      </h2>
      <p className="text-gray-600 mb-8">
        We encountered an error. Please try again later.
      </p>
      <DotLottieReact
        autoplay
        loop
        className="size-32"
        src="/lottie-animations/error.lottie"
      />
      <Button className="mt-4" color="danger" onClick={() => navigate(-1)}>
        Return to previous page
      </Button>
    </div>
  );
};

export default ErrorPage;
