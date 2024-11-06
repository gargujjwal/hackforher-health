import {IoEyeOutline} from "react-icons/io5";
import {Spinner} from "@nextui-org/spinner";
import {FaUserClock} from "react-icons/fa";
import {FaClipboardQuestion} from "react-icons/fa6";
import {HiChatBubbleLeftRight} from "react-icons/hi2";
import {Key, useCallback, useState} from "react";
import {Pagination} from "@nextui-org/pagination";
import {Tooltip} from "@nextui-org/tooltip";
import {Chip, ChipProps} from "@nextui-org/chip";
import {Table, TableBody, TableCell, TableColumn, TableHeader, TableRow,} from "@nextui-org/table";
import {useQuery} from "@tanstack/react-query";

import FormError from "../ui/form-error";

import {useAuthenticatedUser} from "@/contexts/auth-context";
import {getMedicalCasesByPatientId} from "@/react-query/queries";
import {MedicalCaseResponseDto} from "@/types/backend-stubs";

const statusColorMap: Record<string, ChipProps["color"]> = {
  resolved: "success",
  unresolved: "warning",
};

const columns = [
  {uid: "createdAt", name: "CREATED AT"},
  {uid: "caseDescription", name: "DESCRIPTION"},
  {uid: "handlingDoctor", name: "HANDLING DOCTOR"},
  {uid: "isResolved", name: "STATUS"},
  {uid: "actions", name: "ACTIONS"},
];

type CreatedAtCellProps = Readonly<{ createdAt: string }>;

function CreatedAtCell({createdAt}: CreatedAtCellProps) {
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

function HandlingDoctorCell({doctorAssignments}: HandlingDoctorCellProps) {
  const sortedDoctorAssignment = [...doctorAssignments].sort((a, b) => {
    return new Date(b.assignedAt).getTime() - new Date(a.assignedAt).getTime();
  });
  const handlingDoctor = sortedDoctorAssignment[0];

  return (
      <p>
        Dr. {handlingDoctor.doctor.firstName} {handlingDoctor.doctor.lastName}
      </p>
  );
}

function MedicalCasesTable() {
  const {user} = useAuthenticatedUser();
  const [page, setPage] = useState(0);
  const medicalCases = useQuery({
    ...getMedicalCasesByPatientId(user.id, page, 10),
    staleTime: 1000 * 60 * 5,
  });

  const renderCell = useCallback(
      (medicalCase: MedicalCaseResponseDto, columnKey: Key) => {
        switch (columnKey) {
          case "createdAt":
            return <CreatedAtCell createdAt={medicalCase.createdAt}/>;
          case "caseDescription":
            return (
                <p className="text-bold text-sm capitalize">
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
                    className="capitalize"
                    color={
                      statusColorMap[
                          medicalCase.isResolved ? "resolved" : "unresolved"
                          ]
                    }
                    size="sm"
                    variant="flat"
                >
                  {medicalCase.isResolved ? "resolved" : "unresolved"}
                </Chip>
            );
          case "actions":
            return (
                <div className="relative flex items-center gap-2">
                  <Tooltip content="Details">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <IoEyeOutline/>
                </span>
                  </Tooltip>
                  <Tooltip content="Fill questionnaire">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                  <FaClipboardQuestion/>
                </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Appointments">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <FaUserClock/>
                </span>
                  </Tooltip>
                  <Tooltip color="danger" content="Chat with Doctor">
                <span className="text-lg text-danger cursor-pointer active:opacity-50">
                  <HiChatBubbleLeftRight/>
                </span>
                  </Tooltip>
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
            <Spinner/>
          </div>
      );
    case "error":
      return <FormError message="Failed to get medical case of the patient"/>;
    case "success":
      return (
          <Table
              aria-label="Example table with custom cells"
              bottomContent={
                medicalCases.data.totalPages > 1 ? (
                    <div className="flex w-full justify-center">
                      <Pagination
                          isCompact
                          showControls
                          showShadow
                          color="secondary"
                          page={page}
                          total={medicalCases.data.totalPages}
                          onChange={(page) => setPage(page)}
                      />
                    </div>
                ) : null
              }
          >
            <TableHeader columns={columns}>
              {(column) => (
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
              {(item) => (
                  <TableRow key={item.id}>
                    {(columnKey) => (
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
