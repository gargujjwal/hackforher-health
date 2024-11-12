import { Button, ButtonGroup } from "@nextui-org/button";
import { Chip, ChipProps } from "@nextui-org/chip";
import { Pagination } from "@nextui-org/pagination";
import {
  Selection,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Tooltip } from "@nextui-org/tooltip";
import { useQuery } from "@tanstack/react-query";
import { Key, useCallback, useState } from "react";
import { FaUser, FaUserClock } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import { HiChatBubbleLeftRight } from "react-icons/hi2";
import { IoEyeOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import FormError from "../ui/form-error";
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

type Props =
  | { strategy: "patient" }
  | {
      strategy: "doctor";
      selectedMedicalCaseId: number | null;
      onSelectMedicalCase: (medicalCaseId: number) => void;
    };

function MedicalCasesTable(props: Props) {
  const { user } = useAuthenticatedUser();
  const [page, setPage] = useState(0);
  const patientMedicalCaseQuery = useQuery({
    ...getMedicalCasesByPatientId(user.id, page, 10),
    staleTime: 1000 * 60 * 5,
    enabled() {
      return props.strategy === "patient";
    },
  });
  const doctorMedicalCaseQuery = useQuery({
    ...getMedicalCasesByDoctorId(user.id, page),
    staleTime: 1000 * 60 * 5,
    enabled() {
      return props.strategy === "doctor";
    },
  });
  const medicalCaseQuery =
    props.strategy === "patient"
      ? patientMedicalCaseQuery
      : doctorMedicalCaseQuery;
  const columns = getColumnKeys(props.strategy);

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
              strategy={props.strategy}
            />
          );
        case "actions":
          return props.strategy === "patient" ? (
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

  const handleSelectionChange = (keys: Selection) => {
    if (props.strategy === "doctor" && keys instanceof Set) {
      const selectedId = +Array.from(keys)[0];

      props.onSelectMedicalCase(selectedId);
    }
  };

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
              <div className="mx-auto">
                <Pagination
                  isCompact
                  loop
                  showControls
                  showShadow
                  className="text-textPrimary"
                  color="secondary"
                  page={page + 1}
                  total={medicalCaseQuery.data.totalPages}
                  onChange={page => setPage(page - 1)}
                />
              </div>
            ) : null
          }
          color="primary"
          selectedKeys={
            props.strategy === "doctor"
              ? new Set([props.selectedMedicalCaseId?.toString() ?? ""])
              : undefined
          }
          selectionMode={props.strategy === "doctor" ? "single" : "none"}
          onSelectionChange={
            props.strategy === "doctor" ? handleSelectionChange : undefined
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
  const navigate = useNavigate();

  return (
    <ButtonGroup size="md">
      <Tooltip content="View Case">
        <Button
          isIconOnly
          size="md"
          onClick={() =>
            navigate(`/dashboard/patient/medical-case/${medicalCase.id}`)
          }
        >
          <IoEyeOutline />
        </Button>
      </Tooltip>
      <Tooltip content="Fill questionnaire">
        <Button
          isIconOnly
          onClick={() => navigate("/dashboard/patient/questionnaire/respond")}
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
          className="text-textPrimary"
          color="primary"
          onClick={() =>
            navigate(
              `/dashboard/patient/medical-case/${medicalCase.id}?entitiesTab=appointments#entities`,
            )
          }
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
          className="text-textPrimary"
          color="primary"
          onClick={() =>
            navigate(
              `/dashboard/patient/medical-case/${medicalCase.id}?entitiesTab=chat#entities`,
            )
          }
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
  const navigate = useNavigate();

  return (
    <ButtonGroup size="md">
      <Tooltip content="View Case">
        <Button
          isIconOnly
          onClick={() =>
            navigate(`/dashboard/doctor/medical-case/${medicalCase.id}`)
          }
        >
          <IoEyeOutline />
        </Button>
      </Tooltip>
      <Tooltip content="View Patient Profile">
        <Button
          isIconOnly
          onClick={() => navigate(`/patient/${medicalCase.patient.id}/profile`)}
        >
          <FaUser />
        </Button>
      </Tooltip>
      <Tooltip
        className="text-textPrimary"
        color="primary"
        content="Chat with Patient"
      >
        <Button
          isIconOnly
          className="text-textPrimary"
          color="primary"
          // FIXME: this link needs to be looked at again
          onClick={() => navigate("/dashboard/patient/chat/")}
        >
          <HiChatBubbleLeftRight />
        </Button>
      </Tooltip>
    </ButtonGroup>
  );
}

export default MedicalCasesTable;
