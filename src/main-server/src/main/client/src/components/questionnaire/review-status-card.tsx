import {Card, CardBody, CardHeader} from "@nextui-org/card";
import {FaClock} from "react-icons/fa";
import {FaCircleCheck, FaCircleXmark} from "react-icons/fa6";
import {GoAlertFill} from "react-icons/go";

import {ReviewStatus} from "@/types/backend-stubs";

interface Props {
  reviewStatus: ReviewStatus;
  doctorNotes: string;
}

function ReviewStatusCard({reviewStatus, doctorNotes}: Props) {
  return (
      <Card className="w-full max-w-md">
        <CardHeader className="justify-center">
        <span className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
          Review Status
        </span>
        </CardHeader>
        <CardBody>
          <div className="mb-4 flex items-center justify-center">
            {getStatusIcon(reviewStatus)}
          </div>
          <p className="mb-2 text-center text-2xl font-medium">
            {getStatusText(reviewStatus)}
          </p>
          <p className="mb-4 text-center text-gray-500">Doctor&apos;s Notes:</p>
          <p className="text-center text-gray-500">{doctorNotes}</p>
        </CardBody>
      </Card>
  );
}

function getStatusIcon(status: ReviewStatus) {
  switch (status) {
    case "CORRECT":
      return <FaCircleCheck className="h-16 w-16 text-green-500"/>;
    case "WRONG":
      return <FaCircleXmark className="h-16 w-16 text-red-500"/>;
    case "NEEDS_DISCUSSION":
      return <GoAlertFill className="h-16 w-16 text-yellow-500"/>;
    case "PENDING":
      return <FaClock className="h-16 w-16 text-gray-500"/>;
    default:
      return null;
  }
}

function getStatusText(status: ReviewStatus) {
  switch (status) {
    case "CORRECT":
      return "Correct";
    case "WRONG":
      return "Wrong";
    case "NEEDS_DISCUSSION":
      return "Needs Discussion";
    case "PENDING":
      return "Pending";
    default:
      return "Unknown";
  }
}

export default ReviewStatusCard;
