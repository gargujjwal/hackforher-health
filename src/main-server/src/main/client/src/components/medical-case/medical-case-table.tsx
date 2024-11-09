import { FaUser } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
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
import {
  DateCell,
  HandlingDoctorCell,
  PatientCell,
} from "../util/table-related";

import Spinner from "@/components/ui/spinner";
import { useAuthenticatedUser } from "@/contexts/auth-context";
import {
  getMedicalCasesByDoctorId,
  getMedicalCasesByPatientId,
} from "@/react-query/queries";
import { MedicalCaseResponseDto } from "@/types/backend-stubs";
import { getHandlingDoctorAssignment } from "@/utils/logic";

type Props = { strategy: "patient" | "doctor" };

function MedicalCasesTable({ strategy }: Props) {
  const { user } = useAuthenticatedUser();
  const [page, setPage] = useState(0);
  const patientMedicalCaseQuery = useQuery({
    ...getMedicalCasesByPatientId(user.id, page, 10),
    staleTime: 1000 * 60 * 5,
    enabled() {
      return strategy === "patient";
    },
  });
  const doctorMedicalCaseQuery = useQuery({
    ...getMedicalCasesByDoctorId(user.id, page),
    staleTime: 1000 * 60 * 5,
    enabled() {
      return strategy === "doctor";
    },
  });
  const medicalCaseQuery =
    strategy === "patient" ? patientMedicalCaseQuery : doctorMedicalCaseQuery;
  const columns = getColumnKeys(strategy);

  const renderCell = useCallback(
    (medicalCase: MedicalCaseResponseDto, columnKey: Key) => {
      switch (columnKey) {
        case "createdAt":
          return <DateCell date={medicalCase.createdAt} />;
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
        case "patient":
          return <PatientCell patient={medicalCase.patient} />;
        case "isResolved":
          return (
            <CaseStatusCell
              loggedInDoctorId={user.id}
              medicalCase={medicalCase}
              strategy={strategy}
            />
          );
        case "actions":
          return strategy === "patient" ? (
            <PatientActionsCell medicalCase={medicalCase} />
          ) : (
            <DoctorActionsCell medicalCase={medicalCase} />
          );
        default:
          return null;
      }
    },
    [],
  );

  switch (medicalCaseQuery.status) {
    case "pending":
      return <Spinner />;
    case "error":
      return <FormError message="Failed to get medical case of the patient" />;
    case "success":
      return (
        <Table
          bottomContent={
            medicalCaseQuery.data.totalPages > 0 ? (
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  loop
                  showControls
                  showShadow
                  className="text-textSecondary"
                  color="secondary"
                  page={page + 1}
                  total={medicalCaseQuery.data.totalPages}
                  onChange={page => setPage(page - 1)}
                />
              </div>
            ) : null
          }
        >
          <TableHeader columns={columns}>
            {column => (
              <TableColumn key={column.uid} align="center">
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent="Seems like you haven't created any new medical case, so go ahead and create one!"
            items={medicalCaseQuery.data.content}
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

function getColumnKeys(strategy: Props["strategy"]) {
  return strategy === "patient"
    ? [
        { uid: "createdAt", name: "CREATED AT" },
        { uid: "caseDescription", name: "DESCRIPTION" },
        { uid: "handlingDoctor", name: "HANDLING DOCTOR" },
        { uid: "isResolved", name: "STATUS" },
        { uid: "actions", name: "ACTIONS" },
      ]
    : [
        { uid: "patient", name: "PATIENT" },
        { uid: "caseDescription", name: "DESCRIPTION" },
        { uid: "createdAt", name: "CREATED AT" },
        { uid: "isResolved", name: "STATUS" },
        { uid: "actions", name: "ACTIONS" },
      ];
}

function CaseStatusCell({
  medicalCase,
  loggedInDoctorId,
  strategy,
}: {
  medicalCase: MedicalCaseResponseDto;
  loggedInDoctorId: number;
  strategy: Props["strategy"];
}) {
  const statusColorMap: Record<string, ChipProps["color"]> = {
    resolved: "success",
    unresolved: "warning",
  };
  const currentDoctorAssignment = getHandlingDoctorAssignment(
    medicalCase.doctorAssignments,
  );
  const doctorChanged = currentDoctorAssignment.doctor.id !== loggedInDoctorId;

  return (
    <div className={strategy === "doctor" ? "flex justify-center gap-1" : ""}>
      <Chip
        color={
          statusColorMap[medicalCase.isResolved ? "resolved" : "unresolved"]
        }
        size="sm"
        variant="flat"
      >
        {medicalCase.isResolved ? "RESOLVED" : "UNRESOLVED"}
      </Chip>
      {strategy === "doctor" && (
        <Chip
          color={doctorChanged ? "secondary" : "success"}
          size="sm"
          variant="flat"
        >
          {doctorChanged ? "DOCTOR CHANGED" : "ACTIVE"}
        </Chip>
      )}
    </div>
  );
}

function PatientActionsCell({
  medicalCase,
}: {
  medicalCase: MedicalCaseResponseDto;
}) {
  return (
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
        <Button isIconOnly as={Link} href="/dashboard/patient/questionnaire/">
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
  );
}

function DoctorActionsCell({
  medicalCase,
}: {
  medicalCase: MedicalCaseResponseDto;
}) {
  return (
    <ButtonGroup size="md">
      <Tooltip content="View Case">
        <Button
          isIconOnly
          as={Link}
          href={`/dashboard/patient/medical-case/${medicalCase.id}`}
        >
          <IoEyeOutline />
        </Button>
      </Tooltip>
      <Tooltip content="View Patient Profile">
        <Button
          isIconOnly
          as={Link}
          href={`/patient/${medicalCase.patient.id}`}
        >
          <FaUser />
        </Button>
      </Tooltip>
      <Tooltip content="View Questionnaire Submissions">
        <Button isIconOnly as={Link} href="/dashboard/patient/questionnaire/">
          <FaClipboardQuestion />
        </Button>
      </Tooltip>
      <Tooltip
        className="text-textPrimary"
        color="primary"
        content="View Appointments"
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
        content="Chat with Patient"
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
  );
}

export default MedicalCasesTable;
