import {DotLottieReact} from "@lottiefiles/dotlottie-react";
import {Button} from "@nextui-org/button";
import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {useNavigate} from "react-router-dom";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
      <div className="md:grid md:place-content-center">
        <Card className="mx-auto gap-4 p-4 md:min-w-[44rem] md:gap-0" shadow="lg">
          <CardHeader className="pb-0">
            <h1 className="flex-1 text-center text-3xl font-semibold lg:text-4xl">
              404: Page Not Found
            </h1>
          </CardHeader>
          <CardBody className="gap-8 md:gap-0">
            <p className="text-center text-gray-500">
              Sorry, the page you are looking for does not exist or has been
              moved.
            </p>
            <DotLottieReact
                autoplay
                loop
                className="h-full w-full"
                src="/lottie-animations/404.lottie"
            />
            <Button
                className="text-textPrimary"
                color="primary"
                onClick={() => navigate("/")}
            >
              Go Home
            </Button>
          </CardBody>
        </Card>
      </div>
  );
}
