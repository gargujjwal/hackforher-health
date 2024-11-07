import { FaClock } from "react-icons/fa";
import { GoAlertFill } from "react-icons/go";
import React from "react";
import { Card, CardHeader } from "@nextui-org/card";
import { FaCircleCheck, FaCircleXmark } from "react-icons/fa6";
import { CardBody } from "@nextui-org/card";

type ReviewStatus = "CORRECT" | "WRONG" | "NEEDS_DISCUSSION" | "PENDING";

interface ReviewCardProps {
  reviewStatus: ReviewStatus;
  doctorNotes: string;
}

const ReviewStatusCard: React.FC<ReviewCardProps> = ({
  reviewStatus,
  doctorNotes,
}) => {
  const getStatusIcon = () => {
    switch (reviewStatus) {
      case "CORRECT":
        return <FaCircleCheck className="h-16 w-16 text-green-500" />;
      case "WRONG":
        return <FaCircleXmark className="h-16 w-16 text-red-500" />;
      case "NEEDS_DISCUSSION":
        return <GoAlertFill className="h-16 w-16 text-yellow-500" />;
      case "PENDING":
        return <FaClock className="h-16 w-16 text-gray-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (reviewStatus) {
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
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="justify-center">
        <span className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
          Review Status
        </span>
      </CardHeader>
      <CardBody>
        <div className="mb-4 flex items-center justify-center">
          {getStatusIcon()}
        </div>
        <p className="mb-2 text-center text-2xl font-medium">
          {getStatusText()}
        </p>
        <p className="mb-4 text-center text-gray-500">Doctor&apos;s Notes:</p>
        <p className="text-center text-gray-500">{doctorNotes}</p>
      </CardBody>
    </Card>
  );
};

export default ReviewStatusCard;
