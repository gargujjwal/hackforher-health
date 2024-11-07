import { Divider } from "@nextui-org/divider";
import { Avatar } from "@nextui-org/avatar";
import { Badge } from "@nextui-org/badge";
import { Button } from "@nextui-org/button";
import { Card, CardBody, CardHeader } from "@nextui-org/card";
import { FaStar } from "react-icons/fa";

import { calculateAge, formatDistanceFromNow } from "@/utils/date";
import { MedicalCaseResponseDto } from "@/types/backend-stubs";
import Link from "@/components/util/link";

type Props = Readonly<{
  doctorAssignment: MedicalCaseResponseDto["doctorAssignments"][0];
}>;

function DoctorShowCard({ doctorAssignment }: Props) {
  const { doctor, assignedAt, unassignedAt, appointments } = doctorAssignment;

  const age = calculateAge(doctor.dob);
  const memberSince = formatDistanceFromNow(doctor.createdAt);
  const appointmentCount = appointments.length;

  // Handle navigation to profile

  return (
    <Card isHoverable className="mx-auto max-w-md border-2 border-gray-300 p-4">
      <Badge
        color="primary"
        content={
          <div className="flex items-center justify-center gap-0.5">
            {doctor.avgRating > 0 ? doctor.avgRating.toFixed(1) : "NR"}
            <FaStar />
          </div>
        }
        shape="rectangle"
        variant="flat"
      >
        <CardHeader className="flex items-center space-x-3">
          <Avatar
            isBordered
            className="hidden text-textPrimary sm:flex"
            color="primary"
            name={`${doctor.firstName[0]}${doctor.lastName[0]}`}
            size="lg"
          />
          <div>
            <h4 className="text-lg font-semibold">
              Dr. {doctor.firstName} {doctor.lastName}, {age} yrs
            </h4>
            <p className="text-xs text-gray-500">Member since {memberSince}</p>
          </div>
        </CardHeader>
      </Badge>

      <Divider />

      <CardBody className="mt-2">
        <p className="text-sm text-gray-600">
          Assigned: {formatDistanceFromNow(assignedAt)}
        </p>
        {unassignedAt && (
          <p className="text-sm text-gray-600">
            Replaced: {formatDistanceFromNow(unassignedAt)}
          </p>
        )}
        <p className="text-sm text-gray-600">
          Appointments: {appointmentCount}
        </p>

        <Button
          as={Link}
          className="mx-auto mt-4 text-textPrimary"
          color="primary"
          href={`/doctor-profile/${doctor.id}`}
        >
          See Profile
        </Button>
      </CardBody>
    </Card>
  );
}

export default DoctorShowCard;
