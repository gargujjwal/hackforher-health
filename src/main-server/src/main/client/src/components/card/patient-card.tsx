import { Card, CardBody, CardHeader } from "@heroui/card";
import {
  FaCalendar,
  FaClock,
  FaEnvelope,
  FaUser,
  FaUserTag,
} from "react-icons/fa";

import { MedicalCaseResponseDto } from "@/types/backend-stubs";
import { calculateAge, formatDistanceFromNow } from "@/utils/date";

type Props = { patient: MedicalCaseResponseDto["patient"] };

function PatientCard({ patient }: Props) {
  const { id, email, firstName, lastName, dob, createdAt, role } = patient;

  return (
    <Card className="bg-nextui-layout-cardBackground max-w-md p-4">
      <CardHeader className="bg-nextui-colors-primary flex gap-3 p-4">
        <div className="flex items-center">
          <FaUser className="text-nextui-colors-textPrimary" size={24} />
        </div>
        <div className="flex flex-col">
          <p className="text-nextui-colors-textPrimary text-lg font-semibold">
            {firstName} {lastName}
          </p>
          <p className="text-nextui-colors-textPrimary text-small">
            Patient ID: {id}
          </p>
        </div>
      </CardHeader>

      <CardBody className="gap-4">
        <div className="flex items-center gap-4">
          <FaEnvelope className="text-nextui-colors-secondary" />
          <span className="text-nextui-colors-textSecondary">{email}</span>
        </div>

        <div className="flex items-center gap-4">
          <FaCalendar className="text-nextui-colors-secondary" />
          <span className="text-nextui-colors-textSecondary">
            Date of Birth:{" "}
            {new Date(dob).toLocaleString("en-US", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            ({calculateAge(dob)} years)
          </span>
        </div>

        <div className="flex items-center gap-4">
          <FaClock className="text-nextui-colors-secondary" />
          <span className="text-nextui-colors-textSecondary">
            Patient since: {formatDistanceFromNow(createdAt)}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <FaUserTag className="text-nextui-colors-secondary" />
          <span className="text-nextui-colors-textSecondary">Role: {role}</span>
        </div>
      </CardBody>
    </Card>
  );
}

export default PatientCard;
