import { FaArrowLeft } from "react-icons/fa";
import { Button } from "@heroui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

function ErrorPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams({
    message: "We encountered an error. Please try again later.",
  });

  return (
    <div className="absolute inset-0 z-[2000] flex h-screen flex-col items-center justify-center bg-red-100">
      <div className="mb-4 flex items-center gap-4">
        <Button isIconOnly variant="light" onClick={() => navigate(-1)}>
          <FaArrowLeft className="size-6 text-red-600" />
        </Button>
        <h2 className="font-bold text-red-600 md:text-lg xl:text-xl">
          Oops! Something went wrong.
        </h2>
      </div>
      <p className="mb-8 text-gray-600">{searchParams.get("message")}</p>
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
}

export default ErrorPage;
