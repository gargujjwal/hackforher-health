import { Card, CardBody, CardHeader, CardProps } from "@nextui-org/card";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";

import { QuestionnaireSubmissionResponseDto } from "@/types/backend-stubs";
import { formatDistanceFromNow } from "@/utils/date";

type Props = {
  modelPrediction: QuestionnaireSubmissionResponseDto["modelPrediction"];
  shadow?: CardProps["shadow"];
};

function ModelPredictionCard({
  modelPrediction: { hasCervicalCancer, accuracy, predictedAt },
  shadow,
}: Props) {
  return (
    <Card className="mx-auto w-full max-w-md" shadow={shadow}>
      <CardHeader className="justify-center">
        <span className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
          Cervical Cancer Prediction
        </span>
      </CardHeader>
      <CardBody className="pb-8">
        <div className="my-4 flex items-center justify-center">
          {hasCervicalCancer ? (
            <FaCircleXmark className="h-16 w-16 text-red-500" />
          ) : (
            <FaCircleCheck className="h-16 w-16 text-green-500" />
          )}
        </div>
        <p className="mb-2 text-center text-2xl font-medium">
          {hasCervicalCancer
            ? "Cervical Cancer Detected"
            : "No Cervical Cancer Detected"}
        </p>
        <p className="mb-4 text-center text-gray-500">
          Prediction Accuracy: {(accuracy * 100).toFixed(2)}%
        </p>
        <p className="text-center text-gray-500">
          Predicted {formatDistanceFromNow(predictedAt ?? new Date())}
        </p>
      </CardBody>
    </Card>
  );
}

export default ModelPredictionCard;
