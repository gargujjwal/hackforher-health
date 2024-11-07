import { IoEyeOutline } from "react-icons/io5";
import { Spinner } from "@nextui-org/spinner";
import { FaUserClock } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { Key, useCallback, useState } from "react";
import { Pagination } from "@nextui-org/pagination";
import { Tooltip } from "@nextui-org/tooltip";
import { Chip, ChipProps } from "@nextui-org/chip";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { useQuery } from "@tanstack/react-query";
import { Button, ButtonGroup } from "@nextui-org/button";

import FormError from "../ui/form-error";
import Link from "../util/link";

import { useAuthenticatedUser } from "@/contexts/auth-context";
import { getMedicalCasesByPatientId } from "@/react-query/queries";
import { MedicalCaseResponseDto } from "@/types/backend-stubs";
import { getHandlingDoctorAssignment } from "@/utils/logic";

const statusColorMap: Record<string, ChipProps["color"]> = {
  resolved: "success",
  unresolved: "warning",
};

const columns = [
  { uid: "createdAt", name: "CREATED AT" },
  { uid: "caseDescription", name: "DESCRIPTION" },
  { uid: "handlingDoctor", name: "HANDLING DOCTOR" },
  { uid: "isResolved", name: "STATUS" },
  { uid: "actions", name: "ACTIONS" },
];

type CreatedAtCellProps = Readonly<{ createdAt: string }>;

function CreatedAtCell({ createdAt }: CreatedAtCellProps) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return <div>{formattedDate}</div>;
}

type HandlingDoctorCellProps = Readonly<{
  doctorAssignments: MedicalCaseResponseDto["doctorAssignments"];
}>;

function HandlingDoctorCell({ doctorAssignments }: HandlingDoctorCellProps) {
  const handlingDoctor = getHandlingDoctorAssignment(doctorAssignments);

  return (
    <p>
      Dr. {handlingDoctor.doctor.firstName} {handlingDoctor.doctor.lastName}
    </p>
  );
}

function MedicalCasesTable() {
  const { user } = useAuthenticatedUser();
  const [page, setPage] = useState(0);
  const medicalCases = useQuery({
    ...getMedicalCasesByPatientId(user.id, page, 10),
    staleTime: 1000 * 60 * 5,
  });

  const renderCell = useCallback(
    (medicalCase: MedicalCaseResponseDto, columnKey: Key) => {
      switch (columnKey) {
        case "createdAt":
          return <CreatedAtCell createdAt={medicalCase.createdAt} />;
        case "caseDescription":
          return (
            <p className="text-bold text-ellipsis text-sm capitalize">
              {medicalCase.caseDescription}
            </p>
          );
        case "handlingDoctor":
          return (
            <HandlingDoctorCell
              doctorAssignments={medicalCase.doctorAssignments}
            />
          );
        case "isResolved":
          return (
            <Chip
              color={
                statusColorMap[
                  medicalCase.isResolved ? "resolved" : "unresolved"
                ]
              }
              size="sm"
              variant="flat"
            >
              {medicalCase.isResolved ? "RESOLVED" : "UNRESOLVED"}
            </Chip>
          );
        case "actions":
          return (
            <div className="relative flex items-center justify-center gap-2">
              <ButtonGroup size="md">
                <Tooltip content="Details">
                  <Button
                    isIconOnly
                    as={Link}
                    href={`/dashboard/patient/medical-case/${medicalCase.id}`}
                  >
                    <IoEyeOutline />
                  </Button>
                </Tooltip>
                <Tooltip content="Fill questionnaire">
                  <Button
                    isIconOnly
                    as={Link}
                    href="/dashboard/patient/questionnaire/"
                  >
                    <FaClipboardQuestion />
                  </Button>
                </Tooltip>
                <Tooltip
                  className="text-textPrimary"
                  color="primary"
                  content="Appointments"
                >
                  <Button
                    isIconOnly
                    as={Link}
                    className="text-textPrimary"
                    color="primary"
                    href="/dashboard/patient/appointment/"
                  >
                    <FaUserClock />
                  </Button>
                </Tooltip>
                <Tooltip
                  className="text-textPrimary"
                  color="primary"
                  content="Chat with Doctor"
                >
                  <Button
                    isIconOnly
                    as={Link}
                    className="text-textPrimary"
                    color="primary"
                    href="/dashboard/patient/chat/"
                  >
                    <HiChatBubbleLeftRight />
                  </Button>
                </Tooltip>
              </ButtonGroup>
            </div>
          );
        default:
          return medicalCase.id;
      }
    },
    [],
  );

  switch (medicalCases.status) {
    case "pending":
      return (
        <div className="grid place-content-center">
          <Spinner />
        </div>
      );
    case "error":
      return <FormError message="Failed to get medical case of the patient" />;
    case "success":
      return (
        <Table
          aria-label="Example table with custom cells"
          bottomContent={
            medicalCases.data.totalPages > 0 ? (
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  loop
                  showControls
                  showShadow
                  className="text-textSecondary"
                  color="secondary"
                  page={page + 1}
                  total={medicalCases.data.totalPages}
                  onChange={page => setPage(page - 1)}
                />
              </div>
            ) : null
          }
        >
          <TableHeader columns={columns}>
            {column => (
              <TableColumn
                key={column.uid}
                align={column.uid === "actions" ? "center" : "start"}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent="Seems like you haven't created any new medical case, so go ahead and create one!"
            items={medicalCases.data.content}
          >
            {item => (
              <TableRow key={item.id}>
                {columnKey => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      );
  }
}

export default MedicalCasesTable;
